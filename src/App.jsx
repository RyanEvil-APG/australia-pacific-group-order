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
  TriangleAlert,
  Trash2,
  Truck,
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
  outOfStockAt: "",
  outOfStockDate: "",
  outOfStockBatchId: "",
  outOfStockMovedAt: "",
  customerWantsNextBatch: false,
  supervisorId: "ryan",
  assigneeId: "staff-vn",
  buyerId: "ryan",
  aud: 0,
  shippingAud: 0,
  intlShippingAud: 0,
  unitWeightKg: 0,
  weightKg: 0,
  finalWeightRateVnd: defaultFinalWeightRateVnd,
  exchangeRate,
  extraFeeVnd: 0,
  extraFeeNote: "",
  totalThuVnd: 0,
  depositVnd: 0,
  splitBill: false,
  receivedVnDate: "",
  vnStockLocation: "",
  vnStockChecked: false,
  vnStockNote: "",
  customerShipped: false,
  customerShippedDate: "",
  paidInFull: false,
  paidInFullDate: "",
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
  actualWeightKg: 0,
  exchangeRate,
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
  { id: "stockouts", label: "Hàng hết", icon: TriangleAlert },
  { id: "flights", label: "Chuyến bay", icon: Plane },
  { id: "after-arrival", label: "Hàng đã về", icon: Truck },
  { id: "stock", label: "Hàng có sẵn", icon: Boxes },
  { id: "customers", label: "Khách hàng", icon: UserRound },
  { id: "cashflow", label: "Thu/chi", icon: CreditCard },
  { id: "tasks", label: "Board", icon: Bell }
];

const orderStatuses = [
  { id: "waiting_buy", label: "Chờ mua" },
  { id: "out_of_stock", label: "Hết hàng" },
  { id: "purchased", label: "Đã mua" },
  { id: "sent_vn", label: "Đã gửi về VN" },
  { id: "received_vn", label: "Đã nhận ở VN" },
  { id: "delivered", label: "Đã giao khách" },
  { id: "cancelled", label: "Hủy" }
];

const batchStatuses = [
  { id: "open", label: "Đang gom / chưa gửi" },
  { id: "shipping", label: "Đã gửi về VN" },
  { id: "arrived", label: "Đầu VN đã nhận hàng" }
];

const customerTiers = ["Customer", "Vip", "Vip1", "Vip2", "Vip3"];
const formatter = new Intl.NumberFormat("vi-VN");

function vnd(value) {
  return `${formatter.format(Math.round(Number(value || 0)))}đ`;
}

function compactVnd(value) {
  const amount = Math.round(Number(value || 0));
  const absolute = Math.abs(amount);
  const format = (number) => number.toLocaleString("vi-VN", { maximumFractionDigits: 1 });
  if (absolute >= 1000000000) return `${format(amount / 1000000000)} tỷ`;
  if (absolute >= 1000000) return `${format(amount / 1000000)}tr`;
  if (absolute >= 1000) return `${format(Math.round(amount / 1000))}k`;
  return vnd(amount);
}

function aud(value) {
  return `A$${formatter.format(Number(value || 0))}`;
}

