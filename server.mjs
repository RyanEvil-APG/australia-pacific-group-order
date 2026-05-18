import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 5288);
const STATE_ID = "production";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const STATE_CACHE_TTL_MS = 12 * 1000;
const localDataDir = path.join(__dirname, "data");
const localDataPath = path.join(localDataDir, "apg-state.json");
let cachedState = null;
let cachedStateAt = 0;

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
  customers: [],
  batches: [],
  inventory: [],
  transactions: [],
  tasks: []
};

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false }
      })
    : null;

const sessions = new Map();

function pruneExpiredSessions() {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_TTL_MS) {
      sessions.delete(token);
    }
  }
}

function normalizeOrderStatus(status) {
  const legacyMap = {
    new: "waiting_buy",
    buying: "waiting_buy",
    waiting_send: "purchased",
    shipping: "sent_vn",
    arrived_vn: "received_vn"
  };
  const allowedStatuses = new Set(["waiting_buy", "purchased", "sent_vn", "received_vn", "delivered", "cancelled"]);
  const nextStatus = legacyMap[status] ?? status;
  return allowedStatuses.has(nextStatus) ? nextStatus : "waiting_buy";
}

function normalizeOrders(items) {
  return Array.isArray(items) ? items.map((order) => ({ ...order, status: normalizeOrderStatus(order?.status) })) : [];
}

function normalizeCustomerTier(tier) {
  const legacyMap = {
    VIP: "Vip",
    VIP1: "Vip1",
    VIP2: "Vip2",
    VIP3: "Vip3"
  };
  const allowedTiers = new Set(["Customer", "Vip", "Vip1", "Vip2", "Vip3"]);
  const nextTier = legacyMap[tier] ?? tier;
  return allowedTiers.has(nextTier) ? nextTier : "Customer";
}

function normalizeCustomers(items) {
  return Array.isArray(items) ? items.map((customer) => ({ ...customer, tier: normalizeCustomerTier(customer?.tier) })) : [];
}

function mergeState(state = {}) {
  const demoOrderIds = new Set(["AU-260503-014", "AU-260503-013", "AU-260502-011", "AU-260502-009", "AU-260501-006", "AU-260430-003"]);
  const demoBatchIds = new Set(["batch-260508", "batch-260512", "batch-260515"]);
  const demoStockSkus = new Set(["VN-AESOP-HW-500", "VN-CW-VIT-D3", "VN-RMW-BOOT-42", "VN-APPLE-WATCH10"]);
  const demoTaskIds = new Set(["task-dyson-quote", "task-melbourne-cash", "task-vip-bag-color"]);

  return {
    accounts: Array.isArray(state.accounts) && state.accounts.length ? state.accounts : defaultState.accounts,
    orders: normalizeOrders(Array.isArray(state.orders) ? state.orders.filter((order) => !demoOrderIds.has(order.id)) : []),
    customers: normalizeCustomers(state.customers),
    batches: Array.isArray(state.batches) ? state.batches.filter((batch) => !demoBatchIds.has(batch.id)) : [],
    inventory: Array.isArray(state.inventory) ? state.inventory.filter((item) => !demoStockSkus.has(item.sku)) : [],
    transactions: Array.isArray(state.transactions) ? state.transactions : [],
    tasks: Array.isArray(state.tasks) ? state.tasks.filter((task) => !demoTaskIds.has(task.id)) : []
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
  if (cachedState && Date.now() - cachedStateAt < STATE_CACHE_TTL_MS) {
    return cachedState;
  }

  if (!supabase) {
    const state = await readLocalState();
    cachedState = state;
    cachedStateAt = Date.now();
    return state;
  }

  const { data, error } = await supabase.from("apg_app_state").select("data").eq("id", STATE_ID).maybeSingle();
  if (error) {
    console.error("Supabase read failed:", error.message);
    const state = await readLocalState();
    cachedState = state;
    cachedStateAt = Date.now();
    return state;
  }

  const state = mergeState(data?.data ?? defaultState);
  cachedState = state;
  cachedStateAt = Date.now();
  return state;
}

async function writeState(state) {
  const nextState = mergeState(state);
  cachedState = nextState;
  cachedStateAt = Date.now();
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

function canManageAccounts(account) {
  return account?.id === "ryan";
}

function stateForAccount(state, account) {
  const canManageUsers = canManageAccounts(account);
  return {
    ...state,
    accounts: state.accounts.map((item) => publicAccount(item, canManageUsers))
  };
}

function sessionFromRequest(req) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const session = sessions.get(token);

  if (!session) {
    return null;
  }

  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(token);
    return null;
  }

  return session;
}

