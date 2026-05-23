import React from "react";
import {
  Bell,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Edit3,
  Filter,
  Gem,
  Image as ImageIcon,
  LineChart,
  Link2,
  LockKeyhole,
  LogOut,
  PackageCheck,
  Plane,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
  UserRound,
  WalletCards
} from "lucide-react";

const exchangeRate = 17150;
const orderFeeThresholdVnd = 500000;
const lowValueBuyingFeeVnd = 50000;
const highValueBuyingFeeRate = 0.1;
const defaultFinalWeightRateVnd = 280000;

const initialAccounts = [
  {
    id: "ryan",
    username: "ryan",
    password: "__server_login_only__",
    displayName: "Ryan",
    role: "admin",
    label: "Admin",
    color: "#d1a54d",
    initials: "RV",
    avatarUrl: "",
    active: true
  },
  {
    id: "general-manager",
    username: "manager",
    password: "__server_login_only__",
    displayName: "General Manager",
    role: "general_manager",
    label: "General Manager",
    color: "#274d7a",
    initials: "GM",
    avatarUrl: "",
    active: true
  },
  {
    id: "staff-vn",
    username: "staff.vn",
    password: "__server_login_only__",
    displayName: "VN Ops",
    role: "staff",
    label: "Staff",
    color: "#11664f",
    initials: "VN",
    avatarUrl: "",
    active: true
  }
];

const emptyOrder = {
  id: "",
  orderDate: "",
  customer: "",
  phone: "",
  customerTier: "Customer",
  product: "",
  quantity: 1,
  source: "",
  productUrl: "",
  productImageUrl: "",
  productImageSource: "",
  status: "waiting_buy",
  batchId: "",
  supervisorId: "ryan",
  assigneeId: "staff-vn",
  buyerId: "staff-vn",
  aud: 0,
  shippingAud: 0,
  intlShippingAud: 0,
  weightKg: 0,
  finalWeightRateVnd: defaultFinalWeightRateVnd,
  exchangeRate,
  extraFeeVnd: 0,
  extraFeeNote: "",
  totalThuVnd: 0,
  depositVnd: 0,
  splitBill: false,
  splitBillNote: "",
  note: ""
};

const emptyBatch = {
  id: "",
  code: "",
  route: "Australia -> Việt Nam",
  cutoff: "",
  departure: "",
  arrival: "",
  status: "open",
  capacityKg: 0,
  freightAud: 0,
  note: ""
};

const emptyStock = {
  sku: "",
  name: "",
  quantity: 0,
  reserved: 0,
  location: "",
  sellVnd: 0,
  ownerId: "staff-vn",
  status: "available",
  note: ""
};

const emptyTransaction = {
  id: "",
  date: "",
  type: "in",
  amountVnd: 0,
  orderId: "",
  batchId: "",
  category: "Thu khách",
  note: ""
};

const emptyTask = {
  id: "",
  title: "",
  dueDate: "",
  time: "",
  priority: "normal",
  status: "open",
  supervisorId: "ryan",
  assigneeId: "staff-vn",
  supervisorDone: false,
  assigneeDone: false,
  linkedOrderId: "",
  detail: ""
};

const navItems = [
  { id: "overview", label: "Tổng quan", icon: LineChart },
  { id: "orders", label: "Đơn hàng", icon: ClipboardList },
  { id: "buying", label: "Mua hàng & Packing", icon: PackageCheck },
  { id: "flights", label: "Chuyến bay", icon: Plane },
  { id: "stock", label: "Hàng có sẵn", icon: Boxes },
  { id: "customers", label: "Khách hàng", icon: UserRound },
  { id: "cashflow", label: "Thu/chi", icon: CreditCard },
  { id: "tasks", label: "Board", icon: Bell }
];

const orderStatuses = [
  { id: "waiting_buy", label: "Chờ mua" },
  { id: "purchased", label: "Đã mua" },
  { id: "sent_vn", label: "Đã gửi về VN" },
  { id: "received_vn", label: "Đã nhận ở VN" },
  { id: "delivered", label: "Đã giao khách" },
  { id: "cancelled", label: "Hủy" }
];

const batchStatuses = [
  { id: "open", label: "Đang gom" },
  { id: "closed", label: "Đã chốt" },
  { id: "not_sent", label: "Chưa gửi" },
  { id: "sent", label: "Đã gửi" },
  { id: "shipping", label: "Đang gửi" },
  { id: "arrived", label: "Đã về VN" }
];

const customerTiers = ["Customer", "Vip", "Vip1", "Vip2", "Vip3"];
const formatter = new Intl.NumberFormat("vi-VN");

function vnd(value) {
  return `${formatter.format(Math.round(Number(value || 0)))}đ`;
}

function aud(value) {
  return `A$${formatter.format(Number(value || 0))}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
}

function money(value) {
  return Number(value || 0);
}

function normalizeOrderStatus(status) {
  const legacyMap = {
    new: "waiting_buy",
    buying: "waiting_buy",
    waiting_send: "purchased",
    shipping: "sent_vn",
    arrived_vn: "received_vn"
  };
  const nextStatus = legacyMap[status] ?? status;
  return orderStatuses.some((item) => item.id === nextStatus) ? nextStatus : "waiting_buy";
}

function normalizeOrder(order) {
  return {
    ...order,
    productUrl: order?.productUrl ?? "",
    productImageUrl: order?.productImageUrl ?? "",
    productImageSource: order?.productImageSource ?? "",
    splitBill: Boolean(order?.splitBill),
    splitBillNote: order?.splitBillNote ?? "",
    status: normalizeOrderStatus(order?.status)
  };
}

function normalizeOrders(items) {
  return Array.isArray(items) ? items.map(normalizeOrder) : [];
}

function normalizeCustomerTier(tier) {
  const legacyMap = {
    VIP: "Vip",
    VIP1: "Vip1",
    VIP2: "Vip2",
    VIP3: "Vip3"
  };
  const nextTier = legacyMap[tier] ?? tier;
  return customerTiers.includes(nextTier) ? nextTier : "Customer";
}

function normalizeCustomer(customer) {
  return { ...customer, tier: normalizeCustomerTier(customer?.tier) };
}

function normalizeCustomers(items) {
  return Array.isArray(items) ? items.map(normalizeCustomer) : [];
}

function statusLabel(status) {
  const normalizedStatus = normalizeOrderStatus(status);
  return orderStatuses.find((item) => item.id === normalizedStatus)?.label ?? normalizedStatus;
}

function batchStatusLabel(status) {
  return batchStatuses.find((item) => item.id === status)?.label ?? status;
}

function dateDiffFromToday(value) {
  if (!value) return null;
  const target = new Date(`${value}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.ceil((target.getTime() - todayStart.getTime()) / 86400000);
}

function dateLabel(value) {
  if (!value) return "-";
  const diff = dateDiffFromToday(value);
  if (diff === 0) return "Hôm nay";
  if (diff === 1) return "Mai";
  if (diff === -1) return "Hôm qua";
  if (diff > 1) return `Còn ${diff} ngày`;
  if (diff < -1) return `Qua ${Math.abs(diff)} ngày`;
  return value;
}

function dateTime(value) {
  if (!value) return null;
  const time = new Date(`${value}T00:00:00`).getTime();
  return Number.isNaN(time) ? null : time;
}

function autoBatchForOrder(batches, orderDate = today()) {
  const refTime = dateTime(orderDate) ?? dateTime(today()) ?? Date.now();
  const preferredStatuses = new Set(["open", "not_sent"]);
  const blockedStatuses = new Set(["sent", "shipping", "arrived"]);
  const scored = batches
    .map((batch) => {
      const cutoff = dateTime(batch.cutoff);
      const departure = dateTime(batch.departure);
      const arrival = dateTime(batch.arrival);
      const nextTime = [cutoff, departure, arrival].filter((time) => time !== null && time >= refTime).sort((a, b) => a - b)[0] ?? null;
      const primaryTime = (cutoff !== null && cutoff >= refTime ? cutoff : null) ?? nextTime;
      const status = batch.status || "open";
      return { batch, status, primaryTime, nextTime };
    })
    .filter((item) => item.nextTime !== null && !blockedStatuses.has(item.status));

  const preferred = scored
    .filter((item) => preferredStatuses.has(item.status))
    .sort((a, b) => (a.primaryTime ?? a.nextTime) - (b.primaryTime ?? b.nextTime))[0];
  if (preferred) return preferred.batch;

  return scored.sort((a, b) => (a.primaryTime ?? a.nextTime) - (b.primaryTime ?? b.nextTime))[0]?.batch ?? null;
}

function flightTimelineStage(batch) {
  const cutoffDiff = dateDiffFromToday(batch.cutoff);
  const departureDiff = dateDiffFromToday(batch.departure);
  const arrivalDiff = dateDiffFromToday(batch.arrival);
  const isInFlight =
    batch.status === "shipping" ||
    ((departureDiff === null || departureDiff <= 0) && arrivalDiff !== null && arrivalDiff >= 0 && batch.status !== "arrived");

  if (isInFlight) {
    return { label: "Đang bay", tone: "flying", focusDate: batch.arrival || batch.departure, sortDate: batch.arrival || batch.departure || batch.cutoff || "" };
  }

  if (arrivalDiff !== null && arrivalDiff >= 0 && arrivalDiff <= 7) {
    return { label: "Sắp về VN", tone: "arriving", focusDate: batch.arrival, sortDate: batch.arrival };
  }

  if (departureDiff !== null && departureDiff >= 0 && departureDiff <= 7) {
    return { label: "Chuẩn bị bay", tone: "ready", focusDate: batch.departure, sortDate: batch.departure };
  }

  if (cutoffDiff !== null && cutoffDiff >= 0 && cutoffDiff <= 5 && ["open", "closed"].includes(batch.status)) {
    return { label: "Cần chốt mua", tone: "closing", focusDate: batch.cutoff, sortDate: batch.cutoff };
  }

  if (batch.status === "arrived" || (arrivalDiff !== null && arrivalDiff < 0)) {
    return { label: "Đã về VN", tone: "done", focusDate: batch.arrival, sortDate: batch.arrival || batch.departure || batch.cutoff || "" };
  }

  return { label: "Sắp tới", tone: "upcoming", focusDate: batch.departure || batch.cutoff || batch.arrival, sortDate: batch.departure || batch.cutoff || batch.arrival || "" };
}

function normalizeInitials(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");
}

function roleLabel(role) {
  const labels = {
    admin: "Admin",
    general_manager: "General Manager",
    staff: "Staff"
  };
  return labels[role] ?? role;
}

function orderFinance(order) {
  const rate = money(order.exchangeRate) || exchangeRate;
  const quantity = Math.max(1, money(order.quantity) || 1);
  const unitAud = money(order.aud);
  const goodsAud = unitAud * quantity;
  const goodsVnd = goodsAud * rate;
  const domesticShippingVnd = money(order.shippingAud) * rate;
  const purchaseFeeVnd = goodsVnd < orderFeeThresholdVnd ? lowValueBuyingFeeVnd : goodsVnd * highValueBuyingFeeRate;
  const airFreightAud = money(order.weightKg) * money(order.intlShippingAud);
  const airFreightVnd = airFreightAud * rate;
  const finalWeightRateVnd = money(order.finalWeightRateVnd) || defaultFinalWeightRateVnd;
  const finalWeightChargeVnd = money(order.weightKg) * finalWeightRateVnd;
  const totalCostVnd = goodsVnd + domesticShippingVnd + purchaseFeeVnd + airFreightVnd + money(order.extraFeeVnd);
  const suggestedTotalThuVnd = goodsVnd + domesticShippingVnd + purchaseFeeVnd + finalWeightChargeVnd + money(order.extraFeeVnd);
  const totalThuVnd = money(order.totalThuVnd) || suggestedTotalThuVnd;
  const depositVnd = money(order.depositVnd);

  return {
    rate,
    quantity,
    unitAud,
    goodsAud,
    goodsVnd,
    domesticShippingVnd,
    purchaseFeeVnd,
    airFreightAud,
    airFreightVnd,
    finalWeightRateVnd,
    finalWeightChargeVnd,
    suggestedTotalThuVnd,
    weightProfitVnd: finalWeightChargeVnd - airFreightVnd,
    totalCostVnd,
    totalThuVnd,
    depositVnd,
    remainingVnd: Math.max(totalThuVnd - depositVnd, 0),
    profitVnd: totalThuVnd - totalCostVnd
  };
}

function readStoredState(key, fallback, normalize) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return normalize ? normalize(parsed) : parsed;
  } catch {
    return fallback;
  }
}

function useStoredState(key, fallback, normalize) {
  const [state, setState] = React.useState(() => readStoredState(key, fallback, normalize));

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Local storage is only a fallback; cloud sync still works.
    }
  }, [key, state]);

  return [state, setState];
}

