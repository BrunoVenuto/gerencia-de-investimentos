import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

import { getCareerBySlug, getCareers } from "@/lib/cms";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const careers = await getCareers();
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const career = await getCareerBySlug(params.slug);
  return {
    title: career ? `${career.title} — Carreira` : "Vaga — Carreira",
    description: career?.description ?? "Oportunidade na gestora.",
  };
}

function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/5531995453632?text=${encoded}`;
}

export default async function CareerPage({ params }: PageProps) {
  const career = await getCareerBySlug(params.slug);
  if (!career) notFound();

  const message = `Olá! Tenho interesse na vaga "${career.title}" (${career.type} - ${career.location}). Gostaria de enviar meu perfil.`;

  return (
    <main className="relative">
      <Container>
        <div className="py-12 sm:py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{career.area}</Badge>
              <Badge>{career.type}</Badge>
              <Badge>{career.location}</Badge>
            </div>

            <h1 className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-white">
              {career.title}
            </h1>

            <p className="mt-4 sm:mt-5 text-white/70 sm:text-base md:text-lg">
              {career.description}
            </p>

            {/* MOBILE FIRST: botões empilhados no mobile */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <PrimaryButton
                href={buildWhatsAppLink(message)}
                className="w-full sm:w-auto"
              >
                Candidatar no WhatsApp
              </PrimaryButton>

              <SecondaryButton href="/carreira" className="w-full sm:w-auto">
                Voltar
              </SecondaryButton>
            </div>
          </div>

          {/* MOBILE FIRST: 1 coluna por padrão; 2 colunas só no md */}
          <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
            <GlowCard className="p-6 sm:p-7">
              <div className="text-lg font-semibold text-white">Requisitos</div>
              <div className="mt-4 space-y-3">
                {career.requirements.map((r, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 text-sm text-white/80"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </GlowCard>

            <GlowCard className="p-6 sm:p-7">
              <div className="text-lg font-semibold text-white">Benefícios</div>
              <div className="mt-4 space-y-3">
                {(career.benefits?.length
                  ? career.benefits
                  : [
                      "Pacote compatível com o mercado",
                      "Ambiente de alta performance",
                      "Cultura de aprendizado",
                    ]
                ).map((b, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 text-sm text-white/80"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </Container>
    </main>
  );
}
