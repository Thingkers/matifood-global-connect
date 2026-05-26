// /Volumes/THINGKERS/developments/matifood-global-connect/src/lib/orders-admin.functions.ts
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

// Pure, client-safe fetch executor bypassing the need for a Node server environment
export async function listOrders(input: { password: string }): Promise<{ ok: boolean; orders: AdminOrder[]; error: string | null }> {
  // Use Vite environment variables or hardcoded fallbacks
  const apiKey = import.meta.env.VITE_MATIFOOD_API_KEY || "matifood2026-sah";
  const adminPw = import.meta.env.VITE_MATIFOOD_ADMIN_PASSWORD || "Matifood!@#$1234";

  try {
    // 1. Basic input validation check
    if (!input.password) {
      return { ok: false, orders: [], error: "Password entry field is empty" };
    }
    
    if (input.password !== adminPw) {
      return { ok: false, orders: [], error: "Invalid password credentials provided" };
    }

    // 2. Perform direct browser network fetch straight to the PHP file
    const res = await fetch(ENDPOINT, {
      method: "GET",
      headers: { 
        "X-API-Key": apiKey, 
        "Accept": "application/json" 
      },
    });

    if (!res.ok) {
      return { ok: false, orders: [], error: `Upstream HTTP response error code: ${res.status}` };
    }

    const json = (await res.json()) as {
      ok?: boolean;
      orders?: AdminOrder[];
      error?: string;
    };

    if (!json.ok) {
      return { ok: false, orders: [], error: json.error ?? "Failed to read database parameters." };
    }

    return { ok: true, orders: json.orders ?? [], error: null };
  } catch (e: any) {
    console.error("listOrders client fetch catch runtime failed:", e);
    return { ok: false, orders: [], error: e?.message || "Failed to establish connectivity to the server pipeline." };
  }
}