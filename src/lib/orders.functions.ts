// /Volumes/THINGKERS/developments/matifood-global-connect/src/lib/orders.functions.ts
import { z } from "zod";

const ENDPOINT = import.meta.env.PROD ? "https://nisilagro.com/order.php" : "/api-order";

export const orderInputSchema = z.object({
  customer_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  area: z.enum(["Dhaka", "Chattogram"]),
  location_id: z.string().trim().max(200).optional().or(z.literal("")),
  delivery_address: z.string().trim().min(3).max(500),
  product: z.string().trim().min(1).max(200),
  quantity: z.number().int().min(1).max(50),
  payment_method: z.enum(["Cash On Delivery", "bKash", "Other"]),
  payment_note: z.string().trim().max(200).optional().or(z.literal("")),
});

// Infer type configuration matching schema boundaries
export type OrderInput = z.infer<typeof orderInputSchema>;

// Accepts a clean, flat OrderInput object directly to match order.php's expectations
export async function submitOrderDirect(orderPayload: OrderInput): Promise<{ ok: boolean; id?: number; error: string | null }> {
  const apiKey = import.meta.env.VITE_MATIFOOD_API_KEY || "matifood2026-sah";
  
  if (!apiKey) {
    return { ok: false, error: "MATIFOOD_API_KEY is not configured" };
  }

  try {
    // 1. Validate the flat object directly
    const validatedData = orderInputSchema.parse(orderPayload);

    // 2. Post directly to the endpoint without a nested wrapper key
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!res.ok) {
      return { ok: false, error: `Upstream server returned error status code ${res.status}` };
    }

    const json = (await res.json()) as { ok?: boolean; id?: number; error?: string };
    
    if (!json.ok) {
      return { ok: false, error: json.error ?? "Order rejected" };
    }
    
    return { ok: true, id: json.id, error: null };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { ok: false, error: `Form validation error: ${e.errors[0]?.message}` };
    }
    console.error("submitOrderDirect failed", e);
    return { ok: false, error: "Failed to connect to order pipeline endpoint" };
  }
}
