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
  LineChart,
  LockKeyhole,
  LogOut,
  PackageCheck,
  Plane,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  UserRound,
  WalletCards
} from "lucide-react";

const exchangeRate = 17150;

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
  status: "waiting_buy",
  batchId: "",
  supervisorId: "ryan",
  assigneeId: "staff-vn",
  buyerId: "staff-vn",
  aud: 0,
  shippingAud: 0,
  intlShippingAud: 0,
  exchangeRate,
  extraFeeVnd: 0,
  extraFeeNote: "",
  totalThuVnd: 0,
  depositVnd: 0,
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
  { id: "customers", label: "Khách hàng", icon: UserRound },
  { id: "stock", label: "Hàng có sẵn", icon: Boxes },
  { id: "flights", label: "Chuyến bay", icon: Plane },
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
  return { ...order, status: normalizeOrderStatus(order?.status) };
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
  const audCost = money(order.aud) + money(order.shippingAud) + money(order.intlShippingAud);
  const totalCostVnd = audCost * rate + money(order.extraFeeVnd);
  const totalThuVnd = money(order.totalThuVnd) || totalCostVnd;
  const depositVnd = money(order.depositVnd);

  return {
    rate,
    audCost,
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

function stripDemo(items, demoIds, idKey = "id") {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => !demoIds.has(item[idKey]));
}

