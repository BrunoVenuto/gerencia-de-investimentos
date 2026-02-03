import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { GradientOrb } from "@/components/ui/GradientOrb";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getPage } from "@/lib/cms";

/**
 * Helpers (sem any)
 */
type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function getString(obj: UnknownRecord, key: string): string | undefined {
  const v = obj[key];
  return typeof v === "string" ? v : undefined;
}

function getStringArray(obj: UnknownRecord, key: string): string[] | undefined {
  const v = obj[key];
  if (!Array.isArray(v)) return undefined;
  const onlyStrings = v.every((x) => typeof x === "string");
  return onlyStrings ? (v as string[]) : undefined;
}

function getArray(obj: UnknownRecord, key: string): unknown[] | undefined {
  const v = obj[key];
  return Array.isArray(v) ? v : undefined;
}

/**
 * Section types (union)
 */
type PillarItem = {
  title: string;
  description?: string;
};

type PillarsSection = {
  type: "pillars";
  title: string;
  subtitle?: string;
  items: PillarItem[];
};

type ProcessStep = {
  step: number;
  title: string;
  description?: string;
};

type ProcessSection = {
  type: "process";
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
};

type GovernanceSection = {
  type: "governance";
  title: string;
  subtitle?: string;
  bullets: string[];
};

type CtaLink = {
  href: string;
  label: string;
};

type CtaSection = {
  type: "cta";
  title: string;
  subtitle?: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

type Section = PillarsSection | ProcessSection | GovernanceSection | CtaSection;

/**
 * Guards para cada section
 */
function isPillarItem(value: unknown): value is PillarItem {
  if (!isRecord(value)) return false;
  const title = getString(value, "title");
  const desc = getString(value, "description");
  return (
    typeof title === "string" &&
    (desc === undefined || typeof desc === "string")
  );
}

function isPillarsSection(value: unknown): value is PillarsSection {
  if (!isRecord(value)) return false;
  if (getString(value, "type") !== "pillars") return false;

  const title = getString(value, "title");
  if (!title) return false;

  const subtitle = getString(value, "subtitle");
  const itemsRaw = getArray(value, "items");
  if (!itemsRaw) return false;

  const items = itemsRaw.filter(isPillarItem);
  // exige que TODOS sejam válidos
  if (items.length !== itemsRaw.length) return false;

  // valida subtitle se existir
  if (subtitle !== undefined && typeof subtitle !== "string") return false;

  return true;
}

function isProcessStep(value: unknown): value is ProcessStep {
  if (!isRecord(value)) return false;

  const step = value["step"];
  const title = getString(value, "title");
  const desc = getString(value, "description");

  return (
    typeof step === "number" &&
    Number.isFinite(step) &&
    typeof title === "string" &&
    (desc === undefined || typeof desc === "string")
  );
}

function isProcessSection(value: unknown): value is ProcessSection {
  if (!isRecord(value)) return false;
  if (getString(value, "type") !== "process") return false;

  const title = getString(value, "title");
  if (!title) return false;

  const subtitle = getString(value, "subtitle");
  const stepsRaw = getArray(value, "steps");
  if (!stepsRaw) return false;

  const steps = stepsRaw.filter(isProcessStep);
  if (steps.length !== stepsRaw.length) return false;

  if (subtitle !== undefined && typeof subtitle !== "string") return false;

  return true;
}

function isGovernanceSection(value: unknown): value is GovernanceSection {
  if (!isRecord(value)) return false;
  if (getString(value, "type") !== "governance") return false;

  const title = getString(value, "title");
  if (!title) return false;

  const subtitle = getString(value, "subtitle");
  const bullets = getStringArray(value, "bullets");
  if (!bullets) return false;

  if (subtitle !== undefined && typeof subtitle !== "string") return false;

  return true;
}

function isCtaLink(value: unknown): value is CtaLink {
  if (!isRecord(value)) return false;
  const href = getString(value, "href");
  const label = getString(value, "label");
  return typeof href === "string" && typeof label === "string";
}

function isCtaSection(value: unknown): value is CtaSection {
  if (!isRecord(value)) return false;
  if (getString(value, "type") !== "cta") return false;

  const title = getString(value, "title");
  if (!title) return false;

  const subtitle = getString(value, "subtitle");

  const primary = value["primaryCta"];
  const secondary = value["secondaryCta"];

  if (!isCtaLink(primary) || !isCtaLink(secondary)) return false;

  if (subtitle !== undefined && typeof subtitle !== "string") return false;

  return true;
}

/**
 * Parser: converte unknown[] => Section[]
 * (ignora sections inválidas pra não quebrar em runtime)
 */
function parseSections(input: unknown[]): Section[] {
  const parsed: Section[] = [];

  for (const s of input) {
    if (isPillarsSection(s)) {
      parsed.push(s);
      continue;
    }
    if (isProcessSection(s)) {
      parsed.push(s);
      continue;
    }
    if (isGovernanceSection(s)) {
      parsed.push(s);
      continue;
    }
    if (isCtaSection(s)) {
      parsed.push(s);
      continue;
    }
    // se vier algo inesperado do CMS, só ignora
  }

  return parsed;
}

type AboutPage = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    titleStrong: string;
    titleGradient: string;
    subtitle: string;
  };
  sections: unknown[];
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<AboutPage>("about");
  return {
    title: page?.meta?.title ?? "Quem somos",
    description:
      page?.meta?.description ??
      "Conheça nossa gestora, processo de investimento e governança.",
  };
}

