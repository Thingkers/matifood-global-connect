import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import { MapPin, Mail, Phone, Building2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact NISIL Agro — Corporate & Export Inquiries" },
      { name: "description", content: "Reach NISIL Agro for bulk orders, international partnerships and export inquiries. Headquartered in Rangpur, Bangladesh." },
      { property: "og:title", content: "Contact NISIL Agro" },
      { property: "og:description", content: "Bulk orders, international partnerships and export inquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Section className="pb-10">
        <div className="max-w-3xl">
          <Eyebrow>Contact & Global Presence</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight">Let's build a global partnership.</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Bulk orders, international partnerships and export inquiries — our team responds within two business days.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <h2 className="font-serif text-2xl font-bold">Corporate Inquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">For bulk orders, international partnerships and export inquiries.</p>
            {sent ? (
              <div className="mt-6 rounded-xl bg-secondary p-6 text-sm text-primary">
                Thank you. Your inquiry has been received — our team will be in touch shortly.
              </div>
            ) : (
              <form
                className="mt-6 grid gap-4"
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" name="name" required />
                  <Input label="Company" name="company" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Email" type="email" name="email" required />
                  <Input label="Country" name="country" />
                </div>
                <Input label="Subject" name="subject" />
                <label className="grid gap-2 text-sm">
                  <span className="font-medium">Message</span>
                  <textarea required name="message" rows={5} className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary" />
                </label>
                <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow">
                  Send inquiry
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <InfoCard icon={MapPin} title="Headquarters">
              Village: Nayapara, P.O: Palichara, Soddopuskurini,<br />Rangpur Sadar, Rangpur, Bangladesh.
            </InfoCard>
            <InfoCard icon={Building2} title="Dhaka Representation">
              Corporate liaison office serving partners and regulatory affairs in Dhaka.
            </InfoCard>
            <InfoCard icon={Mail} title="Email">info@nisilagro.com</InfoCard>
            <InfoCard icon={Phone} title="Support">Available Sun–Thu, 9:00–18:00 (BST)</InfoCard>
          </div>
        </div>
      </Section>
    </>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <input {...props} className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary" />
    </label>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-6">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-leaf)" }}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-serif text-lg font-bold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}
