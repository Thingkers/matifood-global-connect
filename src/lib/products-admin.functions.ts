// /Volumes/THINGKERS/developments/matifood-global-connect/src/lib/products-admin.functions.ts
const ENDPOINT = "https://nisilagro.com/add_product.php";

export interface NewProductPayload {
  product_name: string;
  price: number;
  image_file: File | null; // 👈 We now expect an actual binary file object type
}

export async function addProductDirect(payload: NewProductPayload): Promise<{ ok: boolean; id?: number; error: string | null }> {
  const apiKey = import.meta.env.VITE_MATIFOOD_API_KEY || "matifood2026-sah";

  try {
    // Compile data into formal browser FormData payload
    const formData = new FormData();
    formData.append("product_name", payload.product_name);
    formData.append("price", payload.price.toString());
    
    if (payload.image_file) {
      formData.append("image_file", payload.image_file);
    }

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        // Note: NEVER set 'Content-Type' manually when sending FormData. 
        // Leaving it blank allows the browser to auto-append the correct multipart boundary tokens!
        "Accept": "application/json"
      },
      body: formData
    });

    if (!res.ok) {
      return { ok: false, error: `Server answered with status code: ${res.status}` };
    }

    const json = await res.json();
    if (!json.ok) {
      return { ok: false, error: json.error ?? "Failed to insert product record." };
    }

    return { ok: true, id: json.id, error: null };
  } catch (e: any) {
    console.error("addProductDirect caught network runtime crash:", e);
    return { ok: false, error: e?.message || "Failed to reach remote Hostinger script." };
  }
}