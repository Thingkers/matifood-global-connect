import { createServerFn } from "@tanstack/react-start";

const ENDPOINT = process.env.MATIFOOD_LOCATIONS_ENDPOINT ?? "https://nisilagro.com/locations.php";

export type Location = {
  id: string;
  name: string;
  area: string;
};

export const getLocations = createServerFn({ method: "GET" }).handler(async (): Promise<Location[]> => {
  const apiKey = process.env.MATIFOOD_API_KEY;
  if (!apiKey) {
    return [];
  }
  try {
    const res = await fetch(ENDPOINT, { headers: { "X-API-Key": apiKey, Accept: "application/json" } });
    if (!res.ok) return [];
    const data = (await res.json()) as Location[];
    return data;
  } catch (e) {
    console.error("getLocations failed", e);
    return [];
  }
});
