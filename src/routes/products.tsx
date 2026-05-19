import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Section, Eyebrow } from "@/components/Section";
import { getProducts } from "@/lib/products.functions";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — MatiFood / NISIL Agro" },
      {
        name: "description",
        content:
          "Live catalogue of MatiFood products sourced directly from the NISIL Agro database.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const fetchProducts = useServerFn(getProducts);
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["matifood-products"],
    queryFn: () => fetchProducts(),
  });

  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>Live Catalogue</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
          MatiFood Products
        </h1>
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
          <p className="text-center text-muted-foreground">
            No products found.
          </p>
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
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {p.id}
                    </td>
                    <td className="px-6 py-4 font-serif text-lg">
                      {p.product_name}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ৳{p.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {p.created_at
                        ? new Date(p.created_at).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Section>
  );
}