function getOrderId(order) {
  return order.id || makeId("AU");
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

  const activeAccount = accounts.find((account) => account.id === currentAccountId) ?? accounts[0];
  const canSeeProfit = activeAccount?.role === "admin" || activeAccount?.role === "general_manager";
  const canManageUsers = activeAccount?.role === "admin";

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
    if (Array.isArray(clean.accounts) && clean.accounts.length) setAccounts(clean.accounts);
    if (Array.isArray(clean.orders)) setOrders(clean.orders);
    if (Array.isArray(clean.customers)) setCustomers(clean.customers);
    if (Array.isArray(clean.batches)) setBatches(clean.batches);
    if (Array.isArray(clean.inventory)) setInventory(clean.inventory);
    if (Array.isArray(clean.transactions)) setTransactions(clean.transactions);
    if (Array.isArray(clean.tasks)) setTasks(clean.tasks);
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
    const timeout = window.setTimeout(() => {
      fetch("/api/state", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ state: { accounts, orders, customers, batches, inventory, transactions, tasks } })
      })
        .then((response) => {
          if (response.status === 401) throw new Error("session expired");
          if (!response.ok) throw new Error("state sync failed");
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
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [sessionToken, currentAccountId, accounts, orders, customers, batches, inventory, transactions, tasks]);

  const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => {
      const text = `${order.id} ${order.customer} ${order.phone} ${order.product} ${order.source}`.toLowerCase();
      const matchesQuery = text.includes(query.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || normalizeOrderStatus(order.status) === statusFilter;
      const matchesBatch = batchFilter === "all" || order.batchId === batchFilter;
      const matchesFrom = !dateFrom || String(order.orderDate || "") >= dateFrom;
      const matchesTo = !dateTo || String(order.orderDate || "") <= dateTo;
      return matchesQuery && matchesStatus && matchesBatch && matchesFrom && matchesTo;
    });
  }, [orders, query, statusFilter, batchFilter, dateFrom, dateTo]);

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
    setDraft({
      ...emptyOrder,
      id: order?.id ?? makeId("AU"),
      orderDate: order?.orderDate ?? today(),
      batchId: order?.batchId ?? batches[0]?.id ?? "",
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

  function updateAccount(accountId, field, value) {
    setAccounts((current) =>
      current.map((account) =>
        account.id === accountId
          ? {
              ...account,
              [field]: value,
              label: field === "role" ? roleLabel(value) : account.label
            }
          : account
      )
    );
  }

  function createAccount(event) {
    event.preventDefault();
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
        active: true
      }
    ]);
    event.currentTarget.reset();
  }

  function removeAccount(accountId) {
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
            <span className="eyebrow">{syncStatus === "cloud" ? "Cloud sync" : "Local mode"}</span>
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

        {activeView === "customers" && <CustomersView customers={customers} orders={orders} openCustomer={openCustomer} openOrder={openOrder} />}
        {activeView === "stock" && <StockView inventory={inventory} openStock={openStock} />}
        {activeView === "flights" && <FlightsView batches={batches} orders={orders} openBatch={openBatch} openOrder={openOrder} canSeeProfit={canSeeProfit} />}
        {activeView === "cashflow" && (
          <CashflowView orders={orders} batches={batches} transactions={transactions} openTransaction={openTransaction} openOrder={openOrder} canSeeProfit={canSeeProfit} />
        )}
        {activeView === "tasks" && <TasksView tasks={tasks} accounts={accounts} orders={orders} batches={batches} openTask={openTask} />}
      </main>

      {isSettingsOpen && (
        <SettingsModal
          accounts={accounts}
          currentAccountId={currentAccountId}
          updateAccount={updateAccount}
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
          save={saveOrder}
          remove={deleteOrder}
          close={() => setModal(null)}
        />
      )}
      {modal === "batch" && <BatchModal draft={draft} setDraft={setDraft} save={saveBatch} remove={deleteBatch} close={() => setModal(null)} />}
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
  const { totals, orders, filteredOrders, batches, openOrder, openBatch, canSeeProfit } = props;
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
      <section className="metric-grid lean">
        <Kpi label="Tổng thu / Doanh số" value={vnd(totals.revenue)} icon={WalletCards} />
        <Kpi label="Đã cọc / đã thu" value={vnd(totals.deposit)} icon={ShieldCheck} />
        <Kpi label="Còn phải thu" value={vnd(totals.remaining)} icon={CreditCard} tone="warning" />
        <Kpi label="Tổng chi phí" value={vnd(totals.cost)} icon={Boxes} />
        {canSeeProfit && <Kpi label="Lãi dự kiến" value={vnd(totals.profit)} icon={Gem} tone="success" />}
      </section>

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

      <section className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Extra fees</span>
            <h2>Bảng phụ phí</h2>
          </div>
          <Filter size={18} />
        </div>
        <div className="table-wrap">
          <table className="compact-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Phụ phí</th>
                <th>Ghi chú phụ phí</th>
                <th>Tổng chi phí</th>
                <th>Cọc đã thu</th>
                <th>Còn phải thu</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const finance = orderFinance(order);
                return (
                  <tr key={order.id} onClick={() => openOrder(order)}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{vnd(order.extraFeeVnd)}</td>
                    <td>{order.extraFeeNote}</td>
                    <td>{vnd(finance.totalCostVnd)}</td>
                    <td>{vnd(finance.depositVnd)}</td>
                    <td><span className="money-due">{vnd(finance.remainingVnd)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function OrdersView(props) {
  return (
    <div className="screen-stack">
      <FilterBar {...props} />
      <div className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">CRUD orders</span>
            <h2>Đơn hàng</h2>
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

function OrdersTable({ orders, batches, openOrder, compact, canSeeProfit }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Ngày</th>
            <th>Khách</th>
            <th>Sản phẩm<br /><span>Số lượng</span></th>
            <th>Tình trạng</th>
            <th>Chuyến bay</th>
            <th>Deadline mua</th>
            <th>Tổng thu</th>
            <th>Tổng chi phí</th>
            <th>Cọc đã thu</th>
            <th>Còn phải thu</th>
            {canSeeProfit && <th>Lãi</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const finance = orderFinance(order);
            const batch = batches.find((item) => item.id === order.batchId);
            return (
              <tr key={order.id} onClick={() => openOrder(order)}>
                <td><strong>{order.id}</strong><span>{order.source}</span></td>
                <td>{order.orderDate}</td>
                <td>{order.customer}<span>{order.phone}</span></td>
                <td>{order.product}<span>SL: {order.quantity}</span></td>
                <td><span className={`status-chip ${normalizeOrderStatus(order.status)}`}>{statusLabel(order.status)}</span></td>
                <td>{batch?.code || "Chưa xếp"}<span>{batch?.arrival ? `Về VN ${batch.arrival}` : ""}</span></td>
                <td>{batch?.cutoff || "-"}<span>{batch?.cutoff ? dateLabel(batch.cutoff) : ""}</span></td>
                <td>{vnd(finance.totalThuVnd)}</td>
                <td>{vnd(finance.totalCostVnd)}</td>
                <td>{vnd(finance.depositVnd)}</td>
                <td><span className="money-due">{vnd(finance.remainingVnd)}</span></td>
                {canSeeProfit && <td>{vnd(finance.profitVnd)}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
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
                    <td><strong>{customer.name}</strong></td>
                    <td>{customer.tier}</td>
                    <td>{customer.phone}</td>
                    <td>{customerOrders.length}</td>
                    <td>{vnd(revenue)}</td>
                    <td>{customer.note}</td>
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
                  <td><strong>{item.sku}</strong></td>
                  <td>{item.name}<span>{item.note}</span></td>
                  <td>{item.quantity}</td>
                  <td>{item.reserved}</td>
                  <td>{Math.max(money(item.quantity) - money(item.reserved), 0)}</td>
                  <td>{vnd(item.sellVnd)}</td>
                  <td>{item.location}</td>
                  <td>{item.status}</td>
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

function FlightsView({ batches, orders, openBatch, openOrder, canSeeProfit }) {
  const upcomingBatches = [...batches].sort((a, b) => String(a.departure || a.arrival || "").localeCompare(String(b.departure || b.arrival || "")));
  const totals = batches.reduce(
    (sum, batch) => {
      const batchOrders = orders.filter((order) => order.batchId === batch.id);
      sum.orders += batchOrders.length;
      sum.freightAud += money(batch.freightAud);
      sum.remaining += batchOrders.reduce((orderSum, order) => orderSum + orderFinance(order).remainingVnd, 0);
      sum.revenue += batchOrders.reduce((orderSum, order) => orderSum + orderFinance(order).totalThuVnd, 0);
      sum.cost += batchOrders.reduce((orderSum, order) => orderSum + orderFinance(order).totalCostVnd, 0);
      return sum;
    },
    { orders: 0, freightAud: 0, remaining: 0, revenue: 0, cost: 0 }
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
        <Kpi label="Cước bay AUD" value={aud(totals.freightAud)} icon={CreditCard} />
        <Kpi label="Còn phải thu" value={vnd(totals.remaining)} icon={WalletCards} tone="warning" />
        {canSeeProfit && <Kpi label="Lãi theo chuyến" value={vnd(totals.revenue - totals.cost)} icon={Gem} tone="success" />}
      </section>

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
                <th>Cutoff</th>
                <th>Ngày bay</th>
                <th>Ngày về VN</th>
                <th>Cước bay</th>
                <th>Order link</th>
                <th>Tổng thu</th>
                <th>Còn phải thu</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {upcomingBatches.map((batch) => {
                const batchOrders = orders.filter((order) => order.batchId === batch.id);
                const revenue = batchOrders.reduce((sum, order) => sum + orderFinance(order).totalThuVnd, 0);
                const remaining = batchOrders.reduce((sum, order) => sum + orderFinance(order).remainingVnd, 0);
                return (
                  <tr key={batch.id} onClick={() => openBatch(batch)}>
                    <td><strong>{batch.code || batch.id}</strong><span>{batch.route}</span></td>
                    <td><span className={`batch-chip ${batch.status}`}>{batchStatusLabel(batch.status)}</span></td>
                    <td>{batch.cutoff || "-"}</td>
                    <td>{batch.departure || "-"}</td>
                    <td>{batch.arrival || "-"}</td>
                    <td>{aud(batch.freightAud)}</td>
                    <td>{batchOrders.length}</td>
                    <td>{vnd(revenue)}</td>
                    <td><span className="money-due">{vnd(remaining)}</span></td>
                    <td>{batch.note}</td>
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
                <div><span>Bay</span><strong>{batch.departure || "-"}</strong></div>
                <div><span>Về VN</span><strong>{batch.arrival || "-"}</strong></div>
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
                  <td><strong>{batch.code || batch.id}</strong></td>
                  <td>{vnd(revenue)}</td>
                  <td>{vnd(deposit)}</td>
                  <td><span className="money-due">{vnd(remaining)}</span></td>
                  <td>{vnd(cost)}</td>
                  {canSeeProfit && <td>{vnd(revenue - cost)}</td>}
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
                  <td>{item.date}</td>
                  <td>{item.type === "in" ? "Thu" : "Chi"}</td>
                  <td>{vnd(item.amountVnd)}</td>
                  <td>{item.orderId}</td>
                  <td>{batches.find((batch) => batch.id === item.batchId)?.code ?? item.batchId}</td>
                  <td>{item.category}</td>
                  <td>{item.note}</td>
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

function OrderModal({ draft, setDraft, batches, accounts, customers, save, remove, close }) {
  const finance = orderFinance(draft);
  const selectedBatch = batches.find((batch) => batch.id === draft.batchId);
  return (
    <ModalShell title="Sửa / thêm đơn hàng" eyebrow="Order management" close={close}>
      <form onSubmit={save}>
        <div className="form-grid">
          <Field label="Mã đơn"><input value={draft.id} onChange={(event) => setDraft({ ...draft, id: event.target.value })} /></Field>
          <Field label="Ngày tạo"><input type="date" value={draft.orderDate} onChange={(event) => setDraft({ ...draft, orderDate: event.target.value })} /></Field>
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
          <Field label="Sản phẩm" wide><input value={draft.product} onChange={(event) => setDraft({ ...draft, product: event.target.value })} /></Field>
          <Field label="Số lượng"><input type="number" value={draft.quantity} onChange={(event) => setDraft({ ...draft, quantity: event.target.value })} /></Field>
          <Field label="Nguồn mua"><input value={draft.source} onChange={(event) => setDraft({ ...draft, source: event.target.value })} /></Field>
          <Field label="Chuyến bay">
            <select value={draft.batchId} onChange={(event) => setDraft({ ...draft, batchId: event.target.value })}>
              <option value="">Chưa xếp đợt</option>
              {batches.map((batch) => <option value={batch.id} key={batch.id}>{batch.code || batch.id}</option>)}
            </select>
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
          <Field label="Tiền hàng AUD"><input type="number" value={draft.aud} onChange={(event) => setDraft({ ...draft, aud: event.target.value })} /></Field>
          <Field label="Ship Úc AUD"><input type="number" value={draft.shippingAud} onChange={(event) => setDraft({ ...draft, shippingAud: event.target.value })} /></Field>
          <Field label="Cước bay AUD"><input type="number" value={draft.intlShippingAud} onChange={(event) => setDraft({ ...draft, intlShippingAud: event.target.value })} /></Field>
          <Field label="Tỉ giá"><input type="number" value={draft.exchangeRate} onChange={(event) => setDraft({ ...draft, exchangeRate: event.target.value })} /></Field>
          <Field label="Phụ phí VND"><input type="number" value={draft.extraFeeVnd} onChange={(event) => setDraft({ ...draft, extraFeeVnd: event.target.value })} /></Field>
          <Field label="Ghi chú phụ phí"><input value={draft.extraFeeNote} onChange={(event) => setDraft({ ...draft, extraFeeNote: event.target.value })} /></Field>
          <Field label="Tổng thu / Doanh số VND"><input type="number" value={draft.totalThuVnd} onChange={(event) => setDraft({ ...draft, totalThuVnd: event.target.value })} /></Field>
          <Field label="Cọc đã thu VND"><input type="number" value={draft.depositVnd} onChange={(event) => setDraft({ ...draft, depositVnd: event.target.value })} /></Field>
          <Field label="Note" wide><textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></Field>
        </div>
        <datalist id="customer-suggestions">
          {customers.map((customer) => <option value={customer.name} key={customer.id}>{customer.phone}</option>)}
        </datalist>
        <div className="auto-summary">
          <div><span>Tổng chi phí tự động</span><strong>{vnd(finance.totalCostVnd)}</strong></div>
          <div><span>Cọc đã thu</span><strong>{vnd(finance.depositVnd)}</strong></div>
          <div><span>Còn phải thu</span><strong>{vnd(finance.remainingVnd)}</strong></div>
        </div>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={close}>Hủy</button>
          <button className="danger-button" type="button" onClick={() => remove(draft.id)}><Trash2 size={16} /> Xóa</button>
          <button className="primary-button" type="submit"><CheckCircle2 size={17} /> Lưu đơn</button>
        </div>
      </form>
    </ModalShell>
  );
}

function BatchModal({ draft, setDraft, save, remove, close }) {
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

function SettingsModal({ accounts, currentAccountId, updateAccount, removeAccount, createAccount, close }) {
  return (
    <ModalShell title="Quản lý user & phân quyền" eyebrow="Admin settings" close={close}>
      <div className="settings-layout">
        <section className="user-list">
          {accounts.map((account) => (
            <article className="user-row" key={account.id}>
              <div className="user-card-head">
                <div className="user-identity">
                  <AccountAvatar account={account} />
                  <div><strong>{account.displayName}</strong><span>@{account.username} · {account.label}</span></div>
                </div>
                <label className="active-toggle"><input type="checkbox" checked={account.active} disabled={account.id === "ryan"} onChange={(event) => updateAccount(account.id, "active", event.target.checked)} /> Active</label>
              </div>
              <div className="user-fields-grid">
                <Field label="Username"><input value={account.username} disabled={account.id === "ryan"} onChange={(event) => updateAccount(account.id, "username", event.target.value)} /></Field>
                <Field label="Tên"><input value={account.displayName} onChange={(event) => updateAccount(account.id, "displayName", event.target.value)} /></Field>
                <Field label="Password"><input value={account.password} onChange={(event) => updateAccount(account.id, "password", event.target.value)} /></Field>
                <Field label="Role"><select value={account.role} onChange={(event) => updateAccount(account.id, "role", event.target.value)}><option value="admin">Admin</option><option value="general_manager">General Manager</option><option value="staff">Staff</option></select></Field>
                <Field label="Icon"><input value={account.initials} onChange={(event) => updateAccount(account.id, "initials", event.target.value.toUpperCase())} /></Field>
                <Field label="Màu"><input type="color" value={account.color} onChange={(event) => updateAccount(account.id, "color", event.target.value)} /></Field>
              </div>
              <div className="user-card-footer">
                <span>{account.id === "ryan" ? "Owner account được khóa." : roleLabel(account.role)}</span>
                <button className="danger-button" disabled={account.id === "ryan" || account.id === currentAccountId} onClick={() => removeAccount(account.id)}>Xóa user</button>
              </div>
            </article>
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
