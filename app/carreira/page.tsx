import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { CareerCard } from "@/components/cards/CareerCard";

import { getCareers, getPage } from "@/lib/cms";

type CareersPageCopy = {
  meta: { title: string; description: string };
  header: { title: string; subtitle: string };
  note: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<CareersPageCopy>("careers");
  return {
    title: page?.meta?.title ?? "Carreira",
    description:
      page?.meta?.description ??
      "Oportunidades na gestora: pesquisa, investimentos, produto e tecnologia.",
  };
}

export default async function CareersPage() {
  const [careers, page] = await Promise.all([
    getCareers(),
    getPage<CareersPageCopy>("careers"),
  ]);

  const copy = page ?? {
    meta: { title: "Carreira", description: "" },
    header: {
      title: "Carreira",
      subtitle:
        "Buscamos pessoas analíticas, éticas e com mentalidade de dono. Veja as oportunidades abertas.",
    },
    note: "Não encontrou a vaga ideal? Envie seu perfil para nosso banco de talentos.",
  };

  return (
    <main className="relative">
      <Container>
        <div className="py-12 sm:py-14 md:py-20">
          <SectionTitle
            title={copy.header.title}
            subtitle={copy.header.subtitle}
          />

          <div className="mt-4 sm:mt-6">
            <Badge>{careers.length} vaga(s)</Badge>
          </div>

          {/* MOBILE FIRST: 1 coluna por padrão, 2 colunas só no md */}
          <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
            {careers.map((c) => (
              <CareerCard key={c.id} career={c} />
            ))}
          </div>

          {careers.length === 0 && (
            <div className="mt-8 sm:mt-10 rounded-2xl card-surface p-6 sm:p-8 text-center text-white/70">
              Nenhuma vaga aberta no momento.
            </div>
          )}

          {/* CTA — MOBILE FIRST */}
          <div className="mt-8 sm:mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 backdrop-blur">
            <div className="text-white font-semibold">Banco de talentos</div>
            <p className="mt-2 text-sm text-white/70">{copy.note}</p>

            <a
              href="/contato"
              className="mt-5 inline-flex w-full sm:w-auto items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium btn-primary"
            >
              Enviar perfil
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
