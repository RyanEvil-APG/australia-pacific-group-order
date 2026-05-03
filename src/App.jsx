import React from "react";
import {
  ArrowUpRight,
  Bell,
  Boxes,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CreditCard,
  Filter,
  Gem,
  LineChart,
  LockKeyhole,
  LogOut,
  MapPin,
  PackageCheck,
  Plane,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShipWheel,
  Sparkles,
  TrendingUp,
  Truck,
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

const statusFlow = [
  { id: "quote", label: "Báo giá", icon: ClipboardList },
  { id: "deposit", label: "Đặt cọc", icon: WalletCards },
  { id: "purchased", label: "Đã mua", icon: PackageCheck },
  { id: "inTransit", label: "Bay về VN", icon: Plane },
  { id: "delivering", label: "Giao khách", icon: Truck },
  { id: "done", label: "Hoàn tất", icon: CheckCircle2 }
];

const initialBatches = [
  {
    id: "batch-260508",
    code: "DOT-08MAY-ADL",
    name: "Đợt 08/05 - Adelaide gom",
    route: "Adelaide/Melbourne -> TP.HCM",
    cutoff: "06/05 18:00",
    departure: "08/05",
    eta: "10/05",
    capacityKg: 45,
    status: "closed",
    note: "Đã chốt lô, chỉ xử lý cân nặng và tracking."
  },
  {
    id: "batch-260512",
    code: "DOT-12MAY-SYD",
    name: "Đợt 12/05 - Sydney express",
    route: "Sydney/Brisbane -> TP.HCM",
    cutoff: "10/05 20:00",
    departure: "12/05",
    eta: "14/05",
    capacityKg: 60,
    status: "open",
    note: "Ưu tiên hàng nhẹ, giá trị cao, khách đã cọc."
  },
  {
    id: "batch-260515",
    code: "DOT-15MAY-MIX",
    name: "Đợt 15/05 - Mixed cargo",
    route: "Perth/Adelaide -> Hà Nội",
    cutoff: "13/05 17:00",
    departure: "15/05",
    eta: "18/05",
    capacityKg: 70,
    status: "open",
    note: "Lô kế tiếp cho hàng chưa mua hoặc chờ gom."
  }
];

const initialOrders = [
  {
    id: "AU-260503-014",
    orderKind: "customer",
    customer: "Minh Anh",
    phone: "0908 221 884",
    product: "Aesop Resurrection Aromatique Hand Wash x 6",
    source: "Aesop Australia",
    city: "Melbourne",
    status: "inTransit",
    priority: "VIP",
    aud: 252,
    exchangeRate: 17120,
    serviceFee: 12,
    shippingAud: 31,
    intlShippingAud: 98,
    depositVnd: 4200000,
    outstandingVnd: 2840000,
    eta: "08/05",
    margin: 18.6,
    batchId: "batch-260508",
    assigneeId: "staff-vn",
    purchaserId: "ryan",
    weightKg: 4.8,
    tracking: "AUX-MEL-8841",
    note: "Khách cần bill rõ, đóng thùng chống móp."
  },
  {
    id: "AU-260503-013",
    orderKind: "customer",
    customer: "Gia Hân",
    phone: "0937 112 019",
    product: "Chemist Warehouse vitamins bundle",
    source: "Chemist Warehouse",
    city: "Sydney",
    status: "purchased",
    priority: "Standard",
    aud: 186,
    exchangeRate: 17150,
    serviceFee: 10,
    shippingAud: 22,
    intlShippingAud: 65,
    depositVnd: 3100000,
    outstandingVnd: 1600000,
    eta: "10/05",
    margin: 14.2,
    batchId: "batch-260512",
    assigneeId: "staff-vn",
    purchaserId: "staff-vn",
    weightKg: 3.2,
    tracking: "SYD-CW-9012",
    note: "Chờ gom đủ 5kg để tối ưu cước."
  },
  {
    id: "AU-260502-011",
    orderKind: "customer",
    customer: "Hoàng Nam",
    phone: "0912 441 552",
    product: "Dyson Airwrap Complete Long",
    source: "Dyson AU",
    city: "Adelaide",
    status: "purchased",
    priority: "High",
    aud: 899,
    exchangeRate: 17220,
    serviceFee: 8,
    shippingAud: 45,
    intlShippingAud: 92,
    depositVnd: 10500000,
    outstandingVnd: 7050000,
    eta: "12/05",
    margin: 11.4,
    batchId: "batch-260512",
    assigneeId: "ryan",
    purchaserId: "ryan",
    weightKg: 2.7,
    tracking: "ADL-DY-5520",
    note: "Đã mua sale, hàng giá trị cao cần kiểm kỹ bill và serial."
  },
  {
    id: "AU-260502-009",
    orderKind: "customer",
    customer: "Linh Tran",
    phone: "0981 702 335",
    product: "Country Road leather tote",
    source: "David Jones",
    city: "Perth",
    status: "deposit",
    priority: "VIP",
    aud: 329,
    exchangeRate: 17100,
    serviceFee: 15,
    shippingAud: 28,
    intlShippingAud: 52,
    depositVnd: 2500000,
    outstandingVnd: 4400000,
    eta: "Chờ mua",
    margin: 20.1,
    batchId: "batch-260515",
    assigneeId: "staff-vn",
    purchaserId: "staff-vn",
    weightKg: 1.4,
    tracking: "PTH-DJ-2235",
    note: "Xác nhận màu Black/Gold trước khi thanh toán."
  },
  {
    id: "AU-260501-006",
    orderKind: "customer",
    customer: "Bảo Ngọc",
    phone: "0903 881 921",
    product: "Apple Watch Series 10 GPS",
    source: "Apple Australia",
    city: "Brisbane",
    status: "delivering",
    priority: "High",
    aud: 649,
    exchangeRate: 17180,
    serviceFee: 9,
    shippingAud: 35,
    intlShippingAud: 61,
    depositVnd: 13850000,
    outstandingVnd: 0,
    eta: "Hôm nay",
    margin: 12.8,
    batchId: "batch-260508",
    assigneeId: "staff-vn",
    purchaserId: "ryan",
    weightKg: 1.1,
    tracking: "BNE-APL-1921",
    note: "Giao Q7 sau 18:00, thu phần còn lại tiền mặt."
  },
  {
    id: "AU-260430-003",
    orderKind: "ready_stock",
    customer: "Quốc Bảo",
    phone: "0974 118 777",
    product: "RM Williams Comfort Craftsman",
    source: "R.M.Williams",
    city: "Adelaide",
    status: "done",
    priority: "VIP",
    aud: 649,
    exchangeRate: 17080,
    serviceFee: 14,
    shippingAud: 39,
    intlShippingAud: 81,
    depositVnd: 14750000,
    outstandingVnd: 0,
    eta: "Đã giao",
    margin: 17.5,
    batchId: "batch-260508",
    assigneeId: "ryan",
    purchaserId: "ryan",
    weightKg: 2.3,
    tracking: "ADL-RMW-8777",
    note: "Khách hài lòng, nên chăm lại sau 30 ngày."
  }
];

const initialInventory = [
  {
    sku: "VN-AESOP-HW-500",
    name: "Aesop Hand Wash 500ml",
    onHand: 8,
    reserved: 2,
    location: "Q7 Ready Stock",
    sellVnd: 890000,
    ownerId: "staff-vn",
    status: "Sẵn bán"
  },
  {
    sku: "VN-CW-VIT-D3",
    name: "Vitamin D3 Chemist Warehouse",
    onHand: 14,
    reserved: 3,
    location: "Hà Nội Ready Stock",
    sellVnd: 320000,
    ownerId: "staff-vn",
    status: "Sẵn bán"
  },
  {
    sku: "VN-RMW-BOOT-42",
    name: "R.M.Williams Boots size 42",
    onHand: 1,
    reserved: 1,
    location: "Q7 Ready Stock",
    sellVnd: 7800000,
    ownerId: "ryan",
    status: "Giữ khách VIP"
  },
  {
    sku: "VN-APPLE-WATCH10",
    name: "Apple Watch Series 10",
    onHand: 2,
    reserved: 0,
    location: "Đà Nẵng Ready Stock",
    sellVnd: 12900000,
    ownerId: "general-manager",
    status: "Sẵn bán"
  }
];

const initialTasks = [
  {
    id: "task-dyson-quote",
    title: "Chốt báo giá Dyson",
    time: "17:45",
    dueDate: "Hôm nay",
    tone: "urgent",
    status: "open",
    assigneeId: "ryan",
    linkedOrderId: "AU-260502-011",
    detail: "Kiểm tra lại giá AUD, ship Úc, cước bay và còn phải thu trước khi báo khách."
  },
  {
    id: "task-melbourne-cash",
    title: "Kiểm tra thu/chi lô Melbourne",
    time: "18:20",
    dueDate: "Hôm nay",
    tone: "gold",
    status: "open",
    assigneeId: "general-manager",
    linkedOrderId: "batch-260508",
    detail: "So lại tiền đã thu, còn phải thu và chi phí cước bay trước khi chốt lô."
  },
  {
    id: "task-vip-bag-color",
    title: "Nhắn khách VIP xác nhận màu túi",
    time: "19:00",
    dueDate: "Hôm nay",
    tone: "green",
    status: "open",
    assigneeId: "staff-vn",
    linkedOrderId: "AU-260502-009",
    detail: "Xác nhận màu Black/Gold, note lại trong order sau khi khách phản hồi."
  }
];

const navItems = [
  { id: "overview", label: "Tổng quan", icon: LineChart, title: "Australia Pacific Group Order", eyebrow: "Australia Pacific Group" },
  { id: "orders", label: "Đơn hàng", icon: ClipboardList, title: "Đơn hàng", eyebrow: "Order operations" },
  { id: "vip", label: "Khách VIP", icon: UserRound, title: "Khách VIP", eyebrow: "Client care" },
  { id: "stock", label: "Hàng sẵn bán", icon: Boxes, title: "Hàng sẵn bán", eyebrow: "Ready stock" },
  { id: "freight", label: "Cước bay", icon: Plane, title: "Cước bay & chuyến ship", eyebrow: "Freight control" },
  { id: "cashflow", label: "Thu/chi", icon: CreditCard, title: "Thu/chi", eyebrow: "Cashflow control" }
];

const formatter = new Intl.NumberFormat("vi-VN");

function aud(value) {
  return `A$${formatter.format(value)}`;
}

function vnd(value) {
  return `${formatter.format(Math.round(value))}đ`;
}

function money(value) {
  return Number(value || 0);
}

function orderRate(order) {
  return money(order.exchangeRate) || exchangeRate;
}

function totalAud(order) {
  return money(order.aud) + money(order.shippingAud) + money(order.intlShippingAud);
}

function finance(order) {
  const rate = orderRate(order);
  const goodsAndShippingVnd = totalAud(order) * rate;
  const serviceFeeVnd = money(order.aud) * rate * (money(order.serviceFee) / 100);
  const estimatedTotalVnd = goodsAndShippingVnd + serviceFeeVnd;
  const manualOutstandingVnd = money(order.outstandingVnd);
  const cashInVnd = money(order.depositVnd);
  const customerTotalVnd = manualOutstandingVnd > 0 ? cashInVnd + manualOutstandingVnd : estimatedTotalVnd;
  const cashOutVnd = goodsAndShippingVnd;

  return {
    rate,
    goodsAndShippingVnd,
    serviceFeeVnd,
    estimatedTotalVnd,
    customerTotalVnd,
    cashInVnd,
    cashOutVnd,
    outstandingVnd: manualOutstandingVnd > 0 ? manualOutstandingVnd : Math.max(estimatedTotalVnd - cashInVnd, 0),
    grossProfitVnd: customerTotalVnd - cashOutVnd
  };
}

function totalVnd(order) {
  return finance(order).customerTotalVnd;
}

function updateOrderField(orders, orderId, field, value) {
  return orders.map((order) =>
    order.id === orderId
      ? {
          ...order,
          [field]: value
        }
      : order
  );
}

function normalizeInitials(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");
}

function statusLabel(id) {
  return statusFlow.find((status) => status.id === id)?.label ?? id;
}

function batchStatusLabel(status) {
  const labels = {
    open: "Đang mở",
    closed: "Đã chốt",
    inTransit: "Đang bay",
    arrived: "Đã về điểm nhận"
  };

  return labels[status] ?? status;
}

function roleLabel(role) {
  const labels = {
    admin: "Admin",
    general_manager: "General Manager",
    staff: "Staff"
  };

  return labels[role] ?? role;
}

function nearestOpenBatchId(batches) {
  return batches.find((batch) => batch.status === "open")?.id ?? batches[0]?.id;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function parseShortDate(value, baseDate = new Date()) {
  const match = String(value || "").match(/(\d{1,2})\/(\d{1,2})/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const date = new Date(baseDate.getFullYear(), month, day);

  if (date < addDays(startOfDay(baseDate), -20)) {
    date.setFullYear(date.getFullYear() + 1);
  }

  return date;
}

function shortDateLabel(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function weekdayLabel(date) {
  return new Intl.DateTimeFormat("vi-VN", { weekday: "short" }).format(date);
}

function buildMonthTimeline(batches, orders) {
  const today = startOfDay(new Date());
  const days = Array.from({ length: 30 }, (_, index) => {
    const date = addDays(today, index);
    return {
      date,
      key: dateKey(date),
      label: shortDateLabel(date),
      weekday: weekdayLabel(date),
      events: []
    };
  });
  const dayMap = new Map(days.map((day) => [day.key, day]));

  batches.forEach((batch) => {
    const batchOrders = orders.filter((order) => order.batchId === batch.id);
    const weightKg = batchOrders.reduce((sum, order) => sum + money(order.weightKg), 0);
    const valueVnd = batchOrders.reduce((sum, order) => sum + finance(order).customerTotalVnd, 0);
    const vipCount = batchOrders.filter((order) => order.priority === "VIP" || order.priority === "High").length;
    const milestones = [
      { type: "cutoff", label: "Chốt mua", value: batch.cutoff },
      { type: "fly", label: "Bay", value: batch.departure },
      { type: "arrive", label: "Về VN", value: batch.eta }
    ];

    milestones.forEach((milestone) => {
      const date = parseShortDate(milestone.value, today);
      const day = date ? dayMap.get(dateKey(date)) : null;
      if (!day) return;

      day.events.push({
        ...milestone,
        batch,
        orders: batchOrders,
        orderCount: batchOrders.length,
        weightKg,
        valueVnd,
        vipCount
      });
    });
  });

  return days;
}

function shipmentTimeline(batch) {
  if (!batch) {
    return [];
  }

  return [
    { label: "Lên đơn", value: "Hôm nay", tone: "done" },
    { label: "Đi mua", value: `Trước ${batch.cutoff}`, tone: batch.status === "open" ? "live" : "done" },
    { label: "Chốt chuyến", value: batch.cutoff, tone: batch.status === "open" ? "next" : "done" },
    { label: "Bay", value: batch.departure, tone: ["inTransit", "arrived"].includes(batch.status) ? "done" : "next" },
    { label: "Về VN", value: batch.eta, tone: batch.status === "arrived" ? "done" : "next" },
    { label: "Bán/giao", value: "Sau khi về kho", tone: "next" }
  ];
}

const storageKeys = {
  accounts: "apg-order.accounts",
  orders: "apg-order.orders",
  batches: "apg-order.batches",
  inventory: "apg-order.inventory",
  tasks: "apg-order.tasks",
  currentAccountId: "apg-order.currentAccountId",
  sessionToken: "apg-order.sessionToken"
};

function mergeById(defaultItems, storedItems) {
  if (!Array.isArray(storedItems)) {
    return defaultItems;
  }

  const storedById = new Map(storedItems.map((item) => [item.id ?? item.sku, item]));
  const defaultIds = new Set(defaultItems.map((item) => item.id ?? item.sku));
  const mergedDefaults = defaultItems.map((item) => ({
    ...item,
    ...(storedById.get(item.id ?? item.sku) ?? {})
  }));
  const customItems = storedItems.filter((item) => !defaultIds.has(item.id ?? item.sku));

  return [...mergedDefaults, ...customItems];
}

function readStoredState(key, fallback, normalize) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

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
      // Local persistence is a convenience layer; the app can still run without it.
    }
  }, [key, state]);

  return [state, setState];
}

