import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ENDPOINT = "https://nisilagro.com/orders_list.php";

export type AdminOrder = {
  id: number;
  customer_name: string;
  phone: string;
  email: string | null;
  area: string;
  delivery_address: string;
  product: string;
  quantity: number;
  payment_method: string;
  payment_note: string | null;
  created_at: string | null;
};

export const listOrders = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ password: z.string().min(1).max(200) }).parse(input),
  )
  .handler(
    async ({
      data,
    }): Promise<{ ok: boolean; orders: AdminOrder[]; error: string | null }> => {
      const apiKey = process.env.MATIFOOD_API_KEY;
      const adminPw = process.env.MATIFOOD_ADMIN_PASSWORD;
      if (!apiKey) return { ok: false, orders: [], error: "MATIFOOD_API_KEY missing" };
      if (!adminPw) return { ok: false, orders: [], error: "MATIFOOD_ADMIN_PASSWORD missing" };
      if (data.password !== adminPw)
        return { ok: false, orders: [], error: "Invalid password" };
      try {
        const res = await fetch(ENDPOINT, {
          method: "GET",
          headers: { "X-API-Key": apiKey, Accept: "application/json" },
        });
        if (!res.ok) return { ok: false, orders: [], error: `Upstream ${res.status}` };
        const json = (await res.json()) as {
          ok?: boolean;
          orders?: AdminOrder[];
          error?: string;
        };
        if (!json.ok) return { ok: false, orders: [], error: json.error ?? "Failed" };
        return { ok: true, orders: json.orders ?? [], error: null };
      } catch (e) {
        console.error("listOrders failed", e);
        return { ok: false, orders: [], error: "Failed to reach orders endpoint" };
      }
    },
  );
