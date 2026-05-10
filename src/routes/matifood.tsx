import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import { ShieldCheck, Building2, Home, Globe } from "lucide-react";
import fresh from "@/assets/fresh-produce.jpg";
import processed from "@/assets/processed-products.jpg";
import logo from "@/assets/matifood-logo.png";

export const Route = createFileRoute("/matifood")({
  head: () => ({
    meta: [
      { title: "MatiFood — Premium Fresh & Processed Agriculture from Bangladesh" },
      { name: "description", content: "MatiFood, the flagship brand of NISIL Agro, delivers export-quality fresh fruits, vegetables, juices and pulps from Rangpur." },
      { property: "og:title", content: "MatiFood — Soil to Soul" },
      { property: "og:description", content: "Premium fresh and processed agricultural products from Bangladesh." },
      { property: "og:image", content: fresh },
    ],
  }),
  component: MatiFood,
});

function MatiFood() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <Eyebrow>Featured Brand</Eyebrow>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight sm:text-6xl">MatiFood</h1>
            <p className="mt-3 font-serif text-2xl italic text-accent">Taste Real Luxury.</p>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85">
              The safest path from farm to table — rigorous standards, pristine produce, and a
              promise to customers who don't compromise. <span className="italic">Food safety is the new luxury.</span>
            </p>
          </div>
          <img src={logo} alt="MatiFood logo" className="h-44 w-44 rounded-2xl object-contain shadow-[var(--shadow-glow)]" />
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Product Categories</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl font-bold">From the field, to the factory, to you.</h2>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <img src={fresh} alt="Fresh fruits and vegetables" loading="lazy" width={1280} height={800} className="h-72 w-full object-cover" />
            <div className="p-8">
              <h3 className="font-serif text-2xl font-bold">Fresh Fruits & Vegetables</h3>
              <p className="mt-3 text-muted-foreground">
                Locally sourced, export-quality produce directly from the heart of Rangpur and beyond —
                including mangoes, jackfruit, leafy greens and seasonal specialties.
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <img src={processed} alt="Processed juices and pulps" loading="lazy" width={1280} height={800} className="h-72 w-full object-cover" />
            <div className="p-8">
              <h3 className="font-serif text-2xl font-bold">Processed Products</h3>
              <p className="mt-3 text-muted-foreground">
                High-quality juices, pulps and dried variants of fruits and vegetables, prepared to
                international standards in modern agri-processing facilities.
              </p>
            </div>
          </article>
        </div>
      </Section>

      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-8">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-bold">Quality Assurance</h3>
              <p className="mt-2 text-sm text-muted-foreground">Committed to international export and import standards, with modern agri-processing techniques at every step.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <Home className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-bold">For Households</h3>
              <p className="mt-2 text-sm text-muted-foreground">Direct-to-consumer offerings that bring the freshness of Bangladesh straight to family tables.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <Building2 className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-bold">For Businesses</h3>
              <p className="mt-2 text-sm text-muted-foreground">B2B partnerships for retailers, importers and processors — at scale, with reliability.</p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-primary p-8 text-primary-foreground">
            <div className="flex items-center gap-4">
              <Globe className="h-10 w-10 text-accent" />
              <div>
                <div className="font-serif text-xl font-bold">Ready to import MatiFood?</div>
                <div className="text-sm text-primary-foreground/80">Bulk orders and international partnerships welcome.</div>
              </div>
            </div>
            <Link to="/contact" className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110">Start an inquiry</Link>
          </div>
        </div>
      </section>
    </>
  );
}
