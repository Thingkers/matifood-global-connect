import { createServerFn } from "@tanstack/react-start";
import type { Product } from "./matifood-products";

const ENDPOINT = "https://nisilagro.com/products.php";

export const getProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ products: Product[]; error: string | null }> => {
    const apiKey = process.env.MATIFOOD_API_KEY;
    if (!apiKey) {
      return { products: [], error: "MATIFOOD_API_KEY is not configured" };
    }
    try {
      const res = await fetch(ENDPOINT, {
        headers: { "X-API-Key": apiKey, Accept: "application/json" },
      });
      if (!res.ok) {
        return { products: [], error: `Upstream error ${res.status}` };
      }
      const data = (await res.json()) as Product[];
      return { products: data, error: null };
    } catch (e) {
      console.error("getProducts failed", e);
      return { products: [], error: "Failed to reach products endpoint" };
    }
  },
);
