import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ENDPOINT = "https://nisilagro.com/order.php";

export const orderInputSchema = z.object({
  customer_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  area: z.enum(["Dhaka", "Chattogram"]),
  delivery_address: z.string().trim().min(3).max(500),
  product: z.string().trim().min(1).max(200),
  quantity: z.number().int().min(1).max(50),
  payment_method: z.enum(["Cash On Delivery", "bKash", "Other"]),
  payment_note: z.string().trim().max(200).optional().or(z.literal("")),
});

export type OrderInput = z.infer<typeof orderInputSchema>;

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderInputSchema.parse(input))
  .handler(
    async ({ data }): Promise<{ ok: boolean; id?: number; error: string | null }> => {
      const apiKey = process.env.MATIFOOD_API_KEY;
      if (!apiKey) return { ok: false, error: "MATIFOOD_API_KEY is not configured" };
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) return { ok: false, error: `Upstream error ${res.status}` };
        const json = (await res.json()) as { ok?: boolean; id?: number; error?: string };
        if (!json.ok) return { ok: false, error: json.error ?? "Order rejected" };
        return { ok: true, id: json.id, error: null };
      } catch (e) {
        console.error("submitOrder failed", e);
        return { ok: false, error: "Failed to reach order endpoint" };
      }
    },
  );