function App() {
  const [accounts, setAccounts] = useStoredState(storageKeys.accounts, initialAccounts, (stored) =>
    mergeById(initialAccounts, stored)
  );
  const [currentAccountId, setCurrentAccountId] = useStoredState(storageKeys.currentAccountId, null);
  const [sessionToken, setSessionToken] = useStoredState(storageKeys.sessionToken, null);
  const [activeView, setActiveView] = React.useState("overview");
  const [loginForm, setLoginForm] = React.useState({ username: "", password: "" });
  const [loginError, setLoginError] = React.useState("");
  const [syncStatus, setSyncStatus] = React.useState("local");
  const [orders, setOrders] = useStoredState(storageKeys.orders, initialOrders);
  const [batches, setBatches] = useStoredState(storageKeys.batches, initialBatches);
  const [inventory, setInventory] = useStoredState(storageKeys.inventory, initialInventory);
  const [tasks, setTasks] = useStoredState(storageKeys.tasks, initialTasks, (stored) => mergeById(initialTasks, stored));
  const [selectedBatchId, setSelectedBatchId] = React.useState(initialBatches[0].id);
  const [activeStatus, setActiveStatus] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [selectedOrderId, setSelectedOrderId] = React.useState(initialOrders[0].id);
  const [selectedTaskId, setSelectedTaskId] = React.useState(initialTasks[0].id);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isTaskOpen, setIsTaskOpen] = React.useState(false);
  const [taskDraft, setTaskDraft] = React.useState({
    title: "",
    time: "",
    dueDate: "Hôm nay",
    tone: "gold",
    assigneeId: "staff-vn",
    linkedOrderId: "",
    detail: ""
  });
  const [userDraft, setUserDraft] = React.useState({
    username: "",
    password: "",
    displayName: "",
    role: "staff",
    initials: "",
    color: "#11664f"
  });
  const [draft, setDraft] = React.useState({
    customer: "",
    orderKind: "customer",
    phone: "",
    product: "",
    source: "",
    city: "Adelaide",
    priority: "Standard",
    batchId: nearestOpenBatchId(initialBatches),
    assigneeId: "staff-vn",
    purchaserId: "staff-vn",
    weightKg: "",
    exchangeRate: String(exchangeRate),
    aud: "",
    shippingAud: "",
    intlShippingAud: "",
    depositVnd: "",
    outstandingVnd: "",
    serviceFee: "10",
    note: ""
  });

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? orders[0];
  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? tasks[0];
  const selectedBatch = batches.find((batch) => batch.id === selectedBatchId) ?? batches[0];
  const visibleOrders = orders.filter((order) => {
    const matchesStatus = activeStatus === "all" || order.status === activeStatus;
    const matchesBatch = selectedBatchId === "all" || order.batchId === selectedBatchId;
    const searchable = `${order.id} ${order.customer} ${order.product} ${order.source}`.toLowerCase();
    return matchesStatus && matchesBatch && searchable.includes(query.toLowerCase());
  });

  const revenue = orders.reduce((sum, order) => sum + finance(order).customerTotalVnd, 0);
  const expectedMargin = orders.reduce((sum, order) => sum + finance(order).grossProfitVnd, 0);
  const cashIn = orders.reduce((sum, order) => sum + finance(order).cashInVnd, 0);
  const cashOut = orders.reduce((sum, order) => sum + finance(order).cashOutVnd, 0);
  const activeOrders = orders.filter((order) => order.status !== "done").length;
  const selectedBatchOrders = selectedBatchId === "all" ? orders : orders.filter((order) => order.batchId === selectedBatchId);
  const selectedBatchWeight = selectedBatchOrders.reduce((sum, order) => sum + order.weightKg, 0);
  const selectedBatchValue = selectedBatchOrders.reduce((sum, order) => sum + finance(order).customerTotalVnd, 0);
  const selectedBatchCashIn = selectedBatchOrders.reduce((sum, order) => sum + finance(order).cashInVnd, 0);
  const selectedBatchCashOut = selectedBatchOrders.reduce((sum, order) => sum + finance(order).cashOutVnd, 0);
  const selectedBatchProfit = selectedBatchOrders.reduce((sum, order) => sum + finance(order).grossProfitVnd, 0);
  const selectedFinance = finance(selectedOrder);
  const nearestBatch = batches.find((batch) => batch.id === nearestOpenBatchId(batches)) ?? batches[0];
  const activeTimelineBatch = selectedBatchId === "all" ? nearestBatch : selectedBatch;
  const activeAccount = accounts.find((account) => account.id === currentAccountId) ?? accounts[0];
  const isAdmin = activeAccount.role === "admin";
  const isGeneralManager = activeAccount.role === "general_manager";
  const canSeeProfit = isAdmin || isGeneralManager;
  const canManageUsers = isAdmin;
  const activeTasks = tasks.filter((task) => task.status !== "done");
  const activeViewMeta = navItems.find((item) => item.id === activeView) ?? navItems[0];
  const vipOrders = orders.filter((order) => order.priority === "VIP" || order.priority === "High");
  const readyStockOrders = orders.filter((order) => order.orderKind === "ready_stock");
  const receivableOrders = orders.filter((order) => finance(order).outstandingVnd > 0);
  const freightTotalAud = orders.reduce((sum, order) => sum + money(order.intlShippingAud), 0);
  const freightTotalVnd = orders.reduce((sum, order) => sum + money(order.intlShippingAud) * orderRate(order), 0);
  const stockAvailable = inventory.reduce((sum, item) => sum + Math.max(item.onHand - item.reserved, 0), 0);
  const stockRetailValue = inventory.reduce((sum, item) => sum + Math.max(item.onHand - item.reserved, 0) * money(item.sellVnd), 0);
  const monthTimeline = buildMonthTimeline(batches, orders);
  const upcomingMilestones = monthTimeline
    .flatMap((day) => day.events.map((event) => ({ ...event, day })))
    .sort((left, right) => left.day.date - right.day.date);
  const upcomingArrivals = upcomingMilestones.filter((event) => event.type === "arrive").slice(0, 5);
  const upcomingCutoffs = upcomingMilestones.filter((event) => event.type === "cutoff").slice(0, 5);

  function applyServerState(serverState) {
    if (!serverState) return;
    if (Array.isArray(serverState.accounts) && serverState.accounts.length) setAccounts(serverState.accounts);
    if (Array.isArray(serverState.orders) && serverState.orders.length) setOrders(serverState.orders);
    if (Array.isArray(serverState.batches) && serverState.batches.length) setBatches(serverState.batches);
    if (Array.isArray(serverState.inventory) && serverState.inventory.length) setInventory(serverState.inventory);
    if (Array.isArray(serverState.tasks)) setTasks(serverState.tasks);
  }

  React.useEffect(() => {
    if (currentAccountId && !accounts.some((account) => account.id === currentAccountId && account.active)) {
      setCurrentAccountId(null);
      setSessionToken(null);
    }
  }, [accounts, currentAccountId, setCurrentAccountId, setSessionToken]);

  React.useEffect(() => {
    if (!sessionToken || !currentAccountId) return;

    let ignore = false;
    fetch("/api/state", {
      headers: { Authorization: `Bearer ${sessionToken}` }
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("session expired");
        }
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
  }, [sessionToken, currentAccountId, setCurrentAccountId, setSessionToken]);

  React.useEffect(() => {
    if (!sessionToken || !currentAccountId) return;

    const timeout = window.setTimeout(() => {
      fetch("/api/state", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ state: { accounts, orders, batches, inventory, tasks } })
      })
        .then((response) => {
          if (response.status === 401) {
            throw new Error("session expired");
          }
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
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [sessionToken, currentAccountId, accounts, orders, batches, inventory, tasks, setCurrentAccountId, setSessionToken]);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });

      if (response.ok) {
        const data = await response.json();
        setSessionToken(data.token);
        setLoginError("");
        setCurrentAccountId(data.account.id);
        applyServerState(data.state);
        setSyncStatus("cloud");
        return;
      }
    } catch {
      setSyncStatus("local");
    }

    const account = accounts.find(
      (item) =>
        item.active &&
        item.username.trim().toLowerCase() === loginForm.username.trim().toLowerCase() &&
        item.password === loginForm.password
    );

    if (!account) {
      setLoginError("Sai username/password hoặc user đang bị tắt.");
      return;
    }

    setLoginError("");
    setSessionToken(null);
    setCurrentAccountId(account.id);
  }

  function handleLogout() {
    if (sessionToken) {
      fetch("/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${sessionToken}` }
      }).catch(() => {});
    }
    setSessionToken(null);
    setCurrentAccountId(null);
    setIsSettingsOpen(false);
  }

  function handleCreateOrder(event) {
    event.preventDefault();
    const nextOrder = {
      id: `AU-${new Date().toISOString().slice(2, 10).replaceAll("-", "")}-${String(orders.length + 15).padStart(3, "0")}`,
      customer: draft.customer || "Khách mới",
      orderKind: draft.orderKind,
      phone: draft.phone || "Chưa có SĐT",
      product: draft.product || "Order hàng Úc mới",
      source: draft.source || "Nguồn mua cần xác nhận",
      city: draft.city,
      status: "quote",
      priority: draft.priority,
      batchId: draft.batchId,
      assigneeId: draft.assigneeId,
      purchaserId: draft.purchaserId,
      weightKg: Number(draft.weightKg || 0),
      aud: Number(draft.aud || 0),
      exchangeRate: Number(draft.exchangeRate || exchangeRate),
      serviceFee: Number(draft.serviceFee || 10),
      shippingAud: Number(draft.shippingAud || 0),
      intlShippingAud: Number(draft.intlShippingAud || 0),
      depositVnd: Number(draft.depositVnd || 0),
      outstandingVnd: Number(draft.outstandingVnd || 0),
      eta: "Chờ chốt",
      margin: 12,
      tracking: "Chưa tạo",
      note: draft.note || "Order mới cần xác nhận giá, cọc và nguồn hàng trước khi mua."
    };

    setOrders((current) => [nextOrder, ...current]);
    setSelectedOrderId(nextOrder.id);
    setActiveStatus("all");
    setIsCreateOpen(false);
    setDraft({
      customer: "",
      orderKind: "customer",
      phone: "",
      product: "",
      source: "",
      city: "Adelaide",
      priority: "Standard",
      batchId: nearestOpenBatchId(batches),
      assigneeId: activeAccount.role === "staff" ? activeAccount.id : "staff-vn",
      purchaserId: activeAccount.role === "staff" ? activeAccount.id : "staff-vn",
      weightKg: "",
      exchangeRate: String(exchangeRate),
      aud: "",
      shippingAud: "",
      intlShippingAud: "",
      depositVnd: "",
      outstandingVnd: "",
      serviceFee: "10",
      note: ""
    });
  }

  function advanceSelectedOrder() {
    const currentIndex = statusFlow.findIndex((status) => status.id === selectedOrder.status);
    const nextStatus = statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)]?.id;

    setOrders((current) =>
      current.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              status: nextStatus,
              eta: nextStatus === "done" ? "Đã giao" : order.eta
            }
          : order
      )
    );
  }

  function updateBatchStatus(batchId, nextStatus) {
    setBatches((current) =>
      current.map((batch) =>
        batch.id === batchId
          ? {
              ...batch,
              status: nextStatus
            }
          : batch
      )
    );
  }

  function updateSelectedOrderBatch(nextBatchId) {
    setOrders((current) =>
      current.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              batchId: nextBatchId
            }
          : order
      )
    );
  }

  function updateSelectedOrderAssignee(nextAssigneeId) {
    setOrders((current) => updateOrderField(current, selectedOrder.id, "assigneeId", nextAssigneeId));
  }

  function updateSelectedOrderPurchaser(nextPurchaserId) {
    setOrders((current) => updateOrderField(current, selectedOrder.id, "purchaserId", nextPurchaserId));
  }

  function updateSelectedOrderMoney(field, value) {
    setOrders((current) => updateOrderField(current, selectedOrder.id, field, Number(value || 0)));
  }

  function updateSelectedOrderNote(value) {
    setOrders((current) => updateOrderField(current, selectedOrder.id, "note", value));
  }

  function openTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    setSelectedTaskId(task.id);
    setTaskDraft({
      title: task.title,
      time: task.time,
      dueDate: task.dueDate,
      tone: task.tone,
      assigneeId: task.assigneeId,
      linkedOrderId: task.linkedOrderId ?? "",
      detail: task.detail ?? ""
    });
    setIsTaskOpen(true);
  }

  function openNewTask() {
    setSelectedTaskId(null);
    setTaskDraft({
      title: "",
      time: "",
      dueDate: "Hôm nay",
      tone: "gold",
      assigneeId: activeAccount.role === "staff" ? activeAccount.id : "staff-vn",
      linkedOrderId: selectedOrder?.id ?? "",
      detail: ""
    });
    setIsTaskOpen(true);
  }

  function saveTask(event) {
    event.preventDefault();
    const title = taskDraft.title.trim();
    if (!title) return;

    if (selectedTaskId) {
      setTasks((current) =>
        current.map((task) =>
          task.id === selectedTaskId
            ? {
                ...task,
                ...taskDraft,
                title
              }
            : task
        )
      );
    } else {
      const nextTask = {
        id: `task-${Date.now().toString(36)}`,
        ...taskDraft,
        title,
        status: "open"
      };
      setTasks((current) => [nextTask, ...current]);
      setSelectedTaskId(nextTask.id);
    }

    setIsTaskOpen(false);
  }

  function toggleTaskDone(taskId) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "done" ? "open" : "done"
            }
          : task
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    setIsTaskOpen(false);
  }

  function getBatch(orderBatchId) {
    return batches.find((batch) => batch.id === orderBatchId);
  }

  function getAccount(accountId) {
    return accounts.find((account) => account.id === accountId) ?? accounts[0];
  }

  function handleCreateUser(event) {
    event.preventDefault();
    const username = userDraft.username.trim();
    const displayName = userDraft.displayName.trim() || username;

    if (!username || !userDraft.password) {
      return;
    }

    const exists = accounts.some((account) => account.username.toLowerCase() === username.toLowerCase());
    if (exists) {
      return;
    }

    const nextUser = {
      id: `${username.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
      username,
      password: userDraft.password,
      displayName,
      role: userDraft.role,
      label: roleLabel(userDraft.role),
      color: userDraft.color,
      initials: userDraft.initials.trim().toUpperCase() || normalizeInitials(displayName || username),
      active: true
    };

    setAccounts((current) => [...current, nextUser]);
    setUserDraft({
      username: "",
      password: "",
      displayName: "",
      role: "staff",
      initials: "",
      color: "#11664f"
    });
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

  function removeAccount(accountId) {
    if (accountId === "ryan" || accountId === currentAccountId) {
      return;
    }

    setAccounts((current) => current.filter((account) => account.id !== accountId));
    setOrders((current) =>
      current.map((order) =>
        order.assigneeId === accountId
          ? {
              ...order,
              assigneeId: "ryan"
            }
          : order
      )
    );
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
              <input
                value={loginForm.username}
                onChange={(event) => setLoginForm({ ...loginForm, username: event.target.value })}
                placeholder="ryan"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                placeholder="••••••"
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

        <nav className="nav-list" aria-label="Điều hướng chính">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              className={activeView === id ? "nav-item active" : "nav-item"}
              key={id}
              onClick={() => setActiveView(id)}
              type="button"
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="concierge-card">
          <div className="visual-route" aria-hidden="true">
            <span className="pin au">AU</span>
            <span className="pin vn">VN</span>
            <span className="route-line" />
          </div>
          <p>Luxury Ops Standard</p>
          <strong>Gom lô, giữ margin, báo khách rõ từng chặng.</strong>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">{activeViewMeta.eyebrow}</span>
            <h1>{activeViewMeta.title}</h1>
          </div>
          <div className="top-actions">
            <div className="account-chip">
              <AccountAvatar account={activeAccount} />
              <div>
                <strong>{activeAccount.username}</strong>
                <span>{activeAccount.label} · {syncStatus === "cloud" ? "Cloud sync" : "Local"}</span>
              </div>
            </div>
            {canManageUsers && (
              <button className="icon-button" aria-label="Cài đặt user" onClick={() => setIsSettingsOpen(true)}>
                <Settings size={18} />
              </button>
            )}
            <button
              className={activeView === "notifications" ? "icon-button active" : "icon-button"}
              aria-label="Thông báo"
              onClick={() => setActiveView("notifications")}
            >
              <Bell size={18} />
            </button>
            <button className="icon-button" aria-label="Đăng xuất" onClick={handleLogout}>
              <LogOut size={18} />
            </button>
            <button className="primary-button" onClick={() => setIsCreateOpen(true)}>
              <Plus size={18} />
              Tạo order
            </button>
          </div>
        </header>

        {activeView === "overview" && (
          <>
        <section className="hero-grid">
          <div className="command-panel">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Live control room</span>
                <h2>Vận hành trong ngày</h2>
              </div>
              <span className="rate-pill">AUD/VND {formatter.format(exchangeRate)}</span>
            </div>

            <div className="metric-grid">
              <Metric label="Phải thu khách" value={vnd(revenue)} trend="Theo tỉ giá từng đơn" icon={TrendingUp} />
              <Metric label="Tiền đã thu" value={vnd(cashIn)} trend="Tiền cọc đã nhận" icon={ShieldCheck} />
              <Metric label="Tiền đã chi" value={vnd(cashOut)} trend="Hàng + ship Úc + cước bay" icon={CreditCard} />
              {canSeeProfit ? (
                <Metric label="Lãi gộp dự kiến" value={vnd(expectedMargin)} trend={`${activeOrders} order đang chạy`} icon={Sparkles} />
              ) : (
                <Metric label="Order đang chạy" value={String(activeOrders)} trend="Đã ẩn lãi/lỗ" icon={Clock3} />
              )}
            </div>
          </div>

          <div className="priority-panel">
            <div className="panel-head compact">
              <div>
                <h2>Việc cần xử lý</h2>
                <span>{activeTasks.length} việc đang mở</span>
              </div>
              <button className="mini-icon-button" type="button" onClick={openNewTask} aria-label="Thêm việc">
                <Plus size={17} />
              </button>
            </div>
            <div className="task-list">
              {activeTasks.slice(0, 5).map((task) => (
                <button className="task-row" key={task.id} type="button" onClick={() => openTask(task.id)}>
                  <span className={`task-dot ${task.tone}`} />
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.dueDate} · {task.time} · {getAccount(task.assigneeId).displayName}</p>
                  </div>
                  <ArrowUpRight size={16} />
                </button>
              ))}
              {!activeTasks.length && (
                <button className="task-row empty-task" type="button" onClick={openNewTask}>
                  <span className="task-dot green" />
                  <div>
                    <strong>Chưa có việc đang mở</strong>
                    <p>Bấm để tạo việc cho team.</p>
                  </div>
                  <Plus size={16} />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="month-planner-section">
          <div className="timeline-board-head">
            <div>
              <span className="eyebrow">30-day shipment calendar</span>
              <h2>Timeline hàng sắp chốt, bay và về VN</h2>
            </div>
            <div className="timeline-legend">
              <span><i className="legend-dot cutoff" /> Chốt mua</span>
              <span><i className="legend-dot fly" /> Bay</span>
              <span><i className="legend-dot arrive" /> Về VN</span>
            </div>
          </div>

          <div className="month-timeline-scroll" aria-label="Timeline 30 ngày">
            <div className="month-timeline-grid">
              {monthTimeline.map((day, index) => {
                const eventTypes = new Set(day.events.map((event) => event.type));
                return (
                  <div className={index === 0 ? "month-day today" : "month-day"} key={day.key}>
                    <div className="month-day-head">
                      <span>{day.weekday}</span>
                      <strong>{day.label}</strong>
                    </div>
                    <div className="month-event-dots">
                      {["cutoff", "fly", "arrive"].map((type) => (
                        <span className={eventTypes.has(type) ? `month-dot ${type} active` : `month-dot ${type}`} key={type} />
                      ))}
                    </div>
                    <div className="month-event-list">
                      {day.events.slice(0, 2).map((event) => (
                        <div className={`month-event ${event.type}`} key={`${event.batch.id}-${event.type}`}>
                          <span>{event.label}</span>
                          <strong>{event.batch.code}</strong>
                          <em>{event.orderCount} đơn · {event.weightKg.toFixed(1)}kg</em>
                        </div>
                      ))}
                      {day.events.length > 2 && <p>+{day.events.length - 2} mốc nữa</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="arrival-action-grid">
            <div className="arrival-panel">
              <div className="panel-head compact">
                <div>
                  <span className="eyebrow">Incoming stock</span>
                  <h2>Sắp về VN</h2>
                </div>
                <PackageCheck size={18} />
              </div>
              <div className="arrival-list">
                {upcomingArrivals.map((event) => (
                  <div className="arrival-row" key={`${event.batch.id}-${event.type}`}>
                    <div>
                      <strong>{event.day.label} · {event.batch.code}</strong>
                      <span>{event.batch.route}</span>
                    </div>
                    <em>{event.orderCount} đơn · {event.weightKg.toFixed(1)}kg</em>
                    <p>{vnd(event.valueVnd)} · {event.vipCount} VIP/High</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="arrival-panel">
              <div className="panel-head compact">
                <div>
                  <span className="eyebrow">Buying deadline</span>
                  <h2>Cần mua trước cutoff</h2>
                </div>
                <Clock3 size={18} />
              </div>
              <div className="arrival-list">
                {upcomingCutoffs.map((event) => (
                  <div className="arrival-row deadline" key={`${event.batch.id}-${event.type}`}>
                    <div>
                      <strong>{event.day.label} · {event.batch.code}</strong>
                      <span>{event.batch.note}</span>
                    </div>
                    <em>{event.orders.filter((order) => ["quote", "deposit", "purchased"].includes(order.status)).length} đơn cần kiểm</em>
                    <p>Bay {event.batch.departure} · ETA {event.batch.eta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="status-board">
          {statusFlow.map((status) => {
            const count = orders.filter((order) => order.status === status.id).length;
            const Icon = status.icon;
            return (
              <button
                className={activeStatus === status.id ? "status-tile selected" : "status-tile"}
                key={status.id}
                onClick={() => setActiveStatus(status.id)}
              >
                <Icon size={18} />
                <span>{status.label}</span>
                <strong>{count}</strong>
              </button>
            );
          })}
        </section>

        <section className="batch-section">
          <div className="batch-head">
            <div>
              <span className="eyebrow">Shipment batches</span>
              <h2>Quản lý theo từng đợt hàng</h2>
            </div>
            <button className="ghost-button" onClick={() => setSelectedBatchId("all")}>
              <Filter size={17} />
              Tất cả đợt
            </button>
          </div>

          <div className="batch-grid">
            {batches.map((batch) => {
              const batchOrders = orders.filter((order) => order.batchId === batch.id);
              const batchWeight = batchOrders.reduce((sum, order) => sum + order.weightKg, 0);
              const batchValue = batchOrders.reduce((sum, order) => sum + finance(order).customerTotalVnd, 0);
              const batchCashIn = batchOrders.reduce((sum, order) => sum + finance(order).cashInVnd, 0);
              const fillRate = Math.min(100, Math.round((batchWeight / batch.capacityKg) * 100));

              return (
                <button
                  className={selectedBatchId === batch.id ? "batch-card selected" : "batch-card"}
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.id)}
                >
                  <div className="batch-card-head">
                    <div>
                      <strong>{batch.name}</strong>
                      <span>{batch.code}</span>
                    </div>
                    <em className={`batch-chip ${batch.status}`}>{batchStatusLabel(batch.status)}</em>
                  </div>
                  <div className="batch-route">
                    <Plane size={16} />
                    <span>{batch.route}</span>
                  </div>
                  <div className="batch-stats">
                    <div>
                      <span>Order</span>
                      <strong>{batchOrders.length}</strong>
                    </div>
                    <div>
                      <span>Kg</span>
                      <strong>
                        {batchWeight.toFixed(1)}/{batch.capacityKg}
                      </strong>
                    </div>
                    <div>
                      <span>Giá trị</span>
                      <strong>{vnd(batchValue)}</strong>
                    </div>
                  </div>
                  <div className="batch-cashline">
                    <span>Đã thu</span>
                    <strong>{vnd(batchCashIn)}</strong>
                    <em>{vnd(batchValue - batchCashIn)} còn phải thu</em>
                  </div>
                  <div className="capacity-bar" aria-label={`Sức chứa ${fillRate}%`}>
                    <span style={{ width: `${fillRate}%` }} />
                  </div>
                  <div className="batch-footer">
                    <span>Chốt {batch.cutoff}</span>
                    <span>Bay {batch.departure}</span>
                  </div>
                  <div className="batch-actions">
                    {batch.status === "open" ? (
                      <span
                        className="batch-action"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateBatchStatus(batch.id, "closed");
                        }}
                      >
                        Chốt đợt
                      </span>
                    ) : (
                      <span
                        className="batch-action muted"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateBatchStatus(batch.id, "open");
                        }}
                      >
                        Mở lại
                      </span>
                    )}
                    {batch.status === "closed" && (
                      <span
                        className="batch-action"
                        onClick={(event) => {
                          event.stopPropagation();
                          updateBatchStatus(batch.id, "inTransit");
                        }}
                      >
                        Cho bay
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="batch-summary">
            <div>
              <span>Đợt đang xem</span>
              <strong>{selectedBatchId === "all" ? "Tất cả đợt hàng" : selectedBatch.name}</strong>
            </div>
            <div>
              <span>Số order</span>
              <strong>{selectedBatchOrders.length}</strong>
            </div>
            <div>
              <span>Tổng kg</span>
              <strong>{selectedBatchWeight.toFixed(1)}kg</strong>
            </div>
            <div>
              <span>Giá trị lô</span>
              <strong>{vnd(selectedBatchValue)}</strong>
            </div>
            <div>
              <span>Tiền vào</span>
              <strong>{vnd(selectedBatchCashIn)}</strong>
            </div>
            <div>
              <span>Tiền ra</span>
              <strong>{vnd(selectedBatchCashOut)}</strong>
            </div>
            {canSeeProfit && (
              <div>
                <span>Lãi gộp</span>
                <strong>{vnd(selectedBatchProfit)}</strong>
              </div>
            )}
          </div>

          <div className="shipment-timeline-board">
            <div className="timeline-board-head">
              <div>
                <span className="eyebrow">Purchase timing</span>
                <h2>{activeTimelineBatch.name}</h2>
              </div>
              <span className="rate-pill">Nên mua trước {activeTimelineBatch.cutoff}</span>
            </div>
            <div className="timeline-board-grid">
              {shipmentTimeline(activeTimelineBatch).map((item) => (
                <div className={`timeline-board-step ${item.tone}`} key={`${item.label}-${item.value}`}>
                  <span />
                  <strong>{item.label}</strong>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="inventory-section">
          <div className="batch-head">
            <div>
              <span className="eyebrow">Available stock</span>
              <h2>Hàng sẵn bán</h2>
            </div>
            <span className="rate-pill">
              {inventory.reduce((sum, item) => sum + Math.max(item.onHand - item.reserved, 0), 0)} món có thể bán
            </span>
          </div>
          <div className="inventory-grid">
            {inventory.map((item) => (
              <div className="inventory-card" key={item.sku}>
                <div className="inventory-head">
                  <strong>{item.name}</strong>
                  <span>{item.status}</span>
                </div>
                <div className="inventory-meta">
                  <span>{item.sku}</span>
                  <span>{item.location}</span>
                </div>
                <div className="inventory-numbers">
                  <div>
                    <span>Sẵn bán</span>
                    <strong>{Math.max(item.onHand - item.reserved, 0)}</strong>
                  </div>
                  <div>
                    <span>Đang giữ</span>
                    <strong>{item.reserved}</strong>
                  </div>
                  <div>
                    <span>Giá bán</span>
                    <strong>{vnd(item.sellVnd)}</strong>
                  </div>
                  <div>
                    <span>Quản lý</span>
                    <div className="assignee-cell">
                      <AccountAvatar account={getAccount(item.ownerId)} />
                      <span>{getAccount(item.ownerId).displayName}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="operations-layout">
          <div className="orders-panel">
            <div className="table-toolbar">
              <div className="search-box">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm mã đơn, khách, sản phẩm..."
                />
              </div>
              <button className="ghost-button" onClick={() => setActiveStatus("all")}>
                <Filter size={17} />
                Tất cả
              </button>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Đợt hàng</th>
                    <th>Phụ trách</th>
                    <th>Người mua</th>
                    <th>Khách hàng</th>
                    <th>Sản phẩm</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                    <th>Dòng tiền</th>
                    <th>ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleOrders.map((order) => (
                    <tr
                      className={selectedOrder.id === order.id ? "active-row" : ""}
                      key={order.id}
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <td>
                        <strong>{order.id}</strong>
                        <span>{order.tracking}</span>
                      </td>
                      <td>
                        <strong>{getBatch(order.batchId)?.code ?? "Chưa xếp"}</strong>
                        <span>{order.weightKg.toFixed(1)}kg</span>
                      </td>
                      <td>
                        <div className="assignee-cell">
                          <AccountAvatar account={getAccount(order.assigneeId)} />
                          <span>{getAccount(order.assigneeId).displayName}</span>
                        </div>
                      </td>
                      <td>
                        <div className="assignee-cell">
                          <AccountAvatar account={getAccount(order.purchaserId)} />
                          <span>{getAccount(order.purchaserId).displayName}</span>
                        </div>
                        <span>Mua trước {getBatch(order.batchId)?.cutoff ?? "chưa xếp chuyến"}</span>
                      </td>
                      <td>
                        {order.customer}
                        <span>{order.phone}</span>
                      </td>
                      <td>
                        {order.product}
                        <span>{order.source}</span>
                      </td>
                      <td>
                        <span className={`status-chip ${order.status}`}>{statusLabel(order.status)}</span>
                      </td>
                      <td>
                        {vnd(totalVnd(order))}
                        <span>{aud(totalAud(order))} x {formatter.format(orderRate(order))}</span>
                      </td>
                      <td>
                        <strong>{vnd(finance(order).cashInVnd)}</strong>
                        <span>Còn {vnd(finance(order).outstandingVnd)}</span>
                      </td>
                      <td>{order.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="detail-panel">
            <div className="detail-header">
              <div>
                <span className="eyebrow">Order dossier</span>
                <h2>{selectedOrder.id}</h2>
              </div>
              <span className="vip-badge">{selectedOrder.priority}</span>
            </div>

            <div className="customer-card">
              <div className="avatar">{selectedOrder.customer.slice(0, 1)}</div>
              <div>
                <strong>{selectedOrder.customer}</strong>
                <span>{selectedOrder.phone}</span>
              </div>
            </div>

            <div className="owner-card">
              <AccountAvatar account={getAccount(selectedOrder.assigneeId)} />
              <div>
                <span>Staff phụ trách</span>
                <strong>{getAccount(selectedOrder.assigneeId).displayName}</strong>
              </div>
            </div>

            <div className="owner-card purchase-owner">
              <AccountAvatar account={getAccount(selectedOrder.purchaserId)} />
              <div>
                <span>Người đi mua</span>
                <strong>{getAccount(selectedOrder.purchaserId).displayName}</strong>
                <p>Mua trước {getBatch(selectedOrder.batchId)?.cutoff ?? "khi có chuyến gần nhất"}</p>
              </div>
            </div>

            <div className="detail-list">
              <Detail icon={ClipboardList} label="Loại đơn" value={selectedOrder.orderKind === "ready_stock" ? "Mua sẵn để bán" : "Order khách"} />
              <Detail icon={ShipWheel} label="Nguồn mua" value={selectedOrder.source} />
              <Detail icon={MapPin} label="Thành phố gom" value={selectedOrder.city} />
              <Detail icon={Boxes} label="Đợt hàng" value={getBatch(selectedOrder.batchId)?.code ?? "Chưa xếp"} />
              <Detail icon={Plane} label="Tracking" value={selectedOrder.tracking} />
              <Detail icon={WalletCards} label="Đặt cọc" value={vnd(selectedOrder.depositVnd)} />
            </div>

            <label className="inline-select">
              Xếp order vào đợt
              <select value={selectedOrder.batchId} onChange={(event) => updateSelectedOrderBatch(event.target.value)}>
                {batches.map((batch) => (
                  <option value={batch.id} key={batch.id}>
                    {batch.code} - {batchStatusLabel(batch.status)}
                  </option>
                ))}
              </select>
            </label>

            <label className="inline-select">
              Giao cho Staff
              <select
                value={selectedOrder.assigneeId}
                onChange={(event) => updateSelectedOrderAssignee(event.target.value)}
              >
                {accounts
                  .filter((account) => account.active)
                  .map((account) => (
                    <option value={account.id} key={account.id}>
                      {account.displayName} - {account.label}
                    </option>
                  ))}
              </select>
            </label>

            <label className="inline-select">
              Gán người đi mua
              <select
                value={selectedOrder.purchaserId}
                onChange={(event) => updateSelectedOrderPurchaser(event.target.value)}
              >
                {accounts
                  .filter((account) => account.active)
                  .map((account) => (
                    <option value={account.id} key={account.id}>
                      {account.displayName} - {account.label}
                    </option>
                  ))}
              </select>
            </label>

            <div className="quote-card">
                  <div>
                    <span>Giá hàng</span>
                    <strong>{aud(selectedOrder.aud)}</strong>
                  </div>
                  <div>
                    <span>Ship nội địa Úc</span>
                    <strong>{aud(selectedOrder.shippingAud)}</strong>
                  </div>
                  <div>
                    <span>Tỉ giá chốt</span>
                    <strong>{formatter.format(orderRate(selectedOrder))}</strong>
                  </div>
                  <div>
                    <span>Cước bay về VN</span>
                    <strong>{aud(selectedOrder.intlShippingAud)}</strong>
                  </div>
                  <div>
                    <span>Phí dịch vụ {selectedOrder.serviceFee}%</span>
                    <strong>{vnd(selectedFinance.serviceFeeVnd)}</strong>
                  </div>
                  <div className="quote-total">
                    <span>Khách cần thanh toán</span>
                    <strong>{vnd(selectedFinance.customerTotalVnd)}</strong>
                  </div>
            </div>

            <div className="cashflow-card">
                  <div className="cashflow-row in">
                    <span>Đã thu</span>
                    <strong>{vnd(selectedFinance.cashInVnd)}</strong>
                  </div>
                  <div className="cashflow-row out">
                    <span>Đã chi / cần chi</span>
                    <strong>{vnd(selectedFinance.cashOutVnd)}</strong>
                  </div>
                  <div className="cashflow-row due">
                    <span>Còn phải thu</span>
                    <strong>{vnd(selectedFinance.outstandingVnd)}</strong>
                  </div>
                  {canSeeProfit ? (
                    <div className="cashflow-row profit">
                      <span>Lãi gộp dự kiến</span>
                      <strong>{vnd(selectedFinance.grossProfitVnd)}</strong>
                    </div>
                  ) : (
                    <div className="cashflow-row hidden-profit">
                      <span>Lãi/lỗ</span>
                      <strong>Đã ẩn</strong>
                    </div>
                  )}
            </div>

            <div className="finance-editor">
                  <label>
                    Tỉ giá chốt
                    <input
                      inputMode="decimal"
                      value={selectedOrder.exchangeRate}
                      onChange={(event) => updateSelectedOrderMoney("exchangeRate", event.target.value)}
                    />
                  </label>
                  <label>
                    Tiền hàng AUD
                    <input
                      inputMode="decimal"
                      value={selectedOrder.aud}
                      onChange={(event) => updateSelectedOrderMoney("aud", event.target.value)}
                    />
                  </label>
                  <label>
                    Ship Úc AUD
                    <input
                      inputMode="decimal"
                      value={selectedOrder.shippingAud}
                      onChange={(event) => updateSelectedOrderMoney("shippingAud", event.target.value)}
                    />
                  </label>
                  <label>
                    Cước bay AUD
                    <input
                      inputMode="decimal"
                      value={selectedOrder.intlShippingAud}
                      onChange={(event) => updateSelectedOrderMoney("intlShippingAud", event.target.value)}
                    />
                  </label>
                  <label>
                    Đã cọc VNĐ
                    <input
                      inputMode="decimal"
                      value={selectedOrder.depositVnd}
                      onChange={(event) => updateSelectedOrderMoney("depositVnd", event.target.value)}
                    />
                  </label>
                  <label>
                    Còn phải thu VNĐ
                    <input
                      inputMode="decimal"
                      value={selectedFinance.outstandingVnd}
                      onChange={(event) => updateSelectedOrderMoney("outstandingVnd", event.target.value)}
                    />
                  </label>
            </div>

            {!canSeeProfit && (
              <div className="staff-lock-card">
                <ShieldCheck size={18} />
                <div>
                  <strong>Đang đăng nhập {activeAccount.username} - quyền Staff</strong>
                  <span>Chỉ ẩn lãi/lỗ. Tỉ giá, chi phí và dòng tiền vẫn hiển thị để xử lý đơn.</span>
                </div>
              </div>
            )}

            <div className="timeline">
              {statusFlow.map((status) => {
                const selectedIndex = statusFlow.findIndex((item) => item.id === selectedOrder.status);
                const itemIndex = statusFlow.findIndex((item) => item.id === status.id);
                return (
                  <div className={itemIndex <= selectedIndex ? "timeline-item done" : "timeline-item"} key={status.id}>
                    <span />
                    <p>{status.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="detail-actions">
              <button className="primary-button" onClick={advanceSelectedOrder}>
                <ArrowUpRight size={17} />
                Chuyển chặng kế tiếp
              </button>
            </div>

            <div className="note-box">
              <span>Ghi chú vận hành</span>
              <textarea
                value={selectedOrder.note}
                onChange={(event) => updateSelectedOrderNote(event.target.value)}
                aria-label="Ghi chú vận hành"
              />
            </div>
          </aside>
        </section>
          </>
        )}

        {activeView === "orders" && (
          <OrdersFocusView
            orders={orders}
            batches={batches}
            accounts={accounts}
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
            query={query}
            setQuery={setQuery}
            selectedOrder={selectedOrder}
            setSelectedOrderId={setSelectedOrderId}
            getBatch={getBatch}
            getAccount={getAccount}
            canSeeProfit={canSeeProfit}
            setIsCreateOpen={setIsCreateOpen}
          />
        )}

        {activeView === "vip" && (
          <VipFocusView
            orders={vipOrders}
            getBatch={getBatch}
            getAccount={getAccount}
            canSeeProfit={canSeeProfit}
          />
        )}

        {activeView === "stock" && (
          <StockFocusView
            inventory={inventory}
            readyStockOrders={readyStockOrders}
            getAccount={getAccount}
            stockAvailable={stockAvailable}
            stockRetailValue={stockRetailValue}
          />
        )}

        {activeView === "freight" && (
          <FreightFocusView
            batches={batches}
            orders={orders}
            getAccount={getAccount}
            updateBatchStatus={updateBatchStatus}
            freightTotalAud={freightTotalAud}
            freightTotalVnd={freightTotalVnd}
          />
        )}

        {activeView === "cashflow" && (
          <CashflowFocusView
            orders={orders}
            batches={batches}
            canSeeProfit={canSeeProfit}
            cashIn={cashIn}
            cashOut={cashOut}
            revenue={revenue}
            expectedMargin={expectedMargin}
            receivableOrders={receivableOrders}
          />
        )}

        {activeView === "notifications" && (
          <NotificationsFocusView
            tasks={tasks}
            orders={orders}
            batches={batches}
            receivableOrders={receivableOrders}
            getBatch={getBatch}
            getAccount={getAccount}
            openTask={openTask}
            openNewTask={openNewTask}
            toggleTaskDone={toggleTaskDone}
          />
        )}
      </main>

      {isSettingsOpen && canManageUsers && (
        <div className="modal-backdrop" role="presentation">
          <div className="order-modal user-settings-modal">
            <div className="modal-head">
              <div>
                <span className="eyebrow">Admin settings</span>
                <h2>Quản lý user & phân quyền</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Đóng"
              >
                ×
              </button>
            </div>

            <div className="settings-summary-grid">
              <div>
                <span>Active users</span>
                <strong>{accounts.filter((account) => account.active).length}/{accounts.length}</strong>
              </div>
              <div>
                <span>Admin</span>
                <strong>{accounts.filter((account) => account.role === "admin").length}</strong>
              </div>
              <div>
                <span>General Manager</span>
                <strong>{accounts.filter((account) => account.role === "general_manager").length}</strong>
              </div>
              <div>
                <span>Staff</span>
                <strong>{accounts.filter((account) => account.role === "staff").length}</strong>
              </div>
            </div>

            <div className="settings-layout">
              <section className="user-list">
                {accounts.map((account) => (
                  <article className={account.active ? "user-row" : "user-row disabled-user"} key={account.id}>
                    <div className="user-card-head">
                      <div className="user-identity">
                        <AccountAvatar account={account} />
                        <div>
                          <strong>{account.displayName}</strong>
                          <span>@{account.username} · {account.label}</span>
                        </div>
                      </div>
                      <label className="active-toggle">
                        <input
                          type="checkbox"
                          checked={account.active}
                          disabled={account.id === "ryan"}
                          onChange={(event) => updateAccount(account.id, "active", event.target.checked)}
                        />
                        Active
                      </label>
                    </div>

                    <div className="user-fields-grid">
                      <label>
                        Username
                        <input
                          value={account.username}
                          disabled={account.id === "ryan"}
                          onChange={(event) => updateAccount(account.id, "username", event.target.value)}
                        />
                      </label>
                      <label>
                        Tên hiển thị
                        <input
                          value={account.displayName}
                          onChange={(event) => updateAccount(account.id, "displayName", event.target.value)}
                        />
                      </label>
                      <label>
                        Password
                        <input
                          value={account.password}
                          onChange={(event) => updateAccount(account.id, "password", event.target.value)}
                        />
                      </label>
                      <label>
                        Role
                        <select value={account.role} onChange={(event) => updateAccount(account.id, "role", event.target.value)}>
                          <option value="admin">Admin</option>
                          <option value="general_manager">General Manager</option>
                          <option value="staff">Staff</option>
                        </select>
                      </label>
                      <label>
                        Icon
                        <input
                          value={account.initials}
                          maxLength={3}
                          onChange={(event) => updateAccount(account.id, "initials", event.target.value.toUpperCase())}
                        />
                      </label>
                      <label>
                        Màu icon
                        <input
                          type="color"
                          value={account.color}
                          onChange={(event) => updateAccount(account.id, "color", event.target.value)}
                        />
                      </label>
                    </div>

                    <div className="user-card-footer">
                      <span>{account.id === "ryan" ? "Owner account được khóa để tránh mất quyền quản trị." : roleLabel(account.role)}</span>
                      <button
                        className="danger-button"
                        type="button"
                        disabled={account.id === "ryan" || account.id === currentAccountId}
                        onClick={() => removeAccount(account.id)}
                      >
                        Xóa user
                      </button>
                    </div>
                  </article>
                ))}
              </section>

              <aside className="settings-side-panel">
                <form className="add-user-form" onSubmit={handleCreateUser}>
                  <div>
                    <span className="eyebrow">New user</span>
                    <h3>Thêm tài khoản vận hành</h3>
                  </div>
                  <div className="add-user-grid">
                    <label>
                      Username
                      <input
                        value={userDraft.username}
                        onChange={(event) => setUserDraft({ ...userDraft, username: event.target.value })}
                        placeholder="staff.hn"
                      />
                    </label>
                    <label>
                      Password
                      <input
                        value={userDraft.password}
                        onChange={(event) => setUserDraft({ ...userDraft, password: event.target.value })}
                        placeholder="Mật khẩu"
                      />
                    </label>
                    <label>
                      Tên hiển thị
                      <input
                        value={userDraft.displayName}
                        onChange={(event) => setUserDraft({ ...userDraft, displayName: event.target.value })}
                        placeholder="Hà Nội Ops"
                      />
                    </label>
                    <label>
                      Role
                      <select value={userDraft.role} onChange={(event) => setUserDraft({ ...userDraft, role: event.target.value })}>
                        <option value="staff">Staff</option>
                        <option value="general_manager">General Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </label>
                    <label>
                      Icon
                      <input
                        value={userDraft.initials}
                        maxLength={3}
                        onChange={(event) => setUserDraft({ ...userDraft, initials: event.target.value.toUpperCase() })}
                        placeholder="HN"
                      />
                    </label>
                    <label>
                      Màu icon
                      <input
                        type="color"
                        value={userDraft.color}
                        onChange={(event) => setUserDraft({ ...userDraft, color: event.target.value })}
                      />
                    </label>
                  </div>
                  <button className="primary-button" type="submit">
                    <Plus size={17} />
                    Thêm user
                  </button>
                </form>

                <div className="role-guide">
                  <div>
                    <ShieldCheck size={17} />
                    <strong>Admin</strong>
                    <span>Toàn quyền, quản lý user và xem lãi/lỗ.</span>
                  </div>
                  <div>
                    <Gem size={17} />
                    <strong>General Manager</strong>
                    <span>Xem vận hành và lãi/lỗ, không chỉnh user.</span>
                  </div>
                  <div>
                    <UserRound size={17} />
                    <strong>Staff</strong>
                    <span>Xử lý đơn, chi phí, timeline; ẩn lãi/lỗ.</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {isTaskOpen && (
        <div className="modal-backdrop" role="presentation">
          <form className="order-modal task-modal" onSubmit={saveTask}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">Task board</span>
                <h2>{selectedTaskId ? "Sửa việc cần xử lý" : "Thêm việc cần xử lý"}</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setIsTaskOpen(false)} aria-label="Đóng">
                ×
              </button>
            </div>

            <div className="task-modal-grid">
              <label className="wide">
                Tiêu đề việc
                <input
                  value={taskDraft.title}
                  onChange={(event) => setTaskDraft({ ...taskDraft, title: event.target.value })}
                  placeholder="Ví dụ: Nhắc khách chuyển khoản còn lại"
                />
              </label>
              <label>
                Ngày hạn
                <input
                  value={taskDraft.dueDate}
                  onChange={(event) => setTaskDraft({ ...taskDraft, dueDate: event.target.value })}
                  placeholder="Hôm nay / 08/05"
                />
              </label>
              <label>
                Giờ hạn
                <input
                  value={taskDraft.time}
                  onChange={(event) => setTaskDraft({ ...taskDraft, time: event.target.value })}
                  placeholder="17:30"
                />
              </label>
              <label>
                Mức ưu tiên
                <select value={taskDraft.tone} onChange={(event) => setTaskDraft({ ...taskDraft, tone: event.target.value })}>
                  <option value="urgent">Gấp</option>
                  <option value="gold">Quan trọng</option>
                  <option value="green">Bình thường</option>
                </select>
              </label>
              <label>
                Gán cho
                <select
                  value={taskDraft.assigneeId}
                  onChange={(event) => setTaskDraft({ ...taskDraft, assigneeId: event.target.value })}
                >
                  {accounts
                    .filter((account) => account.active)
                    .map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.displayName} - {account.label}
                      </option>
                    ))}
                </select>
              </label>
              <label className="wide">
                Liên kết order/chuyến
                <input
                  value={taskDraft.linkedOrderId}
                  onChange={(event) => setTaskDraft({ ...taskDraft, linkedOrderId: event.target.value })}
                  placeholder="AU-... hoặc DOT-..."
                />
              </label>
              <label className="wide">
                Ghi chú xử lý
                <textarea
                  value={taskDraft.detail}
                  onChange={(event) => setTaskDraft({ ...taskDraft, detail: event.target.value })}
                  placeholder="Ghi rõ cần làm gì, cần check bill/tiền/cutoff nào..."
                />
              </label>
            </div>

            <div className="task-modal-actions">
              {selectedTaskId && selectedTask && (
                <>
                  <button className="ghost-button" type="button" onClick={() => toggleTaskDone(selectedTask.id)}>
                    <CheckCircle2 size={17} />
                    {selectedTask.status === "done" ? "Mở lại" : "Đánh dấu xong"}
                  </button>
                  <button className="danger-button" type="button" onClick={() => deleteTask(selectedTask.id)}>
                    Xóa việc
                  </button>
                </>
              )}
              <button className="primary-button" type="submit">
                <Plus size={17} />
                Lưu việc
              </button>
            </div>
          </form>
        </div>
      )}

      {isCreateOpen && (
        <div className="modal-backdrop" role="presentation">
          <form className="order-modal" onSubmit={handleCreateOrder}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">New dossier</span>
                <h2>Tạo order hàng Úc</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setIsCreateOpen(false)} aria-label="Đóng">
                ×
              </button>
            </div>

            <div className="form-grid">
              <label>
                Khách hàng
                <input
                  value={draft.customer}
                  onChange={(event) => setDraft({ ...draft, customer: event.target.value })}
                  placeholder="Tên khách"
                />
              </label>
              <label>
                Loại đơn
                <select
                  value={draft.orderKind}
                  onChange={(event) => setDraft({ ...draft, orderKind: event.target.value })}
                >
                  <option value="customer">Order khách</option>
                  <option value="ready_stock">Mua sẵn để bán</option>
                </select>
              </label>
              <label>
                Số điện thoại
                <input
                  value={draft.phone}
                  onChange={(event) => setDraft({ ...draft, phone: event.target.value })}
                  placeholder="09..."
                />
              </label>
              <label className="wide">
                Sản phẩm
                <input
                  value={draft.product}
                  onChange={(event) => setDraft({ ...draft, product: event.target.value })}
                  placeholder="Tên món khách cần order"
                />
              </label>
              <label>
                Nguồn mua
                <input
                  value={draft.source}
                  onChange={(event) => setDraft({ ...draft, source: event.target.value })}
                  placeholder="Website/cửa hàng"
                />
              </label>
              <label>
                Thành phố gom
                <select value={draft.city} onChange={(event) => setDraft({ ...draft, city: event.target.value })}>
                  <option>Adelaide</option>
                  <option>Melbourne</option>
                  <option>Sydney</option>
                  <option>Brisbane</option>
                  <option>Perth</option>
                </select>
              </label>
              <label>
                Xếp vào đợt
                <select
                  value={draft.batchId}
                  onChange={(event) => setDraft({ ...draft, batchId: event.target.value })}
                >
                  {batches.map((batch) => (
                    <option value={batch.id} key={batch.id}>
                      {batch.code} - {batchStatusLabel(batch.status)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Staff phụ trách
                <select
                  value={draft.assigneeId}
                  onChange={(event) => setDraft({ ...draft, assigneeId: event.target.value })}
                >
                  {accounts
                    .filter((account) => account.active)
                    .map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.displayName} - {account.label}
                      </option>
                  ))}
                </select>
              </label>
              <label>
                Người đi mua
                <select
                  value={draft.purchaserId}
                  onChange={(event) => setDraft({ ...draft, purchaserId: event.target.value })}
                >
                  {accounts
                    .filter((account) => account.active)
                    .map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.displayName} - {account.label}
                      </option>
                    ))}
                </select>
              </label>
              <label className="wide">
                Chuyến ship gần nhất
                <input
                  value={`${getBatch(draft.batchId)?.code ?? "Chưa xếp"} - mua trước ${getBatch(draft.batchId)?.cutoff ?? "chưa có giờ chốt"}`}
                  readOnly
                />
              </label>
              <label>
                Cân nặng kg
                <input
                  inputMode="decimal"
                  value={draft.weightKg}
                  onChange={(event) => setDraft({ ...draft, weightKg: event.target.value })}
                  placeholder="0.0"
                />
              </label>
              <>
                <label>
                    Giá AUD
                    <input
                      inputMode="decimal"
                      value={draft.aud}
                      onChange={(event) => setDraft({ ...draft, aud: event.target.value })}
                      placeholder="0"
                    />
                  </label>
                  <label>
                    Ship nội địa Úc AUD
                    <input
                      inputMode="decimal"
                      value={draft.shippingAud}
                      onChange={(event) => setDraft({ ...draft, shippingAud: event.target.value })}
                      placeholder="0"
                    />
                  </label>
                  <label>
                    Tỉ giá chốt
                    <input
                      inputMode="decimal"
                      value={draft.exchangeRate}
                      onChange={(event) => setDraft({ ...draft, exchangeRate: event.target.value })}
                      placeholder="17150"
                    />
                  </label>
                  <label>
                    Cước bay AUD
                    <input
                      inputMode="decimal"
                      value={draft.intlShippingAud}
                      onChange={(event) => setDraft({ ...draft, intlShippingAud: event.target.value })}
                      placeholder="0"
                    />
                  </label>
                  <label>
                    Đã cọc VNĐ
                    <input
                      inputMode="decimal"
                      value={draft.depositVnd}
                      onChange={(event) => setDraft({ ...draft, depositVnd: event.target.value })}
                      placeholder="0"
                    />
                  </label>
                  <label>
                    Còn phải thu VNĐ
                    <input
                      inputMode="decimal"
                      value={draft.outstandingVnd}
                      onChange={(event) => setDraft({ ...draft, outstandingVnd: event.target.value })}
                      placeholder="0"
                    />
                  </label>
                  <label>
                    Phí dịch vụ %
                    <input
                      inputMode="decimal"
                      value={draft.serviceFee}
                      onChange={(event) => setDraft({ ...draft, serviceFee: event.target.value })}
                    />
                </label>
              </>
              <label>
                Ưu tiên
                <select
                  value={draft.priority}
                  onChange={(event) => setDraft({ ...draft, priority: event.target.value })}
                >
                  <option>Standard</option>
                  <option>High</option>
                  <option>VIP</option>
                </select>
              </label>
              <label className="wide">
                Note
                <textarea
                  value={draft.note}
                  onChange={(event) => setDraft({ ...draft, note: event.target.value })}
                  placeholder="Ghi chú cọc, bill, màu, size, cách giao, rủi ro..."
                />
              </label>
            </div>

            <div className="modal-actions">
              <button className="ghost-button" type="button" onClick={() => setIsCreateOpen(false)}>
                Hủy
              </button>
              <button className="primary-button" type="submit">
                <Plus size={17} />
                Lưu order
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function OrdersFocusView({
  orders,
  batches,
  accounts,
  activeStatus,
  setActiveStatus,
  query,
  setQuery,
  selectedOrder,
  setSelectedOrderId,
  getBatch,
  getAccount,
  canSeeProfit,
  setIsCreateOpen
}) {
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = activeStatus === "all" || order.status === activeStatus;
    const searchable = `${order.id} ${order.customer} ${order.product} ${order.source} ${order.tracking}`.toLowerCase();
    return matchesStatus && searchable.includes(query.toLowerCase());
  });
  const pendingPurchase = orders.filter((order) => ["quote", "deposit"].includes(order.status)).length;
  const purchasedNotFlown = orders.filter((order) => order.status === "purchased").length;
  const dueCollection = orders.reduce((sum, order) => sum + finance(order).outstandingVnd, 0);

  return (
    <div className="focused-view">
      <section className="focus-hero">
        <Metric label="Tổng order" value={String(orders.length)} trend={`${pendingPurchase} đơn cần chốt/mua`} icon={ClipboardList} />
        <Metric label="Đã mua chờ bay" value={String(purchasedNotFlown)} trend="Kiểm tra bill, cân nặng, tracking" icon={PackageCheck} />
        <Metric label="Còn phải thu" value={vnd(dueCollection)} trend="Ưu tiên thu trước khi giao" icon={WalletCards} />
        <Metric
          label={canSeeProfit ? "Lãi gộp đang chạy" : "Quyền Staff"}
          value={canSeeProfit ? vnd(orders.reduce((sum, order) => sum + finance(order).grossProfitVnd, 0)) : "Đã ẩn"}
          trend={canSeeProfit ? "Theo tỉ giá từng đơn" : "Không hiển thị lãi/lỗ"}
          icon={ShieldCheck}
        />
      </section>

      <section className="status-board focus-status">
        <button className={activeStatus === "all" ? "status-tile selected" : "status-tile"} onClick={() => setActiveStatus("all")}>
          <Filter size={18} />
          <span>Tất cả</span>
          <strong>{orders.length}</strong>
        </button>
        {statusFlow.map((status) => {
          const Icon = status.icon;
          const count = orders.filter((order) => order.status === status.id).length;
          return (
            <button
              className={activeStatus === status.id ? "status-tile selected" : "status-tile"}
              key={status.id}
              onClick={() => setActiveStatus(status.id)}
            >
              <Icon size={18} />
              <span>{status.label}</span>
              <strong>{count}</strong>
            </button>
          );
        })}
      </section>

      <section className="operations-layout">
        <div className="orders-panel">
          <div className="table-toolbar">
            <div className="search-box">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm mã đơn, khách, sản phẩm, tracking..." />
            </div>
            <button className="primary-button" onClick={() => setIsCreateOpen(true)}>
              <Plus size={17} />
              Tạo order
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách</th>
                  <th>Sản phẩm</th>
                  <th>Chuyến</th>
                  <th>Staff</th>
                  <th>Người mua</th>
                  <th>Tiền</th>
                  <th>Trạng thái</th>
                  <th>Note nhanh</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr className={selectedOrder.id === order.id ? "active-row" : ""} key={order.id} onClick={() => setSelectedOrderId(order.id)}>
                    <td>
                      <strong>{order.id}</strong>
                      <span>{order.tracking}</span>
                    </td>
                    <td>
                      {order.customer}
                      <span>{order.phone}</span>
                    </td>
                    <td>
                      {order.product}
                      <span>{order.source}</span>
                    </td>
                    <td>
                      <strong>{getBatch(order.batchId)?.code ?? "Chưa xếp"}</strong>
                      <span>Mua trước {getBatch(order.batchId)?.cutoff ?? "khi có chuyến"}</span>
                    </td>
                    <td>
                      <div className="assignee-cell">
                        <AccountAvatar account={getAccount(order.assigneeId)} />
                        <span>{getAccount(order.assigneeId).displayName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="assignee-cell">
                        <AccountAvatar account={getAccount(order.purchaserId)} />
                        <span>{getAccount(order.purchaserId).displayName}</span>
                      </div>
                    </td>
                    <td>
                      <strong>{vnd(finance(order).customerTotalVnd)}</strong>
                      <span>Còn thu {vnd(finance(order).outstandingVnd)}</span>
                    </td>
                    <td>
                      <span className={`status-chip ${order.status}`}>{statusLabel(order.status)}</span>
                    </td>
                    <td>{order.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="detail-panel">
          <div className="detail-header">
            <div>
              <span className="eyebrow">Order workflow</span>
              <h2>Chuẩn xử lý</h2>
            </div>
            <Clock3 size={18} />
          </div>
          {[
            ["1. Báo giá", "Chốt AUD, ship Úc, cước bay, tỉ giá và còn phải thu."],
            ["2. Cọc", "Không mua hàng giá trị cao nếu chưa có cọc hoặc duyệt của Ryan."],
            ["3. Mua hàng", "Gán người mua, lưu bill, kiểm size/màu/serial trước cutoff chuyến."],
            ["4. Gom chuyến", "Xếp đúng đợt bay, cân kg, tạo tracking và note rủi ro."],
            ["5. Thu cuối", "Đối chiếu còn phải thu trước khi giao khách ở VN."],
            ["6. Hoàn tất", "Đánh dấu done, cập nhật note chăm lại khách tốt."]
          ].map(([title, body]) => (
            <div className="process-card" key={title}>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          ))}
          <div className="note-box">
            <span>Team đang active</span>
            <p>{accounts.filter((account) => account.active).map((account) => `${account.displayName} (${account.label})`).join(", ")}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function VipFocusView({ orders, getBatch, getAccount, canSeeProfit }) {
  const totalVipValue = orders.reduce((sum, order) => sum + finance(order).customerTotalVnd, 0);
  const vipReceivable = orders.reduce((sum, order) => sum + finance(order).outstandingVnd, 0);
  const vipProfit = orders.reduce((sum, order) => sum + finance(order).grossProfitVnd, 0);

  return (
    <div className="focused-view">
      <section className="focus-hero">
        <Metric label="Khách ưu tiên" value={String(orders.length)} trend="VIP + High priority" icon={UserRound} />
        <Metric label="Doanh số VIP" value={vnd(totalVipValue)} trend="Giá trị cần chăm sát" icon={Gem} />
        <Metric label="Còn phải thu" value={vnd(vipReceivable)} trend="Nhắc lịch trước khi giao" icon={WalletCards} />
        <Metric label={canSeeProfit ? "Lãi VIP" : "Lãi/lỗ"} value={canSeeProfit ? vnd(vipProfit) : "Đã ẩn"} trend="Chỉ admin/GM xem" icon={Sparkles} />
      </section>

      <section className="vip-grid">
        {orders.map((order) => (
          <article className="vip-card" key={order.id}>
            <div className="vip-card-head">
              <div>
                <span>{order.priority}</span>
                <h2>{order.customer}</h2>
              </div>
              <span className={`status-chip ${order.status}`}>{statusLabel(order.status)}</span>
            </div>
            <p>{order.product}</p>
            <div className="vip-contact-grid">
              <Detail icon={ClipboardList} label="Mã đơn" value={order.id} />
              <Detail icon={WalletCards} label="Còn thu" value={vnd(finance(order).outstandingVnd)} />
              <Detail icon={Plane} label="Chuyến" value={getBatch(order.batchId)?.code ?? "Chưa xếp"} />
              <Detail icon={UserRound} label="Staff" value={getAccount(order.assigneeId).displayName} />
            </div>
            <div className="client-plan">
              <strong>Kịch bản chăm sóc</strong>
              <p>Gửi update khi mua xong, khi hàng lên chuyến, khi về VN và sau giao 7 ngày. Với khách VIP luôn nhắn kèm hình bill/tracking nếu có.</p>
            </div>
            <div className="note-box">
              <span>Ghi chú khách</span>
              <p>{order.note}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function StockFocusView({ inventory, readyStockOrders, getAccount, stockAvailable, stockRetailValue }) {
  const reservedCount = inventory.reduce((sum, item) => sum + item.reserved, 0);

  return (
    <div className="focused-view">
      <section className="focus-hero">
        <Metric label="Sẵn bán" value={`${stockAvailable} món`} trend="Có thể chốt ngay tại VN" icon={Boxes} />
        <Metric label="Đang giữ" value={`${reservedCount} món`} trend="Cần thu cọc hoặc mở bán lại" icon={ShieldCheck} />
        <Metric label="Giá trị bán lẻ" value={vnd(stockRetailValue)} trend="Theo giá niêm yết hiện tại" icon={TrendingUp} />
        <Metric label="Order từ hàng sẵn" value={String(readyStockOrders.length)} trend="Theo dõi bán tồn" icon={PackageCheck} />
      </section>

      <section className="stock-layout">
        <div className="orders-panel">
          <div className="table-toolbar">
            <div>
              <span className="eyebrow">Inventory</span>
              <h2>Danh sách hàng sẵn bán tại VN</h2>
            </div>
          </div>
          <div className="table-wrap">
            <table className="compact-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Sản phẩm</th>
                  <th>Kho/điểm giữ</th>
                  <th>Tồn</th>
                  <th>Đang giữ</th>
                  <th>Có thể bán</th>
                  <th>Giá bán</th>
                  <th>Phụ trách</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.sku}>
                    <td><strong>{item.sku}</strong></td>
                    <td>
                      {item.name}
                      <span>{item.status}</span>
                    </td>
                    <td>{item.location}</td>
                    <td>{item.onHand}</td>
                    <td>{item.reserved}</td>
                    <td><strong>{Math.max(item.onHand - item.reserved, 0)}</strong></td>
                    <td>{vnd(item.sellVnd)}</td>
                    <td>
                      <div className="assignee-cell">
                        <AccountAvatar account={getAccount(item.ownerId)} />
                        <span>{getAccount(item.ownerId).displayName}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="detail-panel">
          <div className="detail-header">
            <div>
              <span className="eyebrow">Stock standard</span>
              <h2>Quy trình bán hàng sẵn</h2>
            </div>
            <Boxes size={18} />
          </div>
          {[
            ["Giữ hàng", "Chỉ giữ khi khách xác nhận và có deadline thu cọc."],
            ["Mở bán lại", "Quá 24h chưa cọc thì báo Ryan/GM để mở bán."],
            ["Giao VN", "Kiểm ảnh thật, tình trạng hộp, serial nếu là đồ điện tử."],
            ["Note tồn", "Ghi rõ kho giữ hàng, người giữ, tình trạng seal/hộp."]
          ].map(([title, body]) => (
            <div className="process-card" key={title}>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}

function FreightFocusView({ batches, orders, getAccount, updateBatchStatus, freightTotalAud, freightTotalVnd }) {
  return (
    <div className="focused-view">
      <section className="focus-hero">
        <Metric label="Số chuyến" value={String(batches.length)} trend="Theo từng đợt chốt hàng" icon={Plane} />
        <Metric label="Tổng cước bay" value={aud(freightTotalAud)} trend={vnd(freightTotalVnd)} icon={CreditCard} />
        <Metric label="Tổng cân nặng" value={`${orders.reduce((sum, order) => sum + order.weightKg, 0).toFixed(1)}kg`} trend="Theo order đã nhập" icon={Boxes} />
        <Metric label="Chờ gom" value={String(orders.filter((order) => order.status === "purchased").length)} trend="Đã mua nhưng chưa bay" icon={Clock3} />
      </section>

      <section className="batch-grid freight-grid">
        {batches.map((batch) => {
          const batchOrders = orders.filter((order) => order.batchId === batch.id);
          const batchWeight = batchOrders.reduce((sum, order) => sum + order.weightKg, 0);
          const batchFreight = batchOrders.reduce((sum, order) => sum + money(order.intlShippingAud), 0);
          const fillRate = Math.min(100, Math.round((batchWeight / batch.capacityKg) * 100));
          return (
            <article className="batch-card freight-card" key={batch.id}>
              <div className="batch-card-head">
                <div>
                  <strong>{batch.name}</strong>
                  <span>{batch.route}</span>
                </div>
                <em className={`batch-chip ${batch.status}`}>{batchStatusLabel(batch.status)}</em>
              </div>
              <div className="shipment-checklist">
                <Detail icon={Clock3} label="Cutoff" value={batch.cutoff} />
                <Detail icon={Plane} label="Bay" value={batch.departure} />
                <Detail icon={MapPin} label="Về VN" value={batch.eta} />
                <Detail icon={CreditCard} label="Cước bay" value={aud(batchFreight)} />
              </div>
              <div className="batch-stats">
                <div><span>Order</span><strong>{batchOrders.length}</strong></div>
                <div><span>Kg</span><strong>{batchWeight.toFixed(1)}/{batch.capacityKg}</strong></div>
                <div><span>Full</span><strong>{fillRate}%</strong></div>
              </div>
              <div className="capacity-bar"><span style={{ width: `${fillRate}%` }} /></div>
              <div className="batch-actions">
                <span className="batch-action" onClick={() => updateBatchStatus(batch.id, "closed")}>Chốt đợt</span>
                <span className="batch-action muted" onClick={() => updateBatchStatus(batch.id, "inTransit")}>Cho bay</span>
                <span className="batch-action muted" onClick={() => updateBatchStatus(batch.id, "arrived")}>Đã về VN</span>
              </div>
              <div className="freight-order-list">
                {batchOrders.map((order) => (
                  <div className="mini-order-row" key={order.id}>
                    <span>{order.id}</span>
                    <strong>{order.product}</strong>
                    <em>{order.weightKg.toFixed(1)}kg · {getAccount(order.purchaserId).displayName}</em>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function CashflowFocusView({ orders, batches, canSeeProfit, cashIn, cashOut, revenue, expectedMargin, receivableOrders }) {
  return (
    <div className="focused-view">
      <section className="focus-hero">
        <Metric label="Phải thu khách" value={vnd(revenue)} trend="Tổng giá bán theo đơn" icon={TrendingUp} />
        <Metric label="Đã thu" value={vnd(cashIn)} trend="Cọc/tiền khách đã trả" icon={ShieldCheck} />
        <Metric label="Đã chi" value={vnd(cashOut)} trend="Tiền hàng + ship + cước bay" icon={CreditCard} />
        <Metric label={canSeeProfit ? "Lãi gộp" : "Lãi/lỗ"} value={canSeeProfit ? vnd(expectedMargin) : "Đã ẩn"} trend="Theo quyền tài khoản" icon={Sparkles} />
      </section>

      <section className="cashflow-layout">
        <div className="orders-panel">
          <div className="table-toolbar">
            <div>
              <span className="eyebrow">Ledger</span>
              <h2>Sổ thu/chi theo order</h2>
            </div>
            <span className="rate-pill">{receivableOrders.length} đơn còn phải thu</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách</th>
                  <th>Đã thu</th>
                  <th>Còn phải thu</th>
                  <th>Tiền chi</th>
                  <th>Tỉ giá</th>
                  <th>Chuyến</th>
                  {canSeeProfit && <th>Lãi gộp</th>}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong><span>{order.product}</span></td>
                    <td>{order.customer}</td>
                    <td><strong>{vnd(finance(order).cashInVnd)}</strong></td>
                    <td><span className="money-due">{vnd(finance(order).outstandingVnd)}</span></td>
                    <td>{vnd(finance(order).cashOutVnd)}</td>
                    <td>{formatter.format(orderRate(order))}</td>
                    <td>{batches.find((batch) => batch.id === order.batchId)?.code ?? "Chưa xếp"}</td>
                    {canSeeProfit && <td><strong>{vnd(finance(order).grossProfitVnd)}</strong></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="detail-panel">
          <div className="detail-header">
            <div>
              <span className="eyebrow">Collection priority</span>
              <h2>Cần thu trước</h2>
            </div>
            <WalletCards size={18} />
          </div>
          {receivableOrders.slice(0, 6).map((order) => (
            <div className="process-card" key={order.id}>
              <strong>{order.customer} · {vnd(finance(order).outstandingVnd)}</strong>
              <p>{order.id} · {order.product} · ETA {order.eta}</p>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}

function NotificationsFocusView({ tasks, orders, batches, receivableOrders, getBatch, getAccount, openTask, openNewTask, toggleTaskDone }) {
  const purchaseAlerts = orders.filter((order) => ["quote", "deposit", "purchased"].includes(order.status)).slice(0, 5);
  const batchAlerts = batches.filter((batch) => batch.status === "open" || batch.status === "closed");
  const openTasks = tasks.filter((task) => task.status !== "done");

  return (
    <div className="focused-view">
      <section className="notification-layout">
        <div className="orders-panel">
          <div className="table-toolbar">
            <div>
              <span className="eyebrow">Notification center</span>
              <h2>Việc cần làm cho team AU/VN</h2>
            </div>
            <button className="primary-button" type="button" onClick={openNewTask}>
              <Plus size={17} />
              Thêm việc
            </button>
          </div>
          <div className="task-management-strip">
            <span>{openTasks.length} việc đang mở</span>
            <span>{tasks.filter((task) => task.status === "done").length} việc đã xong</span>
            <span>{purchaseAlerts.length + receivableOrders.length} cảnh báo hệ thống</span>
          </div>
          <div className="notification-grid">
            {tasks.map((task) => (
              <article className={`notification-card ${task.tone} ${task.status === "done" ? "done-task-card" : ""}`} key={task.id}>
                <span>{task.dueDate} · {task.time} · {getAccount(task.assigneeId).displayName}</span>
                <strong>{task.title}</strong>
                <p>{task.detail || "Giao team cập nhật lại trạng thái trong app sau khi xử lý."}</p>
                <div className="task-card-actions">
                  <button type="button" onClick={() => openTask(task.id)}>Sửa</button>
                  <button type="button" onClick={() => toggleTaskDone(task.id)}>
                    {task.status === "done" ? "Mở lại" : "Xong"}
                  </button>
                </div>
              </article>
            ))}
            {purchaseAlerts.map((order) => (
              <article className="notification-card gold" key={order.id}>
                <span>Mua hàng · {getBatch(order.batchId)?.cutoff ?? "Chưa có cutoff"}</span>
                <strong>{order.customer} · {order.product}</strong>
                <p>{getAccount(order.purchaserId).displayName} cần kiểm nguồn mua, bill, cân nặng và tracking. Trạng thái hiện tại: {statusLabel(order.status)}.</p>
              </article>
            ))}
            {receivableOrders.slice(0, 5).map((order) => (
              <article className="notification-card urgent" key={`${order.id}-due`}>
                <span>Thu tiền · Còn phải thu</span>
                <strong>{order.customer} · {vnd(finance(order).outstandingVnd)}</strong>
                <p>Nhắc khách trước khi giao. Order {order.id}, ETA {order.eta}, staff {getAccount(order.assigneeId).displayName}.</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="detail-panel">
          <div className="detail-header">
            <div>
              <span className="eyebrow">Shipment alerts</span>
              <h2>Chuyến cần chú ý</h2>
            </div>
            <Bell size={18} />
          </div>
          {batchAlerts.map((batch) => (
            <div className="process-card" key={batch.id}>
              <strong>{batch.code} · {batchStatusLabel(batch.status)}</strong>
              <p>Cutoff {batch.cutoff}, bay {batch.departure}, về VN {batch.eta}. Kiểm order chưa mua trước khi chốt.</p>
            </div>
          ))}
          <div className="note-box">
            <span>Chuẩn thông báo</span>
            <p>Noti dùng để nhắc người phụ trách cập nhật trong app, không thay thế xác nhận tiền, bill hay giao hàng ngoài đời.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function AccountAvatar({ account }) {
  return (
    <span className="account-avatar" style={{ background: account.color }}>
      {account.initials || normalizeInitials(account.displayName || account.username)}
    </span>
  );
}

function Metric({ label, value, trend, icon: Icon }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{trend}</p>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="detail-row">
      <Icon size={17} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
