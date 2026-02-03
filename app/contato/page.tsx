import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { GradientOrb } from "@/components/ui/GradientOrb";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getPage } from "@/lib/cms";
import { ContactSubmitButton } from "./ContactSubmitButton.clint";

type ContactPage = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    titleStrong: string;
    titleGradient: string;
    subtitle: string;
  };
  channels: Array<{ label: string; value: string }>;
  form: {
    title: string;
    subtitle: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      subject: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    cta: { label: string };
    helper: string;
  };
  ctaBox: {
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<ContactPage>("contact");
  return {
    title: page?.meta?.title ?? "Contato",
    description:
      page?.meta?.description ??
      "Fale com Relações com Investidores e tire dúvidas sobre nossos fundos e documentos.",
  };
}

export default async function ContactPage() {
  const page = await getPage<ContactPage>("contact");

  if (!page) {
    return (
      <main className="relative">
        <Container>
          <div className="py-16 md:py-20 text-white/70">
            Página não encontrada. Verifique{" "}
            <code>content/pages/contact.json</code>.
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="relative">
      <GradientOrb className="left-[-120px] top-[-120px] h-[420px] w-[420px] bg-violet-500/35" />
      <GradientOrb className="right-[-120px] top-[-80px] h-[420px] w-[420px] bg-pink-500/30" />

      <Container>
        <div className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs text-white/70 ring-1 ring-white/10">
              {page.hero.eyebrow}
            </span>

            <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-6xl">
              <span className="text-white">{page.hero.titleStrong}</span>{" "}
              <span className="bg-gradient-to-r from-pink-300 via-violet-200 to-pink-200 bg-clip-text text-transparent">
                {page.hero.titleGradient}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm text-white/70 md:text-base">
              {page.hero.subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-5">
            <div className="md:col-span-2 space-y-6">
              <GlowCard className="p-6">
                <div className="text-lg font-semibold text-white">Canais</div>
                <p className="mt-2 text-sm text-white/70">
                  Informações oficiais de contato e suporte ao investidor.
                </p>

                <div className="mt-5 space-y-3">
                  {page.channels.map((c) => (
                    <div
                      key={c.label}
                      className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                    >
                      <div className="text-xs text-white/60">{c.label}</div>
                      <div className="mt-1 text-sm text-white">{c.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Badge>Resposta em até 1 dia útil</Badge>
                </div>
              </GlowCard>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-lg font-semibold text-white">
                  {page.ctaBox.title}
                </div>
                <p className="mt-2 text-sm text-white/70">
                  {page.ctaBox.subtitle}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <PrimaryButton href={page.ctaBox.primaryCta.href}>
                    {page.ctaBox.primaryCta.label}
                  </PrimaryButton>
                  <SecondaryButton href={page.ctaBox.secondaryCta.href}>
                    {page.ctaBox.secondaryCta.label}
                  </SecondaryButton>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <GlowCard className="p-7">
                <div className="text-lg font-semibold text-white">
                  {page.form.title}
                </div>
                <p className="mt-2 text-sm text-white/70">
                  {page.form.subtitle}
                </p>

                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm text-white/80">
                        {page.form.fields.name.label}
                      </label>
                      <input
                        name="name"
                        placeholder={page.form.fields.name.placeholder}
                        className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white/80">
                        {page.form.fields.email.label}
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder={page.form.fields.email.placeholder}
                        className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm text-white/80">
                        {page.form.fields.phone.label}
                      </label>
                      <input
                        name="phone"
                        placeholder={page.form.fields.phone.placeholder}
                        className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white/80">
                        {page.form.fields.subject.label}
                      </label>
                      <input
                        name="subject"
                        placeholder={page.form.fields.subject.placeholder}
                        className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-white/80">
                      {page.form.fields.message.label}
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder={page.form.fields.message.placeholder}
                      className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  <div className="pt-2">
                    {/* ✅ botão interativo fica no Client Component */}
                    <ContactSubmitButton label={page.form.cta.label} />

                    <p className="mt-3 text-xs text-white/60">
                      {page.form.helper}
                    </p>
                  </div>
                </form>
              </GlowCard>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