function stableJson(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

function looksLikeProductUrl(value) {
  const text = String(value || "").trim();
  return /^https?:\/\//i.test(text) || /^www\./i.test(text);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function productImageSrc(orderOrDraft) {
  const rawUrl = String(orderOrDraft?.productImageUrl || "").trim();
  if (!rawUrl || rawUrl.startsWith("data:") || rawUrl.startsWith("/api/product-image")) return rawUrl;
  if (!/^https?:\/\//i.test(rawUrl)) return rawUrl;
  const params = new URLSearchParams({ url: rawUrl });
  const referer = String(orderOrDraft?.productUrl || "").trim();
  if (looksLikeProductUrl(referer)) params.set("referer", referer);
  return `/api/product-image?${params.toString()}`;
}

function chemistPreviewFromUrl(rawUrl) {
  try {
    const parsed = new URL(String(rawUrl || "").startsWith("www.") ? `https://${rawUrl}` : rawUrl);
    const match = parsed.pathname.match(/\/buy\/(\d+)(?:\/([^/?#]+))?/i);
    if (!parsed.hostname.toLowerCase().includes("chemistwarehouse.com.au") || !match) return null;
    const title = String(match[2] || "")
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return {
      title,
      siteName: "Chemist Warehouse",
      imageUrl: `https://static.chemistwarehouse.com.au/ams/media/pi/${match[1]}/F2D_800.jpg`
    };
  } catch {
    return null;
  }
}

function stripDemo(items, demoIds, idKey = "id") {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => !demoIds.has(item[idKey]));
}

function getOrderId(order) {
  return order.id || makeId("AU");
}

function compactDate(value) {
  return String(value || today()).replaceAll("-", "");
}

function orderCodeSegment(batch) {
  const raw = String(batch?.code || batch?.id || "NOFLIGHT").toUpperCase();
  return raw.replace(/[^A-Z0-9]/g, "").slice(0, 10) || "NOFLIGHT";
}

function generateOrderCode(order, batch, orders) {
  const codeDate = compactDate(batch?.arrival || batch?.departure || order?.orderDate || today());
  const segment = orderCodeSegment(batch);
  const prefix = `APG-${codeDate}-${segment}`;
  const currentId = order?.id;
  const nextNumber =
    orders
      .filter((item) => item.id !== currentId && String(item.id || "").startsWith(prefix))
      .reduce((max, item) => {
        const match = String(item.id || "").match(/-(\d+)$/);
        return Math.max(max, match ? Number(match[1]) : 0);
      }, 0) + 1;

  return `${prefix}-${String(nextNumber).padStart(3, "0")}`;
}

function App() {
  const storageKeys = React.useMemo(
    () => ({
      accounts: "apg-order.accounts",
      orders: "apg-order.orders",
      customers: "apg-order.customers",
      batches: "apg-order.batches",
      inventory: "apg-order.inventory",
      transactions: "apg-order.transactions",
      tasks: "apg-order.tasks",
      currentAccountId: "apg-order.currentAccountId",
      sessionToken: "apg-order.sessionToken"
    }),
    []
  );

  const [accounts, setAccounts] = useStoredState(storageKeys.accounts, initialAccounts);
  const [orders, setOrders] = useStoredState(storageKeys.orders, [], normalizeOrders);
  const [customers, setCustomers] = useStoredState(storageKeys.customers, [], normalizeCustomers);
  const [batches, setBatches] = useStoredState(storageKeys.batches, []);
  const [inventory, setInventory] = useStoredState(storageKeys.inventory, []);
  const [transactions, setTransactions] = useStoredState(storageKeys.transactions, []);
  const [tasks, setTasks] = useStoredState(storageKeys.tasks, []);
  const [currentAccountId, setCurrentAccountId] = useStoredState(storageKeys.currentAccountId, null);
  const [sessionToken, setSessionToken] = useStoredState(storageKeys.sessionToken, null);

  const [activeView, setActiveView] = React.useState("overview");
  const [loginForm, setLoginForm] = React.useState({ username: "", password: "" });
  const [loginError, setLoginError] = React.useState("");
  const [syncStatus, setSyncStatus] = React.useState("local");
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [batchFilter, setBatchFilter] = React.useState("all");
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");
  const [modal, setModal] = React.useState(null);
  const [draft, setDraft] = React.useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [buyingFocusBatchId, setBuyingFocusBatchId] = React.useState("all");
  const deferredQuery = React.useDeferredValue(query);
  const hydratedFromServerRef = React.useRef(false);
  const lastSyncedPayloadRef = React.useRef("");

  const activeAccount = accounts.find((account) => account.id === currentAccountId) ?? accounts[0];
  const canSeeProfit = activeAccount?.role === "admin" || activeAccount?.role === "general_manager";
  const canManageUsers = activeAccount?.id === "ryan";

  const knownDemoOrderIds = React.useMemo(
    () => new Set(["AU-260503-014", "AU-260503-013", "AU-260502-011", "AU-260502-009", "AU-260501-006", "AU-260430-003"]),
    []
  );
  const knownDemoBatchIds = React.useMemo(() => new Set(["batch-260508", "batch-260512", "batch-260515"]), []);
  const knownDemoStockIds = React.useMemo(() => new Set(["VN-AESOP-HW-500", "VN-CW-VIT-D3", "VN-RMW-BOOT-42", "VN-APPLE-WATCH10"]), []);
  const knownDemoTaskIds = React.useMemo(() => new Set(["task-dyson-quote", "task-melbourne-cash", "task-vip-bag-color"]), []);

  function cleanServerState(state) {
    return {
      ...state,
      orders: normalizeOrders(stripDemo(state.orders, knownDemoOrderIds)),
      customers: normalizeCustomers(state.customers),
      batches: stripDemo(state.batches, knownDemoBatchIds),
      inventory: stripDemo(state.inventory, knownDemoStockIds, "sku"),
      tasks: stripDemo(state.tasks, knownDemoTaskIds)
    };
  }

  function applyServerState(serverState) {
    if (!serverState) return;
    const clean = cleanServerState(serverState);
    hydratedFromServerRef.current = false;
    if (Array.isArray(clean.accounts) && clean.accounts.length) setAccounts(clean.accounts);
    if (Array.isArray(clean.orders)) setOrders(clean.orders);
    if (Array.isArray(clean.customers)) setCustomers(clean.customers);
    if (Array.isArray(clean.batches)) setBatches(clean.batches);
    if (Array.isArray(clean.inventory)) setInventory(clean.inventory);
    if (Array.isArray(clean.transactions)) setTransactions(clean.transactions);
    if (Array.isArray(clean.tasks)) setTasks(clean.tasks);
    lastSyncedPayloadRef.current = stableJson({ accounts: clean.accounts, orders: clean.orders, customers: clean.customers, batches: clean.batches, inventory: clean.inventory, transactions: clean.transactions, tasks: clean.tasks });
    window.setTimeout(() => {
      hydratedFromServerRef.current = true;
    }, 0);
  }

  React.useEffect(() => {
    if (!sessionToken || !currentAccountId) return;
    let ignore = false;
    fetch("/api/state", { headers: { Authorization: `Bearer ${sessionToken}` } })
      .then((response) => {
        if (response.status === 401) throw new Error("session expired");
        if (!response.ok) throw new Error("state fetch failed");
        return response.json();
      })
      .then((data) => {
        if (ignore) return;
        applyServerState(data.state);
        setSyncStatus("cloud");
      })
      .catch((error) => {
        if (ignore) return;
        setSyncStatus("local");
        hydratedFromServerRef.current = true;
        if (error.message === "session expired") {
          setSessionToken(null);
          setCurrentAccountId(null);
          setLoginError("Phiên đăng nhập đã hết hạn, đăng nhập lại để sync cloud.");
        }
      });
    return () => {
      ignore = true;
    };
  }, [sessionToken, currentAccountId]);

  React.useEffect(() => {
    if (!sessionToken || !currentAccountId) return;
    if (!hydratedFromServerRef.current) return;
    const payload = { accounts, orders, customers, batches, inventory, transactions, tasks };
    const payloadText = stableJson(payload);
    if (!payloadText || payloadText === lastSyncedPayloadRef.current) return;
    const timeout = window.setTimeout(() => {
      setSyncStatus("syncing");
      fetch("/api/state", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ state: payload })
      })
        .then((response) => {
          if (response.status === 401) throw new Error("session expired");
          if (!response.ok) throw new Error("state sync failed");
          lastSyncedPayloadRef.current = payloadText;
          setSyncStatus("cloud");
        })
        .catch((error) => {
          setSyncStatus("local");
          if (error.message === "session expired") {
            setSessionToken(null);
            setCurrentAccountId(null);
            setLoginError("Phiên đăng nhập đã hết hạn, đăng nhập lại để sync cloud.");
          }
        });
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [sessionToken, currentAccountId, accounts, orders, customers, batches, inventory, transactions, tasks]);

  const filteredOrders = React.useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return orders.filter((order) => {
      const text = `${order.id} ${order.customer} ${order.phone} ${order.product} ${order.source} ${order.productUrl} ${order.splitBill ? "tach bill tách bill split bill" : ""} ${order.splitBillNote}`.toLowerCase();
      const matchesQuery = text.includes(normalizedQuery);
      const matchesStatus = statusFilter === "all" || normalizeOrderStatus(order.status) === statusFilter;
      const matchesBatch = batchFilter === "all" || order.batchId === batchFilter;
      const matchesFrom = !dateFrom || String(order.orderDate || "") >= dateFrom;
      const matchesTo = !dateTo || String(order.orderDate || "") <= dateTo;
      return matchesQuery && matchesStatus && matchesBatch && matchesFrom && matchesTo;
    });
  }, [orders, deferredQuery, statusFilter, batchFilter, dateFrom, dateTo]);

  const totals = React.useMemo(() => {
    return orders.reduce(
      (sum, order) => {
        const finance = orderFinance(order);
        sum.revenue += finance.totalThuVnd;
        sum.deposit += finance.depositVnd;
        sum.remaining += finance.remainingVnd;
        sum.cost += finance.totalCostVnd;
        sum.extraFees += money(order.extraFeeVnd);
        sum.profit += finance.profitVnd;
        return sum;
      },
      { revenue: 0, deposit: 0, remaining: 0, cost: 0, extraFees: 0, profit: 0 }
    );
  }, [orders]);

  function getAccount(id) {
    return accounts.find((account) => account.id === id) ?? accounts[0];
  }

  function getBatch(id) {
    return batches.find((batch) => batch.id === id);
  }

  function upsertCustomerFromOrder(order) {
    const name = String(order.customer || "").trim();
    if (!name) return;
    setCustomers((current) => {
      const existing = current.find((customer) => customer.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        return current.map((customer) =>
          customer.id === existing.id
            ? {
                ...customer,
                phone: order.phone || customer.phone,
                tier: normalizeCustomerTier(order.customerTier || customer.tier)
              }
            : customer
        );
      }
      return [
        ...current,
        {
          id: makeId("CUS"),
          name,
          phone: order.phone || "",
          tier: normalizeCustomerTier(order.customerTier),
          note: ""
        }
      ];
    });
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      if (!response.ok) throw new Error("login failed");
      const data = await response.json();
      setSessionToken(data.token);
      setCurrentAccountId(data.account.id);
      setLoginError("");
      applyServerState(data.state);
      setSyncStatus("cloud");
    } catch {
      setLoginError("Sai username/password hoặc server chưa sẵn sàng.");
      setSyncStatus("local");
    }
  }

  function handleLogout() {
    if (sessionToken) {
      fetch("/api/logout", { method: "POST", headers: { Authorization: `Bearer ${sessionToken}` } }).catch(() => {});
    }
    setSessionToken(null);
    setCurrentAccountId(null);
    setModal(null);
    setIsSettingsOpen(false);
  }

  function openOrder(order = null) {
    const defaultDate = order?.orderDate ?? today();
    const autoBatch = order ? null : autoBatchForOrder(batches, defaultDate);
    const defaultBatchId = order?.batchId ?? autoBatch?.id ?? "";
    const defaultBatch = batches.find((batch) => batch.id === defaultBatchId);
    setDraft({
      ...emptyOrder,
      id: order?.id ?? generateOrderCode({ orderDate: defaultDate, batchId: defaultBatchId }, defaultBatch, orders),
      orderDate: defaultDate,
      batchId: defaultBatchId,
      supervisorId: order?.supervisorId ?? "ryan",
      assigneeId: order?.assigneeId ?? "staff-vn",
      buyerId: order?.buyerId ?? "staff-vn",
      ...normalizeOrder(order),
      customerTier: normalizeCustomerTier(order?.customerTier)
    });
    setModal("order");
  }

  function saveOrder(event) {
    event.preventDefault();
    const nextOrder = normalizeOrder({
      ...draft,
      id: getOrderId(draft),
      quantity: Math.max(1, Number(draft.quantity || 1)),
      weightKg: Math.max(0, Number(draft.weightKg || 0)),
      finalWeightRateVnd: Math.max(0, Number(draft.finalWeightRateVnd || defaultFinalWeightRateVnd)),
      customerTier: normalizeCustomerTier(draft.customerTier)
    });
    setOrders((current) => {
      const exists = current.some((order) => order.id === nextOrder.id);
      return exists ? current.map((order) => (order.id === nextOrder.id ? nextOrder : order)) : [nextOrder, ...current];
    });
    upsertCustomerFromOrder(nextOrder);
    setModal(null);
  }

  function deleteOrder(id) {
    setOrders((current) => current.filter((order) => order.id !== id));
    setTransactions((current) => current.filter((item) => item.orderId !== id));
    setTasks((current) => current.filter((item) => item.linkedOrderId !== id));
    setModal(null);
  }

  function updateOrderStatus(id, status) {
    setOrders((current) => current.map((order) => (order.id === id ? normalizeOrder({ ...order, status }) : order)));
  }

  function openBuyingChecklist(batchId = "all") {
    setBuyingFocusBatchId(batchId || "all");
    setActiveView("buying");
  }

  function openBatch(batch = null) {
    setDraft({ ...emptyBatch, id: batch?.id ?? makeId("DOT"), code: batch?.code ?? "", ...batch });
    setModal("batch");
  }

  function saveBatch(event) {
    event.preventDefault();
    const code = draft.code || draft.id;
    const nextBatch = { ...draft, id: draft.id || makeId("DOT"), code };
    setBatches((current) => {
      const exists = current.some((batch) => batch.id === nextBatch.id);
      return exists ? current.map((batch) => (batch.id === nextBatch.id ? nextBatch : batch)) : [nextBatch, ...current];
    });
    setModal(null);
  }

  function deleteBatch(id) {
    setOrders((current) => current.map((order) => (order.batchId === id ? { ...order, batchId: "" } : order)));
    setBatches((current) => current.filter((batch) => batch.id !== id));
    setModal(null);
  }

  function openStock(item = null) {
    setDraft({ ...emptyStock, sku: item?.sku ?? makeId("SKU"), ...item });
    setModal("stock");
  }

  function saveStock(event) {
    event.preventDefault();
    const nextItem = { ...draft, sku: draft.sku || makeId("SKU") };
    setInventory((current) => {
      const exists = current.some((item) => item.sku === nextItem.sku);
      return exists ? current.map((item) => (item.sku === nextItem.sku ? nextItem : item)) : [nextItem, ...current];
    });
    setModal(null);
  }

  function deleteStock(sku) {
    setInventory((current) => current.filter((item) => item.sku !== sku));
    setModal(null);
  }

  function openTransaction(item = null) {
    setDraft({ ...emptyTransaction, id: item?.id ?? makeId("TX"), date: item?.date ?? today(), ...item });
    setModal("transaction");
  }

  function saveTransaction(event) {
    event.preventDefault();
    const nextItem = { ...draft, id: draft.id || makeId("TX") };
    setTransactions((current) => {
      const exists = current.some((item) => item.id === nextItem.id);
      return exists ? current.map((item) => (item.id === nextItem.id ? nextItem : item)) : [nextItem, ...current];
    });
    setModal(null);
  }

  function deleteTransaction(id) {
    setTransactions((current) => current.filter((item) => item.id !== id));
    setModal(null);
  }

  function openCustomer(customer = null) {
    setDraft({ id: customer?.id ?? makeId("CUS"), name: "", phone: "", tier: "Customer", note: "", ...customer });
    setModal("customer");
  }

  function saveCustomer(event) {
    event.preventDefault();
    const nextCustomer = normalizeCustomer({ ...draft, id: draft.id || makeId("CUS") });
    setCustomers((current) => {
      const exists = current.some((customer) => customer.id === nextCustomer.id);
      return exists ? current.map((customer) => (customer.id === nextCustomer.id ? nextCustomer : customer)) : [nextCustomer, ...current];
    });
    setModal(null);
  }

  function deleteCustomer(id) {
    setCustomers((current) => current.filter((customer) => customer.id !== id));
    setModal(null);
  }

  function openTask(task = null) {
    setDraft({ ...emptyTask, id: task?.id ?? makeId("TASK"), dueDate: task?.dueDate ?? today(), ...task });
    setModal("task");
  }

  function saveTask(event) {
    event.preventDefault();
    const nextTask = { ...draft, id: draft.id || makeId("TASK") };
    setTasks((current) => {
      const exists = current.some((task) => task.id === nextTask.id);
      return exists ? current.map((task) => (task.id === nextTask.id ? nextTask : task)) : [nextTask, ...current];
    });
    setModal(null);
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
    setModal(null);
  }

  function saveAccount(accountId, nextAccount) {
    if (!canManageUsers) return;
    setAccounts((current) =>
      current.map((account) =>
        account.id === accountId
          ? {
              ...account,
              ...nextAccount,
              username: account.id === "ryan" ? account.username : nextAccount.username,
              label: roleLabel(nextAccount.role || account.role),
              initials: String(nextAccount.initials || "").toUpperCase()
            }
          : account
      )
    );
  }

  function createAccount(event) {
    event.preventDefault();
    if (!canManageUsers) return;
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") || "").trim();
    if (!username || !form.get("password")) return;
    setAccounts((current) => [
      ...current,
      {
        id: makeId("USER"),
        username,
        password: String(form.get("password")),
        displayName: String(form.get("displayName") || username),
        role: String(form.get("role") || "staff"),
        label: roleLabel(String(form.get("role") || "staff")),
        color: String(form.get("color") || "#11664f"),
        initials: normalizeInitials(String(form.get("displayName") || username)),
        avatarUrl: "",
        active: true
      }
    ]);
    event.currentTarget.reset();
  }

  function removeAccount(accountId) {
    if (!canManageUsers) return;
    if (accountId === "ryan" || accountId === currentAccountId) return;
    setAccounts((current) => current.filter((account) => account.id !== accountId));
  }

  if (!currentAccountId) {
    return (
      <div className="login-page">
        <form className="login-panel" onSubmit={handleLogin}>
          <div className="brand login-brand">
            <div className="brand-mark">
              <Gem size={22} />
            </div>
            <div>
              <p>Australia Pacific</p>
              <span>Group Order</span>
            </div>
          </div>
          <div>
            <span className="eyebrow">Secure workspace</span>
            <h1>Australia Pacific Group Order</h1>
          </div>
          <div className="login-fields">
            <label>
              Username
              <input value={loginForm.username} onChange={(event) => setLoginForm({ ...loginForm, username: event.target.value })} placeholder="Username" />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                placeholder="Password"
              />
            </label>
          </div>
          {loginError && <p className="login-error">{loginError}</p>}
          <button className="primary-button" type="submit">
            <LockKeyhole size={17} />
            Đăng nhập
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Gem size={22} />
          </div>
          <div>
            <p>Australia Pacific</p>
            <span>Group Order</span>
          </div>
        </div>
        <nav className="nav-list" aria-label="Điều hướng">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button className={activeView === id ? "nav-item active" : "nav-item"} key={id} onClick={() => setActiveView(id)} type="button">
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">{syncStatus === "cloud" ? "Cloud sync" : syncStatus === "syncing" ? "Đang sync" : "Local mode"}</span>
            <h1>{navItems.find((item) => item.id === activeView)?.label ?? "Tổng quan"}</h1>
          </div>
          <div className="top-actions">
            <div className="account-chip">
              <AccountAvatar account={activeAccount} />
              <div>
                <strong>{activeAccount.username}</strong>
                <span>{activeAccount.label}</span>
              </div>
            </div>
            {canManageUsers && (
              <button className="icon-button" aria-label="Cài đặt user" onClick={() => setIsSettingsOpen(true)}>
                <Settings size={18} />
              </button>
            )}
            <button className="icon-button" aria-label="Đăng xuất" onClick={handleLogout}>
              <LogOut size={18} />
            </button>
            <button className="primary-button" onClick={() => openOrder()}>
              <Plus size={18} />
              Thêm đơn
            </button>
          </div>
        </header>

        {activeView === "overview" && (
          <OverviewView
            totals={totals}
            orders={orders}
            filteredOrders={filteredOrders}
            batches={batches}
            query={query}
            setQuery={setQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            batchFilter={batchFilter}
            setBatchFilter={setBatchFilter}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            openOrder={openOrder}
            openBatch={openBatch}
            openBuyingChecklist={openBuyingChecklist}
            updateOrderStatus={updateOrderStatus}
            canSeeProfit={canSeeProfit}
          />
        )}

        {activeView === "orders" && (
          <OrdersView
            orders={filteredOrders}
            allOrders={orders}
            batches={batches}
            customers={customers}
            query={query}
            setQuery={setQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            batchFilter={batchFilter}
            setBatchFilter={setBatchFilter}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
            openOrder={openOrder}
            canSeeProfit={canSeeProfit}
          />
        )}

        {activeView === "buying" && (
          <BuyingChecklistView
            batches={batches}
            orders={orders}
            focusBatchId={buyingFocusBatchId}
            setFocusBatchId={setBuyingFocusBatchId}
            openOrder={openOrder}
            openBatch={openBatch}
            updateOrderStatus={updateOrderStatus}
          />
        )}

        {activeView === "customers" && <CustomersView customers={customers} orders={orders} openCustomer={openCustomer} openOrder={openOrder} />}
        {activeView === "stock" && <StockView inventory={inventory} openStock={openStock} />}
        {activeView === "flights" && (
          <FlightsView
            batches={batches}
            orders={orders}
            openBatch={openBatch}
            openOrder={openOrder}
            openBuyingChecklist={openBuyingChecklist}
            updateOrderStatus={updateOrderStatus}
            canSeeProfit={canSeeProfit}
          />
        )}
        {activeView === "cashflow" && (
          <CashflowView orders={orders} batches={batches} transactions={transactions} openTransaction={openTransaction} openOrder={openOrder} canSeeProfit={canSeeProfit} />
        )}
        {activeView === "tasks" && <TasksView tasks={tasks} accounts={accounts} orders={orders} batches={batches} openTask={openTask} />}
      </main>

      {isSettingsOpen && canManageUsers && (
        <SettingsModal
          accounts={accounts}
          currentAccountId={currentAccountId}
          saveAccount={saveAccount}
          removeAccount={removeAccount}
          createAccount={createAccount}
          close={() => setIsSettingsOpen(false)}
        />
      )}

      {modal === "order" && (
        <OrderModal
          draft={draft}
          setDraft={setDraft}
          batches={batches}
          accounts={accounts}
          customers={customers}
          orders={orders}
          sessionToken={sessionToken}
          save={saveOrder}
          remove={deleteOrder}
          close={() => setModal(null)}
        />
      )}
      {modal === "batch" && (
        <BatchModal
          draft={draft}
          setDraft={setDraft}
          orders={orders}
          openOrder={openOrder}
          updateOrderStatus={updateOrderStatus}
          save={saveBatch}
          remove={deleteBatch}
          close={() => setModal(null)}
        />
      )}
      {modal === "stock" && <StockModal draft={draft} setDraft={setDraft} accounts={accounts} save={saveStock} remove={deleteStock} close={() => setModal(null)} />}
      {modal === "transaction" && (
        <TransactionModal draft={draft} setDraft={setDraft} orders={orders} batches={batches} save={saveTransaction} remove={deleteTransaction} close={() => setModal(null)} />
      )}
      {modal === "customer" && <CustomerModal draft={draft} setDraft={setDraft} save={saveCustomer} remove={deleteCustomer} close={() => setModal(null)} />}
      {modal === "task" && <TaskModal draft={draft} setDraft={setDraft} accounts={accounts} orders={orders} save={saveTask} remove={deleteTask} close={() => setModal(null)} />}
    </div>
  );
}

function AccountAvatar({ account }) {
  if (account?.avatarUrl) {
    return (
      <span className="account-avatar image-avatar" style={{ background: account?.color ?? "#11664f" }}>
        <img src={account.avatarUrl} alt={account?.displayName || account?.username || "User avatar"} />
      </span>
    );
  }

  return (
    <span className="account-avatar" style={{ background: account?.color ?? "#11664f" }}>
      {account?.initials || normalizeInitials(account?.displayName || account?.username || "U")}
    </span>
  );
}

function Kpi({ label, value, icon: Icon, tone }) {
  return (
    <div className={`metric-card ${tone ?? ""}`}>
      <div className="metric-icon">
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FilterBar({ query, setQuery, statusFilter, setStatusFilter, batchFilter, setBatchFilter, batches, dateFrom, setDateFrom, dateTo, setDateTo }) {
  return (
    <section className="filter-panel">
      <div className="search-box">
        <Search size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm tên khách, SĐT, mã đơn, sản phẩm..." />
      </div>
      <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
        <option value="all">Tất cả tình trạng</option>
        {orderStatuses.map((status) => (
          <option value={status.id} key={status.id}>
            {status.label}
          </option>
        ))}
      </select>
      <select value={batchFilter} onChange={(event) => setBatchFilter(event.target.value)}>
        <option value="all">Tất cả chuyến bay</option>
        {batches.map((batch) => (
          <option value={batch.id} key={batch.id}>
            {batch.code || batch.id}
          </option>
        ))}
      </select>
      <input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} />
      <input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} />
    </section>
  );
}

function OverviewView(props) {
  const { totals, orders, filteredOrders, batches, openOrder, openBatch, openBuyingChecklist, updateOrderStatus, canSeeProfit } = props;
  const flightTimeline = batches
    .map((batch) => {
      const batchOrders = orders.filter((order) => order.batchId === batch.id);
      const remaining = batchOrders.reduce((sum, order) => sum + orderFinance(order).remainingVnd, 0);
      const revenue = batchOrders.reduce((sum, order) => sum + orderFinance(order).totalThuVnd, 0);
      const stage = flightTimelineStage(batch);
      return { batch, batchOrders, remaining, revenue, stage };
    })
    .filter((item) => item.stage.tone !== "done")
    .sort((a, b) => String(a.stage.sortDate || "9999-12-31").localeCompare(String(b.stage.sortDate || "9999-12-31")))
    .slice(0, 10);

  return (
    <div className="screen-stack">
      <FilterBar {...props} />
      <div className="overview-top-grid">
        <section className="metric-grid lean">
          <Kpi label="Tổng thu / Doanh số" value={vnd(totals.revenue)} icon={WalletCards} />
          <Kpi label="Đã cọc / đã thu" value={vnd(totals.deposit)} icon={ShieldCheck} />
          <Kpi label="Còn phải thu" value={vnd(totals.remaining)} icon={CreditCard} tone="warning" />
          <Kpi label="Tổng chi phí" value={vnd(totals.cost)} icon={Boxes} />
          {canSeeProfit && <Kpi label="Lãi dự kiến" value={vnd(totals.profit)} icon={Gem} tone="success" />}
        </section>
        <OverviewBuyingBoard
          batches={batches}
          orders={orders}
          openOrder={openOrder}
          openBuyingChecklist={openBuyingChecklist}
          updateOrderStatus={updateOrderStatus}
        />
      </div>

      <section className="panel flight-timeline-panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Flight control</span>
            <h2>Timeline chuyến bay</h2>
          </div>
          <Plane size={18} />
        </div>
        <div className="flight-timeline">
          {flightTimeline.map(({ batch, batchOrders, remaining, revenue, stage }) => (
            <button className={`flight-stop ${stage.tone}`} key={batch.id} onClick={() => openBatch(batch)}>
              <span className="flight-line" />
              <span className="flight-dot" />
              <div className="flight-card-head">
                <strong>{batch.code || batch.id}</strong>
                <em>{stage.label}</em>
              </div>
              <div className="flight-card-date">
                <span>{dateLabel(stage.focusDate)}</span>
                <strong>{stage.focusDate || "-"}</strong>
              </div>
              <div className="flight-card-meta">
                <span>{batchOrders.length} đơn</span>
                <span>Bay: {batch.departure || "-"}</span>
                <span>Về VN: {batch.arrival || "-"}</span>
              </div>
              <div className="flight-card-money">
                <span>Tổng thu {vnd(revenue)}</span>
                <strong>Còn thu {vnd(remaining)}</strong>
              </div>
            </button>
          ))}
          {!flightTimeline.length && (
            <EmptyState
              title="Chưa có chuyến bay sắp tới"
              body="Vào tab Chuyến bay tạo lịch bay, nhập ngày cutoff, ngày bay và ngày về VN để Tổng quan tự lên timeline."
            />
          )}
        </div>
      </section>

      <PackingListSummary
        title="Packing list chuyến bay"
        eyebrow="Flight packing"
        batches={batches}
        orders={orders}
        openBuyingChecklist={openBuyingChecklist}
      />

      <section className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Order board</span>
            <h2>Đơn cần quản lý</h2>
          </div>
          <button className="primary-button" onClick={() => openOrder()}>
            <Plus size={17} />
            Thêm đơn
          </button>
        </div>
        <OrdersTable orders={filteredOrders.slice(0, 10)} batches={batches} openOrder={openOrder} compact canSeeProfit={canSeeProfit} />
      </section>

    </div>
  );
}

function OverviewBuyingBoard({ batches, orders, openOrder, openBuyingChecklist, updateOrderStatus }) {
  const nearestBatch = autoBatchForOrder(batches, today()) ?? sortedFlightBatches(batches)[0];
  const waitingOrders = nearestBatch
    ? orders.filter((order) => order.batchId === nearestBatch.id && normalizeOrderStatus(order.status) === "waiting_buy")
    : [];
  const purchasedOrders = nearestBatch
    ? orders.filter((order) => order.batchId === nearestBatch.id && normalizeOrderStatus(order.status) === "purchased")
    : [];

  return (
    <section className="overview-buying-board">
      <div className="overview-buying-head">
        <div>
          <span className="eyebrow">Quick board</span>
          <h2>Chưa mua chuyến gần nhất</h2>
        </div>
        <button type="button" onClick={() => openBuyingChecklist(nearestBatch?.id || "all")}>Mở</button>
      </div>
      <div className="overview-buying-flight">
        <strong>{nearestBatch ? nearestBatch.code || nearestBatch.id : "Chưa có chuyến"}</strong>
        <span>{nearestBatch ? `Cutoff ${nearestBatch.cutoff || "-"} · Về VN ${nearestBatch.arrival || "-"}` : "Tạo chuyến bay để tự gom đơn cần mua."}</span>
      </div>
      <div className="overview-buying-stats">
        <span>Chờ mua <strong>{waitingOrders.length}</strong></span>
        <span>Đã mua <strong>{purchasedOrders.length}</strong></span>
      </div>
      <div className="overview-buying-list">
        {waitingOrders.slice(0, 3).map((order) => (
          <div className="overview-buying-item" key={order.id} onClick={() => openOrder(order)}>
            <ProductCell order={order} />
            <button type="button" onClick={(event) => { event.stopPropagation(); updateOrderStatus(order.id, "purchased"); }}>Đã mua</button>
          </div>
        ))}
        {!waitingOrders.length && <div className="overview-buying-empty">Chuyến gần nhất không còn đơn chờ mua.</div>}
        {waitingOrders.length > 3 && <button className="overview-buying-more" type="button" onClick={() => openBuyingChecklist(nearestBatch.id)}>Xem thêm {waitingOrders.length - 3} đơn</button>}
      </div>
    </section>
  );
}

function OrdersView(props) {
  return (
    <div className="screen-stack">
      <FilterBar {...props} />
      <div className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Order records</span>
            <h2>Hồ sơ đơn hàng</h2>
          </div>
          <button className="primary-button" onClick={() => props.openOrder()}>
            <Plus size={17} />
            Thêm đơn
          </button>
        </div>
        <OrdersTable orders={props.orders} batches={props.batches} openOrder={props.openOrder} canSeeProfit={props.canSeeProfit} />
      </div>
    </div>
  );
}

function ProductCell({ order }) {
  return (
    <div className="order-product-cell">
      <div className="order-product-thumb">
        {order.productImageUrl ? <img src={productImageSrc(order)} alt={order.product || "Product"} /> : <ImageIcon size={18} />}
      </div>
      <div>
        <strong>{order.product || "Chưa nhập sản phẩm"}</strong>
        <span>SL: {order.quantity} · {money(order.weightKg)}kg</span>
        {order.splitBill && (
          <em className="split-bill-badge">
            Tách bill riêng{order.splitBillNote ? ` · ${order.splitBillNote}` : ""}
          </em>
        )}
      </div>
    </div>
  );
}

function OrdersTable({ orders, batches, openOrder, compact, canSeeProfit }) {
  const rowLimit = compact ? 10 : 120;
  const visibleOrders = orders.slice(0, rowLimit);
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách</th>
            <th>Sản phẩm<br /><span>Số lượng/kg</span></th>
            <th>Tình trạng</th>
            <th>Chuyến bay<br /><span>Deadline mua</span></th>
            <th>Tài chính</th>
          </tr>
        </thead>
        <tbody>
          {visibleOrders.map((order) => {
            const finance = orderFinance(order);
            const batch = batches.find((item) => item.id === order.batchId);
            return (
              <tr key={order.id} className={order.splitBill ? "split-bill-row" : ""} onClick={() => openOrder(order)}>
                <td data-label="Mã đơn"><strong>{order.id}</strong><span>{order.orderDate}</span><span>{order.source}</span></td>
                <td data-label="Khách">{order.customer}<span>{order.phone}</span></td>
                <td data-label="Sản phẩm"><ProductCell order={order} /></td>
                <td data-label="Tình trạng"><span className={`status-chip ${normalizeOrderStatus(order.status)}`}>{statusLabel(order.status)}</span></td>
                <td data-label="Chuyến bay">
                  {batch?.code || "Chưa xếp"}
                  <span>{batch?.cutoff ? `Deadline ${batch.cutoff} (${dateLabel(batch.cutoff)})` : "Chưa có deadline"}</span>
                  <span>{batch?.arrival ? `Về VN ${batch.arrival}` : ""}</span>
                </td>
                <td data-label="Tài chính" className="finance-cell">
                  <strong>{vnd(finance.totalThuVnd)}</strong>
                  <span>Chi phí {vnd(finance.totalCostVnd)}</span>
                  <span>Cọc {vnd(finance.depositVnd)}</span>
                  <span className="money-due">Còn thu {vnd(finance.remainingVnd)}</span>
                  {canSeeProfit && <span>Lãi {vnd(finance.profitVnd)}</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {orders.length > rowLimit && <EmptyState title={`Đang hiện ${rowLimit}/${orders.length} đơn`} body="Dùng tìm kiếm, lọc tình trạng hoặc lọc thời gian để mở đúng nhóm đơn cần xử lý nhanh hơn." />}
      {!orders.length && <EmptyState title="Chưa có đơn hàng" body="Bấm Thêm đơn để nhập đơn thật. Dữ liệu demo đã được bỏ." />}
    </div>
  );
}

function CustomersView({ customers, orders, openCustomer, openOrder }) {
  return (
    <div className="screen-stack">
      <div className="panel-title standalone">
        <div>
          <span className="eyebrow">Customer data</span>
          <h2>Khách hàng</h2>
        </div>
        <button className="primary-button" onClick={() => openCustomer()}>
          <Plus size={17} />
          Thêm khách
        </button>
      </div>
      <div className="customer-tier-grid">
        {customerTiers.map((tier) => (
          <div className="tier-card" key={tier}>
            <span>{tier}</span>
            <strong>{customers.filter((customer) => customer.tier === tier).length}</strong>
          </div>
        ))}
      </div>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Khách</th>
                <th>Hạng</th>
                <th>SĐT</th>
                <th>Số đơn</th>
                <th>Tổng thu</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
                const customerOrders = orders.filter((order) => order.customer.toLowerCase() === customer.name.toLowerCase());
                const revenue = customerOrders.reduce((sum, order) => sum + orderFinance(order).totalThuVnd, 0);
                return (
                  <tr key={customer.id} onClick={() => openCustomer(customer)}>
                    <td data-label="Khách"><strong>{customer.name}</strong></td>
                    <td data-label="Hạng">{customer.tier}</td>
                    <td data-label="SĐT">{customer.phone}</td>
                    <td data-label="Số đơn">{customerOrders.length}</td>
                    <td data-label="Tổng thu">{vnd(revenue)}</td>
                    <td data-label="Ghi chú">{customer.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!customers.length && <EmptyState title="Chưa có khách hàng" body="Khi nhập đơn, khách sẽ tự lưu vào đây và có thể chỉnh hạng Customer/Vip." />}
        </div>
      </div>
    </div>
  );
}

function StockView({ inventory, openStock }) {
  return (
    <div className="screen-stack">
      <div className="panel-title standalone">
        <div>
          <span className="eyebrow">Ready stock</span>
          <h2>Hàng có sẵn</h2>
        </div>
        <button className="primary-button" onClick={() => openStock()}>
          <Plus size={17} />
          Thêm sản phẩm
        </button>
      </div>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Sản phẩm</th>
                <th>Tồn</th>
                <th>Đang giữ</th>
                <th>Có thể bán</th>
                <th>Giá bán</th>
                <th>Kho/điểm giữ</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.sku} onClick={() => openStock(item)}>
                  <td data-label="SKU"><strong>{item.sku}</strong></td>
                  <td data-label="Sản phẩm">{item.name}<span>{item.note}</span></td>
                  <td data-label="Tồn">{item.quantity}</td>
                  <td data-label="Đang giữ">{item.reserved}</td>
                  <td data-label="Có thể bán">{Math.max(money(item.quantity) - money(item.reserved), 0)}</td>
                  <td data-label="Giá bán">{vnd(item.sellVnd)}</td>
                  <td data-label="Kho/điểm giữ">{item.location}</td>
                  <td data-label="Tình trạng">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!inventory.length && <EmptyState title="Chưa có hàng có sẵn" body="Bấm Thêm sản phẩm để nhập tồn kho bán ngay tại VN." />}
        </div>
      </div>
    </div>
  );
}

function flightOrderProgress(batchOrders) {
  return batchOrders.reduce(
    (sum, order) => {
      const status = normalizeOrderStatus(order.status);
      sum.total += 1;
      if (status === "waiting_buy") sum.waitingBuy += 1;
      if (status === "purchased") sum.purchased += 1;
      if (status === "sent_vn") sum.sentVn += 1;
      if (status === "received_vn") sum.receivedVn += 1;
      if (status === "delivered") sum.delivered += 1;
      if (status === "cancelled") sum.cancelled += 1;
      return sum;
    },
    { total: 0, waitingBuy: 0, purchased: 0, sentVn: 0, receivedVn: 0, delivered: 0, cancelled: 0 }
  );
}

function sortedFlightBatches(batches) {
  return [...batches].sort((a, b) => String(a.departure || a.arrival || "").localeCompare(String(b.departure || b.arrival || "")));
}

const packingWorkflowStatuses = [
  { id: "waiting_buy", label: "Chờ mua", hint: "Cần buyer xử lý", tone: "warn" },
  { id: "purchased", label: "Đã mua", hint: "Chờ gom/gửi về VN", tone: "ready" },
  { id: "sent_vn", label: "Đã gửi về VN", hint: "Theo dõi hàng bay", tone: "flying" },
  { id: "received_vn", label: "Đã nhận ở VN", hint: "Chờ giao khách", tone: "arrived" }
];

function PackingListSummary({ title, eyebrow, batches, orders, openBuyingChecklist }) {
  const summaryBatches = sortedFlightBatches(batches)
    .map((batch) => {
      const batchOrders = orders.filter((order) => order.batchId === batch.id);
      const progress = flightOrderProgress(batchOrders);
      return { batch, progress };
    })
    .filter(({ progress }) => progress.total > 0 || batches.length <= 6)
    .slice(0, 6);
  const unassignedOrders = orders.filter((order) => !order.batchId && normalizeOrderStatus(order.status) !== "cancelled");

  return (
    <section className="panel packing-list-panel">
      <div className="panel-title">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <button className="ghost-button" type="button" onClick={() => openBuyingChecklist("all")}>
          <PackageCheck size={16} />
          Mở checklist
        </button>
      </div>
      <div className="packing-list-grid">
        {summaryBatches.map(({ batch, progress }) => (
          <button className="packing-list-card" type="button" key={batch.id} onClick={() => openBuyingChecklist(batch.id)}>
            <div className="packing-card-head">
              <strong>{batch.code || batch.id}</strong>
              <em className={progress.waitingBuy ? "warn" : "ok"}>{progress.waitingBuy ? `Thiếu ${progress.waitingBuy}` : "Đủ mua"}</em>
            </div>
            <span>Về VN {batch.arrival || "-"} · Cutoff {batch.cutoff || "-"}</span>
            <div className="packing-card-stats">
              <span>Chờ mua <strong>{progress.waitingBuy}</strong></span>
              <span>Đã mua <strong>{progress.purchased}</strong></span>
              <span>Đã gửi <strong>{progress.sentVn}</strong></span>
              <span>Đã nhận <strong>{progress.receivedVn}</strong></span>
            </div>
          </button>
        ))}
        {unassignedOrders.length > 0 && (
          <button className="packing-list-card unassigned" type="button" onClick={() => openBuyingChecklist("unassigned")}>
            <div className="packing-card-head">
              <strong>Chưa xếp chuyến</strong>
              <em className="warn">{unassignedOrders.length} đơn</em>
            </div>
            <span>Cần gán vào chuyến bay trước khi chốt đợt.</span>
            <div className="packing-card-stats">
              <span>Chờ xử lý <strong>{unassignedOrders.length}</strong></span>
              <span>Ưu tiên <strong>{unassignedOrders.filter((order) => normalizeOrderStatus(order.status) === "waiting_buy").length}</strong></span>
            </div>
          </button>
        )}
        {!summaryBatches.length && !unassignedOrders.length && (
          <EmptyState title="Chưa có packing list" body="Tạo chuyến bay và gán đơn vào chuyến, packing list sẽ tự hiện để bấm xử lý nhanh." />
        )}
      </div>
    </section>
  );
}

function BuyingChecklistView({ batches, orders, focusBatchId, setFocusBatchId, openOrder, openBatch, updateOrderStatus }) {
  const sortedBatches = sortedFlightBatches(batches);
  const unassignedOrders = orders.filter((order) => !order.batchId && normalizeOrderStatus(order.status) !== "cancelled");
  const visibleBatches = focusBatchId === "all" || focusBatchId === "unassigned" ? sortedBatches : sortedBatches.filter((batch) => batch.id === focusBatchId);
  const visibleUnassigned = focusBatchId === "all" || focusBatchId === "unassigned" ? unassignedOrders : [];
  const allVisibleOrders = [...visibleBatches.flatMap((batch) => orders.filter((order) => order.batchId === batch.id)), ...visibleUnassigned];
  const activeWorkflowOrders = allVisibleOrders.filter((order) => packingWorkflowStatuses.some((status) => status.id === normalizeOrderStatus(order.status)));
  const progress = flightOrderProgress(allVisibleOrders);

  return (
    <div className="screen-stack">
      <div className="panel-title standalone">
        <div>
          <span className="eyebrow">Fulfillment workflow</span>
          <h2>Mua hàng & Packing</h2>
        </div>
        <button className="primary-button" onClick={() => openBatch()}>
          <Plus size={17} />
          Thêm chuyến
        </button>
      </div>
      <section className="metric-grid lean">
        <Kpi label="Việc đang mở" value={String(activeWorkflowOrders.length)} icon={ClipboardList} />
        <Kpi label="Chờ mua" value={String(progress.waitingBuy)} icon={PackageCheck} tone={progress.waitingBuy ? "warning" : "success"} />
        <Kpi label="Đã mua chưa gửi" value={String(progress.purchased)} icon={CheckCircle2} />
        <Kpi label="Đang về VN" value={String(progress.sentVn)} icon={Plane} />
        <Kpi label="Chờ giao khách" value={String(progress.receivedVn)} icon={Boxes} />
      </section>
      <section className="panel buying-filter-panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Packing scope</span>
            <h2>Chọn chuyến để kiểm hàng</h2>
          </div>
        </div>
        <div className="buying-scope-list">
          <button className={focusBatchId === "all" ? "active" : ""} type="button" onClick={() => setFocusBatchId("all")}>Tất cả</button>
          {sortedBatches.map((batch) => (
            <button className={focusBatchId === batch.id ? "active" : ""} type="button" key={batch.id} onClick={() => setFocusBatchId(batch.id)}>
              {batch.code || batch.id}
            </button>
          ))}
          {unassignedOrders.length > 0 && (
            <button className={focusBatchId === "unassigned" ? "active" : ""} type="button" onClick={() => setFocusBatchId("unassigned")}>
              Chưa xếp chuyến ({unassignedOrders.length})
            </button>
          )}
        </div>
      </section>
      <PackingWorkflowBoard
        orders={activeWorkflowOrders}
        batches={batches}
        openOrder={openOrder}
        updateOrderStatus={updateOrderStatus}
      />
    </div>
  );
}

function PackingWorkflowBoard({ orders, batches, openOrder, updateOrderStatus }) {
  return (
    <section className="panel workflow-panel">
      <div className="panel-title">
        <div>
          <span className="eyebrow">Action queue</span>
          <h2>Việc mua hàng & packing đang mở</h2>
        </div>
        <PackageCheck size={18} />
      </div>
      <div className="workflow-board">
        {packingWorkflowStatuses.map((column) => {
          const columnOrders = orders.filter((order) => normalizeOrderStatus(order.status) === column.id);
          return (
            <section className={`workflow-column ${column.tone}`} key={column.id}>
              <div className="workflow-column-head">
                <div>
                  <strong>{column.label}</strong>
                  <span>{column.hint}</span>
                </div>
                <em>{columnOrders.length}</em>
              </div>
              <div className="workflow-card-list">
                {columnOrders.map((order) => {
                  const batch = batches.find((item) => item.id === order.batchId);
                  return (
                    <article className="workflow-card" key={order.id} onClick={() => openOrder(order)}>
                      <ProductCell order={order} />
                      <div className="workflow-card-meta">
                        <strong>{order.id}</strong>
                        <span>{order.customer || "-"} · SL {order.quantity} · {money(order.weightKg)}kg</span>
                        <span>{batch ? `${batch.code || batch.id} · về VN ${batch.arrival || "-"}` : "Chưa xếp chuyến"}</span>
                      </div>
                      <FlightOrderQuickActions order={order} openOrder={openOrder} updateOrderStatus={updateOrderStatus} />
                    </article>
                  );
                })}
                {!columnOrders.length && <div className="workflow-empty">Không có việc ở cột này.</div>}
              </div>
            </section>
          );
        })}
      </div>
      {!orders.length && <EmptyState title="Không có việc mua hàng/packing đang mở" body="Các đơn mới cần mua, đã mua, đang gửi hoặc đã nhận sẽ hiện ở đây theo từng trạng thái." />}
    </section>
  );
}

function FlightsView({ batches, orders, openBatch, openOrder, openBuyingChecklist, updateOrderStatus, canSeeProfit }) {
  const upcomingBatches = sortedFlightBatches(batches);
  const unassignedOrders = orders.filter((order) => !order.batchId && normalizeOrderStatus(order.status) !== "cancelled");
  const totals = batches.reduce(
    (sum, batch) => {
      const batchOrders = orders.filter((order) => order.batchId === batch.id);
      const progress = flightOrderProgress(batchOrders);
      sum.orders += batchOrders.length;
      sum.waitingBuy += progress.waitingBuy;
      sum.purchased += progress.purchased;
      sum.sentVn += progress.sentVn;
      sum.freightAud += money(batch.freightAud);
      sum.remaining += batchOrders.reduce((orderSum, order) => orderSum + orderFinance(order).remainingVnd, 0);
      sum.revenue += batchOrders.reduce((orderSum, order) => orderSum + orderFinance(order).totalThuVnd, 0);
      sum.cost += batchOrders.reduce((orderSum, order) => orderSum + orderFinance(order).totalCostVnd, 0);
      return sum;
    },
    { orders: 0, waitingBuy: 0, purchased: 0, sentVn: 0, freightAud: 0, remaining: 0, revenue: 0, cost: 0 }
  );

  return (
    <div className="screen-stack">
      <div className="panel-title standalone">
        <div>
          <span className="eyebrow">Upcoming flights</span>
          <h2>Chuyến bay & đợt hàng sắp tới</h2>
        </div>
        <button className="primary-button" onClick={() => openBatch()}>
          <Plus size={17} />
          Thêm chuyến
        </button>
      </div>

      <section className="metric-grid lean">
        <Kpi label="Số chuyến" value={String(batches.length)} icon={Plane} />
        <Kpi label="Order đã link" value={String(totals.orders)} icon={ClipboardList} />
        <Kpi label="Còn thiếu/chờ mua" value={String(totals.waitingBuy)} icon={PackageCheck} tone={totals.waitingBuy ? "warning" : "success"} />
        <Kpi label="Đã mua chưa gửi" value={String(totals.purchased)} icon={CheckCircle2} />
        <Kpi label="Chưa xếp chuyến" value={String(unassignedOrders.length)} icon={Filter} tone={unassignedOrders.length ? "warning" : ""} />
        <Kpi label="Cước bay AUD" value={aud(totals.freightAud)} icon={CreditCard} />
        <Kpi label="Còn phải thu" value={vnd(totals.remaining)} icon={WalletCards} tone="warning" />
        {canSeeProfit && <Kpi label="Lãi theo chuyến" value={vnd(totals.revenue - totals.cost)} icon={Gem} tone="success" />}
      </section>

      <PackingListSummary
        title="Packing list theo chuyến"
        eyebrow="Flight packing"
        batches={batches}
        orders={orders}
        openBuyingChecklist={openBuyingChecklist}
      />

      <div className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Linked flight table</span>
            <h2>Bảng quản lý chuyến bay</h2>
          </div>
          <Plane size={18} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Chuyến/đợt</th>
                <th>Trạng thái</th>
                <th>Lịch bay</th>
                <th>Order</th>
                <th>Tiến độ hàng</th>
                <th>Tài chính</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {upcomingBatches.map((batch) => {
                const batchOrders = orders.filter((order) => order.batchId === batch.id);
                const progress = flightOrderProgress(batchOrders);
                const revenue = batchOrders.reduce((sum, order) => sum + orderFinance(order).totalThuVnd, 0);
                const remaining = batchOrders.reduce((sum, order) => sum + orderFinance(order).remainingVnd, 0);
                return (
                  <tr key={batch.id} onClick={() => openBatch(batch)}>
                    <td data-label="Chuyến/đợt"><strong>{batch.code || batch.id}</strong><span>{batch.route}</span></td>
                    <td data-label="Trạng thái"><span className={`batch-chip ${batch.status}`}>{batchStatusLabel(batch.status)}</span></td>
                    <td data-label="Lịch bay">
                      <strong>Về VN {batch.arrival || "-"}</strong>
                      <span>Bay {batch.departure || "-"}</span>
                      <span>Cutoff {batch.cutoff || "-"}</span>
                    </td>
                    <td data-label="Order">{batchOrders.length}</td>
                    <td data-label="Tiến độ hàng">
                      <div className="flight-progress-mini">
                        <span className={progress.waitingBuy ? "warn" : ""}>Thiếu/chờ mua {progress.waitingBuy}</span>
                        <span>Đã mua {progress.purchased}</span>
                        <span>Đã gửi {progress.sentVn}</span>
                        <span>Đã nhận {progress.receivedVn}</span>
                      </div>
                    </td>
                    <td data-label="Tài chính" className="finance-cell">
                      <strong>{vnd(revenue)}</strong>
                      <span>Cước bay {aud(batch.freightAud)}</span>
                      <span className="money-due">Còn thu {vnd(remaining)}</span>
                    </td>
                    <td data-label="Ghi chú">{batch.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!upcomingBatches.length && <EmptyState title="Chưa có chuyến bay" body="Bấm Thêm chuyến để tạo lịch bay sắp tới, sau đó vào đơn hàng để xếp đơn vào chuyến." />}
        </div>
      </div>

      <div className="batch-management-grid">
        {upcomingBatches.map((batch) => {
          const batchOrders = orders.filter((order) => order.batchId === batch.id);
          const progress = flightOrderProgress(batchOrders);
          const remaining = batchOrders.reduce((sum, order) => sum + orderFinance(order).remainingVnd, 0);
          return (
            <article className="batch-card" key={batch.id}>
              <div className="batch-card-head">
                <div>
                  <strong>{batch.code || batch.id}</strong>
                  <span>{batch.route}</span>
                </div>
                <em className={`batch-chip ${batch.status}`}>{batchStatusLabel(batch.status)}</em>
              </div>
              <div className="batch-stats">
                <div><span>Order</span><strong>{batchOrders.length}</strong></div>
                <div><span>Còn thiếu</span><strong>{progress.waitingBuy}</strong></div>
                <div><span>Đã mua</span><strong>{progress.purchased + progress.sentVn + progress.receivedVn + progress.delivered}</strong></div>
              </div>
              <div className="flight-progress-stack">
                <span>Bay {batch.departure || "-"} · Về VN {batch.arrival || "-"}</span>
                <span>Đã gửi {progress.sentVn} · Đã nhận {progress.receivedVn} · Giao khách {progress.delivered}</span>
              </div>
              <div className="batch-cashline">
                <span>Cước bay</span>
                <strong>{aud(batch.freightAud)}</strong>
              </div>
              <div className="batch-cashline">
                <span>Còn phải thu</span>
                <strong>{vnd(remaining)}</strong>
              </div>
              <div className="batch-actions">
                <button onClick={() => openBatch(batch)}>Sửa đợt</button>
                <button onClick={() => batchOrders[0] && openOrder(batchOrders[0])}>Xem đơn</button>
              </div>
            </article>
          );
        })}
      </div>
      {!batches.length && <EmptyState title="Chưa có chuyến bay" body="Tạo chuyến trước, sau đó xếp đơn vào chuyến trong màn sửa đơn." />}
    </div>
  );
}

function FlightChecklistPanel({ batches, orders, unassignedOrders, openOrder, updateOrderStatus }) {
  const groupedBatches = [
    ...batches.map((batch) => ({
      id: batch.id,
      title: batch.code || batch.id,
      subtitle: `Về VN ${batch.arrival || "-"} · Cutoff ${batch.cutoff || "-"}`,
      orders: orders.filter((order) => order.batchId === batch.id)
    })),
    ...(unassignedOrders.length
      ? [
          {
            id: "unassigned",
            title: "Chưa xếp chuyến",
            subtitle: "Các đơn này cần gán vào chuyến bay trước khi chốt đợt.",
            orders: unassignedOrders
          }
        ]
      : [])
  ];

  return (
    <section className="panel flight-checklist-panel">
      <div className="panel-title">
        <div>
          <span className="eyebrow">Buying checklist</span>
          <h2>Checklist hàng theo chuyến</h2>
        </div>
        <PackageCheck size={18} />
      </div>
      <div className="flight-checklist-grid">
        {groupedBatches.map((group) => {
          const progress = flightOrderProgress(group.orders);
          const actionableOrders = group.orders
            .filter((order) => !["delivered", "cancelled"].includes(normalizeOrderStatus(order.status)))
            .sort((a, b) => normalizeOrderStatus(a.status).localeCompare(normalizeOrderStatus(b.status)));
          return (
            <article className="flight-checklist-card" key={group.id}>
              <div className="flight-checklist-head">
                <div>
                  <strong>{group.title}</strong>
                  <span>{group.subtitle}</span>
                </div>
                <em className={progress.waitingBuy ? "warn" : "ok"}>{progress.waitingBuy ? `Thiếu ${progress.waitingBuy}` : "Đủ hàng"}</em>
              </div>
              <div className="flight-checklist-stats">
                <span>Chờ mua <strong>{progress.waitingBuy}</strong></span>
                <span>Đã mua <strong>{progress.purchased}</strong></span>
                <span>Đã gửi <strong>{progress.sentVn}</strong></span>
                <span>Đã nhận <strong>{progress.receivedVn}</strong></span>
              </div>
              <div className="flight-order-list">
                {actionableOrders.slice(0, 12).map((order) => {
                  return (
                    <FlightOrderRow order={order} openOrder={openOrder} updateOrderStatus={updateOrderStatus} key={order.id} />
                  );
                })}
                {!actionableOrders.length && <EmptyState title="Không còn đơn cần xử lý" body="Các đơn trong chuyến này đã giao/hủy hoặc chưa có đơn nào được xếp vào chuyến." />}
                {actionableOrders.length > 12 && <EmptyState title={`Đang hiện 12/${actionableOrders.length} đơn cần xử lý`} body="Mở tab Đơn hàng và lọc theo chuyến để xem toàn bộ." />}
              </div>
            </article>
          );
        })}
        {!groupedBatches.length && <EmptyState title="Chưa có checklist chuyến" body="Tạo chuyến bay và gán đơn vào chuyến để thấy danh sách hàng cần mua/gửi/nhận." />}
      </div>
    </section>
  );
}

function FlightOrderQuickActions({ order, openOrder, updateOrderStatus }) {
  const status = normalizeOrderStatus(order.status);
  return (
    <div className="flight-order-actions" onClick={(event) => event.stopPropagation()}>
      {status === "waiting_buy" && <button type="button" onClick={() => updateOrderStatus(order.id, "purchased")}>Đã mua</button>}
      {status === "purchased" && <button type="button" onClick={() => updateOrderStatus(order.id, "sent_vn")}>Đã gửi VN</button>}
      {status === "sent_vn" && <button type="button" onClick={() => updateOrderStatus(order.id, "received_vn")}>Đã nhận VN</button>}
      {status === "received_vn" && <button type="button" onClick={() => updateOrderStatus(order.id, "delivered")}>Đã giao</button>}
      <button type="button" onClick={() => openOrder(order)}>Sửa</button>
    </div>
  );
}

function FlightOrderRow({ order, openOrder, updateOrderStatus }) {
  const status = normalizeOrderStatus(order.status);
  return (
    <div className="flight-order-item" onClick={() => openOrder(order)}>
      <ProductCell order={order} />
      <div className="flight-order-meta">
        <strong>{order.id}</strong>
        <span>{order.customer || "-"} · SL {order.quantity} · {money(order.weightKg)}kg</span>
        <span className={`status-chip ${status}`}>{statusLabel(status)}</span>
      </div>
      <FlightOrderQuickActions order={order} openOrder={openOrder} updateOrderStatus={updateOrderStatus} />
    </div>
  );
}

function CashflowView({ orders, batches, transactions, openTransaction, openOrder, canSeeProfit }) {
  const totalsByBatch = batches.map((batch) => {
    const batchOrders = orders.filter((order) => order.batchId === batch.id);
    return {
      batch,
      revenue: batchOrders.reduce((sum, order) => sum + orderFinance(order).totalThuVnd, 0),
      deposit: batchOrders.reduce((sum, order) => sum + orderFinance(order).depositVnd, 0),
      remaining: batchOrders.reduce((sum, order) => sum + orderFinance(order).remainingVnd, 0),
      cost: batchOrders.reduce((sum, order) => sum + orderFinance(order).totalCostVnd, 0)
    };
  });

  return (
    <div className="screen-stack">
      <div className="panel-title standalone">
        <div>
          <span className="eyebrow">Cashflow</span>
          <h2>Thu/chi theo chuyến bay</h2>
        </div>
        <button className="primary-button" onClick={() => openTransaction()}>
          <Plus size={17} />
          Thêm thu/chi
        </button>
      </div>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Đợt</th>
                <th>Tổng thu / Doanh số</th>
                <th>Đã cọc / đã thu</th>
                <th>Số tiền còn lại phải thu của khách</th>
                <th>Tổng chi phí</th>
                {canSeeProfit && <th>Lãi dự kiến</th>}
              </tr>
            </thead>
            <tbody>
              {totalsByBatch.map(({ batch, revenue, deposit, remaining, cost }) => (
                <tr key={batch.id}>
                  <td data-label="Đợt"><strong>{batch.code || batch.id}</strong></td>
                  <td data-label="Tổng thu / Doanh số">{vnd(revenue)}</td>
                  <td data-label="Đã cọc / đã thu">{vnd(deposit)}</td>
                  <td data-label="Số tiền còn lại phải thu"><span className="money-due">{vnd(remaining)}</span></td>
                  <td data-label="Tổng chi phí">{vnd(cost)}</td>
                  {canSeeProfit && <td data-label="Lãi dự kiến">{vnd(revenue - cost)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel">
        <div className="panel-title">
          <h2>Sổ thu/chi nhập tay</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Loại</th>
                <th>Số tiền</th>
                <th>Order</th>
                <th>Đợt</th>
                <th>Danh mục</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item) => (
                <tr key={item.id} onClick={() => openTransaction(item)}>
                  <td data-label="Ngày">{item.date}</td>
                  <td data-label="Loại">{item.type === "in" ? "Thu" : "Chi"}</td>
                  <td data-label="Số tiền">{vnd(item.amountVnd)}</td>
                  <td data-label="Order">{item.orderId}</td>
                  <td data-label="Chuyến bay">{batches.find((batch) => batch.id === item.batchId)?.code ?? item.batchId}</td>
                  <td data-label="Danh mục">{item.category}</td>
                  <td data-label="Note">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!transactions.length && <EmptyState title="Chưa có thu/chi nhập tay" body="Các số từ đơn hàng được tính tự động, phần này dùng cho khoản ngoài đơn." />}
        </div>
      </div>
    </div>
  );
}

function TasksView({ tasks, accounts, orders, batches, openTask }) {
  return (
    <div className="screen-stack">
      <div className="panel-title standalone">
        <div>
          <span className="eyebrow">Task board</span>
          <h2>Việc cần xử lý</h2>
        </div>
        <button className="primary-button" onClick={() => openTask()}>
          <Plus size={17} />
          Thêm việc
        </button>
      </div>
      <div className="task-board-grid">
        {tasks.map((task) => {
          const linkedOrder = orders.find((order) => order.id === task.linkedOrderId);
          const linkedBatch = batches.find((batch) => batch.id === linkedOrder?.batchId);
          return (
            <article className={`task-card ${task.priority}`} key={task.id} onClick={() => openTask(task)}>
              <span>{task.dueDate} {task.time}</span>
              <strong>{task.title}</strong>
              <p>{task.detail}</p>
              <div className="task-checks">
                {task.linkedOrderId && <em>Order: {task.linkedOrderId}</em>}
                {linkedBatch && <em>Chuyến: {linkedBatch.code || linkedBatch.id} · Về VN {linkedBatch.arrival || "-"}</em>}
                {linkedBatch?.cutoff && <em>Deadline mua: {linkedBatch.cutoff}</em>}
                <em className={task.supervisorDone ? "done" : ""}>Giám sát: {accounts.find((item) => item.id === task.supervisorId)?.displayName ?? "-"}</em>
                <em className={task.assigneeDone ? "done" : ""}>Phụ trách: {accounts.find((item) => item.id === task.assigneeId)?.displayName ?? "-"}</em>
              </div>
            </article>
          );
        })}
      </div>
      {!tasks.length && <EmptyState title="Chưa có việc" body="Bấm Thêm việc để giao việc cho người giám sát và người phụ trách." />}
    </div>
  );
}

function EmptyState({ title, body }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}

function ModalShell({ title, eyebrow, close, children, actions }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="order-modal">
        <div className="modal-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          <button className="icon-button" type="button" onClick={close} aria-label="Đóng">
            ×
          </button>
        </div>
        {children}
        {actions}
      </div>
    </div>
  );
}

function Field({ label, children, wide }) {
  return (
    <label className={wide ? "wide" : ""}>
      {label}
      {children}
    </label>
  );
}

function OrderModal({ draft, setDraft, batches, accounts, customers, orders, sessionToken, save, remove, close }) {
  const finance = orderFinance(draft);
  const selectedBatch = batches.find((batch) => batch.id === draft.batchId);
  const suggestedBatch = autoBatchForOrder(batches, draft.orderDate || today());
  const [previewStatus, setPreviewStatus] = React.useState("idle");
  const [previewError, setPreviewError] = React.useState("");
  const lastPreviewUrlRef = React.useRef("");
  const generateCurrentOrderCode = () => {
    setDraft({
      ...draft,
      id: generateOrderCode(draft, selectedBatch, orders)
    });
  };
  const applyAutoBatch = () => {
    if (!suggestedBatch) return;
    setDraft({
      ...draft,
      batchId: suggestedBatch.id,
      id: draft.id ? draft.id : generateOrderCode({ ...draft, batchId: suggestedBatch.id }, suggestedBatch, orders)
    });
  };

  async function fetchProductPreview(urlValue = draft.productUrl, force = false) {
    const url = String(urlValue || "").trim();
    if (!sessionToken || !looksLikeProductUrl(url)) return;
    if (!force && draft.productImageSource === "manual") return;
    setPreviewStatus("loading");
    setPreviewError("");
    try {
      const response = await fetch("/api/product-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Không lấy được ảnh từ link này.");
      }
      lastPreviewUrlRef.current = url;
      setDraft((current) => {
        if (String(current.productUrl || "").trim() !== url) return current;
        return {
          ...current,
          product: current.product || data.title || current.product,
          source: current.source || data.siteName || current.source,
          productImageUrl: data.imageUrl || current.productImageUrl,
          productImageSource: data.imageUrl ? "auto" : current.productImageSource
        };
      });
      setPreviewStatus(data.imageUrl ? "done" : "error");
      setPreviewError(data.imageUrl ? "" : "Đã nhận shop/link nhưng site này không trả ảnh rõ ràng. Upload ảnh tay để chắc nhất.");
    } catch (error) {
      const chemistFallback = chemistPreviewFromUrl(url);
      if (chemistFallback?.imageUrl) {
        lastPreviewUrlRef.current = url;
        setDraft((current) => {
          if (String(current.productUrl || "").trim() !== url) return current;
          return {
            ...current,
            product: current.product || chemistFallback.title || current.product,
            source: current.source || chemistFallback.siteName,
            productImageUrl: chemistFallback.imageUrl,
            productImageSource: "auto"
          };
        });
        setPreviewStatus("done");
        setPreviewError("");
        return;
      }
      setPreviewStatus("error");
      setPreviewError(error.message || "Không lấy được ảnh từ link này.");
    }
  }

  async function uploadProductImage(file) {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setDraft((current) => ({ ...current, productImageUrl: dataUrl, productImageSource: "manual" }));
    setPreviewStatus("done");
    setPreviewError("");
  }

  React.useEffect(() => {
    const url = String(draft.productUrl || "").trim();
    if (!url || !looksLikeProductUrl(url) || draft.productImageSource === "manual") return undefined;
    if (lastPreviewUrlRef.current === url && draft.productImageUrl) return undefined;
    const timeout = window.setTimeout(() => fetchProductPreview(url, false), 800);
    return () => window.clearTimeout(timeout);
  }, [draft.productUrl, sessionToken]);

  return (
    <ModalShell title="Sửa / thêm đơn hàng" eyebrow="Order management" close={close}>
      <form onSubmit={save}>
        <div className="order-form-layout">
          <div className="form-grid">
            <Field label="Mã đơn">
              <div className="inline-input-action">
                <input value={draft.id} onChange={(event) => setDraft({ ...draft, id: event.target.value })} />
                <button type="button" onClick={generateCurrentOrderCode}>Generate</button>
              </div>
            </Field>
            <Field label="Ngày tạo">
              <input
                type="date"
                value={draft.orderDate}
                onChange={(event) => {
                  const nextDate = event.target.value;
                  const nextBatch = !draft.batchId ? autoBatchForOrder(batches, nextDate) : null;
                  setDraft({ ...draft, orderDate: nextDate, batchId: draft.batchId || nextBatch?.id || "" });
                }}
              />
            </Field>
            <Field label="Khách hàng">
              <input list="customer-suggestions" value={draft.customer} onChange={(event) => setDraft({ ...draft, customer: event.target.value })} />
            </Field>
            <Field label="SĐT"><input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} /></Field>
            <Field label="Hạng khách">
              <select value={draft.customerTier} onChange={(event) => setDraft({ ...draft, customerTier: event.target.value })}>
                {customerTiers.map((tier) => <option key={tier}>{tier}</option>)}
              </select>
            </Field>
            <Field label="Tình trạng">
              <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}>
                {orderStatuses.map((status) => <option value={status.id} key={status.id}>{status.label}</option>)}
              </select>
            </Field>
            <div className={`split-bill-field ${draft.splitBill ? "active" : ""}`}>
              <label className="split-bill-toggle">
                <input
                  type="checkbox"
                  checked={Boolean(draft.splitBill)}
                  onChange={(event) => setDraft({ ...draft, splitBill: event.target.checked, splitBillNote: event.target.checked ? draft.splitBillNote : "" })}
                />
                <span>
                  <strong>Tách bill riêng khi mua</strong>
                  <em>{draft.splitBill ? "Đơn này sẽ nổi bật trong bảng mua hàng." : "Bật lên nếu cần mua bill riêng, dễ thấy khi đi mua."}</em>
                </span>
              </label>
              {draft.splitBill && (
                <input
                  value={draft.splitBillNote ?? ""}
                  placeholder="Ví dụ: bill riêng cho khách này, bill công ty, bill cá nhân..."
                  onChange={(event) => setDraft({ ...draft, splitBillNote: event.target.value })}
                />
              )}
            </div>
            <Field label="Sản phẩm" wide><input value={draft.product} onChange={(event) => setDraft({ ...draft, product: event.target.value })} /></Field>
            <Field label="Link mua hàng" wide>
              <div className="inline-input-action">
                <input value={draft.productUrl ?? ""} placeholder="Dán link mua hàng, app tự nhận shop và ảnh" onChange={(event) => setDraft({ ...draft, productUrl: event.target.value, source: looksLikeProductUrl(event.target.value) ? "" : draft.source, productImageSource: draft.productImageSource === "manual" ? "manual" : "" })} />
                <button type="button" disabled={!looksLikeProductUrl(draft.productUrl) || previewStatus === "loading"} onClick={() => fetchProductPreview(draft.productUrl, true)}>
                  <RefreshCw size={15} /> Đọc link
                </button>
              </div>
            </Field>
            <Field label="Ảnh sản phẩm" wide>
              <div className="product-media-editor">
                <div className="product-media-preview">
                  {draft.productImageUrl ? <img src={productImageSrc(draft)} alt={draft.product || "Product"} /> : <ImageIcon size={28} />}
                </div>
                <div className="product-media-controls">
                  <strong>{draft.productImageUrl ? (draft.productImageSource === "manual" ? "Ảnh upload tay" : "Ảnh lấy từ link") : "Chưa có ảnh sản phẩm"}</strong>
                  <span>{previewStatus === "loading" ? "Đang đọc link và tìm ảnh đại diện..." : previewError || "Ảnh giúp nhân viên mua hàng kiểm tra đúng mẫu nhanh hơn."}</span>
                  <label className="source-mini-field">
                    Shop / nền tảng
                    <input value={draft.source ?? ""} placeholder="Tự nhận từ link hoặc nhập tên shop" onChange={(event) => setDraft({ ...draft, source: event.target.value })} />
                  </label>
                  <div className="media-actions">
                    {draft.productUrl && <a href={draft.productUrl} target="_blank" rel="noreferrer"><Link2 size={15} /> Mở link</a>}
                    <label className="upload-button"><Upload size={15} /> Upload ảnh<input type="file" accept="image/*" onChange={(event) => uploadProductImage(event.target.files?.[0])} /></label>
                    {draft.productImageUrl && <button type="button" onClick={() => setDraft({ ...draft, productImageUrl: "", productImageSource: "" })}>Bỏ ảnh</button>}
                  </div>
                </div>
              </div>
            </Field>
            <Field label="Số lượng"><input type="number" min="1" value={draft.quantity} onChange={(event) => setDraft({ ...draft, quantity: event.target.value })} /></Field>
            <Field label="Số kg"><input type="number" min="0" step="0.1" value={draft.weightKg ?? 0} onChange={(event) => setDraft({ ...draft, weightKg: event.target.value })} /></Field>
            <Field label="Chuyến bay">
              <div className="flight-auto-picker">
                <select value={draft.batchId} onChange={(event) => setDraft({ ...draft, batchId: event.target.value })}>
                  <option value="">Chưa xếp đợt</option>
                  {sortedFlightBatches(batches).map((batch) => <option value={batch.id} key={batch.id}>{batch.code || batch.id}</option>)}
                </select>
                <button type="button" disabled={!suggestedBatch || draft.batchId === suggestedBatch.id} onClick={applyAutoBatch}>
                  Auto chuyến gần nhất
                </button>
              </div>
              {suggestedBatch && <span className="field-hint">Gợi ý: {suggestedBatch.code || suggestedBatch.id} · Cutoff {suggestedBatch.cutoff || "-"} · Về VN {suggestedBatch.arrival || "-"}</span>}
            </Field>
            <div className="flight-link-hint">
              <span>Deadline mua</span>
              <strong>{selectedBatch?.cutoff || "-"}</strong>
              <em>Bay {selectedBatch?.departure || "-"} · Về VN {selectedBatch?.arrival || "-"}</em>
            </div>
            <Field label="Người giám sát">
              <select value={draft.supervisorId} onChange={(event) => setDraft({ ...draft, supervisorId: event.target.value })}>
                {accounts.filter((account) => account.active).map((account) => <option value={account.id} key={account.id}>{account.displayName}</option>)}
              </select>
            </Field>
            <Field label="Người phụ trách">
              <select value={draft.assigneeId} onChange={(event) => setDraft({ ...draft, assigneeId: event.target.value })}>
                {accounts.filter((account) => account.active).map((account) => <option value={account.id} key={account.id}>{account.displayName}</option>)}
              </select>
            </Field>
            <Field label="Người đi mua">
              <select value={draft.buyerId} onChange={(event) => setDraft({ ...draft, buyerId: event.target.value })}>
                {accounts.filter((account) => account.active).map((account) => <option value={account.id} key={account.id}>{account.displayName}</option>)}
              </select>
            </Field>
            <Field label="Tiền hàng AUD / sản phẩm"><input type="number" value={draft.aud} onChange={(event) => setDraft({ ...draft, aud: event.target.value })} /></Field>
            <Field label="Ship Úc AUD"><input type="number" value={draft.shippingAud} onChange={(event) => setDraft({ ...draft, shippingAud: event.target.value })} /></Field>
            <Field label="Giá AUD/kg"><input type="number" min="0" step="0.01" value={draft.intlShippingAud} onChange={(event) => setDraft({ ...draft, intlShippingAud: event.target.value })} /></Field>
            <Field label="Giá cân cuối VND/kg"><input type="number" min="0" value={draft.finalWeightRateVnd ?? defaultFinalWeightRateVnd} onChange={(event) => setDraft({ ...draft, finalWeightRateVnd: event.target.value })} /></Field>
            <Field label="Tỉ giá"><input type="number" value={draft.exchangeRate} onChange={(event) => setDraft({ ...draft, exchangeRate: event.target.value })} /></Field>
            <Field label="Phụ phí VND"><input type="number" value={draft.extraFeeVnd} onChange={(event) => setDraft({ ...draft, extraFeeVnd: event.target.value })} /></Field>
            <Field label="Ghi chú phụ phí"><input value={draft.extraFeeNote} onChange={(event) => setDraft({ ...draft, extraFeeNote: event.target.value })} /></Field>
            <Field label="Tổng thu / Doanh số VND"><input type="number" value={draft.totalThuVnd} onChange={(event) => setDraft({ ...draft, totalThuVnd: event.target.value })} /></Field>
            <Field label="Cọc đã thu VND"><input type="number" value={draft.depositVnd} onChange={(event) => setDraft({ ...draft, depositVnd: event.target.value })} /></Field>
            <Field label="Note" wide><textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></Field>
          </div>
          <div className="auto-summary">
            {draft.splitBill && (
              <div className="summary-split-bill">
                <strong>Tách bill riêng</strong>
                <span>{draft.splitBillNote || "Order này cần bill riêng khi đi mua."}</span>
              </div>
            )}
            <div className="summary-hero"><span>Còn phải thu</span><strong>{vnd(finance.remainingVnd)}</strong></div>
            <div className="summary-hero"><span>Tổng thu</span><strong>{vnd(finance.totalThuVnd)}</strong></div>
            <div><span>Tổng chi phí gốc</span><strong>{vnd(finance.totalCostVnd)}</strong></div>
            <div><span>Cọc đã thu</span><strong>{vnd(finance.depositVnd)}</strong></div>
            <div><span>Tiền hàng</span><strong>{vnd(finance.goodsVnd)}</strong></div>
            <div><span>Phí mua hàng</span><strong>{vnd(finance.purchaseFeeVnd)}</strong></div>
            <div><span>Cước cân gốc</span><strong>{vnd(finance.airFreightVnd)}</strong><small>{money(draft.weightKg)}kg x {aud(draft.intlShippingAud)}</small></div>
            <div><span>Số tiền cân cuối</span><strong>{vnd(finance.finalWeightChargeVnd)}</strong><small>{money(draft.weightKg)}kg x {vnd(finance.finalWeightRateVnd)}</small></div>
            <div><span>Lãi cân</span><strong>{vnd(finance.weightProfitVnd)}</strong></div>
            <div><span>Ship Úc</span><strong>{vnd(finance.domesticShippingVnd)}</strong></div>
            <div><span>Tổng thu tự động</span><strong>{vnd(finance.suggestedTotalThuVnd)}</strong></div>
          </div>
        </div>
        <datalist id="customer-suggestions">
          {customers.map((customer) => <option value={customer.name} key={customer.id}>{customer.phone}</option>)}
        </datalist>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={close}>Hủy</button>
          <button className="danger-button" type="button" onClick={() => remove(draft.id)}><Trash2 size={16} /> Xóa</button>
          <button className="primary-button" type="submit"><CheckCircle2 size={17} /> Lưu đơn</button>
        </div>
      </form>
    </ModalShell>
  );
}

function BatchModal({ draft, setDraft, orders, openOrder, updateOrderStatus, save, remove, close }) {
  const batchOrders = orders.filter((order) => order.batchId === draft.id);
  const progress = flightOrderProgress(batchOrders);
  const activeBatchOrders = batchOrders.filter((order) => !["delivered", "cancelled"].includes(normalizeOrderStatus(order.status)));
  return (
    <ModalShell title="Sửa / thêm chuyến bay" eyebrow="Flight management" close={close}>
      <form onSubmit={save}>
        <div className="form-grid">
          <Field label="Mã đợt"><input value={draft.code} onChange={(event) => setDraft({ ...draft, code: event.target.value })} /></Field>
          <Field label="Tuyến"><input value={draft.route} onChange={(event) => setDraft({ ...draft, route: event.target.value })} /></Field>
          <Field label="Cutoff"><input type="date" value={draft.cutoff} onChange={(event) => setDraft({ ...draft, cutoff: event.target.value })} /></Field>
          <Field label="Ngày bay"><input type="date" value={draft.departure} onChange={(event) => setDraft({ ...draft, departure: event.target.value })} /></Field>
          <Field label="Ngày hàng về VN"><input type="date" value={draft.arrival} onChange={(event) => setDraft({ ...draft, arrival: event.target.value })} /></Field>
          <Field label="Tình trạng">
            <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}>
              {batchStatuses.map((status) => <option value={status.id} key={status.id}>{status.label}</option>)}
            </select>
          </Field>
          <Field label="Sức chứa kg"><input type="number" value={draft.capacityKg} onChange={(event) => setDraft({ ...draft, capacityKg: event.target.value })} /></Field>
          <Field label="Cước bay AUD"><input type="number" value={draft.freightAud} onChange={(event) => setDraft({ ...draft, freightAud: event.target.value })} /></Field>
          <Field label="Note" wide><textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></Field>
        </div>
        <section className="batch-modal-checklist">
          <div className="batch-modal-checklist-head">
            <div>
              <span className="eyebrow">Flight orders</span>
              <h3>Hàng trong chuyến này</h3>
            </div>
            <em className={progress.waitingBuy ? "warn" : "ok"}>{progress.waitingBuy ? `Còn thiếu/chờ mua ${progress.waitingBuy}` : "Không thiếu hàng"}</em>
          </div>
          <div className="flight-checklist-stats">
            <span>Tổng đơn <strong>{progress.total}</strong></span>
            <span>Chờ mua <strong>{progress.waitingBuy}</strong></span>
            <span>Đã mua <strong>{progress.purchased}</strong></span>
            <span>Đã gửi/nhận <strong>{progress.sentVn + progress.receivedVn}</strong></span>
          </div>
          <div className="flight-order-list compact">
            {activeBatchOrders.slice(0, 10).map((order) => (
              <FlightOrderRow order={order} openOrder={openOrder} updateOrderStatus={updateOrderStatus} key={order.id} />
            ))}
            {!activeBatchOrders.length && (
              <EmptyState title="Chưa có đơn cần xử lý trong chuyến" body="Vào Đơn hàng, mở từng đơn và chọn chuyến bay này để gom hàng vào đúng đợt." />
            )}
            {activeBatchOrders.length > 10 && <EmptyState title={`Đang hiện 10/${activeBatchOrders.length} đơn`} body="Vào tab Chuyến bay để xem checklist đầy đủ hơn." />}
          </div>
        </section>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={close}>Hủy</button>
          <button className="danger-button" type="button" onClick={() => remove(draft.id)}>Xóa</button>
          <button className="primary-button" type="submit">Lưu đợt</button>
        </div>
      </form>
    </ModalShell>
  );
}

function StockModal({ draft, setDraft, accounts, save, remove, close }) {
  return (
    <ModalShell title="Sửa / thêm hàng có sẵn" eyebrow="Ready stock" close={close}>
      <form onSubmit={save}>
        <div className="form-grid">
          <Field label="SKU"><input value={draft.sku} onChange={(event) => setDraft({ ...draft, sku: event.target.value })} /></Field>
          <Field label="Tên sản phẩm"><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></Field>
          <Field label="Tồn"><input type="number" value={draft.quantity} onChange={(event) => setDraft({ ...draft, quantity: event.target.value })} /></Field>
          <Field label="Đang giữ"><input type="number" value={draft.reserved} onChange={(event) => setDraft({ ...draft, reserved: event.target.value })} /></Field>
          <Field label="Giá bán VND"><input type="number" value={draft.sellVnd} onChange={(event) => setDraft({ ...draft, sellVnd: event.target.value })} /></Field>
          <Field label="Kho/điểm giữ"><input value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} /></Field>
          <Field label="Phụ trách">
            <select value={draft.ownerId} onChange={(event) => setDraft({ ...draft, ownerId: event.target.value })}>
              {accounts.filter((account) => account.active).map((account) => <option value={account.id} key={account.id}>{account.displayName}</option>)}
            </select>
          </Field>
          <Field label="Tình trạng"><input value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })} /></Field>
          <Field label="Note" wide><textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></Field>
        </div>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={close}>Hủy</button>
          <button className="danger-button" type="button" onClick={() => remove(draft.sku)}>Xóa</button>
          <button className="primary-button" type="submit">Lưu hàng</button>
        </div>
      </form>
    </ModalShell>
  );
}

function TransactionModal({ draft, setDraft, orders, batches, save, remove, close }) {
  return (
    <ModalShell title="Sửa / thêm thu chi" eyebrow="Cashflow" close={close}>
      <form onSubmit={save}>
        <div className="form-grid">
          <Field label="Ngày"><input type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} /></Field>
          <Field label="Loại"><select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })}><option value="in">Thu</option><option value="out">Chi</option></select></Field>
          <Field label="Số tiền VND"><input type="number" value={draft.amountVnd} onChange={(event) => setDraft({ ...draft, amountVnd: event.target.value })} /></Field>
          <Field label="Danh mục"><input value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} /></Field>
          <Field label="Order"><select value={draft.orderId} onChange={(event) => setDraft({ ...draft, orderId: event.target.value })}><option value="">Không link</option>{orders.map((order) => <option value={order.id} key={order.id}>{order.id} - {order.customer}</option>)}</select></Field>
          <Field label="Chuyến bay"><select value={draft.batchId} onChange={(event) => setDraft({ ...draft, batchId: event.target.value })}><option value="">Không link</option>{batches.map((batch) => <option value={batch.id} key={batch.id}>{batch.code || batch.id}</option>)}</select></Field>
          <Field label="Note" wide><textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></Field>
        </div>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={close}>Hủy</button>
          <button className="danger-button" type="button" onClick={() => remove(draft.id)}>Xóa</button>
          <button className="primary-button" type="submit">Lưu thu/chi</button>
        </div>
      </form>
    </ModalShell>
  );
}

function CustomerModal({ draft, setDraft, save, remove, close }) {
  return (
    <ModalShell title="Sửa / thêm khách hàng" eyebrow="Customers" close={close}>
      <form onSubmit={save}>
        <div className="form-grid">
          <Field label="Tên khách"><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></Field>
          <Field label="SĐT"><input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} /></Field>
          <Field label="Hạng khách"><select value={draft.tier} onChange={(event) => setDraft({ ...draft, tier: event.target.value })}>{customerTiers.map((tier) => <option key={tier}>{tier}</option>)}</select></Field>
          <Field label="Note" wide><textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></Field>
        </div>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={close}>Hủy</button>
          <button className="danger-button" type="button" onClick={() => remove(draft.id)}>Xóa</button>
          <button className="primary-button" type="submit">Lưu khách</button>
        </div>
      </form>
    </ModalShell>
  );
}

function TaskModal({ draft, setDraft, accounts, orders, save, remove, close }) {
  return (
    <ModalShell title="Sửa / thêm việc" eyebrow="Task board" close={close}>
      <form onSubmit={save}>
        <div className="form-grid">
          <Field label="Tiêu đề" wide><input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></Field>
          <Field label="Ngày hạn"><input type="date" value={draft.dueDate} onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })} /></Field>
          <Field label="Giờ hạn"><input value={draft.time} onChange={(event) => setDraft({ ...draft, time: event.target.value })} /></Field>
          <Field label="Ưu tiên"><select value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value })}><option value="urgent">Gấp</option><option value="normal">Bình thường</option><option value="low">Thấp</option></select></Field>
          <Field label="Tình trạng"><select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option value="open">Đang mở</option><option value="done">Đã xong</option></select></Field>
          <Field label="Người giám sát"><select value={draft.supervisorId} onChange={(event) => setDraft({ ...draft, supervisorId: event.target.value })}>{accounts.filter((account) => account.active).map((account) => <option value={account.id} key={account.id}>{account.displayName}</option>)}</select></Field>
          <Field label="Người phụ trách"><select value={draft.assigneeId} onChange={(event) => setDraft({ ...draft, assigneeId: event.target.value })}>{accounts.filter((account) => account.active).map((account) => <option value={account.id} key={account.id}>{account.displayName}</option>)}</select></Field>
          <label className="check-line"><input type="checkbox" checked={draft.supervisorDone} onChange={(event) => setDraft({ ...draft, supervisorDone: event.target.checked })} /> Người giám sát đã check</label>
          <label className="check-line"><input type="checkbox" checked={draft.assigneeDone} onChange={(event) => setDraft({ ...draft, assigneeDone: event.target.checked })} /> Người phụ trách đã check</label>
          <Field label="Link order"><select value={draft.linkedOrderId} onChange={(event) => setDraft({ ...draft, linkedOrderId: event.target.value })}><option value="">Không link</option>{orders.map((order) => <option value={order.id} key={order.id}>{order.id} - {order.customer}</option>)}</select></Field>
          <Field label="Chi tiết" wide><textarea value={draft.detail} onChange={(event) => setDraft({ ...draft, detail: event.target.value })} /></Field>
        </div>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={close}>Hủy</button>
          <button className="danger-button" type="button" onClick={() => remove(draft.id)}>Xóa</button>
          <button className="primary-button" type="submit">Lưu việc</button>
        </div>
      </form>
    </ModalShell>
  );
}

