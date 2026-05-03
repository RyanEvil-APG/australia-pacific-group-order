import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 5288);
const STATE_ID = "production";
const localDataDir = path.join(__dirname, "data");
const localDataPath = path.join(localDataDir, "apg-state.json");

const defaultState = {
  accounts: [
    {
      id: "ryan",
      username: "ryan",
      password: "ryan123",
      displayName: "Ryan",
      role: "admin",
      label: "Admin",
      color: "#d1a54d",
      initials: "RV",
      active: true
    },
    {
      id: "general-manager",
      username: "manager",
      password: "manager123",
      displayName: "General Manager",
      role: "general_manager",
      label: "General Manager",
      color: "#274d7a",
      initials: "GM",
      active: true
    },
    {
      id: "staff-vn",
      username: "staff.vn",
      password: "staff123",
      displayName: "VN Ops",
      role: "staff",
      label: "Staff",
      color: "#11664f",
      initials: "VN",
      active: true
    }
  ],
  orders: [],
  batches: [],
  inventory: []
};

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false }
      })
    : null;

const sessions = new Map();

function mergeState(state = {}) {
  return {
    accounts: Array.isArray(state.accounts) && state.accounts.length ? state.accounts : defaultState.accounts,
    orders: Array.isArray(state.orders) ? state.orders : [],
    batches: Array.isArray(state.batches) ? state.batches : [],
    inventory: Array.isArray(state.inventory) ? state.inventory : []
  };
}

async function readLocalState() {
  try {
    const raw = await fs.readFile(localDataPath, "utf8");
    return mergeState(JSON.parse(raw));
  } catch {
    return mergeState(defaultState);
  }
}

async function writeLocalState(state) {
  await fs.mkdir(localDataDir, { recursive: true });
  await fs.writeFile(localDataPath, JSON.stringify(mergeState(state), null, 2));
}

async function readState() {
  if (!supabase) {
    return readLocalState();
  }

  const { data, error } = await supabase.from("apg_app_state").select("data").eq("id", STATE_ID).maybeSingle();
  if (error) {
    console.error("Supabase read failed:", error.message);
    return readLocalState();
  }

  return mergeState(data?.data ?? defaultState);
}

async function writeState(state) {
  const nextState = mergeState(state);
  await writeLocalState(nextState);

  if (!supabase) {
    return;
  }

  const { error } = await supabase.from("apg_app_state").upsert({
    id: STATE_ID,
    data: nextState,
    updated_at: new Date().toISOString()
  });

  if (error) {
    console.error("Supabase write failed:", error.message);
  }
}

function publicAccount(account, canManageUsers) {
  const { password, ...safeAccount } = account;
  return canManageUsers ? account : safeAccount;
}

function stateForAccount(state, account) {
  const canManageUsers = account?.role === "admin";
  return {
    ...state,
    accounts: state.accounts.map((item) => publicAccount(item, canManageUsers))
  };
}

function sessionFromRequest(req) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return sessions.get(token);
}

function mergeClientState(serverState, clientState, account) {
  const canManageUsers = account.role === "admin";
  return {
    accounts: canManageUsers && Array.isArray(clientState.accounts) ? clientState.accounts : serverState.accounts,
    orders: Array.isArray(clientState.orders) ? clientState.orders : serverState.orders,
    batches: Array.isArray(clientState.batches) ? clientState.batches : serverState.batches,
    inventory: Array.isArray(clientState.inventory) ? clientState.inventory : serverState.inventory
  };
}

const app = express();
app.use(express.json({ limit: "5mb" }));

app.get("/api/health", async (_req, res) => {
  res.json({ ok: true, storage: supabase ? "supabase" : "local-file" });
});

app.post("/api/login", async (req, res) => {
  const username = String(req.body?.username || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const state = await readState();
  const account = state.accounts.find(
    (item) => item.active && item.username.trim().toLowerCase() === username && item.password === password
  );

  if (!account) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { accountId: account.id, role: account.role, createdAt: Date.now() });

  return res.json({
    token,
    account: publicAccount(account, account.role === "admin"),
    state: stateForAccount(state, account)
  });
});

app.get("/api/state", async (req, res) => {
  const session = sessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const state = await readState();
  const account = state.accounts.find((item) => item.id === session.accountId);
  if (!account || !account.active) {
    return res.status(401).json({ error: "Account disabled" });
  }

  return res.json({ state: stateForAccount(state, account) });
});

app.put("/api/state", async (req, res) => {
  const session = sessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const serverState = await readState();
  const account = serverState.accounts.find((item) => item.id === session.accountId);
  if (!account || !account.active) {
    return res.status(401).json({ error: "Account disabled" });
  }

  const nextState = mergeClientState(serverState, req.body?.state ?? {}, account);
  await writeState(nextState);

  return res.json({ state: stateForAccount(nextState, account) });
});

app.post("/api/logout", (req, res) => {
  const session = sessionFromRequest(req);
  if (session) {
    for (const [token, value] of sessions.entries()) {
      if (value === session) sessions.delete(token);
    }
  }
  res.json({ ok: true });
});

app.use(express.static(path.join(__dirname, "dist")));
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Australia Pacific Group Order running on port ${PORT}`);
});
