import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Section, Eyebrow } from "@/components/Section";
import { getProducts } from "@/lib/products.functions";
import { submitOrder, type OrderInput } from "@/lib/orders.functions";

export const Route = createFileRoute("/matifood_/products")({
  head: () => ({
    meta: [
      { title: "Products & Order — MatiFood" },
      {
        name: "description",
        content:
          "Browse MatiFood's live product catalogue and place an order for fresh mango and more.",
      },
    ],
  }),
  component: ProductsPage,
});

const MENU = [
  { label: "Thai Kancha Mitha 5Kg (1 Box)", price: 900 },
  { label: "Thai Nam Doc Mai 5Kg (1 Box)", price: 950 },
  { label: "Amropalee 5Kg (1 Box)", price: 900 },
] as const;

function ProductsPage() {
  const fetchProducts = useServerFn(getProducts);
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["matifood-products"],
    queryFn: () => fetchProducts(),
  });

  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Live Catalogue</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">MatiFood Products</h1>
          <p className="mt-4 text-muted-foreground">
            Pulled live from the nisilagro.com product database.
          </p>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-6 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50"
          >
            {isFetching ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading products…</p>
          ) : isError || data?.error ? (
            <p className="text-center text-destructive">
              {data?.error ?? "Failed to load products."}
            </p>
          ) : data && data.products.length === 0 ? (
            <p className="text-center text-muted-foreground">No products found.</p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
              <table className="w-full text-left">
                <thead className="bg-secondary/60 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Added</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="px-6 py-4 text-sm text-muted-foreground">{p.id}</td>
                      <td className="px-6 py-4 font-serif text-lg">{p.product_name}</td>
                      <td className="px-6 py-4 font-semibold">৳{Number(p.price).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Section>

      <OrderForm />
    </>
  );
}

function OrderForm() {
  const submit = useServerFn(submitOrder);
  const [form, setForm] = useState<OrderInput>({
    customer_name: "",
    phone: "",
    email: "",
    area: "Dhaka",
    delivery_address: "",
    product: MENU[0].label,
    quantity: 1,
    payment_method: "Cash On Delivery",
    payment_note: "",
  });
  const [status, setStatus] = useState<
    { kind: "idle" } | { kind: "pending" } | { kind: "ok"; id?: number } | { kind: "error"; msg: string }
  >({ kind: "idle" });

  const set = <K extends keyof OrderInput>(k: K, v: OrderInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const selected = MENU.find((m) => m.label === form.product);
  const total = (selected?.price ?? 0) * form.quantity;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "pending" });
    const res = await submit({ data: form });
    if (res.ok) {
      setStatus({ kind: "ok", id: res.id });
      setForm((f) => ({ ...f, customer_name: "", phone: "", email: "", delivery_address: "", quantity: 1, payment_note: "" }));
    } else {
      setStatus({ kind: "error", msg: res.error ?? "Failed to submit" });
    }
  }

  return (
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <Eyebrow>Order Now</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">🥭 Fresh Mango — Order Now 🛒</h2>
          <p className="mt-3 text-muted-foreground">Fill in your details and we'll get back to confirm.</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-8 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
        >
          {/* Customer */}
          <fieldset className="space-y-4">
            <legend className="font-serif text-lg font-bold">👤 Your Details</legend>
            <Field label="Full name *">
              <input required maxLength={120} value={form.customer_name}
                onChange={(e) => set("customer_name", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Phone *">
              <input required maxLength={40} value={form.phone}
                onChange={(e) => set("phone", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Email (optional)">
              <input type="email" maxLength={200} value={form.email}
                onChange={(e) => set("email", e.target.value)} className={inputCls} />
            </Field>
          </fieldset>

          {/* Area */}
          <fieldset className="space-y-3">
            <legend className="font-serif text-lg font-bold">📍 Area *</legend>
            {(["Dhaka", "Chattogram"] as const).map((a) => (
              <label key={a} className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 hover:bg-secondary/60">
                <input type="radio" name="area" value={a} checked={form.area === a}
                  onChange={() => set("area", a)} />
                <span>{a === "Dhaka" ? "Dhaka | ঢাকা" : "Chattogram | চট্টগ্রাম"}</span>
              </label>
            ))}
            <Field label="Delivery address *">
              <textarea required rows={3} maxLength={500} value={form.delivery_address}
                onChange={(e) => set("delivery_address", e.target.value)} className={inputCls} />
            </Field>
          </fieldset>

          {/* Product */}
          <fieldset className="space-y-3">
            <legend className="font-serif text-lg font-bold">🛒 What would you like to order? *</legend>
            {MENU.map((m) => (
              <label key={m.label} className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-border p-3 hover:bg-secondary/60">
                <span className="flex items-center gap-3">
                  <input type="radio" name="product" value={m.label} checked={form.product === m.label}
                    onChange={() => set("product", m.label)} />
                  <span>{m.label}</span>
                </span>
                <span className="font-semibold">৳ {m.price}</span>
              </label>
            ))}
            <Field label="Quantity (boxes) *">
              <input type="number" min={1} max={50} required value={form.quantity}
                onChange={(e) => set("quantity", Math.max(1, Math.min(50, Number(e.target.value) || 1)))} className={inputCls} />
            </Field>
            <div className="rounded-md bg-secondary/60 p-3 text-right font-semibold">
              Total: ৳ {total.toLocaleString()}
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="space-y-3">
            <legend className="font-serif text-lg font-bold">৳ How would you like to pay? *</legend>
            {(["Cash On Delivery", "bKash", "Other"] as const).map((p) => (
              <label key={p} className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 hover:bg-secondary/60">
                <input type="radio" name="payment" value={p} checked={form.payment_method === p}
                  onChange={() => set("payment_method", p)} />
                <span>
                  {p === "Cash On Delivery" ? "Cash On Delivery | ক্যাশ অন ডেলিভারি" :
                   p === "bKash" ? "bKash | বিকাশ" : "Other"}
                </span>
              </label>
            ))}
            {form.payment_method === "Other" && (
              <Field label="Payment note">
                <input maxLength={200} value={form.payment_note}
                  onChange={(e) => set("payment_note", e.target.value)} className={inputCls} />
              </Field>
            )}
          </fieldset>

          <button
            type="submit"
            disabled={status.kind === "pending"}
            className="w-full rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary-glow disabled:opacity-50"
          >
            {status.kind === "pending" ? "Submitting…" : "Place Order"}
          </button>

          {status.kind === "ok" && (
            <p className="text-center text-sm font-medium text-primary">
              ✅ Order received{status.id ? ` (ref #${status.id})` : ""}. We'll contact you shortly.
            </p>
          )}
          {status.kind === "error" && (
            <p className="text-center text-sm font-medium text-destructive">⚠️ {status.msg}</p>
          )}
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