function mergeClientState(serverState, clientState, account) {
  const canManageUsers = canManageAccounts(account);
  return {
    accounts: canManageUsers && Array.isArray(clientState.accounts) ? clientState.accounts : serverState.accounts,
    orders: Array.isArray(clientState.orders) ? normalizeOrders(clientState.orders) : serverState.orders,
    customers: Array.isArray(clientState.customers) ? normalizeCustomers(clientState.customers) : serverState.customers,
    batches: Array.isArray(clientState.batches) ? clientState.batches : serverState.batches,
    inventory: Array.isArray(clientState.inventory) ? clientState.inventory : serverState.inventory,
    transactions: Array.isArray(clientState.transactions) ? clientState.transactions : serverState.transactions,
    tasks: Array.isArray(clientState.tasks) ? clientState.tasks : serverState.tasks
  };
}

function decodeHtml(value = "") {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function normalizePreviewUrl(rawUrl) {
  const value = String(rawUrl || "").trim();
  const withProtocol = value.startsWith("www.") ? `https://${value}` : value;
  const parsed = new URL(withProtocol);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("unsupported url");
  }
  if (parsed.username || parsed.password) {
    throw new Error("url credentials are not allowed");
  }
  const host = parsed.hostname.toLowerCase();
  const blockedHosts = ["localhost", "127.0.0.1", "0.0.0.0", "::1"];
  if (
    blockedHosts.includes(host) ||
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
  ) {
    throw new Error("private urls are not allowed");
  }
  return parsed;
}

function readAttributes(tag = "") {
  const attrs = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    attrs[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attrs;
}

function readMeta(html, propertyNames = []) {
  const names = new Set(propertyNames.map((name) => name.toLowerCase()));
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = readAttributes(match[0]);
    const key = String(attrs.property || attrs.name || attrs.itemprop || "").toLowerCase();
    if (names.has(key) && attrs.content) return attrs.content;
  }
  return "";
}

function readTitle(html) {
  return decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function readLinkImage(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = readAttributes(match[0]);
    const rel = String(attrs.rel || "").toLowerCase();
    if (attrs.href && /(?:image_src|apple-touch-icon|icon)/.test(rel)) return attrs.href;
  }
  return "";
}

function imageFromValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return imageFromValue(value[0]);
  if (typeof value === "object") return value.url || value.contentUrl || value.src || "";
  return "";
}

function readJsonLdImage(html) {
  for (const match of html.matchAll(/<script\b[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(decodeHtml(match[1]));
      const queue = Array.isArray(parsed) ? [...parsed] : [parsed];
      while (queue.length) {
        const item = queue.shift();
        if (!item || typeof item !== "object") continue;
        const type = Array.isArray(item["@type"]) ? item["@type"].join(" ") : String(item["@type"] || "");
        const image = imageFromValue(item.image || item.thumbnailUrl || item.primaryImageOfPage);
        if (image && /product|offer|webpage/i.test(type)) return image;
        for (const value of Object.values(item)) {
          if (Array.isArray(value)) queue.push(...value);
          else if (value && typeof value === "object") queue.push(value);
        }
      }
    } catch {
      // Ignore malformed JSON-LD blocks from ecommerce templates.
    }
  }
  return "";
}

function readSrcset(srcset = "") {
  return String(srcset)
    .split(",")
    .map((item) => item.trim().split(/\s+/)[0])
    .filter(Boolean)
    .pop() || "";
}

function readImageTagCandidates(html) {
  const candidates = [];
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = readAttributes(match[0]);
    const value =
      attrs.src ||
      attrs["data-src"] ||
      attrs["data-original"] ||
      attrs["data-zoom-image"] ||
      attrs["data-large_image"] ||
      readSrcset(attrs.srcset || attrs["data-srcset"]);
    if (value) {
      candidates.push({
        value,
        hint: `${attrs.alt || ""} ${attrs.class || ""} ${attrs.id || ""} ${attrs.loading || ""}`
      });
    }
  }
  return candidates;
}

