import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import { Ship, Factory, PackageCheck, FileCheck2 } from "lucide-react";
import processing from "@/assets/processing.jpg";

export const Route = createFileRoute("/operations")({
  head: () => ({
    meta: [
      { title: "Operations & Services — NISIL Agro" },
      { name: "description", content: "Export, import, agri-processing, supply & logistics, and regulatory consulting from NISIL Agro." },
      { property: "og:title", content: "Operations & Services — NISIL Agro" },
      { property: "og:description", content: "Technical capabilities of the NISIL Agro partnership." },
      { property: "og:image", content: processing },
    ],
  }),
  component: Operations,
});

const services = [
  { icon: Ship, title: "Export & Import", desc: "Specialising in the global movement of processed fruit and vegetable products with end-to-end documentation." },
  { icon: Factory, title: "Agri-Processing", desc: "State-of-the-art facilities transform raw agriculture into value-added, shelf-stable products." },
  { icon: PackageCheck, title: "Supply & Logistics", desc: "Efficient distribution networks ensure products reach clients in peak condition, on schedule." },
  { icon: FileCheck2, title: "Regulatory Consulting", desc: "Guiding clients through the complex regulatory affairs of the agri-trade industry." },
];

function Operations() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={processing} alt="Modern processing facility" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-primary-foreground sm:px-6 lg:px-8">
          <Eyebrow>Operations & Services</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-bold leading-tight sm:text-6xl">
            Engineered for the global agri-trade.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            A vertically integrated partnership covering every stage from procurement to delivery.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:border-primary/30">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-leaf)" }}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