function audPrice(value) {
  const amount = Number(value || 0);
  return `A$${amount.toLocaleString("vi-VN", { minimumFractionDigits: amount % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
}

function roundProductAud(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  const rounded = Math.ceil((amount - Number.EPSILON) * 10) / 10;
  const whole = Math.floor(rounded);
  if (rounded - whole >= 0.9 - Number.EPSILON) return Math.ceil(rounded);
  return Math.round(rounded * 100) / 100;
}

function kg(value) {
  return Number(value || 0).toLocaleString("vi-VN", { maximumFractionDigits: 2 });
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

function chemistPreviewFromUrl(rawUrl) {
  try {
    const parsed = new URL(String(rawUrl || "").startsWith("www.") ? `https://${rawUrl}` : rawUrl);
    const match = parsed.pathname.match(/\/buy\/(\d+)(?:[/-]([^/?#]+))?/i);
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

function normalizeOrder(order) {
  const chemistFallback = chemistPreviewFromUrl(order?.productUrl);
  const productImageUrl = order?.productImageUrl || chemistFallback?.imageUrl || "";
  return {
    ...order,
    productUrl: order?.productUrl ?? "",
    product: order?.product || chemistFallback?.title || "",
    source: order?.source || chemistFallback?.siteName || "",
    productImageUrl,
    productImageSource: productImageUrl ? (order?.productImageSource || "auto") : "",
    outOfStockAt: order?.outOfStockAt || "",
    outOfStockDate: order?.outOfStockDate || "",
    outOfStockBatchId: order?.outOfStockBatchId || "",
    outOfStockMovedAt: order?.outOfStockMovedAt || "",
    customerWantsNextBatch: Boolean(order?.customerWantsNextBatch),
    splitBill: Boolean(order?.splitBill),
    customerShipped: Boolean(order?.customerShipped || normalizeOrderStatus(order?.status) === "delivered"),
    paidInFull: Boolean(order?.paidInFull),
    receivedVnDate: order?.receivedVnDate || "",
    vnStockLocation: order?.vnStockLocation || "",
    vnStockChecked: Boolean(order?.vnStockChecked),
    vnStockNote: order?.vnStockNote || "",
    customerShippedDate: order?.customerShippedDate || "",
    paidInFullDate: order?.paidInFullDate || "",
    createdAt: order?.createdAt || "",
    updatedAt: order?.updatedAt || "",
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

function normalizeBatchStatus(status) {
  const legacyMap = {
    closed: "open",
    not_sent: "open",
    sent: "shipping"
  };
  const nextStatus = legacyMap[status] ?? status;
  return batchStatuses.some((item) => item.id === nextStatus) ? nextStatus : "open";
}

function batchStatusLabel(status) {
  const normalizedStatus = normalizeBatchStatus(status);
  return batchStatuses.find((item) => item.id === normalizedStatus)?.label ?? normalizedStatus;
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

function batchHasArrived(batch) {
  const arrival = dateTime(batch?.arrival);
  const todayTime = dateTime(today());
  return normalizeBatchStatus(batch?.status) === "arrived" || (arrival !== null && todayTime !== null && arrival < todayTime);
}

function batchHasDeparted(batch, refDate = today()) {
  const departure = dateTime(batch?.departure);
  const refTime = dateTime(refDate) ?? dateTime(today()) ?? Date.now();
  return departure !== null && departure < refTime;
}

function batchFlightTime(batch) {
  return dateTime(batch?.departure) ?? dateTime(batch?.cutoff) ?? dateTime(batch?.arrival) ?? Number.MAX_SAFE_INTEGER;
}

function upcomingFlightBatches(batches, limit = 3, refDate = today()) {
  return sortedFlightBatches(batches)
    .filter((batch) => !batchHasArrived(batch))
    .filter((batch) => !batchHasDeparted(batch, refDate))
    .filter((batch) => normalizeBatchStatus(batch.status) !== "arrived")
    .sort((a, b) => batchFlightTime(a) - batchFlightTime(b))
    .slice(0, limit);
}

function batchIsInTransit(batch) {
  return !batchHasArrived(batch) && normalizeBatchStatus(batch?.status) === "shipping";
}

function batchIsCollecting(batch) {
  return !batchHasArrived(batch) && normalizeBatchStatus(batch?.status) === "open";
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
      const primaryTime = (departure !== null && departure >= refTime ? departure : null) ?? nextTime;
      const status = batch.status || "open";
      return { batch, status, primaryTime, nextTime, departure };
    })
    .filter((item) => item.nextTime !== null && !blockedStatuses.has(item.status))
    .filter((item) => item.departure === null || item.departure >= refTime);

  const preferred = scored
    .filter((item) => preferredStatuses.has(item.status))
    .sort((a, b) => (a.primaryTime ?? a.nextTime) - (b.primaryTime ?? b.nextTime))[0];
  if (preferred) return preferred.batch;

  return scored.sort((a, b) => (a.primaryTime ?? a.nextTime) - (b.primaryTime ?? b.nextTime))[0]?.batch ?? null;
}

function batchWorkflowTime(batch) {
  return dateTime(batch?.departure) ?? dateTime(batch?.cutoff) ?? dateTime(batch?.arrival) ?? 0;
}

function nextOpenBatchAfter(batches, currentBatch, orderDate = today()) {
  const currentTime = batchWorkflowTime(currentBatch) || dateTime(orderDate) || dateTime(today()) || 0;
  const candidates = sortedFlightBatches(batches)
    .filter((batch) => batch.id !== currentBatch?.id)
    .filter((batch) => !batchHasArrived(batch) && normalizeBatchStatus(batch.status) === "open")
    .map((batch) => ({ batch, time: batchWorkflowTime(batch) || Number.MAX_SAFE_INTEGER }))
    .filter((item) => item.time >= currentTime);
  return candidates.sort((a, b) => a.time - b.time)[0]?.batch ?? null;
}

function batchExchangeRate(batches, batchId) {
  return money(findOrderBatch(batches, { batchId })?.exchangeRate) || exchangeRate;
}

function batchPricingPatch(batch) {
  if (!batch) return {};
  return {
    batchId: batch.id,
    intlShippingAud: money(batch.freightAud),
    exchangeRate: money(batch.exchangeRate) || exchangeRate
  };
}

function findOrderBatch(batches, order) {
  const orderBatchId = String(order?.batchId || "");
  if (!orderBatchId) return null;
  return batches.find((batch) => String(batch.id || "") === orderBatchId || String(batch.code || "") === orderBatchId) ?? null;
}

function isArchivedOrder(order) {
  const status = normalizeOrderStatus(order?.status);
  return status === "delivered" || status === "cancelled" || Boolean(order?.customerShipped);
}

function orderSortTime(order, batch) {
  const archived = isArchivedOrder(order);
  const dates = archived
    ? [order?.customerShippedDate, order?.paidInFullDate, order?.receivedVnDate, batch?.arrival, batch?.departure, order?.orderDate]
    : [order?.orderDate, batch?.cutoff, batch?.departure, batch?.arrival, order?.receivedVnDate];
  const firstDate = dates.map(dateTime).find((time) => time !== null);
  return firstDate ?? 0;
}

function orderCreatedTime(order) {
  const time = Date.parse(order?.createdAt || "");
  return Number.isFinite(time) ? time : 0;
}

function orderDeskSortTime(order, batch) {
  if (isArchivedOrder(order)) return orderSortTime(order, batch);
  return orderCreatedTime(order) || orderSortTime(order, batch);
}

function compareOrdersForDesk(a, b, batches) {
  const aArchived = isArchivedOrder(a);
  const bArchived = isArchivedOrder(b);
  if (aArchived !== bArchived) return aArchived ? 1 : -1;
  const aBatch = findOrderBatch(batches, a);
  const bBatch = findOrderBatch(batches, b);
  const timeDiff = orderDeskSortTime(b, bBatch) - orderDeskSortTime(a, aBatch);
  if (timeDiff !== 0) return timeDiff;
  const statusRank = { waiting_buy: 0, out_of_stock: 1, purchased: 2, sent_vn: 3, received_vn: 4, delivered: 8, cancelled: 9 };
  const rankDiff = (statusRank[normalizeOrderStatus(a.status)] ?? 5) - (statusRank[normalizeOrderStatus(b.status)] ?? 5);
  if (rankDiff !== 0) return rankDiff;
  return String(b.id || "").localeCompare(String(a.id || ""));
}

function batchHasPricing(batch) {
  return Boolean(batch) && (Object.prototype.hasOwnProperty.call(batch, "freightAud") || Object.prototype.hasOwnProperty.call(batch, "exchangeRate"));
}

function orderWithBatchPricing(order, batch) {
  if (!batchHasPricing(batch)) return normalizeOrder(order);
  return normalizeOrder({
    ...order,
    ...batchPricingPatch(batch)
  });
}

function orderWithBatchWorkflow(order, batch) {
  const pricedOrder = orderWithBatchPricing(order, batch);
  const batchStatus = normalizeBatchStatus(batch?.status);
  const orderStatus = normalizeOrderStatus(pricedOrder.status);
  const lockedStatuses = new Set(["cancelled", "delivered", "out_of_stock"]);

  if (batchStatus === "shipping" && !lockedStatuses.has(orderStatus) && orderStatus !== "sent_vn" && orderStatus !== "received_vn") {
    return normalizeOrder({ ...pricedOrder, status: "sent_vn", updatedAt: new Date().toISOString() });
  }

  if (batchStatus === "arrived" && !lockedStatuses.has(orderStatus) && orderStatus !== "received_vn") {
    return normalizeOrder({
      ...pricedOrder,
      status: "received_vn",
      receivedVnDate: pricedOrder.receivedVnDate || today(),
      vnStockLocation: pricedOrder.vnStockLocation || "Kho VN",
      updatedAt: new Date().toISOString()
    });
  }

  return pricedOrder;
}

function flightTimelineStage(batch) {
  const cutoffDiff = dateDiffFromToday(batch.cutoff);
  const departureDiff = dateDiffFromToday(batch.departure);
  const arrivalDiff = dateDiffFromToday(batch.arrival);
  const isInFlight =
    normalizeBatchStatus(batch.status) === "shipping" ||
    ((departureDiff === null || departureDiff <= 0) && arrivalDiff !== null && arrivalDiff >= 0 && batch.status !== "arrived");

  if (isInFlight) {
    return { label: "Đang bay", tone: "flying", focusDate: batch.departure || batch.arrival, sortDate: batch.departure || batch.arrival || batch.cutoff || "" };
  }

  if (departureDiff !== null && departureDiff >= 0 && departureDiff <= 7) {
    return { label: "Sắp bay", tone: "ready", focusDate: batch.departure, sortDate: batch.departure };
  }

  if (cutoffDiff !== null && cutoffDiff >= 0 && cutoffDiff <= 5 && ["open", "closed"].includes(batch.status)) {
    return { label: "Cần chốt mua", tone: "closing", focusDate: batch.cutoff, sortDate: batch.cutoff };
  }

  if (batchHasArrived(batch) || (arrivalDiff !== null && arrivalDiff < 0)) {
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

function accountMatchText(account) {
  return `${account?.id || ""} ${account?.username || ""} ${account?.displayName || ""} ${account?.initials || ""}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function findPreferredAccountId(accounts, candidates, fallbackId) {
  const activeAccounts = accounts.filter((account) => account.active);
  const normalizedCandidates = candidates.map((candidate) =>
    String(candidate || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
  );
  return (
    activeAccounts.find((account) => normalizedCandidates.some((candidate) => accountMatchText(account).includes(candidate)))?.id ||
    accounts.find((account) => account.id === fallbackId)?.id ||
    activeAccounts[0]?.id ||
    fallbackId
  );
}

function orderUnitWeightKg(order) {
  const quantity = Math.max(1, money(order?.quantity) || 1);
  if (Object.prototype.hasOwnProperty.call(order || {}, "unitWeightKg")) {
    return Math.max(0, money(order.unitWeightKg));
  }
  return Math.max(0, money(order?.weightKg) / quantity);
}

function orderTotalWeightKg(order) {
  const quantity = Math.max(1, money(order?.quantity) || 1);
  if (Object.prototype.hasOwnProperty.call(order || {}, "unitWeightKg")) {
    return orderUnitWeightKg(order) * quantity;
  }
  return Math.max(0, money(order?.weightKg));
}

function orderFinance(order, billingWeightOverrideKg = null) {
  const rate = money(order.exchangeRate) || exchangeRate;
  const quantity = Math.max(1, money(order.quantity) || 1);
  const unitAud = money(order.aud);
  const unitWeightKg = orderUnitWeightKg(order);
  const totalWeightKg = orderTotalWeightKg(order);
  const billingWeightKg = billingWeightOverrideKg !== null ? Math.max(0, money(billingWeightOverrideKg)) : totalWeightKg;
  const goodsAud = unitAud * quantity;
  const goodsVnd = goodsAud * rate;
  const domesticShippingVnd = money(order.shippingAud) * rate;
  const purchaseFeeVnd = goodsVnd < orderFeeThresholdVnd ? lowValueBuyingFeeVnd : goodsVnd * highValueBuyingFeeRate;
  const airFreightAud = billingWeightKg * money(order.intlShippingAud);
  const airFreightVnd = airFreightAud * rate;
  const finalWeightRateVnd = money(order.finalWeightRateVnd) || defaultFinalWeightRateVnd;
  const finalWeightChargeVnd = billingWeightKg * finalWeightRateVnd;
  const totalCostVnd = goodsVnd + domesticShippingVnd + purchaseFeeVnd + airFreightVnd + money(order.extraFeeVnd);
  const suggestedTotalThuVnd = goodsVnd + domesticShippingVnd + purchaseFeeVnd + finalWeightChargeVnd + money(order.extraFeeVnd);
  const totalThuVnd = money(order.totalThuVnd) || suggestedTotalThuVnd;
  const depositVnd = money(order.depositVnd);

  return {
    rate,
    quantity,
    unitAud,
    unitWeightKg,
    totalWeightKg,
    billingWeightKg,
    weightNeedsCheck: unitWeightKg <= 0,
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

function batchOrderRows(batch, orders) {
  return orders.filter((order) => order.batchId === batch?.id);
}

function batchBillableOrderRows(batch, orders) {
  return batchOrderRows(batch, orders).filter((order) => !["cancelled", "out_of_stock"].includes(normalizeOrderStatus(order.status)));
}

function orderBillingWeightKg(order, batch, orders) {
  const actualWeightKg = batchActualWeightKg(batch);
  const billableOrders = batchBillableOrderRows(batch, orders);
  const belongsToBatch = billableOrders.some((item) => item.id === order?.id);
  if (actualWeightKg > 0 && billableOrders.length > 0 && belongsToBatch) {
    return actualWeightKg / billableOrders.length;
  }
  return orderTotalWeightKg(order);
}

function orderFinanceForBatch(order, batch, orders) {
  const pricedOrder = batchHasPricing(batch) ? { ...order, ...batchPricingPatch(batch) } : order;
  return orderFinance(pricedOrder, batch ? orderBillingWeightKg(order, batch, orders) : null);
}

function batchEstimatedWeightKg(batch, orders) {
  return batchBillableOrderRows(batch, orders).reduce((sum, order) => sum + orderTotalWeightKg(order), 0);
}

function batchActualWeightKg(batch) {
  return Math.max(0, money(batch?.actualWeightKg));
}

function batchChargeWeightKg(batch, orders) {
  const actualWeight = batchActualWeightKg(batch);
  return actualWeight > 0 ? actualWeight : batchEstimatedWeightKg(batch, orders);
}

function batchFinanceSummary(batch, orders) {
  const batchOrders = batchOrderRows(batch, orders);
  const billableOrders = batchBillableOrderRows(batch, orders);
  const estimatedWeightKg = billableOrders.reduce((sum, order) => sum + orderTotalWeightKg(order), 0);
  const actualWeightKg = batchActualWeightKg(batch);
  const chargeWeightKg = actualWeightKg > 0 ? actualWeightKg : estimatedWeightKg;
  const freightAudPerKg = money(batch?.freightAud);
  const rate = money(batch?.exchangeRate) || exchangeRate;
  const actualAirFreightAud = chargeWeightKg * freightAudPerKg;
  const actualAirFreightVnd = actualAirFreightAud * rate;
  const estimatedAirFreightVnd = billableOrders.reduce((sum, order) => sum + orderFinance(order).airFreightVnd, 0);
  const revenue = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).totalThuVnd, 0);
  const deposit = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).depositVnd, 0);
  const remaining = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).remainingVnd, 0);
  const orderCost = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).totalCostVnd, 0);
  return {
    batchOrders,
    billableOrders,
    estimatedWeightKg,
    actualWeightKg,
    chargeWeightKg,
    avgActualWeightKg: actualWeightKg > 0 && billableOrders.length ? actualWeightKg / billableOrders.length : 0,
    freightAudPerKg,
    rate,
    actualAirFreightAud,
    actualAirFreightVnd,
    estimatedAirFreightVnd,
    revenue,
    deposit,
    remaining,
    orderCost,
    adjustedCost: actualWeightKg > 0 ? orderCost : orderCost - estimatedAirFreightVnd + actualAirFreightVnd
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
  const savedProductUrl = String(orderOrDraft?.productUrl || "").trim();
  const savedSource = String(orderOrDraft?.source || "").trim();
  const productUrl = looksLikeProductUrl(savedProductUrl) ? savedProductUrl : (looksLikeProductUrl(savedSource) ? savedSource : "");
  if (!rawUrl && looksLikeProductUrl(productUrl)) {
    const chemistFallback = chemistPreviewFromUrl(productUrl);
    const params = new URLSearchParams({ url: chemistFallback?.imageUrl || productUrl });
    if (chemistFallback?.imageUrl) params.set("referer", productUrl);
    return `/api/product-image?${params.toString()}`;
  }
  if (!rawUrl || rawUrl.startsWith("data:") || rawUrl.startsWith("/api/product-image")) return rawUrl;
  if (!/^https?:\/\//i.test(rawUrl)) return rawUrl;
  const params = new URLSearchParams({ url: rawUrl });
  if (looksLikeProductUrl(productUrl)) params.set("referer", productUrl);
  return `/api/product-image?${params.toString()}`;
}

function stripDemo(items, demoIds, idKey = "id") {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => !demoIds.has(item[idKey]));
}

function getOrderId(order) {
  return order.id || makeId("APG");
}

function compactDate(value) {
  return String(value || today()).replaceAll("-", "");
}

function compactDateYmd(value) {
  return String(value || "").replaceAll("-", "");
}

function batchYear(batch) {
  return String(batchCodeDate(batch) || today()).slice(0, 4);
}

function batchMonthDay(batch) {
  const value = batchCodeDate(batch);
  if (!value) return "0000";
  const [, month = "00", day = "00"] = String(value).split("-");
  return `${month}${day}`;
}

function batchCodeDate(batch) {
  return batch?.departure || batch?.arrival || "";
}

function flightSequenceMap(batches) {
  const yearCounts = new Map();
  const sequenceById = new Map();
  normalizeBatchesForSequence(batches).forEach((batch) => {
    const year = batchYear(batch);
    const nextSequence = (yearCounts.get(year) || 0) + 1;
    yearCounts.set(year, nextSequence);
    sequenceById.set(String(batch.id || batch.code || `${year}-${nextSequence}`), nextSequence);
  });
  return sequenceById;
}

function normalizeBatchesForSequence(batches) {
  return (Array.isArray(batches) ? batches : [])
    .filter((batch) => batch?.departure)
    .slice()
    .sort((a, b) => {
      const dateDiff = String(batchCodeDate(a)).localeCompare(String(batchCodeDate(b)));
      if (dateDiff !== 0) return dateDiff;
      return String(a.id || a.code || "").localeCompare(String(b.id || b.code || ""));
    });
}

function generatedBatchCodeFromSequence(batch, sequence) {
  const year = batchYear(batch);
  const monthDay = batchMonthDay(batch);
  if (!year || !monthDay || monthDay === "0000") return "";
  return `${year}-VN${String(sequence || 1).padStart(2, "0")}-${monthDay} Flight`;
}

function orderCodeSegment(batch, order) {
  if (batch?.code) {
    const raw = String(batch.code).replace(/\s*Flight.*$/i, "");
    return raw.replace(/[^A-Z0-9-]/gi, "").toUpperCase() || "NOFLIGHT";
  }
  return `NOFLIGHT-${compactDate(order?.orderDate || today())}`;
}

function generateOrderCode(order, batch, orders) {
  const segment = orderCodeSegment(batch, order);
  const prefix = `APG-${segment}`;
  const currentId = order?.id;
  const nextNumber =
    orders
      .filter((item) => item.id !== currentId && String(item.id || "").startsWith(`${prefix}-`))
      .reduce((max, item) => {
        const match = String(item.id || "").match(/-(\d+)$/);
        return Math.max(max, match ? Number(match[1]) : 0);
      }, 0) + 1;

  return `${prefix}-${String(nextNumber).padStart(3, "0")}`;
}

function dateFromValue(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isoDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(value, days) {
  const date = dateFromValue(value);
  if (!date) return "";
  date.setDate(date.getDate() + days);
  return isoDate(date);
}

function dayOffset(from, to) {
  const fromDate = dateFromValue(from);
  const toDate = dateFromValue(to);
  if (!fromDate || !toDate) return null;
  return Math.round((toDate.getTime() - fromDate.getTime()) / 86400000);
}

function suggestNextBatchDraft(batches) {
  const latest = [...batches]
    .filter((batch) => batch.departure)
    .sort((a, b) => String(b.departure).localeCompare(String(a.departure)))[0];
  if (!latest) return {};

  let nextDeparture = addDays(latest.departure, 14);
  while (nextDeparture && nextDeparture < today()) {
    nextDeparture = addDays(nextDeparture, 14);
  }

  const cutoffOffset = dayOffset(latest.departure, latest.cutoff) ?? 0;
  const arrivalOffset = dayOffset(latest.departure, latest.arrival) ?? 4;
  return {
    cutoff: addDays(nextDeparture, cutoffOffset),
    departure: nextDeparture,
    arrival: addDays(nextDeparture, arrivalOffset)
  };
}

function generateBatchCode(batch, batches) {
  if (!batchCodeDate(batch)) return "";
  const currentId = String(batch?.id || "__draft__");
  const batchForSequence = { ...batch, id: currentId };
  const sequencePool = Array.isArray(batches) && batches.some((item) => String(item.id || "") === currentId)
    ? batches.map((item) => (String(item.id || "") === currentId ? batchForSequence : item))
    : [...(Array.isArray(batches) ? batches : []), batchForSequence];
  const sequence = flightSequenceMap(sequencePool).get(currentId) || 1;
  const base = generatedBatchCodeFromSequence(batchForSequence, sequence);
  if (!base) return "";
  const usedNumbers = batches
    .filter((item) => String(item.id || "") !== currentId)
    .map((item) => String(item.code || ""))
    .map((code) => {
      const escapedBase = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const match = code.match(new RegExp(`^${escapedBase}(?:\\s+(\\d+))?$`, "i"));
      if (!match) return null;
      return match[1] ? Number(match[1]) : 1;
    })
    .filter((value) => Number.isFinite(value));
  if (!usedNumbers.length) return base;
  const nextNumber = Math.max(...usedNumbers) + 1;
  return `${base} ${String(nextNumber).padStart(2, "0")}`;
}

function normalizeBatchCodes(batches) {
  if (!Array.isArray(batches)) return [];
  const sequenceById = flightSequenceMap(batches);
  const usedCodes = new Map();
  return batches.map((batch) => {
    const pricedBatch = {
      ...batch,
      freightAud: Math.max(0, Number(batch?.freightAud || 0)),
      actualWeightKg: Math.max(0, Number(batch?.actualWeightKg || 0)),
      exchangeRate: Math.max(0, Number(batch?.exchangeRate || exchangeRate))
    };
    if (!pricedBatch?.departure) return pricedBatch;
    const sequence = sequenceById.get(String(pricedBatch.id || pricedBatch.code || "")) || 1;
    const baseCode = generatedBatchCodeFromSequence(pricedBatch, sequence);
    const duplicateCount = (usedCodes.get(baseCode) || 0) + 1;
    usedCodes.set(baseCode, duplicateCount);
    const nextCode = `${baseCode}${duplicateCount > 1 ? ` ${String(duplicateCount).padStart(2, "0")}` : ""}`;
    return nextCode && pricedBatch.code !== nextCode ? { ...pricedBatch, code: nextCode } : pricedBatch;
  });
}

function orderCodeSort(a, b) {
  const batchDiff = String(a.batchId || "").localeCompare(String(b.batchId || ""));
  if (batchDiff !== 0) return batchDiff;
  const dateDiff = String(a.orderDate || "").localeCompare(String(b.orderDate || ""));
  if (dateDiff !== 0) return dateDiff;
  const oldIdDiff = String(a.id || "").localeCompare(String(b.id || ""));
  if (oldIdDiff !== 0) return oldIdDiff;
  return String(a.product || "").localeCompare(String(b.product || ""));
}

function normalizeOrderCodes(orders, batches) {
  const normalizedOrders = normalizeOrders(orders);
  if (!normalizedOrders.length) return { orders: [], idMap: new Map(), changed: false };
  const counters = new Map();
  const idMap = new Map();
  const nextOrders = normalizedOrders
    .slice()
    .sort(orderCodeSort)
    .map((order) => {
      const batch = findOrderBatch(batches, order);
      const prefix = `APG-${orderCodeSegment(batch, order)}`;
      const nextNumber = (counters.get(prefix) || 0) + 1;
      counters.set(prefix, nextNumber);
      const nextId = `${prefix}-${String(nextNumber).padStart(3, "0")}`;
      if (String(order.id || "") !== nextId) idMap.set(order.id, nextId);
      return String(order.id || "") === nextId ? order : { ...order, id: nextId };
    });
  return { orders: nextOrders, idMap, changed: idMap.size > 0 };
}

function remapOrderReferences(items, idMap, key) {
  if (!Array.isArray(items) || !idMap?.size) return Array.isArray(items) ? items : [];
  return items.map((item) => (idMap.has(item?.[key]) ? { ...item, [key]: idMap.get(item[key]) } : item));
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
      sessionToken: "apg-order.sessionToken",
      sessionExpiresAt: "apg-order.sessionExpiresAt"
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
  const [sessionExpiresAt, setSessionExpiresAt] = useStoredState(storageKeys.sessionExpiresAt, 0);

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
    const cleanBatches = normalizeBatchCodes(stripDemo(state.batches, knownDemoBatchIds));
    const orderMigration = normalizeOrderCodes(stripDemo(state.orders, knownDemoOrderIds), cleanBatches);
    return {
      ...state,
      orders: orderMigration.orders,
      customers: normalizeCustomers(state.customers),
      batches: cleanBatches,
      inventory: stripDemo(state.inventory, knownDemoStockIds, "sku"),
      transactions: remapOrderReferences(state.transactions, orderMigration.idMap, "orderId"),
      tasks: remapOrderReferences(stripDemo(state.tasks, knownDemoTaskIds), orderMigration.idMap, "linkedOrderId")
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
    if (!batches.length) return;
    setBatches((current) => {
      const renamed = normalizeBatchCodes(current);
      const changed = renamed.some((batch, index) => batch.code !== current[index]?.code);
      return changed ? renamed : current;
    });
    setOrders((current) => {
      let changed = false;
      const nextOrders = current.map((order) => {
        const batch = findOrderBatch(batches, order);
        if (!batchHasPricing(batch)) return order;
        const nextOrder = orderWithBatchWorkflow(order, batch);
        if (
          nextOrder.batchId !== order.batchId ||
          money(nextOrder.intlShippingAud) !== money(order.intlShippingAud) ||
          money(nextOrder.exchangeRate) !== money(order.exchangeRate) ||
          normalizeOrderStatus(nextOrder.status) !== normalizeOrderStatus(order.status) ||
          nextOrder.receivedVnDate !== order.receivedVnDate ||
          nextOrder.vnStockLocation !== order.vnStockLocation
        ) {
          changed = true;
        }
        return nextOrder;
      });
      return changed ? nextOrders : current;
    });
  }, [batches]);

  React.useEffect(() => {
    if (!orders.length) return;
    const migration = normalizeOrderCodes(orders, batches);
    if (!migration.changed) return;
    setOrders(migration.orders);
    setTransactions((current) => remapOrderReferences(current, migration.idMap, "orderId"));
    setTasks((current) => remapOrderReferences(current, migration.idMap, "linkedOrderId"));
  }, [orders, batches]);

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
          setSessionExpiresAt(0);
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
            setSessionExpiresAt(0);
            setLoginError("Phiên đăng nhập đã hết hạn, đăng nhập lại để sync cloud.");
          }
        });
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [sessionToken, currentAccountId, accounts, orders, customers, batches, inventory, transactions, tasks]);

  React.useEffect(() => {
    if (!sessionToken || !sessionExpiresAt) return undefined;
    const remainingMs = Number(sessionExpiresAt) - Date.now();
    if (remainingMs <= 0) {
      setSessionToken(null);
      setCurrentAccountId(null);
      setSessionExpiresAt(0);
      setLoginError("Phiên đăng nhập đã hết 8 tiếng, đăng nhập lại để tiếp tục.");
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setSessionToken(null);
      setCurrentAccountId(null);
      setSessionExpiresAt(0);
      setModal(null);
      setIsSettingsOpen(false);
      setLoginError("Phiên đăng nhập đã hết 8 tiếng, đăng nhập lại để tiếp tục.");
    }, remainingMs);
    return () => window.clearTimeout(timeout);
  }, [sessionToken, sessionExpiresAt]);

  const filteredOrders = React.useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return orders.filter((order) => {
      const text = `${order.id} ${order.customer} ${order.phone} ${order.product} ${order.source} ${order.productUrl} ${order.splitBill ? "tach bill tách bill split bill" : ""}`.toLowerCase();
      const matchesQuery = text.includes(normalizedQuery);
      const matchesStatus = statusFilter === "all" || normalizeOrderStatus(order.status) === statusFilter;
      const matchesBatch = batchFilter === "all" || order.batchId === batchFilter;
      const matchesFrom = !dateFrom || String(order.orderDate || "") >= dateFrom;
      const matchesTo = !dateTo || String(order.orderDate || "") <= dateTo;
      return matchesQuery && matchesStatus && matchesBatch && matchesFrom && matchesTo;
    }).sort((a, b) => compareOrdersForDesk(a, b, batches));
  }, [orders, batches, deferredQuery, statusFilter, batchFilter, dateFrom, dateTo]);

  const totals = React.useMemo(() => {
    return orders.reduce(
      (sum, order) => {
        const finance = orderFinanceForBatch(order, findOrderBatch(batches, order), orders);
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
  }, [orders, batches]);

  function getAccount(id) {
    return accounts.find((account) => account.id === id) ?? accounts[0];
  }

  function getBatch(id) {
    return batches.find((batch) => batch.id === id);
  }

  function defaultOrderPeople() {
    return {
      supervisorId: findPreferredAccountId(accounts, ["hà hồng", "ha hong", "hong"], "ryan"),
      assigneeId: findPreferredAccountId(accounts, ["thanh anh", "anh thanh"], "staff-vn"),
      buyerId: findPreferredAccountId(accounts, ["ryan", "ryan vu"], "ryan")
    };
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
      setSessionExpiresAt(Date.now() + Number(data.expiresInMs || 8 * 60 * 60 * 1000));
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
    setSessionExpiresAt(0);
    setModal(null);
    setIsSettingsOpen(false);
  }

  function openOrder(order = null) {
    const defaultDate = order?.orderDate ?? today();
    const autoBatch = order ? null : autoBatchForOrder(batches, defaultDate);
    const defaultBatchId = order?.batchId ?? autoBatch?.id ?? "";
    const defaultBatch = findOrderBatch(batches, { batchId: defaultBatchId });
    const peopleDefaults = defaultOrderPeople();
    setDraft({
      ...emptyOrder,
      id: order?.id ?? generateOrderCode({ orderDate: defaultDate, batchId: defaultBatchId }, defaultBatch, orders),
      orderDate: defaultDate,
      supervisorId: order?.supervisorId ?? peopleDefaults.supervisorId,
      assigneeId: order?.assigneeId ?? peopleDefaults.assigneeId,
      buyerId: order?.buyerId ?? peopleDefaults.buyerId,
      ...normalizeOrder(order),
      unitWeightKg: order ? orderUnitWeightKg(order) : 0,
      weightKg: order ? orderTotalWeightKg(order) : 0,
      batchId: defaultBatch?.id || defaultBatchId,
      intlShippingAud: batchHasPricing(defaultBatch) ? money(defaultBatch.freightAud) : money(order?.intlShippingAud) || 0,
      exchangeRate: batchHasPricing(defaultBatch) ? batchExchangeRate(batches, defaultBatch?.id) : money(order?.exchangeRate) || exchangeRate,
      customerTier: normalizeCustomerTier(order?.customerTier)
    });
    setModal("order");
  }

  function canEditOrder(order) {
    if (!order) return true;
    const batch = findOrderBatch(batches, order);
    if (!orderIsInVn(order, batch)) return true;
    return activeAccount?.id === "ryan";
  }

  function saveOrder(event) {
    event.preventDefault();
    if (!canEditOrder(draft)) return;
    const chemistFallback = chemistPreviewFromUrl(draft.productUrl);
    const quantity = Math.max(1, Number(draft.quantity || 1));
    const unitWeightKg = Math.max(0, Number(draft.unitWeightKg ?? 0));
    const totalWeightKg = unitWeightKg * quantity;
    const orderId = getOrderId(draft);
    const existingOrder = orders.find((order) => order.id === orderId);
    const nowIso = new Date().toISOString();
    const nextOrder = normalizeOrder({
      ...draft,
      id: orderId,
      product: draft.product || chemistFallback?.title || "",
      source: draft.source || chemistFallback?.siteName || "",
      productImageUrl: draft.productImageUrl || chemistFallback?.imageUrl || "",
      productImageSource: draft.productImageUrl ? draft.productImageSource : (chemistFallback?.imageUrl ? "auto" : draft.productImageSource),
      quantity,
      unitWeightKg,
      weightKg: totalWeightKg,
      ...(
        batchHasPricing(findOrderBatch(batches, draft))
          ? batchPricingPatch(findOrderBatch(batches, draft))
          : {
              intlShippingAud: Math.max(0, Number(draft.intlShippingAud || 0)),
              exchangeRate: Math.max(0, Number(draft.exchangeRate || exchangeRate))
            }
      ),
      finalWeightRateVnd: Math.max(0, Number(draft.finalWeightRateVnd || defaultFinalWeightRateVnd)),
      customerTier: normalizeCustomerTier(draft.customerTier),
      createdAt: draft.createdAt || existingOrder?.createdAt || nowIso,
      updatedAt: nowIso
    });
    setOrders((current) => {
      const exists = current.some((order) => order.id === nextOrder.id);
      return exists ? current.map((order) => (order.id === nextOrder.id ? nextOrder : order)) : [nextOrder, ...current];
    });
    upsertCustomerFromOrder(nextOrder);
    setModal(null);
  }

  function deleteOrder(id) {
    const order = orders.find((item) => item.id === id);
    if (order && !canEditOrder(order)) return;
    setOrders((current) => current.filter((order) => order.id !== id));
    setTransactions((current) => current.filter((item) => item.orderId !== id));
    setTasks((current) => current.filter((item) => item.linkedOrderId !== id));
    setModal(null);
  }

  function updateOrderStatus(id, status) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;
        if (!canEditOrder(order)) return order;
        const nextStatus = normalizeOrderStatus(status);
        const patch = { status: nextStatus, updatedAt: new Date().toISOString() };
        if (nextStatus === "out_of_stock") {
          patch.outOfStockAt = patch.updatedAt;
          patch.outOfStockDate = today();
          patch.outOfStockBatchId = order.batchId || order.outOfStockBatchId || "";
          patch.customerWantsNextBatch = false;
        }
        if (nextStatus === "received_vn" && !order.receivedVnDate) patch.receivedVnDate = today();
        if (nextStatus === "delivered") {
          patch.customerShipped = true;
          if (!order.customerShippedDate) patch.customerShippedDate = today();
          if (!order.receivedVnDate) patch.receivedVnDate = today();
        }
        return normalizeOrder({ ...order, ...patch });
      })
    );
  }

  function moveOutOfStockToNextBatch(id) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;
        if (!canEditOrder(order)) return order;
        const currentBatch = findOrderBatch(batches, order);
        const nextBatch = nextOpenBatchAfter(batches, currentBatch, order.orderDate);
        if (!nextBatch) {
          return normalizeOrder({
            ...order,
            customerWantsNextBatch: true,
            updatedAt: new Date().toISOString()
          });
        }
        return normalizeOrder({
          ...order,
          ...batchPricingPatch(nextBatch),
          status: "waiting_buy",
          customerWantsNextBatch: true,
          outOfStockBatchId: order.outOfStockBatchId || order.batchId || "",
          outOfStockMovedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      })
    );
  }

  function updateAfterArrivalOrder(id, patch) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;
        if (!canEditOrder(order)) return order;
        return normalizeOrder({ ...order, ...patch });
      })
    );
  }

  function openBuyingChecklist(batchId = "all") {
    setBuyingFocusBatchId(batchId || "all");
    setActiveView("buying");
  }

  function openBatch(batch = null) {
    const suggestedDates = batch ? {} : suggestNextBatchDraft(batches);
    const nextDraft = { ...emptyBatch, ...suggestedDates, id: batch?.id ?? makeId("DOT"), ...batch };
    setDraft({
      ...nextDraft,
      code: batch?.code ?? (nextDraft.departure ? generateBatchCode(nextDraft, batches) : ""),
      status: normalizeBatchStatus(nextDraft.status),
      autoCode: !batch?.code
    });
    setModal("batch");
  }

  function saveBatch(event) {
    event.preventDefault();
    const code = draft.code || generateBatchCode(draft, batches) || draft.id;
    const { autoCode: _autoCode, ...batchDraft } = draft;
    const nextBatch = {
      ...batchDraft,
      id: draft.id || makeId("DOT"),
      code,
      status: normalizeBatchStatus(draft.status),
      freightAud: Math.max(0, Number(draft.freightAud || 0)),
      actualWeightKg: Math.max(0, Number(draft.actualWeightKg || 0)),
      exchangeRate: Math.max(0, Number(draft.exchangeRate || exchangeRate))
    };
    setBatches((current) => {
      const exists = current.some((batch) => batch.id === nextBatch.id);
      return exists ? current.map((batch) => (batch.id === nextBatch.id ? nextBatch : batch)) : [nextBatch, ...current];
    });
    setOrders((current) => current.map((order) => (findOrderBatch([nextBatch], order) ? orderWithBatchWorkflow(order, nextBatch) : order)));
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
    const peopleDefaults = defaultOrderPeople();
    setDraft({
      ...emptyTask,
      id: task?.id ?? makeId("TASK"),
      dueDate: task?.dueDate ?? today(),
      supervisorId: task?.supervisorId ?? peopleDefaults.supervisorId,
      assigneeId: task?.assigneeId ?? peopleDefaults.assigneeId,
      ...task
    });
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
            accounts={accounts}
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
            openAfterArrival={() => setActiveView("after-arrival")}
            updateOrderStatus={updateOrderStatus}
            canEditOrder={canEditOrder}
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
            canEditOrder={canEditOrder}
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
            canEditOrder={canEditOrder}
          />
        )}

        {activeView === "stockouts" && (
          <StockoutsView
            batches={batches}
            orders={orders}
            openOrder={openOrder}
            updateOrderStatus={updateOrderStatus}
            moveOutOfStockToNextBatch={moveOutOfStockToNextBatch}
            canEditOrder={canEditOrder}
          />
        )}

        {activeView === "customers" && <CustomersView customers={customers} orders={orders} openCustomer={openCustomer} openOrder={openOrder} />}
        {activeView === "stock" && <StockView inventory={inventory} orders={orders} batches={batches} openStock={openStock} openOrder={openOrder} />}
        {activeView === "flights" && (
          <FlightsView
            batches={batches}
            orders={orders}
            openBatch={openBatch}
            openOrder={openOrder}
            openBuyingChecklist={openBuyingChecklist}
            updateOrderStatus={updateOrderStatus}
            canEditOrder={canEditOrder}
            canSeeProfit={canSeeProfit}
          />
        )}
        {activeView === "after-arrival" && (
          <AfterArrivalView
            orders={orders}
            batches={batches}
            openOrder={openOrder}
            updateOrder={updateAfterArrivalOrder}
            canEditOrder={canEditOrder}
          />
        )}
        {activeView === "cashflow" && (
          <CashflowView orders={orders} batches={batches} transactions={transactions} openTransaction={openTransaction} openOrder={openOrder} canSeeProfit={canSeeProfit} />
        )}
        {activeView === "tasks" && <TasksView tasks={tasks} accounts={accounts} orders={orders} batches={batches} openTask={openTask} openOrder={openOrder} openAfterArrival={() => setActiveView("after-arrival")} />}
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
          canEditOrder={canEditOrder}
          save={saveOrder}
          remove={deleteOrder}
          close={() => setModal(null)}
        />
      )}
      {modal === "batch" && (
        <BatchModal
          draft={draft}
          setDraft={setDraft}
          batches={batches}
          orders={orders}
          openOrder={openOrder}
          updateOrderStatus={updateOrderStatus}
          canEditOrder={canEditOrder}
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

function orderIsInVn(order, batch) {
  const status = normalizeOrderStatus(order.status);
  const batchArrived = Boolean(batch?.arrival && String(batch.arrival) <= today());
  return Boolean(order.receivedVnDate || ["received_vn", "delivered"].includes(status) || (status === "sent_vn" && batchArrived));
}

function afterArrivalReminders(orders, batches) {
  return orders
    .flatMap((order) => {
      const batch = findOrderBatch(batches, order);
      const status = normalizeOrderStatus(order.status);
      if (status === "cancelled" || !orderIsInVn(order, batch)) return [];
      const finance = orderFinanceForBatch(order, batch, orders);
      const reminders = [];
      if (!order.receivedVnDate && status === "sent_vn") {
        reminders.push({ type: "stock", label: "Cần xác nhận về VN", tone: "warning", order, batch, detail: `Dự kiến về ${batch?.arrival || "-"}` });
      }
      if (!order.vnStockChecked && !order.customerShipped && status !== "delivered") {
        reminders.push({ type: "stock", label: "Cần kiểm kho", tone: "warning", order, batch, detail: order.vnStockLocation || "Chưa có vị trí kho" });
      }
      if (!order.customerShipped && status !== "delivered") {
        reminders.push({ type: "ship", label: "Nhắc ship/giao khách", tone: "urgent", order, batch, detail: `${order.customer || "Khách"} · SL ${order.quantity}` });
      }
      if (!order.paidInFull && finance.remainingVnd > 0) {
        reminders.push({ type: "money", label: "Nhắc thu tiền", tone: "urgent", order, batch, detail: `Còn thu ${vnd(finance.remainingVnd)}` });
      }
      return reminders;
    })
    .sort((a, b) => String(a.batch?.arrival || "9999-12-31").localeCompare(String(b.batch?.arrival || "9999-12-31")));
}

function TeamPresencePanel({ accounts }) {
  const activeAccounts = accounts.filter((account) => account.active);
  return (
    <section className="team-strip-panel">
      <span className="eyebrow">Team</span>
      <div className="team-avatar-grid">
        {activeAccounts.map((account) => (
          <div className="team-avatar-card" key={account.id}>
            <AccountAvatar account={account} />
            <div>
              <strong>{account.displayName || account.username}</strong>
              <span>{roleLabel(account.role)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OpsReminderPanel({ reminders, openOrder, openAfterArrival }) {
  const visible = reminders.slice(0, 8);
  return (
    <section className="panel ops-reminder-panel">
      <div className="panel-title">
        <div>
          <span className="eyebrow">Auto reminders</span>
          <h2>Việc cần nhắc hàng đã về</h2>
        </div>
        <Bell size={18} />
      </div>
      <div className="ops-reminder-list">
        {visible.map((item, index) => (
          <button className={`ops-reminder-item ${item.tone}`} type="button" key={`${item.type}-${item.order.id}-${index}`} onClick={() => (openAfterArrival ? openAfterArrival() : openOrder(item.order))}>
            <span>{item.label}</span>
            <strong>{item.order.product || item.order.id}</strong>
            <em>{item.detail}</em>
          </button>
        ))}
        {!visible.length && <EmptyState title="Không có việc trễ ở hàng đã về" body="Khi đơn đã về VN nhưng chưa kiểm kho, chưa ship hoặc chưa thu đủ tiền, app sẽ tự nhắc ở đây." />}
      </div>
    </section>
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
  const { totals, orders, filteredOrders, batches, accounts, openOrder, openBatch, openBuyingChecklist, openAfterArrival, updateOrderStatus, canEditOrder, canSeeProfit } = props;
  const nearestOverviewBatch = autoBatchForOrder(batches, today()) ?? upcomingFlightBatches(batches, 1)[0] ?? null;
  const overviewBatches = nearestOverviewBatch ? [nearestOverviewBatch] : [];
  const overviewFilteredOrders = nearestOverviewBatch ? filteredOrders.filter((order) => order.batchId === nearestOverviewBatch.id) : [];
  const reminders = nearestOverviewBatch ? afterArrivalReminders(orders, batches).filter((reminder) => reminder.batch?.id === nearestOverviewBatch.id) : [];
  const flightTimeline = overviewBatches
    .map((batch) => {
      const batchOrders = orders.filter((order) => order.batchId === batch.id);
      const remaining = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).remainingVnd, 0);
      const revenue = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).totalThuVnd, 0);
      const stage = flightTimelineStage(batch);
      return { batch, batchOrders, remaining, revenue, stage };
    })
    .filter((item) => item.stage.tone !== "done")
    .sort((a, b) => String(a.stage.sortDate || "9999-12-31").localeCompare(String(b.stage.sortDate || "9999-12-31")))
    .slice(0, 10);

  return (
    <div className="screen-stack">
      <TeamPresencePanel accounts={accounts} />
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
          canEditOrder={canEditOrder}
        />

        <section className="panel flight-timeline-panel overview-timeline">
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
                  <strong>Bay {stage.focusDate || "-"}</strong>
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

        <div className="overview-packing">
          <PackingListSummary
            title="Packing list chuyến bay"
            eyebrow="Flight packing"
            batches={overviewBatches}
            orders={orders}
            openBuyingChecklist={openBuyingChecklist}
          />
        </div>
      </div>

      <OpsReminderPanel reminders={reminders} openOrder={openOrder} openAfterArrival={openAfterArrival} />

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
        <OrdersTable
          orders={overviewFilteredOrders.slice(0, 10)}
          batches={batches}
          openOrder={openOrder}
          compact
          canSeeProfit={canSeeProfit}
          emptyTitle="Chưa có đơn trong chuyến gần nhất"
          emptyBody="Tạo đơn mới hoặc chọn lại chuyến bay trong đơn để Tổng quan gom đúng chuyến."
        />
      </section>

    </div>
  );
}

function OverviewBuyingBoard({ batches, orders, openOrder, openBuyingChecklist, updateOrderStatus, canEditOrder }) {
  const nearestBatch = autoBatchForOrder(batches, today()) ?? upcomingFlightBatches(batches, 1)[0];
  const waitingOrders = nearestBatch
    ? orders.filter((order) => order.batchId === nearestBatch.id && normalizeOrderStatus(order.status) === "waiting_buy")
    : [];
  const purchasedOrders = nearestBatch
    ? orders.filter((order) => order.batchId === nearestBatch.id && normalizeOrderStatus(order.status) === "purchased")
    : [];
  const stockoutOrders = nearestBatch
    ? orders.filter((order) => order.batchId === nearestBatch.id && normalizeOrderStatus(order.status) === "out_of_stock")
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
        <span>Hết hàng <strong>{stockoutOrders.length}</strong></span>
        <span>Đã mua <strong>{purchasedOrders.length}</strong></span>
      </div>
      <div className="overview-buying-list">
        {waitingOrders.slice(0, 3).map((order) => (
          <div className="overview-buying-item" key={order.id} onClick={() => openOrder(order)}>
            <ProductCell order={order} batch={nearestBatch} orders={orders} />
            <div className="overview-buying-actions">
              <button type="button" disabled={canEditOrder && !canEditOrder(order)} onClick={(event) => { event.stopPropagation(); updateOrderStatus(order.id, "purchased"); }}>Đã mua</button>
              <button className="warning-action" type="button" disabled={canEditOrder && !canEditOrder(order)} onClick={(event) => { event.stopPropagation(); updateOrderStatus(order.id, "out_of_stock"); }}>Hết hàng</button>
            </div>
          </div>
        ))}
        {!waitingOrders.length && <div className="overview-buying-empty">Chuyến gần nhất không còn đơn chờ mua.</div>}
        {waitingOrders.length > 3 && <button className="overview-buying-more" type="button" onClick={() => openBuyingChecklist(nearestBatch.id)}>Xem thêm {waitingOrders.length - 3} đơn</button>}
      </div>
    </section>
  );
}

function OrdersView(props) {
  const [archiveGroupBy, setArchiveGroupBy] = React.useState("flight");
  const activeOrders = props.orders.filter((order) => !isArchivedOrder(order));
  const archivedOrders = props.orders.filter(isArchivedOrder);
  const archiveFocused = ["delivered", "cancelled"].includes(props.statusFilter);
  const mainOrders = archiveFocused ? archivedOrders : activeOrders;
  const archiveGroups = React.useMemo(() => {
    const groupMap = new Map();
    archivedOrders.forEach((order) => {
      const batch = findOrderBatch(props.batches, order);
      const key =
        archiveGroupBy === "year"
          ? String(order.customerShippedDate || order.paidInFullDate || order.receivedVnDate || batch?.arrival || order.orderDate || "Chưa rõ").slice(0, 4)
          : batch?.id || "unassigned";
      const title = archiveGroupBy === "year" ? (key === "Chưa" ? "Chưa rõ năm" : `Năm ${key}`) : (batch?.code || "Chưa xếp chuyến");
      const subtitle =
        archiveGroupBy === "year"
          ? `${archivedOrders.filter((item) => {
              const itemBatch = findOrderBatch(props.batches, item);
              return String(item.customerShippedDate || item.paidInFullDate || item.receivedVnDate || itemBatch?.arrival || item.orderDate || "Chưa rõ").slice(0, 4) === key;
            }).length} đơn đã giao / hủy`
          : `${batch?.arrival ? `Về VN ${batch.arrival}` : "Không có chuyến"} · ${batch?.route || "Archive"}`;
      if (!groupMap.has(key)) groupMap.set(key, { key, title, subtitle, orders: [] });
      groupMap.get(key).orders.push(order);
    });
    return [...groupMap.values()]
      .map((group) => ({
        ...group,
        orders: group.orders.sort((a, b) => compareOrdersForDesk(a, b, props.batches))
      }))
      .sort((a, b) => orderSortTime(b.orders[0], findOrderBatch(props.batches, b.orders[0])) - orderSortTime(a.orders[0], findOrderBatch(props.batches, a.orders[0])));
  }, [archivedOrders, archiveGroupBy, props.batches]);
  return (
    <div className="screen-stack">
      <FilterBar {...props} />
      <section className="orders-work-summary">
        <div>
          <span className="eyebrow">Order desk</span>
          <strong>{activeOrders.length} đơn đang xử lý</strong>
        </div>
        <div>
          <span>Đã giao / hủy</span>
          <strong>{archivedOrders.length}</strong>
        </div>
        <div>
          <span>Sort</span>
          <strong>Mới nhất lên trên</strong>
        </div>
      </section>
      <div className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Order records</span>
            <h2>{archiveFocused ? "Đơn đã giao / hủy" : "Đơn đang xử lý"}</h2>
          </div>
          <button className="primary-button" onClick={() => props.openOrder()}>
            <Plus size={17} />
            Thêm đơn
          </button>
        </div>
        <OrdersTable orders={mainOrders} batches={props.batches} openOrder={props.openOrder} canSeeProfit={props.canSeeProfit} emptyTitle={archiveFocused ? "Không có đơn archive theo filter này" : "Không còn đơn đang xử lý"} emptyBody={archiveFocused ? "Đổi filter để xem nhóm đơn khác." : "Đơn đã giao hoặc hủy được chuyển xuống archive bên dưới để màn vận hành gọn hơn."} />
      </div>
      {!archiveFocused && (
        <div className="panel archive-panel">
          <div className="panel-title">
            <div>
              <span className="eyebrow">Archive</span>
              <h2>Đơn đã giao / hủy</h2>
            </div>
            <div className="archive-tools">
              <select value={archiveGroupBy} onChange={(event) => setArchiveGroupBy(event.target.value)}>
                <option value="flight">Nhóm theo chuyến bay</option>
                <option value="year">Nhóm theo năm</option>
              </select>
              <span className="archive-count">{archivedOrders.length}</span>
            </div>
          </div>
          <div className="archive-group-list">
            {archiveGroups.map((group, index) => (
              <details className="archive-group" key={`${archiveGroupBy}-${group.key}`} defaultOpen={index === 0}>
                <summary>
                  <span>
                    <strong>{group.title}</strong>
                    <em>{group.subtitle}</em>
                  </span>
                  <b>{group.orders.length}</b>
                </summary>
                <OrdersTable orders={group.orders} batches={props.batches} openOrder={props.openOrder} canSeeProfit={props.canSeeProfit} compact emptyTitle="Không có đơn trong nhóm này" emptyBody="Đổi nhóm archive hoặc filter để xem nhóm khác." />
              </details>
            ))}
            {!archiveGroups.length && <EmptyState title="Chưa có đơn đã giao hoặc hủy" body="Khi đơn hoàn tất, app tự đưa xuống đây theo chuyến bay hoặc theo năm." />}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductThumbImage({ item, size = 18 }) {
  const src = productImageSrc(item);
  const [failedSrc, setFailedSrc] = React.useState("");

  React.useEffect(() => {
    setFailedSrc("");
  }, [src]);

  if (!src || failedSrc === src) return <ImageIcon size={size} />;
  return <img src={src} alt={item?.product || "Product"} onError={() => setFailedSrc(src)} />;
}

function ProductCell({ order, batch = null, orders = [] }) {
  const finance = batch ? orderFinanceForBatch(order, batch, orders) : orderFinance(order);
  const usesSharedFlightWeight = batchActualWeightKg(batch) > 0 && finance.billingWeightKg !== finance.totalWeightKg;
  return (
    <div className="order-product-cell">
      <div className="order-product-thumb">
        <ProductThumbImage item={order} />
      </div>
      <div>
        <strong>{order.product || "Chưa nhập sản phẩm"}</strong>
        <span>SL: {finance.quantity} · {kg(finance.unitWeightKg)}kg/sp · Tổng {kg(finance.totalWeightKg)}kg</span>
        {usesSharedFlightWeight && <em className="billing-weight-badge">Tinh cuoc {kg(finance.billingWeightKg)}kg</em>}
        {finance.weightNeedsCheck && <em className="kg-missing-badge">Can tim kg san pham</em>}
        {order.splitBill && (
          <em className="split-bill-badge">Tách bill riêng</em>
        )}
      </div>
    </div>
  );
}

function OrdersTable({ orders, batches, openOrder, compact, canSeeProfit, emptyTitle = "Chưa có đơn hàng", emptyBody = "Bấm Thêm đơn để nhập đơn thật. Dữ liệu demo đã được bỏ." }) {
  const rowLimit = compact ? 10 : 120;
  const visibleOrders = orders.slice(0, rowLimit);
  return (
    <div className="table-wrap">
      <table className={compact ? "compact-table" : ""}>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách</th>
            <th>Sản phẩm<br /><span>Số lượng/kg</span></th>
            <th>Tình trạng</th>
            <th>Chuyến bay<br /><span>Deadline mua</span></th>
            <th>{compact ? "Thu/Còn" : "Tài chính"}</th>
          </tr>
        </thead>
        <tbody>
          {visibleOrders.map((order) => {
            const batch = batches.find((item) => item.id === order.batchId);
            const finance = orderFinanceForBatch(order, batch, orders);
            return (
              <tr key={order.id} className={order.splitBill ? "split-bill-row" : ""} onClick={() => openOrder(order)}>
                <td data-label="Mã đơn"><strong>{order.id}</strong><span>{order.orderDate}</span><span>{order.source}</span></td>
                <td data-label="Khách">{order.customer}<span>{order.phone}</span></td>
                <td data-label="Sản phẩm"><ProductCell order={order} batch={batch} orders={orders} /></td>
                <td data-label="Tình trạng"><span className={`status-chip ${normalizeOrderStatus(order.status)}`}>{statusLabel(order.status)}</span></td>
                <td data-label="Chuyến bay">
                  {batch?.code || "Chưa xếp"}
                  <span>{batch?.cutoff ? `Deadline ${batch.cutoff} (${dateLabel(batch.cutoff)})` : "Chưa có deadline"}</span>
                  <span>{batch?.arrival ? `Về VN ${batch.arrival}` : ""}</span>
                </td>
                <td data-label={compact ? "Thu/Còn" : "Tài chính"} className={`finance-cell ${compact ? "compact-finance-cell" : ""}`}>
                  {compact ? (
                    <>
                      <strong title={vnd(finance.totalThuVnd)}>{compactVnd(finance.totalThuVnd)}</strong>
                      <span className="money-due" title={vnd(finance.remainingVnd)}>{compactVnd(finance.remainingVnd)}</span>
                    </>
                  ) : (
                    <>
                      <strong>{vnd(finance.totalThuVnd)}</strong>
                      <span>Chi phí {vnd(finance.totalCostVnd)}</span>
                      <span>Cọc {vnd(finance.depositVnd)}</span>
                      <span className="money-due">Còn thu {vnd(finance.remainingVnd)}</span>
                      {canSeeProfit && <span>Lãi {vnd(finance.profitVnd)}</span>}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {orders.length > rowLimit && <EmptyState title={`Đang hiện ${rowLimit}/${orders.length} đơn`} body="Dùng tìm kiếm, lọc tình trạng hoặc lọc thời gian để mở đúng nhóm đơn cần xử lý nhanh hơn." />}
      {!orders.length && <EmptyState title={emptyTitle} body={emptyBody} />}
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

function StockView({ inventory, orders, batches, openStock, openOrder }) {
  const linkedOrderStock = orders
    .filter((order) => {
      const status = normalizeOrderStatus(order.status);
      const batch = findOrderBatch(batches, order);
      return status !== "cancelled" && !order.customerShipped && status !== "delivered" && orderIsInVn(order, batch);
    })
    .map((order) => ({ order, batch: findOrderBatch(batches, order) }));

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
        <div className="panel-title">
          <div>
            <span className="eyebrow">Linked order stock</span>
            <h2>Hàng của khách đang giữ ở kho VN</h2>
          </div>
          <PackageCheck size={18} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Sản phẩm</th>
                <th>SL/Kg</th>
                <th>Khách</th>
                <th>Chuyến</th>
                <th>Kho/ô giữ</th>
                <th>Tình trạng kho</th>
              </tr>
            </thead>
            <tbody>
              {linkedOrderStock.map(({ order, batch }) => (
                <tr key={order.id} onClick={() => openOrder(order)}>
                  <td data-label="Order"><strong>{order.id}</strong><span>Về VN {order.receivedVnDate || batch?.arrival || "-"}</span></td>
                  <td data-label="Sản phẩm"><ProductCell order={order} batch={batch} orders={orders} /></td>
                  <td data-label="SL/Kg">{orderFinanceForBatch(order, batch, orders).quantity}<span>Tổng {kg(orderTotalWeightKg(order))}kg</span></td>
                  <td data-label="Khách">{order.customer}<span>{order.phone}</span></td>
                  <td data-label="Chuyến">{batch?.code || "-"}</td>
                  <td data-label="Kho/ô giữ">{order.vnStockLocation || "Chưa nhập"}</td>
                  <td data-label="Tình trạng kho"><span className={`stock-link-chip ${order.vnStockChecked ? "done" : "warn"}`}>{order.vnStockChecked ? "Đã kiểm kho" : "Cần kiểm kho"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!linkedOrderStock.length && <EmptyState title="Không có hàng của khách đang giữ" body="Khi đơn đã về VN nhưng chưa giao khách, hàng sẽ tự hiện ở đây từ dữ liệu order." />}
        </div>
      </div>
      <div className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Ready stock</span>
            <h2>Hàng bán sẵn nhập tay</h2>
          </div>
        </div>
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
      if (status === "out_of_stock") sum.outOfStock += 1;
      if (status === "purchased") sum.purchased += 1;
      if (status === "sent_vn") sum.sentVn += 1;
      if (status === "received_vn") sum.receivedVn += 1;
      if (status === "delivered") sum.delivered += 1;
      if (status === "cancelled") sum.cancelled += 1;
      return sum;
    },
    { total: 0, waitingBuy: 0, outOfStock: 0, purchased: 0, sentVn: 0, receivedVn: 0, delivered: 0, cancelled: 0 }
  );
}

function sortedFlightBatches(batches) {
  return [...batches].sort((a, b) => String(a.departure || a.arrival || "").localeCompare(String(b.departure || b.arrival || "")));
}

const packingWorkflowStatuses = [
  { id: "waiting_buy", label: "Chờ mua", hint: "Cần buyer xử lý", tone: "warn" },
  { id: "out_of_stock", label: "Hết hàng", hint: "Chờ khách chọn chuyển chuyến/hủy", tone: "stockout" },
  { id: "purchased", label: "Đã mua", hint: "Chờ gom/gửi về VN", tone: "ready" },
  { id: "sent_vn", label: "Đã gửi về VN", hint: "Theo dõi hàng bay", tone: "flying" },
  { id: "received_vn", label: "Đã nhận ở VN", hint: "Chờ giao khách", tone: "arrived" }
];

function PackingListSummary({ title, eyebrow, batches, orders, openBuyingChecklist }) {
  const activeBatches = upcomingFlightBatches(batches, 3);
  const summaryBatches = activeBatches
    .map((batch) => {
      const batchOrders = batchOrderRows(batch, orders);
      const progress = flightOrderProgress(batchOrders);
      const finance = batchFinanceSummary(batch, orders);
      return { batch, progress, finance };
    })
    .filter(({ progress }) => progress.total > 0 || activeBatches.length <= 6)
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
        {summaryBatches.map(({ batch, progress, finance }) => (
          <button className="packing-list-card" type="button" key={batch.id} onClick={() => openBuyingChecklist(batch.id)}>
            <div className="packing-card-head">
              <strong>{batch.code || batch.id}</strong>
              <em className={progress.waitingBuy ? "warn" : "ok"}>{progress.waitingBuy ? `Thiếu ${progress.waitingBuy}` : "Đủ mua"}</em>
            </div>
            <span>Về VN {batch.arrival || "-"} · Cutoff {batch.cutoff || "-"}</span>
            <div className="packing-card-stats">
              <span>Chờ mua <strong>{progress.waitingBuy}</strong></span>
              <span>Hết hàng <strong>{progress.outOfStock}</strong></span>
              <span>Đã mua <strong>{progress.purchased}</strong></span>
              <span>Đã gửi <strong>{progress.sentVn}</strong></span>
              <span>Đã nhận <strong>{progress.receivedVn}</strong></span>
              <span>Kg chốt <strong>{kg(finance.chargeWeightKg)}</strong></span>
              <span>Chi cước <strong>{compactVnd(finance.actualAirFreightVnd)}</strong></span>
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

function StockoutsView({ batches, orders, openOrder, updateOrderStatus, moveOutOfStockToNextBatch, canEditOrder }) {
  const stockoutOrders = orders
    .filter((order) => normalizeOrderStatus(order.status) === "out_of_stock")
    .sort((a, b) => String(b.outOfStockAt || b.updatedAt || "").localeCompare(String(a.outOfStockAt || a.updatedAt || "")));
  const groups = [
    ...sortedFlightBatches(batches).map((batch) => ({
      id: batch.id,
      batch,
      title: batch.code || batch.id,
      subtitle: `Hết khi mua cho chuyến này · Về VN ${batch.arrival || "-"} · Cutoff ${batch.cutoff || "-"}`,
      orders: stockoutOrders.filter((order) => (order.outOfStockBatchId || order.batchId) === batch.id)
    })),
    {
      id: "unassigned",
      batch: null,
      title: "Chưa rõ chuyến",
      subtitle: "Đơn hết hàng chưa có chuyến gốc hoặc chưa được gán chuyến.",
      orders: stockoutOrders.filter((order) => !findOrderBatch(batches, { batchId: order.outOfStockBatchId || order.batchId }))
    }
  ].filter((group) => group.orders.length);
  const nextMoveCount = stockoutOrders.filter((order) => order.customerWantsNextBatch).length;

  return (
    <div className="screen-stack stockout-screen">
      <div className="panel-title standalone compact-page-title">
        <div>
          <span className="eyebrow">Buying exception</span>
          <h2>Hàng hết theo chuyến bay</h2>
        </div>
      </div>
      <section className="metric-grid lean stockout-kpi-grid">
        <Kpi label="Đơn đang hết hàng" value={String(stockoutOrders.length)} icon={TriangleAlert} tone={stockoutOrders.length ? "warning" : "success"} />
        <Kpi label="Khách muốn chuyển chuyến" value={String(nextMoveCount)} icon={Plane} />
        <Kpi label="Chuyến bị ảnh hưởng" value={String(groups.length)} icon={ClipboardList} />
      </section>
      <section className="panel stockout-panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Stockout board</span>
            <h2>Danh sách cần quyết định</h2>
          </div>
          <TriangleAlert size={18} />
        </div>
        <div className="stockout-group-list">
          {groups.map((group) => (
            <article className="stockout-group" key={group.id}>
              <div className="stockout-group-head">
                <div>
                  <strong>{group.title}</strong>
                  <span>{group.subtitle}</span>
                </div>
                <em>{group.orders.length} đơn</em>
              </div>
              <div className="stockout-card-list">
                {group.orders.map((order) => {
                  const currentBatch = findOrderBatch(batches, order);
                  const originalBatch = findOrderBatch(batches, { batchId: order.outOfStockBatchId || order.batchId });
                  const nextBatch = nextOpenBatchAfter(batches, currentBatch || originalBatch, order.orderDate);
                  const finance = orderFinanceForBatch(order, currentBatch, orders);
                  const editable = !canEditOrder || canEditOrder(order);
                  return (
                    <article className="stockout-card" key={order.id} onClick={() => openOrder(order)}>
                      <ProductCell order={order} batch={currentBatch} orders={orders} />
                      <div className="stockout-main">
                        <strong>{order.product || order.id}</strong>
                        <span>{order.customer || "-"} · SL {finance.quantity} · {kg(finance.totalWeightKg)}kg</span>
                        <span>{order.id}</span>
                        <span className="stockout-path">
                          Gốc: {originalBatch?.code || originalBatch?.id || "-"} · Hiện tại: {currentBatch?.code || currentBatch?.id || "-"}
                        </span>
                      </div>
                      <div className="stockout-status">
                        <span className="status-chip out_of_stock">Hết hàng</span>
                        <small>{order.outOfStockDate || today()}</small>
                        {nextBatch && <small>Chuyến sau: {nextBatch.code || nextBatch.id}</small>}
                      </div>
                      <div className="stockout-actions" onClick={(event) => event.stopPropagation()}>
                        <button type="button" disabled={!editable || !nextBatch} onClick={() => moveOutOfStockToNextBatch(order.id)}>Chuyển chuyến sau</button>
                        <button type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "waiting_buy")}>Mua lại</button>
                        <button type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "cancelled")}>Hủy</button>
                        <button type="button" onClick={() => openOrder(order)}>Sửa</button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </article>
          ))}
          {!groups.length && (
            <EmptyState title="Chưa có hàng hết" body="Khi buyer bấm Hết hàng trong Mua hàng & Packing, đơn sẽ tự nằm ở đây theo chuyến bay gốc để quyết định chuyển chuyến sau, mua lại hoặc hủy." />
          )}
        </div>
      </section>
    </div>
  );
}

function BuyingChecklistView({ batches, orders, focusBatchId, setFocusBatchId, openOrder, openBatch, updateOrderStatus, canEditOrder }) {
  const allSortedBatches = sortedFlightBatches(batches);
  const sortedBatches = upcomingFlightBatches(batches, 3);
  const topBatchIds = new Set(sortedBatches.map((batch) => batch.id));
  const olderBatches = allSortedBatches.filter((batch) => !topBatchIds.has(batch.id));
  const unassignedOrders = orders.filter((order) => !order.batchId && normalizeOrderStatus(order.status) !== "cancelled");
  React.useEffect(() => {
    if (focusBatchId !== "all" && focusBatchId !== "unassigned" && !allSortedBatches.some((batch) => batch.id === focusBatchId)) {
      setFocusBatchId("all");
    }
  }, [focusBatchId, setFocusBatchId, allSortedBatches]);
  const visibleBatches = focusBatchId === "all" || focusBatchId === "unassigned" ? sortedBatches : sortedBatches.filter((batch) => batch.id === focusBatchId);
  const manualBatch = focusBatchId !== "all" && focusBatchId !== "unassigned" ? allSortedBatches.find((batch) => batch.id === focusBatchId) : null;
  const scopedVisibleBatches = manualBatch && !visibleBatches.length ? [manualBatch] : visibleBatches;
  const visibleUnassigned = focusBatchId === "unassigned" ? unassignedOrders : [];
  const allVisibleOrders = [...scopedVisibleBatches.flatMap((batch) => orders.filter((order) => order.batchId === batch.id)), ...visibleUnassigned];
  const activeWorkflowOrders = allVisibleOrders.filter((order) => packingWorkflowStatuses.some((status) => status.id === normalizeOrderStatus(order.status)));
  const progress = flightOrderProgress(allVisibleOrders);
  const activeBatch = allSortedBatches.find((batch) => batch.id === focusBatchId);
  const scopeTitle =
    focusBatchId === "all"
      ? `${sortedBatches.length || 0} chuyến gần nhất`
      : focusBatchId === "unassigned"
        ? "Chưa xếp chuyến"
        : activeBatch?.code || activeBatch?.id || "Chuyến đang chọn";
  const progressItems = [
    { label: "Việc mở", value: activeWorkflowOrders.length, icon: ClipboardList },
    { label: "Chờ mua", value: progress.waitingBuy, icon: PackageCheck, tone: progress.waitingBuy ? "warning" : "success" },
    { label: "Hết hàng", value: progress.outOfStock, icon: TriangleAlert, tone: progress.outOfStock ? "warning" : "success" },
    { label: "Đã mua", value: progress.purchased, icon: CheckCircle2 },
    { label: "Đang về VN", value: progress.sentVn, icon: Plane },
    { label: "Chờ giao", value: progress.receivedVn, icon: Boxes }
  ];
  const scopeWeight = activeWorkflowOrders.reduce((sum, order) => sum + orderTotalWeightKg(order), 0);

  return (
    <div className="screen-stack buying-workspace">
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
      <section className="panel buying-command-panel">
        <div className="buying-scope-head">
          <div>
            <span className="eyebrow">Packing scope</span>
            <h2>{scopeTitle}</h2>
          </div>
          <span>
            {activeBatch ? `Về VN ${activeBatch.arrival || "-"} · Cutoff ${activeBatch.cutoff || "-"}` : `${activeWorkflowOrders.length} việc mở · ${kg(scopeWeight)}kg`}
          </span>
        </div>
        <div className="buying-scope-list">
          <button className={focusBatchId === "all" ? "active" : ""} type="button" onClick={() => setFocusBatchId("all")}>3 chuyến gần nhất</button>
          {sortedBatches.map((batch) => (
            <button className={focusBatchId === batch.id ? "active" : ""} type="button" key={batch.id} onClick={() => setFocusBatchId(batch.id)}>
              {batch.code || batch.id}
            </button>
          ))}
          {olderBatches.length > 0 && (
            <select
              className="buying-scope-select"
              value={olderBatches.some((batch) => batch.id === focusBatchId) ? focusBatchId : ""}
              onChange={(event) => event.target.value && setFocusBatchId(event.target.value)}
            >
              <option value="">Chọn chuyến cũ hơn</option>
              {olderBatches.map((batch) => (
                <option value={batch.id} key={batch.id}>
                  {batch.code || batch.id} · Bay {batch.departure || "-"} · Về VN {batch.arrival || "-"}
                </option>
              ))}
            </select>
          )}
          {unassignedOrders.length > 0 && (
            <button className={focusBatchId === "unassigned" ? "active" : ""} type="button" onClick={() => setFocusBatchId("unassigned")}>
              Chưa xếp chuyến ({unassignedOrders.length})
            </button>
          )}
        </div>
        <div className="buying-progress-strip">
          {progressItems.map((item) => {
            const Icon = item.icon;
            return (
              <div className={`buying-progress-chip ${item.tone || ""}`} key={item.label}>
                <Icon size={15} />
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            );
          })}
        </div>
      </section>
      <PackingWorkflowBoard
        orders={activeWorkflowOrders}
        batches={batches}
        openOrder={openOrder}
        updateOrderStatus={updateOrderStatus}
        canEditOrder={canEditOrder}
      />
    </div>
  );
}

function PackingWorkflowBoard({ orders, batches, openOrder, updateOrderStatus, canEditOrder }) {
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
                  const finance = orderFinanceForBatch(order, batch, orders);
                  return (
                    <article className="workflow-card" key={order.id} onClick={() => openOrder(order)}>
                      <div className="workflow-card-main">
                        <ProductCell order={order} batch={batch} orders={orders} />
                        <div className="workflow-card-meta">
                          <strong>{order.id}</strong>
                          <span>{order.customer || "-"} · SL {finance.quantity} · Tong {kg(finance.totalWeightKg)}kg</span>
                          <span>{batch ? `${batch.code || batch.id} · về VN ${batch.arrival || "-"}` : "Chưa xếp chuyến"}</span>
                        </div>
                      </div>
                      <FlightOrderQuickActions order={order} openOrder={openOrder} updateOrderStatus={updateOrderStatus} canEditOrder={canEditOrder} />
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

function FlightsViewLegacy({ batches, orders, openBatch, openOrder, openBuyingChecklist, updateOrderStatus, canSeeProfit }) {
  const upcomingBatches = sortedFlightBatches(batches);
  const unassignedOrders = orders.filter((order) => !order.batchId && normalizeOrderStatus(order.status) !== "cancelled");
  const totals = batches.reduce(
    (sum, batch) => {
      const batchOrders = orders.filter((order) => order.batchId === batch.id);
      const progress = flightOrderProgress(batchOrders);
      sum.orders += batchOrders.length;
      sum.waitingBuy += progress.waitingBuy;
      sum.outOfStock += progress.outOfStock;
      sum.purchased += progress.purchased;
      sum.sentVn += progress.sentVn;
      sum.freightAud += money(batch.freightAud);
      sum.remaining += batchOrders.reduce((orderSum, order) => orderSum + orderFinanceForBatch(order, batch, orders).remainingVnd, 0);
      sum.revenue += batchOrders.reduce((orderSum, order) => orderSum + orderFinanceForBatch(order, batch, orders).totalThuVnd, 0);
      sum.cost += batchOrders.reduce((orderSum, order) => orderSum + orderFinanceForBatch(order, batch, orders).totalCostVnd, 0);
      return sum;
    },
    { orders: 0, waitingBuy: 0, outOfStock: 0, purchased: 0, sentVn: 0, freightAud: 0, remaining: 0, revenue: 0, cost: 0 }
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
                const revenue = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).totalThuVnd, 0);
                const remaining = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).remainingVnd, 0);
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
          const remaining = batchOrders.reduce((sum, order) => sum + orderFinanceForBatch(order, batch, orders).remainingVnd, 0);
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

function FlightsView({ batches, orders, openBatch, openOrder, openBuyingChecklist, updateOrderStatus, canEditOrder, canSeeProfit }) {
  const [flightFilter, setFlightFilter] = React.useState("nearest");
  const sortedBatches = sortedFlightBatches(batches);
  const activeBatches = upcomingFlightBatches(batches, 3);
  const arrivedBatches = sortedBatches
    .filter((batch) => batchHasArrived(batch))
    .sort((a, b) => String(b.arrival || b.departure || "").localeCompare(String(a.arrival || a.departure || "")));
  const nearestBatch = activeBatches[0] || null;
  const visibleBatches =
    flightFilter === "nearest"
      ? nearestBatch
        ? [nearestBatch]
        : []
      : flightFilter === "collecting"
        ? activeBatches.filter(batchIsCollecting)
        : flightFilter === "shipping"
          ? activeBatches.filter(batchIsInTransit)
          : activeBatches;
  const unassignedOrders = orders.filter((order) => !order.batchId && normalizeOrderStatus(order.status) !== "cancelled");
  const totals = activeBatches.reduce(
    (sum, batch) => {
      const finance = batchFinanceSummary(batch, orders);
      const progress = flightOrderProgress(finance.batchOrders);
      sum.orders += finance.batchOrders.length;
      sum.waitingBuy += progress.waitingBuy;
      sum.purchased += progress.purchased;
      sum.sentVn += progress.sentVn;
      sum.freightAud += money(batch.freightAud);
      sum.estimatedWeightKg += finance.estimatedWeightKg;
      sum.chargeWeightKg += finance.chargeWeightKg;
      sum.actualAirFreightVnd += finance.actualAirFreightVnd;
      sum.remaining += finance.remaining;
      sum.revenue += finance.revenue;
      sum.cost += finance.adjustedCost;
      return sum;
    },
    { orders: 0, waitingBuy: 0, outOfStock: 0, purchased: 0, sentVn: 0, freightAud: 0, estimatedWeightKg: 0, chargeWeightKg: 0, actualAirFreightVnd: 0, remaining: 0, revenue: 0, cost: 0 }
  );

  const renderFlightRows = (rows, emptyTitle, emptyBody) => (
    <div className="table-wrap flight-table-wrap">
      <table className="flight-overview-table">
        <thead>
          <tr>
            <th>Chuyến</th>
            <th>Trạng thái</th>
            <th>Lịch xử lý</th>
            <th>Tiến độ</th>
            <th>Tài chính</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((batch) => {
            const status = normalizeBatchStatus(batch.status);
            const finance = batchFinanceSummary(batch, orders);
            const batchOrders = finance.batchOrders;
            const progress = flightOrderProgress(batchOrders);
            return (
              <tr key={batch.id} onClick={() => openBatch(batch)}>
                <td data-label="Chuyến">
                  <strong>{batch.code || batch.id}</strong>
                  <span>{batch.route}</span>
                </td>
                <td data-label="Trạng thái">
                  <span className={`batch-chip ${status}`}>{batchStatusLabel(status)}</span>
                </td>
                <td data-label="Lịch xử lý">
                  <strong>Về VN {batch.arrival || "-"}</strong>
                  <span>Bay {batch.departure || "-"}</span>
                  <span>Cutoff {batch.cutoff || "-"}</span>
                </td>
                <td data-label="Tiến độ">
                  <div className="flight-progress-mini">
                    <span>Order {batchOrders.length}</span>
                    <span className={progress.waitingBuy ? "warn" : ""}>Chờ mua {progress.waitingBuy}</span>
                    <span className={progress.outOfStock ? "warn" : ""}>Hết hàng {progress.outOfStock}</span>
                    <span>Đã mua {progress.purchased}</span>
                    <span>Đã gửi {progress.sentVn}</span>
                    <span>Đã nhận {progress.receivedVn}</span>
                  </div>
                </td>
                <td data-label="Tài chính" className="finance-cell">
                  <strong>{vnd(finance.revenue)}</strong>
                  <span>Kg chốt {kg(finance.chargeWeightKg)}kg · {aud(batch.freightAud)}/kg</span>
                  <span>Chi cước {vnd(finance.actualAirFreightVnd)}</span>
                  <span className="money-due">Còn thu {vnd(finance.remaining)}</span>
                </td>
                <td data-label="Ghi chú">{batch.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!rows.length && <EmptyState title={emptyTitle} body={emptyBody} />}
    </div>
  );

  return (
    <div className="screen-stack flights-screen">
      <div className="panel-title standalone compact-page-title">
        <div>
          <span className="eyebrow">Flight control</span>
          <h2>Quản lý chuyến bay</h2>
        </div>
        <button className="primary-button" onClick={() => openBatch()}>
          <Plus size={17} />
          Thêm chuyến
        </button>
      </div>

      <section className="flight-filter-panel">
        <div className="flight-filter-summary">
          <span className="eyebrow">Filter</span>
          <strong>{nearestBatch ? `Chuyến gần nhất: ${nearestBatch.code || nearestBatch.id}` : "Chưa có chuyến đang mở"}</strong>
          <span>
            Đang mở {activeBatches.length} chuyến · Đã về VN {arrivedBatches.length} chuyến
          </span>
        </div>
        <div className="flight-filter-actions">
          <button className={flightFilter === "nearest" ? "active" : ""} onClick={() => setFlightFilter("nearest")}>Gần nhất</button>
          <button className={flightFilter === "collecting" ? "active" : ""} onClick={() => setFlightFilter("collecting")}>Đang gom</button>
          <button className={flightFilter === "shipping" ? "active" : ""} onClick={() => setFlightFilter("shipping")}>Đã gửi về VN</button>
          <button className={flightFilter === "all" ? "active" : ""} onClick={() => setFlightFilter("all")}>Tất cả đang mở</button>
        </div>
      </section>

      <section className="metric-grid lean flights-kpi-grid">
        <Kpi label="Chuyến đang mở" value={String(activeBatches.length)} icon={Plane} />
        <Kpi label="Order đã link" value={String(totals.orders)} icon={ClipboardList} />
        <Kpi label="Chờ mua" value={String(totals.waitingBuy)} icon={PackageCheck} tone={totals.waitingBuy ? "warning" : "success"} />
        <Kpi label="Hết hàng" value={String(totals.outOfStock)} icon={TriangleAlert} tone={totals.outOfStock ? "warning" : "success"} />
        <Kpi label="Kg chốt / ước" value={`${kg(totals.chargeWeightKg)} / ${kg(totals.estimatedWeightKg)}kg`} icon={Boxes} />
        <Kpi label="Chi cước bay" value={vnd(totals.actualAirFreightVnd)} icon={CreditCard} />
        {canSeeProfit && <Kpi label="Lãi chuyến đang mở" value={vnd(totals.revenue - totals.cost)} icon={Gem} tone="success" />}
      </section>

      <div className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Active flights</span>
            <h2>Bảng quản lý chuyến đang mở</h2>
          </div>
          <Plane size={18} />
        </div>
        {renderFlightRows(visibleBatches, "Không có chuyến phù hợp filter", "Đổi filter hoặc bấm Thêm chuyến để tạo lịch bay mới.")}
      </div>

      <PackingListSummary
        title="Packing list chuyến đang xử lý"
        eyebrow="Flight packing"
        batches={batches}
        orders={orders}
        openBuyingChecklist={openBuyingChecklist}
      />

      <div className="panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Arrived archive</span>
            <h2>Chuyến đã về VN</h2>
          </div>
          <Boxes size={18} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Chuyến</th>
                <th>Ngày về VN</th>
                <th>Order</th>
                <th>Kg/cước</th>
                <th>Đã ship</th>
                <th>Thu đủ</th>
                <th>Còn phải thu</th>
              </tr>
            </thead>
            <tbody>
              {arrivedBatches.map((batch) => {
                const finance = batchFinanceSummary(batch, orders);
                const batchOrders = finance.batchOrders;
                const shipped = batchOrders.filter((order) => order.customerShipped || normalizeOrderStatus(order.status) === "delivered").length;
                const paid = batchOrders.filter((order) => order.paidInFull || orderFinanceForBatch(order, batch, orders).remainingVnd <= 0).length;
                return (
                  <tr key={batch.id} onClick={() => openBatch(batch)}>
                    <td data-label="Chuyến"><strong>{batch.code || batch.id}</strong><span>{batch.route}</span></td>
                    <td data-label="Ngày về VN"><strong>{batch.arrival || "-"}</strong><span>Bay {batch.departure || "-"}</span></td>
                    <td data-label="Order">{batchOrders.length}</td>
                    <td data-label="Kg/cước"><strong>{kg(finance.chargeWeightKg)}kg</strong><span>{vnd(finance.actualAirFreightVnd)}</span></td>
                    <td data-label="Đã ship">{shipped}/{batchOrders.length}</td>
                    <td data-label="Thu đủ">{paid}/{batchOrders.length}</td>
                    <td data-label="Còn phải thu" className="finance-cell"><strong>{vnd(finance.remaining)}</strong></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!arrivedBatches.length && <EmptyState title="Chưa có chuyến đã về VN" body="Khi chuyến được đánh dấu đầu VN đã nhận hàng hoặc đã qua ngày về, app sẽ chuyển xuống bảng này." />}
        </div>
      </div>
    </div>
  );
}

function FlightChecklistPanel({ batches, orders, unassignedOrders, openOrder, updateOrderStatus, canEditOrder }) {
  const groupedBatches = [
    ...batches.map((batch) => ({
      id: batch.id,
      title: batch.code || batch.id,
      subtitle: `Về VN ${batch.arrival || "-"} · Cutoff ${batch.cutoff || "-"}`,
      batch,
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
                    <FlightOrderRow order={order} batch={group.batch} orders={orders} openOrder={openOrder} updateOrderStatus={updateOrderStatus} canEditOrder={canEditOrder} key={order.id} />
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

function FlightOrderQuickActions({ order, openOrder, updateOrderStatus, canEditOrder }) {
  const status = normalizeOrderStatus(order.status);
  const editable = !canEditOrder || canEditOrder(order);
  return (
    <div className="flight-order-actions" onClick={(event) => event.stopPropagation()}>
      {!editable && <em className="locked-action">Cần Ryan cấp quyền</em>}
      {status === "waiting_buy" && <button type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "purchased")}>Đã mua</button>}
      {status === "waiting_buy" && <button className="warning-action" type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "out_of_stock")}>Hết hàng</button>}
      {status === "out_of_stock" && <button type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "waiting_buy")}>Mua lại</button>}
      {status === "out_of_stock" && <button className="warning-action" type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "cancelled")}>Hủy</button>}
      {status === "purchased" && <button type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "sent_vn")}>Đã gửi VN</button>}
      {status === "sent_vn" && <button type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "received_vn")}>Đã nhận VN</button>}
      {status === "received_vn" && <button type="button" disabled={!editable} onClick={() => updateOrderStatus(order.id, "delivered")}>Đã giao</button>}
      <button type="button" onClick={() => openOrder(order)}>Sửa</button>
    </div>
  );
}

function FlightOrderRow({ order, batch = null, orders = [], openOrder, updateOrderStatus, canEditOrder }) {
  const status = normalizeOrderStatus(order.status);
  const finance = batch ? orderFinanceForBatch(order, batch, orders) : orderFinance(order);
  return (
    <div className="flight-order-item" onClick={() => openOrder(order)}>
      <ProductCell order={order} batch={batch} orders={orders} />
      <div className="flight-order-meta">
        <strong>{order.id}</strong>
        {finance.billingWeightKg !== finance.totalWeightKg && <span>Kg tinh cuoc {kg(finance.billingWeightKg)}kg</span>}
        <span>{order.customer || "-"} · SL {finance.quantity} · Tong {kg(finance.totalWeightKg)}kg</span>
        <span className={`status-chip ${status}`}>{statusLabel(status)}</span>
      </div>
      <FlightOrderQuickActions order={order} openOrder={openOrder} updateOrderStatus={updateOrderStatus} canEditOrder={canEditOrder} />
    </div>
  );
}

function AfterArrivalView({ orders, batches, openOrder, updateOrder, canEditOrder }) {
  const [arrivalYearFilter, setArrivalYearFilter] = React.useState("all");
  const [arrivalBatchFilter, setArrivalBatchFilter] = React.useState("latest");
  const managedStatuses = new Set(["received_vn", "delivered"]);
  const managedOrders = orders
    .filter((order) => {
      const status = normalizeOrderStatus(order.status);
      return managedStatuses.has(status) || order.receivedVnDate || order.customerShipped || order.paidInFull;
    })
    .sort((a, b) => {
      const financeA = orderFinanceForBatch(a, findOrderBatch(batches, a), orders);
      const financeB = orderFinanceForBatch(b, findOrderBatch(batches, b), orders);
      const scoreA = (a.receivedVnDate ? 0 : 4) + (a.customerShipped ? 0 : 2) + ((a.paidInFull || financeA.remainingVnd <= 0) ? 0 : 1);
      const scoreB = (b.receivedVnDate ? 0 : 4) + (b.customerShipped ? 0 : 2) + ((b.paidInFull || financeB.remainingVnd <= 0) ? 0 : 1);
      if (scoreA !== scoreB) return scoreB - scoreA;
      return String(a.receivedVnDate || findOrderBatch(batches, a)?.arrival || "").localeCompare(String(b.receivedVnDate || findOrderBatch(batches, b)?.arrival || ""));
    });
  const totals = managedOrders.reduce(
    (sum, order) => {
      const finance = orderFinanceForBatch(order, findOrderBatch(batches, order), orders);
      const paid = Boolean(order.paidInFull || finance.remainingVnd <= 0);
      sum.received += (order.receivedVnDate || ["received_vn", "delivered"].includes(normalizeOrderStatus(order.status))) ? 1 : 0;
      sum.shipped += (order.customerShipped || normalizeOrderStatus(order.status) === "delivered") ? 1 : 0;
      sum.paid += paid ? 1 : 0;
      sum.remaining += paid ? 0 : finance.remainingVnd;
      return sum;
    },
    { received: 0, shipped: 0, paid: 0, remaining: 0 }
  );
  const batchGroups = [
    ...sortedFlightBatches(batches)
      .sort((a, b) => String(b.arrival || b.departure || "").localeCompare(String(a.arrival || a.departure || "")))
      .map((batch) => ({
      id: batch.id,
      title: batch.code || batch.id,
      subtitle: `Về VN ${batch.arrival || "-"} · ${batch.route || "Australia -> Việt Nam"}`,
      batch,
      orders: managedOrders.filter((order) => findOrderBatch(batches, order)?.id === batch.id)
    })),
    {
      id: "unassigned",
      title: "Chưa xếp chuyến",
      subtitle: "Đơn đã có trạng thái hàng về nhưng chưa link chuyến bay",
      batch: null,
      orders: managedOrders.filter((order) => !findOrderBatch(batches, order))
    }
  ].filter((group) => group.orders.length);
  const arrivalYears = [...new Set(batchGroups.map((group) => String(group.batch?.arrival || group.batch?.departure || group.orders[0]?.receivedVnDate || "Chưa rõ").slice(0, 4)))].filter(Boolean);
  const yearFilteredGroups = arrivalYearFilter === "all"
    ? batchGroups
    : batchGroups.filter((group) => String(group.batch?.arrival || group.batch?.departure || group.orders[0]?.receivedVnDate || "Chưa rõ").slice(0, 4) === arrivalYearFilter);
  const visibleBatchGroups =
    arrivalBatchFilter === "latest"
      ? yearFilteredGroups.slice(0, 1)
      : arrivalBatchFilter === "all"
        ? yearFilteredGroups
        : yearFilteredGroups.filter((group) => group.id === arrivalBatchFilter);

  React.useEffect(() => {
    if (arrivalBatchFilter !== "latest" && arrivalBatchFilter !== "all" && !yearFilteredGroups.some((group) => group.id === arrivalBatchFilter)) {
      setArrivalBatchFilter("latest");
    }
  }, [arrivalBatchFilter, yearFilteredGroups]);

  function groupStats(groupOrders) {
    return groupOrders.reduce(
      (sum, order) => {
        const finance = orderFinanceForBatch(order, findOrderBatch(batches, order), orders);
        const status = normalizeOrderStatus(order.status);
        const paid = Boolean(order.paidInFull || finance.remainingVnd <= 0);
        sum.total += 1;
        sum.checked += order.vnStockChecked ? 1 : 0;
        sum.shipped += (order.customerShipped || status === "delivered") ? 1 : 0;
        sum.paid += paid ? 1 : 0;
        sum.remaining += paid ? 0 : finance.remainingVnd;
        return sum;
      },
      { total: 0, checked: 0, shipped: 0, paid: 0, remaining: 0 }
    );
  }

  function setReceived(order, checked) {
    if (checked) {
      updateOrder(order.id, {
        status: normalizeOrderStatus(order.status) === "sent_vn" ? "received_vn" : order.status,
        receivedVnDate: order.receivedVnDate || today(),
        vnStockLocation: order.vnStockLocation || "Kho VN"
      });
      return;
    }
    updateOrder(order.id, {
      status: normalizeOrderStatus(order.status) === "received_vn" ? "sent_vn" : order.status,
      receivedVnDate: ""
    });
  }

  function setShipped(order, checked) {
    if (checked) {
      updateOrder(order.id, {
        status: "delivered",
        receivedVnDate: order.receivedVnDate || today(),
        customerShipped: true,
        customerShippedDate: order.customerShippedDate || today()
      });
      return;
    }
    updateOrder(order.id, {
      status: "received_vn",
      customerShipped: false,
      customerShippedDate: ""
    });
  }

  function setPaid(order, checked) {
    const finance = orderFinanceForBatch(order, findOrderBatch(batches, order), orders);
    if (checked) {
      updateOrder(order.id, {
        paidInFull: true,
        paidInFullDate: order.paidInFullDate || today(),
        depositVnd: Math.max(money(order.depositVnd), finance.totalThuVnd)
      });
      return;
    }
    updateOrder(order.id, {
      paidInFull: false,
      paidInFullDate: ""
    });
  }

  return (
    <div className="screen-stack">
      <div className="panel-title standalone">
        <div>
          <span className="eyebrow">Arrival operations</span>
          <h2>Hàng đã về</h2>
        </div>
      </div>
      <section className="metric-grid lean">
        <Kpi label="Đơn cần theo dõi" value={String(managedOrders.length)} icon={Truck} />
        <Kpi label="Đã về VN" value={String(totals.received)} icon={PackageCheck} />
        <Kpi label="Đã ship/giao" value={String(totals.shipped)} icon={CheckCircle2} />
        <Kpi label="Đã thu đủ" value={String(totals.paid)} icon={WalletCards} tone={totals.remaining ? "warning" : "success"} />
        <Kpi label="Còn phải thu" value={vnd(totals.remaining)} icon={CreditCard} tone={totals.remaining ? "warning" : "success"} />
      </section>
      <section className="panel post-arrival-panel">
        <div className="panel-title">
          <div>
            <span className="eyebrow">Flight-based delivery</span>
            <h2>Quản lý hàng đã về theo chuyến bay</h2>
          </div>
          <Truck size={18} />
        </div>
        <div className="arrival-filter-panel">
          <label>
            Năm
            <select value={arrivalYearFilter} onChange={(event) => { setArrivalYearFilter(event.target.value); setArrivalBatchFilter("latest"); }}>
              <option value="all">Tất cả năm</option>
              {arrivalYears.map((year) => <option value={year} key={year}>{year === "Chưa" ? "Chưa rõ năm" : `Năm ${year}`}</option>)}
            </select>
          </label>
          <label>
            Chuyến bay
            <select value={arrivalBatchFilter} onChange={(event) => setArrivalBatchFilter(event.target.value)}>
              <option value="latest">Chuyến gần nhất</option>
              <option value="all">Tất cả chuyến trong filter</option>
              {yearFilteredGroups.map((group) => (
                <option value={group.id} key={group.id}>
                  {group.title} · {group.orders.length} đơn
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="arrival-flight-groups">
          {visibleBatchGroups.map((group) => {
            const stats = groupStats(group.orders);
            return (
              <section className="arrival-flight-section" key={group.id}>
                <div className="arrival-flight-head">
                  <div>
                    <strong>{group.title}</strong>
                    <span>{group.subtitle}</span>
                  </div>
                  <em className={stats.remaining ? "warn" : "ok"}>{stats.remaining ? `Còn thu ${vnd(stats.remaining)}` : "Đã thu đủ"}</em>
                </div>
                <div className="arrival-flight-stats">
                  <span>Đơn <strong>{stats.total}</strong></span>
                  <span>Đã kiểm kho <strong>{stats.checked}</strong></span>
                  <span>Đã giao <strong>{stats.shipped}</strong></span>
                  <span>Thu đủ <strong>{stats.paid}</strong></span>
                </div>
                <div className="post-arrival-grid">
                  {group.orders.map((order) => {
                    const batch = findOrderBatch(batches, order);
                    const status = normalizeOrderStatus(order.status);
                    const finance = orderFinanceForBatch(order, batch, orders);
                    const receivedChecked = Boolean(order.receivedVnDate || ["received_vn", "delivered"].includes(status));
                    const shippedChecked = Boolean(order.customerShipped || status === "delivered");
                    const paidChecked = Boolean(order.paidInFull || finance.remainingVnd <= 0);
                    const editable = !canEditOrder || canEditOrder(order);
                    return (
                      <article className={`post-arrival-card ${editable ? "" : "locked"}`} key={order.id}>
                        <button className="post-arrival-product" type="button" onClick={() => openOrder(order)}>
                          <ProductCell order={order} batch={batch} orders={orders} />
                          <span>{order.id}</span>
                        </button>
                        <div className="post-arrival-meta">
                          <span>{order.customer || "-"} · {batch?.code || "Chưa xếp chuyến"}</span>
                          <span>Về VN {order.receivedVnDate || batch?.arrival || "-"}</span>
                        </div>
                        {!editable && <div className="arrival-lock-note">Chỉ Ryan được sửa đơn đã về. Staff cần xin quyền trước khi chỉnh.</div>}
                        <label className={`ops-check ${receivedChecked ? "done" : ""}`}>
                          <input type="checkbox" checked={receivedChecked} disabled={shippedChecked || !editable} onChange={(event) => setReceived(order, event.target.checked)} />
                          <span>Đã về VN</span>
                          <input type="date" disabled={!editable} value={order.receivedVnDate || ""} onChange={(event) => updateOrder(order.id, { receivedVnDate: event.target.value, vnStockLocation: event.target.value ? (order.vnStockLocation || "Kho VN") : order.vnStockLocation, status: status === "sent_vn" && event.target.value ? "received_vn" : status })} />
                        </label>
                        <label className={`ops-check ${order.vnStockChecked ? "done" : ""}`}>
                          <input type="checkbox" checked={Boolean(order.vnStockChecked)} disabled={!editable} onChange={(event) => updateOrder(order.id, { vnStockChecked: event.target.checked })} />
                          <span>Đã kiểm kho</span>
                          <input value={order.vnStockLocation || ""} disabled={!editable} placeholder="Kho/ô giữ hàng" onChange={(event) => updateOrder(order.id, { vnStockLocation: event.target.value })} />
                        </label>
                        <label className={`ops-check ${shippedChecked ? "done" : ""}`}>
                          <input type="checkbox" checked={shippedChecked} disabled={!editable} onChange={(event) => setShipped(order, event.target.checked)} />
                          <span>Đã ship/giao khách</span>
                          <input type="date" disabled={!editable} value={order.customerShippedDate || ""} onChange={(event) => updateOrder(order.id, { customerShippedDate: event.target.value, customerShipped: Boolean(event.target.value), status: event.target.value ? "delivered" : status })} />
                        </label>
                        <label className={`ops-check ${paidChecked ? "done" : ""}`}>
                          <input type="checkbox" checked={paidChecked} disabled={!editable} onChange={(event) => setPaid(order, event.target.checked)} />
                          <span>Đã nhận hết tiền</span>
                          <input
                            type="date"
                            disabled={!editable}
                            value={order.paidInFullDate || ""}
                            onChange={(event) => {
                              const value = event.target.value;
                              updateOrder(order.id, {
                                paidInFullDate: value,
                                paidInFull: Boolean(value),
                                depositVnd: value ? Math.max(money(order.depositVnd), finance.totalThuVnd) : order.depositVnd
                              });
                            }}
                          />
                        </label>
                        <div className="post-arrival-money">
                          <span>Còn thu</span>
                          <strong>{vnd(paidChecked ? 0 : finance.remainingVnd)}</strong>
                        </div>
                        <input className="post-arrival-note" disabled={!editable} value={order.vnStockNote || ""} placeholder="Ghi chú kho: thiếu món, chờ khách lấy, địa chỉ ship..." onChange={(event) => updateOrder(order.id, { vnStockNote: event.target.value })} />
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
        {managedOrders.length > 0 && !visibleBatchGroups.length && <EmptyState title="Không có chuyến phù hợp filter" body="Đổi năm hoặc chọn Tất cả chuyến trong filter để xem lại các đợt hàng đã về." />}
        {!managedOrders.length && <EmptyState title="Chưa có hàng đã về" body="Khi chuyến được đánh dấu đầu VN đã nhận hàng, các đơn trong chuyến sẽ tự hiện ở đây để kiểm kho, giao khách và tick thu đủ tiền." />}
      </section>
    </div>
  );
}

function CashflowView({ orders, batches, transactions, openTransaction, openOrder, canSeeProfit }) {
  const totalsByBatch = batches.map((batch) => {
    const finance = batchFinanceSummary(batch, orders);
    return {
      batch,
      ...finance,
      cost: finance.adjustedCost
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
                <th>Kg chốt / chia đều</th>
                <th>Chi cước bay</th>
                <th>Tổng chi phí</th>
                {canSeeProfit && <th>Lãi dự kiến</th>}
              </tr>
            </thead>
            <tbody>
              {totalsByBatch.map(({ batch, revenue, deposit, remaining, chargeWeightKg, avgActualWeightKg, actualAirFreightVnd, cost }) => (
                <tr key={batch.id}>
                  <td data-label="Đợt"><strong>{batch.code || batch.id}</strong></td>
                  <td data-label="Tổng thu / Doanh số">{vnd(revenue)}</td>
                  <td data-label="Đã cọc / đã thu">{vnd(deposit)}</td>
                  <td data-label="Số tiền còn lại phải thu"><span className="money-due">{vnd(remaining)}</span></td>
                  <td data-label="Kg chốt / chia đều"><strong>{kg(chargeWeightKg)}kg</strong><span>{avgActualWeightKg > 0 ? `${kg(avgActualWeightKg)}kg/đơn` : "Chưa nhập kg cân thực tế"}</span></td>
                  <td data-label="Chi cước bay"><strong>{vnd(actualAirFreightVnd)}</strong><span>{kg(chargeWeightKg)}kg x {aud(batch.freightAud)}</span></td>
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

function TasksView({ tasks, accounts, orders, batches, openTask, openOrder, openAfterArrival }) {
  const reminders = afterArrivalReminders(orders, batches);
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
      <OpsReminderPanel reminders={reminders} openOrder={openOrder} openAfterArrival={openAfterArrival} />
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

function OrderModal({ draft, setDraft, batches, accounts, customers, orders, sessionToken, canEditOrder, save, remove, close }) {
  const canEdit = !canEditOrder || canEditOrder(draft);
  const selectedBatch = batches.find((batch) => batch.id === draft.batchId);
  const financeOrder = { ...draft, id: draft.id || "__draft_order__" };
  const draftOrdersForFinance = selectedBatch
    ? [...orders.filter((order) => order.id !== financeOrder.id), financeOrder]
    : orders;
  const finance = orderFinanceForBatch(financeOrder, selectedBatch, draftOrdersForFinance);
  const batchUsesSharedWeight = batchActualWeightKg(selectedBatch) > 0 && finance.billingWeightKg !== finance.totalWeightKg;
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
      ...batchPricingPatch(suggestedBatch),
      id: draft.id ? draft.id : generateOrderCode({ ...draft, batchId: suggestedBatch.id }, suggestedBatch, orders)
    });
  };

  async function fetchProductPreview(urlValue = draft.productUrl, force = false) {
    const url = String(urlValue || "").trim();
    if (!sessionToken || !looksLikeProductUrl(url)) return;
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
      const previousPreviewUrl = lastPreviewUrlRef.current;
      lastPreviewUrlRef.current = url;
      setDraft((current) => {
        if (String(current.productUrl || "").trim() !== url) return current;
        const nextAud = roundProductAud(data.priceAud ?? data.rawPriceAud);
        const shouldApplyPrice = nextAud > 0;
        return {
          ...current,
          product: current.product || data.title || current.product,
          source: current.source || data.siteName || current.source,
          aud: shouldApplyPrice ? nextAud : current.aud,
          productImageUrl: current.productImageSource === "manual" ? current.productImageUrl : (data.imageUrl || current.productImageUrl),
          productImageSource: current.productImageSource === "manual" ? "manual" : (data.imageUrl ? "auto" : current.productImageSource)
        };
      });
      const roundedPreviewAud = roundProductAud(data.priceAud ?? data.rawPriceAud);
      const hasPrice = roundedPreviewAud > 0;
      setPreviewStatus(data.imageUrl || hasPrice ? "done" : "error");
      setPreviewError(
        hasPrice
          ? `Đã tự lấy giá ${audPrice(data.rawPriceAud || roundedPreviewAud)}${data.rawPriceAud && roundedPreviewAud !== money(data.rawPriceAud) ? `, làm tròn thành ${audPrice(roundedPreviewAud)}` : ""}.`
          : data.imageUrl
            ? "Đã lấy ảnh, nhưng site chưa trả giá rõ ràng. Có thể nhập giá tay hoặc bấm Lấy lại."
            : "Đã nhận shop/link nhưng site này không trả ảnh hoặc giá rõ ràng. Upload ảnh tay và nhập giá tay để chắc nhất."
      );
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
            productImageUrl: current.productImageSource === "manual" ? current.productImageUrl : chemistFallback.imageUrl,
            productImageSource: current.productImageSource === "manual" ? "manual" : "auto"
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
    if (!url || !looksLikeProductUrl(url)) return undefined;
    const timeout = window.setTimeout(() => fetchProductPreview(url, false), 450);
    return () => window.clearTimeout(timeout);
  }, [draft.productUrl, sessionToken]);

  return (
    <ModalShell title="Sửa / thêm đơn hàng" eyebrow="Order management" close={close}>
      <form onSubmit={save}>
        {!canEdit && (
          <div className="permission-lock-banner">
            Đơn này đã về VN. Account staff chỉ được xem, cần xin Ryan cấp quyền nếu muốn sửa đơn đã về.
          </div>
        )}
        <fieldset disabled={!canEdit} className="modal-fieldset">
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
                  setDraft({
                    ...draft,
                    orderDate: nextDate,
                    batchId: draft.batchId || nextBatch?.id || "",
                    ...(draft.batchId ? {} : batchPricingPatch(nextBatch))
                  });
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
                  onChange={(event) => setDraft({ ...draft, splitBill: event.target.checked })}
                />
                <strong>Tách bill riêng khi mua</strong>
              </label>
            </div>
            <Field label="Sản phẩm" wide><input value={draft.product} onChange={(event) => setDraft({ ...draft, product: event.target.value })} /></Field>
            <Field label="Link mua hàng" wide>
              <div className="inline-input-action">
                <input
                  value={draft.productUrl ?? ""}
                  placeholder="Dán link mua hàng, app tự nhận shop và ảnh"
                  onChange={(event) => {
                    const nextUrl = event.target.value;
                    const chemistFallback = chemistPreviewFromUrl(nextUrl);
                    const isManualImage = draft.productImageSource === "manual";
                    if (looksLikeProductUrl(nextUrl)) {
                      setPreviewStatus("loading");
                      setPreviewError("");
                    } else {
                      setPreviewStatus("idle");
                    }
                    setDraft({
                      ...draft,
                      productUrl: nextUrl,
                      product: draft.product || chemistFallback?.title || draft.product,
                      source: chemistFallback?.siteName || (looksLikeProductUrl(nextUrl) ? "" : draft.source),
                      productImageUrl: isManualImage ? draft.productImageUrl : (chemistFallback?.imageUrl || ""),
                      productImageSource: isManualImage ? "manual" : (chemistFallback?.imageUrl ? "auto" : "")
                    });
                  }}
                />
                <button type="button" disabled={!looksLikeProductUrl(draft.productUrl) || previewStatus === "loading"} onClick={() => fetchProductPreview(draft.productUrl, true)}>
                  <RefreshCw size={15} /> Lấy lại
                </button>
              </div>
            </Field>
            <Field label="Ảnh sản phẩm" wide>
              <div className="product-media-editor">
                <div className="product-media-preview">
                  <ProductThumbImage item={draft} size={28} />
                </div>
                <div className="mobile-product-focus">
                  <span>Số lượng <strong>{finance.quantity}</strong></span>
                  <span>Giá/sp <strong>{audPrice(draft.aud)}</strong></span>
                </div>
                <div className="product-media-controls">
                  <strong>{draft.productImageUrl ? (draft.productImageSource === "manual" ? "Ảnh upload tay" : "Ảnh lấy từ link") : "Chưa có ảnh sản phẩm"}</strong>
                  <span>{previewStatus === "loading" ? "Đang tự đọc link, ảnh và giá sản phẩm..." : previewError || "Dán link là app tự đọc ảnh và giá; nút Lấy lại chỉ dùng khi muốn refresh."}</span>
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
            <div className="weight-total-panel wide">
              <div>
                <span>Tổng số kg sản phẩm</span>
                <strong>{kg(finance.totalWeightKg)}kg</strong>
              </div>
              <div className={batchUsesSharedWeight ? "live" : ""}>
                <span>Kg tinh cuoc</span>
                <strong>{kg(finance.billingWeightKg)}kg</strong>
              </div>
              <em>{finance.quantity} sản phẩm × {kg(finance.unitWeightKg)}kg/sp</em>
            </div>
            <Field label="Số lượng">
              <input
                className="quantity-input"
                type="number"
                min="1"
                step="1"
                value={draft.quantity}
                onChange={(event) => {
                  const nextQuantity = event.target.value;
                  setDraft({ ...draft, quantity: nextQuantity, weightKg: Math.max(0, Number(draft.unitWeightKg || 0)) * Math.max(1, Number(nextQuantity || 1)) });
                }}
              />
            </Field>
            <Field label="Kg / sản phẩm">
              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={draft.unitWeightKg ?? 0}
                onChange={(event) => {
                  const nextUnitWeight = event.target.value;
                  setDraft({ ...draft, unitWeightKg: nextUnitWeight, weightKg: Math.max(0, Number(nextUnitWeight || 0)) * Math.max(1, Number(draft.quantity || 1)) });
                }}
              />
            </Field>
            <Field label="Chuyến bay">
              <div className="flight-auto-picker">
                <select
                  value={draft.batchId}
                  onChange={(event) => {
                    const nextBatchId = event.target.value;
                    const nextBatch = findOrderBatch(batches, { batchId: nextBatchId });
                    setDraft({
                      ...draft,
                      batchId: nextBatchId,
                      ...(nextBatch ? batchPricingPatch(nextBatch) : { intlShippingAud: 0, exchangeRate })
                    });
                  }}
                >
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
            <Field label="Tiền hàng AUD / sản phẩm">
              <input className="price-input" type="number" min="0" step="0.01" value={draft.aud} onChange={(event) => setDraft({ ...draft, aud: event.target.value })} />
              <span className="field-hint">Dán link là app tự lấy giá và làm tròn lên nấc 0.1 AUD; từ .90 lên số nguyên, ví dụ 14.25 -&gt; 14.3, 14.90 -&gt; 15.</span>
            </Field>
            <Field label="Ship Úc AUD"><input type="number" value={draft.shippingAud} onChange={(event) => setDraft({ ...draft, shippingAud: event.target.value })} /></Field>
            <Field label="Cước bay AUD/kg">
              <input className={selectedBatch ? "synced-input" : ""} type="number" min="0" step="0.01" readOnly={Boolean(selectedBatch)} value={draft.intlShippingAud} onChange={(event) => setDraft({ ...draft, intlShippingAud: event.target.value })} />
              <span className="field-hint">{selectedBatch ? `Khóa theo chuyến ${selectedBatch.code || selectedBatch.id}: ${aud(selectedBatch.freightAud)} / kg` : "Chọn chuyến bay để tự áp cước AUD/kg."}</span>
            </Field>
            <Field label="Giá cân cuối VND/kg"><input type="number" min="0" value={draft.finalWeightRateVnd ?? defaultFinalWeightRateVnd} onChange={(event) => setDraft({ ...draft, finalWeightRateVnd: event.target.value })} /></Field>
            <Field label="Tỉ giá AUD/VND">
              <input className={selectedBatch ? "synced-input" : ""} type="number" readOnly={Boolean(selectedBatch)} value={draft.exchangeRate} onChange={(event) => setDraft({ ...draft, exchangeRate: event.target.value })} />
              <span className="field-hint">{selectedBatch ? `Khóa theo chuyến ${selectedBatch.code || selectedBatch.id}: ${vnd(batchExchangeRate(batches, selectedBatch.id))}` : "Chọn chuyến bay để lấy tỉ giá chuẩn."}</span>
            </Field>
            <Field label="Phụ phí VND"><input type="number" value={draft.extraFeeVnd} onChange={(event) => setDraft({ ...draft, extraFeeVnd: event.target.value })} /></Field>
            <Field label="Ghi chú phụ phí"><input value={draft.extraFeeNote} onChange={(event) => setDraft({ ...draft, extraFeeNote: event.target.value })} /></Field>
            <Field label="Tổng thu / Doanh số VND"><input type="number" value={draft.totalThuVnd} onChange={(event) => setDraft({ ...draft, totalThuVnd: event.target.value })} /></Field>
            <Field label="Cọc đã thu VND"><input type="number" value={draft.depositVnd} onChange={(event) => setDraft({ ...draft, depositVnd: event.target.value })} /></Field>
            <Field label="Note" wide><textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></Field>
          </div>
          <div className="auto-summary">
            <div className="summary-hero"><span>Còn phải thu</span><strong>{vnd(finance.remainingVnd)}</strong></div>
            <div className="summary-hero"><span>Tổng thu</span><strong>{vnd(finance.totalThuVnd)}</strong></div>
            <div><span>Tổng chi phí gốc</span><strong>{vnd(finance.totalCostVnd)}</strong></div>
            <div><span>Cọc đã thu</span><strong>{vnd(finance.depositVnd)}</strong></div>
            <div><span>Tiền hàng</span><strong>{vnd(finance.goodsVnd)}</strong></div>
            <div><span>Phí mua hàng</span><strong>{vnd(finance.purchaseFeeVnd)}</strong></div>
            <div><span>Cước cân gốc</span><strong>{vnd(finance.airFreightVnd)}</strong><small>{kg(finance.billingWeightKg)}kg x {aud(draft.intlShippingAud)}</small></div>
            <div><span>Số tiền cân cuối</span><strong>{vnd(finance.finalWeightChargeVnd)}</strong><small>{kg(finance.billingWeightKg)}kg x {vnd(finance.finalWeightRateVnd)}</small></div>
            <div><span>Lãi cân</span><strong>{vnd(finance.weightProfitVnd)}</strong></div>
            <div><span>Ship Úc</span><strong>{vnd(finance.domesticShippingVnd)}</strong></div>
            <div><span>Tổng thu tự động</span><strong>{vnd(finance.suggestedTotalThuVnd)}</strong></div>
          </div>
        </div>
        </fieldset>
        <datalist id="customer-suggestions">
          {customers.map((customer) => <option value={customer.name} key={customer.id}>{customer.phone}</option>)}
        </datalist>
        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={close}>Hủy</button>
          <button className="danger-button" type="button" disabled={!canEdit} onClick={() => remove(draft.id)}><Trash2 size={16} /> Xóa</button>
          <button className="primary-button" type="submit" disabled={!canEdit}><CheckCircle2 size={17} /> {canEdit ? "Lưu đơn" : "Cần Ryan cấp quyền"}</button>
        </div>
      </form>
    </ModalShell>
  );
}

function BatchModal({ draft, setDraft, batches, orders, openOrder, updateOrderStatus, canEditOrder, save, remove, close }) {
  const batchOrders = batchOrderRows(draft, orders);
  const progress = flightOrderProgress(batchOrders);
  const finance = batchFinanceSummary(draft, orders);
  const totalWeight = finance.estimatedWeightKg;
  const billingOrderCount = finance.billableOrders.length;
  function updateFlightDate(field, value) {
    const nextDraft = { ...draft, [field]: value };
    setDraft({
      ...nextDraft,
      code: draft.autoCode ? generateBatchCode(nextDraft, batches) : draft.code
    });
  }
  return (
    <ModalShell title="Sửa / thêm chuyến bay" eyebrow="Flight management" close={close}>
      <form onSubmit={save}>
        <div className="form-grid">
          <Field label="Mã chuyến">
            <div className="inline-input-action">
              <input value={draft.code} onChange={(event) => setDraft({ ...draft, code: event.target.value, autoCode: false })} />
              <button type="button" onClick={() => setDraft({ ...draft, code: generateBatchCode(draft, batches), autoCode: true })}>Auto</button>
            </div>
            <span className="field-hint">Chọn Ngày bay để app tự tạo dạng 2026-VN01-0524 Flight: VN01 là chuyến bay thứ 1 trong năm, 0524 là ngày bay từ Úc. Ngày về VN chỉ dùng để theo dõi hàng về.</span>
          </Field>
          <Field label="Tuyến"><input value={draft.route} onChange={(event) => setDraft({ ...draft, route: event.target.value })} /></Field>
          <Field label="Cutoff"><input type="date" value={draft.cutoff} onChange={(event) => updateFlightDate("cutoff", event.target.value)} /></Field>
          <Field label="Ngày bay"><input type="date" value={draft.departure} onChange={(event) => updateFlightDate("departure", event.target.value)} /></Field>
          <Field label="Ngày hàng về VN"><input type="date" value={draft.arrival} onChange={(event) => updateFlightDate("arrival", event.target.value)} /></Field>
          <Field label="Tình trạng">
            <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}>
              {batchStatuses.map((status) => <option value={status.id} key={status.id}>{status.label}</option>)}
            </select>
          </Field>
          <Field label="Sức chứa kg"><input type="number" value={draft.capacityKg} onChange={(event) => setDraft({ ...draft, capacityKg: event.target.value })} /></Field>
          <Field label="Tổng kg cân thực tế cả chuyến">
            <input type="number" min="0" step="0.01" inputMode="decimal" value={draft.actualWeightKg ?? 0} onChange={(event) => setDraft({ ...draft, actualWeightKg: event.target.value })} />
            <span className="field-hint">Nhập số kg chốt sau khi cân thùng/gửi hàng từ Úc. Nếu để 0, app dùng tổng kg ước tính từ các đơn.</span>
          </Field>
          <Field label="Cước bay AUD/kg">
            <input type="number" min="0" step="0.01" value={draft.freightAud} onChange={(event) => setDraft({ ...draft, freightAud: event.target.value })} />
            <span className="field-hint">Lưu chuyến sẽ tự áp cước này vào toàn bộ đơn thuộc chuyến.</span>
          </Field>
          <Field label="Tỉ giá AUD/VND">
            <input type="number" min="0" value={draft.exchangeRate ?? exchangeRate} onChange={(event) => setDraft({ ...draft, exchangeRate: event.target.value })} />
            <span className="field-hint">Đây là tỉ giá chuẩn của chuyến. Toàn bộ đơn trong chuyến sẽ lấy theo số này.</span>
          </Field>
          <Field label="Note" wide><textarea value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} /></Field>
        </div>
        <section className="batch-weight-panel">
          <div>
            <span>Kg ước tính từ đơn</span>
            <strong>{kg(finance.estimatedWeightKg)}kg</strong>
          </div>
          <div className={finance.actualWeightKg > 0 ? "live" : ""}>
            <span>Kg chốt chuyến</span>
            <strong>{kg(finance.chargeWeightKg)}kg</strong>
          </div>
          <div>
            <span>Chia bình quân</span>
            <strong>{finance.avgActualWeightKg > 0 ? `${kg(finance.avgActualWeightKg)}kg/đơn` : "-"}</strong>
          </div>
          <div>
            <span>Chi cước bay</span>
            <strong>{vnd(finance.actualAirFreightVnd)}</strong>
            <small>{kg(finance.chargeWeightKg)}kg x {aud(finance.freightAudPerKg)} x {vnd(finance.rate)}</small>
          </div>
        </section>
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
            <span>Hết hàng <strong>{progress.outOfStock}</strong></span>
            <span>Đã mua <strong>{progress.purchased}</strong></span>
            <span>Đã gửi/nhận <strong>{progress.sentVn + progress.receivedVn}</strong></span>
            <span>Tổng kg <strong>{kg(totalWeight)}</strong></span>
          </div>
          <div className="flight-order-list compact">
            {batchOrders.map((order) => (
              <FlightOrderRow order={order} batch={draft} orders={orders} openOrder={openOrder} updateOrderStatus={updateOrderStatus} canEditOrder={canEditOrder} key={order.id} />
            ))}
            {!batchOrders.length && (
              <EmptyState title="Chưa có đơn cần xử lý trong chuyến" body="Vào Đơn hàng, mở từng đơn và chọn chuyến bay này để gom hàng vào đúng đợt." />
            )}
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