export default async function AboutPage() {
  const page = await getPage<AboutPage>("about");

  if (!page) {
    return (
      <main className="relative">
        <Container>
          <div className="py-16 md:py-20 text-white/70">
            Página não encontrada. Verifique{" "}
            <code>content/pages/about.json</code>.
          </div>
        </Container>
      </main>
    );
  }

  const sections = parseSections(page.sections);

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

          <div className="mt-14 space-y-10">
            {sections.map((section, idx) => {
              if (section.type === "pillars") {
                return (
                  <section key={idx}>
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                        {section.title}
                      </h2>
                      {section.subtitle ? (
                        <p className="mt-3 text-white/70">{section.subtitle}</p>
                      ) : null}
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                      {section.items.map((it) => (
                        <GlowCard key={it.title} className="p-6">
                          <div className="text-lg font-semibold text-white">
                            {it.title}
                          </div>
                          {it.description ? (
                            <p className="mt-2 text-sm text-white/70">
                              {it.description}
                            </p>
                          ) : null}
                        </GlowCard>
                      ))}
                    </div>
                  </section>
                );
              }

              if (section.type === "process") {
                return (
                  <section key={idx}>
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                        {section.title}
                      </h2>
                      {section.subtitle ? (
                        <p className="mt-3 text-white/70">{section.subtitle}</p>
                      ) : null}
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                      {section.steps.map((s) => (
                        <GlowCard key={`${s.step}-${s.title}`} className="p-6">
                          <div className="flex items-center justify-between">
                            <Badge>Etapa {s.step}</Badge>
                          </div>
                          <div className="mt-4 text-lg font-semibold text-white">
                            {s.title}
                          </div>
                          {s.description ? (
                            <p className="mt-2 text-sm text-white/70">
                              {s.description}
                            </p>
                          ) : null}
                        </GlowCard>
                      ))}
                    </div>
                  </section>
                );
              }

              if (section.type === "governance") {
                return (
                  <section key={idx}>
                    <GlowCard className="p-8">
                      <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                          {section.title}
                        </h2>
                        {section.subtitle ? (
                          <p className="mt-3 text-white/70">
                            {section.subtitle}
                          </p>
                        ) : null}
                      </div>

                      <div className="mt-8 grid gap-3 md:grid-cols-2">
                        {section.bullets.map((b) => (
                          <div
                            key={b}
                            className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 text-sm text-white/80"
                          >
                            {b}
                          </div>
                        ))}
                      </div>
                    </GlowCard>
                  </section>
                );
              }

              // cta
              return (
                <section key={idx}>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                      {section.title}
                    </h3>
                    {section.subtitle ? (
                      <p className="mt-3 text-white/70">{section.subtitle}</p>
                    ) : null}

                    <div className="mt-8 flex items-center justify-center gap-3">
                      <PrimaryButton href={section.primaryCta.href}>
                        {section.primaryCta.label}
                      </PrimaryButton>
                      <SecondaryButton href={section.secondaryCta.href}>
                        {section.secondaryCta.label}
                      </SecondaryButton>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
}
