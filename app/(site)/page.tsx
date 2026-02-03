import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { GradientOrb } from "@/components/ui/GradientOrb";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StepsGrid } from "@/components/sections/StepsGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { getArticles, getFunds, getPage, type HomePage } from "@/lib/cms";
import { FundCard } from "@/components/cards/FundCard";
import { ArticleCard } from "@/components/cards/ArticleCard";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<HomePage>("home");
  return {
    title: page?.meta?.title ?? "Nexa Asset",
    description:
      page?.meta?.description ??
      "Gestão profissional com mentalidade tecnológica.",
  };
}

export default async function Home() {
  const [funds, articles, page] = await Promise.all([
    getFunds(),
    getArticles(),
    getPage<HomePage>("home"),
  ]);

  const p = page ?? {
    meta: { title: "Nexa Asset", description: "" },
    hero: {
      eyebrow: "✨ Gestão Institucional • Tech-first • Transparência",
      titleStrong: "Gestão profissional para",
      titleGradient: "investidores exigentes",
      subtitle:
        "Estratégias claras, documentos acessíveis e comunicação objetiva.",
      primaryCta: { label: "Ver Fundos", href: "/fundos" },
      secondaryCta: { label: "Ver Docs", href: "/biblioteca" },
    },
    steps: [],
    sections: {
      funds: {
        title: "Fundos",
        subtitle: "Conheça nossas estratégias e documentos.",
        actionLabel: "Ver todos",
        actionHref: "/fundos",
      },
      articles: {
        title: "Artigos",
        subtitle: "Análises, cartas e atualizações institucionais.",
        actionLabel: "Ver todos",
        actionHref: "/artigos",
      },
    },
  };

  return (
    <main className="relative w-full overflow-x-hidden">
      {/* glows (bem mais leves no mobile) */}
      <GradientOrb className="left-[-220px] top-[-220px] h-[420px] w-[420px] bg-violet-500/30" />
      <GradientOrb className="right-[-220px] top-[-220px] h-[420px] w-[420px] bg-pink-500/25" />

      {/* HERO */}
      <section className="border-b hr-voxnava">
        <Container>
          {/* MOBILE-FIRST spacing */}
          <div className="py-14 sm:py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center justify-center rounded-full bg-white/5 px-4 py-2 text-[11px] sm:text-xs text-white/70 ring-1 ring-white/10">
                {p.hero.eyebrow}
              </span>

              {/* MOBILE-FIRST title (sem estourar e sem sumir) */}
              <h1 className="mt-7 sm:mt-8 text-[34px] leading-[1.05] sm:text-5xl md:text-6xl font-semibold tracking-tight">
                <span className="text-white">{p.hero.titleStrong}</span>{" "}
                <span className="bg-gradient-to-r from-pink-300 via-violet-200 to-pink-200 bg-clip-text text-transparent">
                  {p.hero.titleGradient}
                </span>
              </h1>

              <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
                {p.hero.subtitle}
              </p>

              {/* MOBILE-FIRST CTAs: empilha no mobile */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <PrimaryButton
                  href={p.hero.primaryCta.href}
                  className="w-full sm:w-auto"
                >
                  {p.hero.primaryCta.label}
                </PrimaryButton>
                <SecondaryButton
                  href={p.hero.secondaryCta.href}
                  className="w-full sm:w-auto"
                >
                  {p.hero.secondaryCta.label}
                </SecondaryButton>
              </div>
            </div>

            {/* Steps (já em mobile-first no componente abaixo) */}
            {p.steps?.length ? <StepsGrid steps={p.steps} /> : null}
          </div>
        </Container>
      </section>

      {/* FUNDOS */}
      <section className="py-12 sm:py-14 md:py-16">
        <Container>
          <SectionTitle
            title={p.sections.funds.title}
            subtitle={p.sections.funds.subtitle}
            actionHref={p.sections.funds.actionHref}
            actionLabel={p.sections.funds.actionLabel}
          />

          <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
            {funds.slice(0, 2).map((f) => (
              <FundCard key={f.id} fund={f} />
            ))}
          </div>
        </Container>
      </section>

      {/* ARTIGOS */}
      <section className="border-t hr-voxnava py-12 sm:py-14 md:py-16">
        <Container>
          <SectionTitle
            title={p.sections.articles.title}
            subtitle={p.sections.articles.subtitle}
            actionHref={p.sections.articles.actionHref}
            actionLabel={p.sections.articles.actionLabel}
          />

          <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
            {articles.slice(0, 2).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