function readGenericImageCandidates(html) {
  const normalized = html.replace(/\\u002F/g, "/").replace(/\\\//g, "/").replace(/&amp;/g, "&");
  return [...normalized.matchAll(/https?:\/\/[^"'<>\\\s]+?\.(?:jpe?g|png|webp|avif)(?:\?[^"'<>\\\s]*)?/gi)].map((match) => ({
    value: match[0],
    hint: "html image url"
  }));
}

function scoreImageCandidate(candidate) {
  const text = `${candidate.value} ${candidate.hint || ""}`.toLowerCase();
  let score = 0;
  if (/\.(jpe?g|png|webp|avif)(?:\?|$)/.test(text)) score += 3;
  if (/product|goods|media|catalog|cdn|images|large|main|hero|zoom|photo|thumbnail/.test(text)) score += 4;
  if (/1200|1000|900|800|700|600|500|_xl|_lg|large|main|zoom/.test(text)) score += 2;
  if (/logo|icon|sprite|favicon|avatar|placeholder|loading|pixel|tracking|payment|visa|mastercard/.test(text)) score -= 8;
  if (/data:image/i.test(candidate.value)) score -= 4;
  return score;
}

function resolveImageUrl(candidates, target) {
  const sorted = candidates
    .filter((candidate) => candidate?.value && !String(candidate.value).startsWith("data:"))
    .sort((a, b) => scoreImageCandidate(b) - scoreImageCandidate(a));
  for (const candidate of sorted) {
    try {
      const resolved = new URL(candidate.value, target);
      if (["http:", "https:"].includes(resolved.protocol)) return resolved.toString();
    } catch {
      // Try the next candidate.
    }
  }
  return "";
}

async function fetchShopifyImage(target, signal) {
  const match = target.pathname.match(/\/products\/([^/?#]+)/i);
  if (!match) return "";
  const productJsonUrl = new URL(`/products/${match[1]}.js`, target.origin);
  const response = await fetch(productJsonUrl, {
    signal,
    headers: {
      "user-agent": "Mozilla/5.0 AustraliaPacificGroupOrder/1.0",
      accept: "application/json,text/plain,*/*"
    }
  }).catch(() => null);
  if (!response?.ok) return "";
  try {
    const product = await response.json();
    return imageFromValue(product.featured_image || product.image || product.images);
  } catch {
    return "";
  }
}

async function readResponseTextLimited(response, limitBytes = 700_000) {
  const reader = response.body?.getReader?.();
  if (!reader) return response.text();
  const chunks = [];
  let size = 0;
  while (size < limitBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    chunks.push(value);
  }
  await reader.cancel().catch(() => {});
  return Buffer.concat(chunks).toString("utf8");
}

async function fetchProductPreview(rawUrl) {
  const target = normalizePreviewUrl(rawUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    const shopifyImage = await fetchShopifyImage(target, controller.signal);
    const response = await fetch(target, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 AustraliaPacificGroupOrder/1.0",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "accept-language": "en-AU,en;q=0.9,vi;q=0.8"
      }
    });
    if (!response.ok) throw new Error("preview fetch failed");
    const contentType = response.headers.get("content-type") || "";
    if (contentType.startsWith("image/")) {
      return {
        ok: true,
        url: target.toString(),
        title: "",
        siteName: target.hostname.replace(/^www\./, ""),
        imageUrl: target.toString()
      };
    }
    const html = await readResponseTextLimited(response);
    const title =
      readMeta(html, ["og:title", "twitter:title"]) ||
      readTitle(html);
    const siteName = readMeta(html, ["og:site_name", "application-name"]) || target.hostname.replace(/^www\./, "");
    const imageUrl = resolveImageUrl(
      [
        { value: shopifyImage, hint: "shopify product image" },
        { value: readMeta(html, ["og:image:secure_url", "og:image", "twitter:image", "twitter:image:src"]), hint: "social meta image" },
        { value: readJsonLdImage(html), hint: "json ld product image" },
        { value: readLinkImage(html), hint: "link image" },
        ...readImageTagCandidates(html),
        ...readGenericImageCandidates(html)
      ],
      target
    );
    return {
      ok: true,
      url: target.toString(),
      title,
      siteName,
      imageUrl
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchImageForProxy(rawUrl, rawReferer) {
  const target = normalizePreviewUrl(rawUrl);
  const referer = rawReferer ? normalizePreviewUrl(rawReferer).toString() : target.origin;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(target, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 AustraliaPacificGroupOrder/1.0",
        accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        referer
      }
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.startsWith("image/")) {
      throw new Error("image fetch failed");
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > 5 * 1024 * 1024) {
      throw new Error("image too large");
    }
    return { buffer, contentType };
  } finally {
    clearTimeout(timeout);
  }
}

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use("/api", (_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

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

  pruneExpiredSessions();
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { accountId: account.id, role: account.role, createdAt: Date.now() });

  return res.json({
    token,
    expiresInMs: SESSION_TTL_MS,
    account: publicAccount(account, canManageAccounts(account)),
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

app.post("/api/product-preview", async (req, res) => {
  const session = sessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const preview = await fetchProductPreview(req.body?.url);
    return res.json(preview);
  } catch (error) {
    return res.status(422).json({
      ok: false,
      error: "Không lấy được ảnh từ link này. Upload ảnh tay hoặc thử link sản phẩm khác.",
      detail: error.message
    });
  }
});

app.get("/api/product-image", async (req, res) => {
  try {
    const image = await fetchImageForProxy(req.query.url, req.query.referer);
    res.set("Content-Type", image.contentType);
    res.set("Cache-Control", "public, max-age=86400");
    return res.send(image.buffer);
  } catch {
    return res.status(404).send("");
  }
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

app.use(
  "/assets",
  express.static(path.join(__dirname, "dist", "assets"), {
    immutable: true,
    maxAge: "1y"
  })
);
app.use(
  express.static(path.join(__dirname, "dist"), {
    maxAge: "1h"
  })
);
app.get(/.*/, (_req, res) => {
  res.set("Cache-Control", "no-cache");
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Australia Pacific Group Order running on port ${PORT}`);
});