function AccountEditor({ account, currentAccountId, saveAccount, removeAccount }) {
  const [draft, setDraft] = React.useState(account);

  React.useEffect(() => {
    setDraft(account);
  }, [account]);

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function uploadAvatar(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateDraft("avatarUrl", String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  return (
    <article className="user-row">
      <div className="user-card-head">
        <div className="user-identity">
          <AccountAvatar account={draft} />
          <div><strong>{draft.displayName}</strong><span>@{draft.username} · {roleLabel(draft.role)}</span></div>
        </div>
        <label className="active-toggle"><input type="checkbox" checked={draft.active} disabled={draft.id === "ryan"} onChange={(event) => updateDraft("active", event.target.checked)} /> Active</label>
      </div>
      <div className="user-fields-grid">
        <Field label="Username"><input value={draft.username} disabled={draft.id === "ryan"} onChange={(event) => updateDraft("username", event.target.value)} /></Field>
        <Field label="Tên"><input value={draft.displayName} onChange={(event) => updateDraft("displayName", event.target.value)} /></Field>
        <Field label="Password"><input value={draft.password} onChange={(event) => updateDraft("password", event.target.value)} /></Field>
        <Field label="Role"><select value={draft.role} onChange={(event) => updateDraft("role", event.target.value)}><option value="admin">Admin</option><option value="general_manager">General Manager</option><option value="staff">Staff</option></select></Field>
        <Field label="Icon"><input value={draft.initials} onChange={(event) => updateDraft("initials", event.target.value.toUpperCase())} /></Field>
        <Field label="Màu"><input type="color" value={draft.color} onChange={(event) => updateDraft("color", event.target.value)} /></Field>
        <Field label="Upload avatar"><input type="file" accept="image/*" onChange={(event) => uploadAvatar(event.target.files?.[0])} /></Field>
      </div>
      <div className="user-card-footer">
        <span>{draft.id === "ryan" ? "Owner account được khóa." : roleLabel(draft.role)}</span>
        <div className="user-footer-actions">
          <button className="ghost-button" type="button" onClick={() => setDraft(account)}>Hoàn tác</button>
          <button className="primary-button" type="button" onClick={() => saveAccount(account.id, draft)}>Lưu user</button>
          <button className="danger-button" type="button" disabled={account.id === "ryan" || account.id === currentAccountId} onClick={() => removeAccount(account.id)}>Xóa user</button>
        </div>
      </div>
    </article>
  );
}

function SettingsModal({ accounts, currentAccountId, saveAccount, removeAccount, createAccount, close }) {
  return (
    <ModalShell title="Quản lý user & phân quyền" eyebrow="Admin settings" close={close}>
      <div className="settings-layout">
        <section className="user-list">
          {accounts.map((account) => (
            <AccountEditor account={account} currentAccountId={currentAccountId} saveAccount={saveAccount} removeAccount={removeAccount} key={account.id} />
          ))}
        </section>
        <aside className="settings-side-panel">
          <form className="add-user-form" onSubmit={createAccount}>
            <h3>Thêm user mới</h3>
            <input name="username" placeholder="username" />
            <input name="password" placeholder="password" />
            <input name="displayName" placeholder="Tên hiển thị" />
            <select name="role"><option value="staff">Staff</option><option value="general_manager">General Manager</option><option value="admin">Admin</option></select>
            <input name="color" type="color" defaultValue="#11664f" />
            <button className="primary-button" type="submit"><Plus size={17} /> Thêm user</button>
          </form>
        </aside>
      </div>
    </ModalShell>
  );
}

export default App;
