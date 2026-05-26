// /Volumes/THINGKERS/developments/matifood-global-connect/src/lib/locations.functions.ts

export type Location = {
  id: string;
  name: string;
  area: string;
};

// Use Vite environment schema or fall back to the production URL
// const ENDPOINT = import.meta.env.VITE_MATIFOOD_LOCATIONS_ENDPOINT ?? "https://nisilagro.com/locations.php";
// const ENDPOINT = "/api-locations";
const ENDPOINT = import.meta.env.PROD ? "https://nisilagro.com/locations.php" : "/api-locations";

export async function getLocationsDirect(): Promise<Location[]> {
  const apiKey = import.meta.env.VITE_MATIFOOD_API_KEY || "matifood2026-sah";

  if (!apiKey) {
    console.warn("MATIFOOD_API_KEY is not configured");
    return [];
  }

  try {
    const res = await fetch(ENDPOINT, { 
      headers: { 
        "X-API-Key": apiKey, 
        "Accept": "application/json" 
      } 
    });
    
    if (!res.ok) return [];
    
    const data = (await res.json()) as Location[];
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("getLocations failed", e);
    return [];
  }
}