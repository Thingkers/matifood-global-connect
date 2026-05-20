import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Section, Eyebrow } from "@/components/Section";
import { listOrders, type AdminOrder } from "@/lib/orders-admin.functions";

export const Route = createFileRoute("/matifood_/admin")({
  head: () => ({
    meta: [
      { title: "Admin — MatiFood Orders" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const fetchOrders = useServerFn(listOrders);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [q, setQ] = useState("");
  const [area, setArea] = useState<string>("all");
  const [payment, setPayment] = useState<string>("all");
  const [product, setProduct] = useState<string>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  async function load(pw: string) {
    setLoading(true);
    setError(null);
    const res = await fetchOrders({ data: { password: pw } });
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Failed");
      setAuthed(false);
      return;
    }
    setOrders(res.orders);
    setAuthed(true);
  }

  const productOptions = useMemo(
    () => Array.from(new Set(orders.map((o) => o.product))).sort(),
    [orders],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const fromTs = from ? new Date(from).getTime() : null;
    const toTs = to ? new Date(to).getTime() + 86_400_000 : null;
    return orders.filter((o) => {
      if (area !== "all" && o.area !== area) return false;
      if (payment !== "all" && o.payment_method !== payment) return false;
      if (product !== "all" && o.product !== product) return false;
      if (needle) {
        const hay = `${o.customer_name} ${o.phone} ${o.email ?? ""} ${o.delivery_address}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      if (o.created_at) {
        const ts = new Date(o.created_at).getTime();
        if (fromTs !== null && ts < fromTs) return false;
        if (toTs !== null && ts >= toTs) return false;
      }
      return true;
    });
  }, [orders, q, area, payment, product, from, to]);

  const totalBoxes = filtered.reduce((s, o) => s + o.quantity, 0);

  function exportCsv() {
    const headers = [
      "id","created_at","customer_name","phone","email","area",
      "delivery_address","product","quantity","payment_method","payment_note",
    ];
    const escape = (v: unknown) => {
      const s = v === null || v === undefined ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [
      headers.join(","),
      ...filtered.map((o) => headers.map((h) => escape((o as Record<string, unknown>)[h])).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `matifood-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <Section>
        <div className="mx-auto max-w-md text-center">
          <Eyebrow>Admin</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-bold">MatiFood Orders</h1>
          <p className="mt-3 text-muted-foreground">Enter the admin password to continue.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load(password);
            }}
            className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className={inputCls}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-glow disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
            {error && <p className="text-sm text-destructive">⚠️ {error}</p>}
          </form>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Admin</Eyebrow>
          <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">MatiFood Orders</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filtered.length} of {orders.length} orders · {totalBoxes} boxes
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => load(password)}
            disabled={loading}
            className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            onClick={exportCsv}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-6">
        <label className="block space-y-1 lg:col-span-2">
          <span className="text-xs font-medium text-muted-foreground">Search</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, phone, email, address"
            className={inputCls}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Area</span>
          <select value={area} onChange={(e) => setArea(e.target.value)} className={inputCls}>
            <option value="all">All</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Payment</span>
          <select value={payment} onChange={(e) => setPayment(e.target.value)} className={inputCls}>
            <option value="all">All</option>
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="bKash">bKash</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Product</span>
          <select value={product} onChange={(e) => setProduct(e.target.value)} className={inputCls}>
            <option value="all">All</option>
            {productOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">From</span>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-muted-foreground">To</span>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={inputCls} />
        </label>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              {["ID","Date","Customer","Phone","Area","Address","Product","Qty","Payment","Email"].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-t border-border align-top">
                <td className="px-4 py-3 text-muted-foreground">{o.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {o.created_at ? new Date(o.created_at).toLocaleString() : "—"}
                </td>
                <td className="px-4 py-3 font-medium">{o.customer_name}</td>
                <td className="whitespace-nowrap px-4 py-3">{o.phone}</td>
                <td className="px-4 py-3">{o.area}</td>
                <td className="px-4 py-3 max-w-[260px]">{o.delivery_address}</td>
                <td className="px-4 py-3">{o.product}</td>
                <td className="px-4 py-3">{o.quantity}</td>
                <td className="px-4 py-3">
                  {o.payment_method}
                  {o.payment_note ? <div className="text-xs text-muted-foreground">{o.payment_note}</div> : null}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{o.email || "—"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground">
                  No orders match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {error && <p className="mt-4 text-sm text-destructive">⚠️ {error}</p>}
    </Section>
  );
}

const inputCls =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
