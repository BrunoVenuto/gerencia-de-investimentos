import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/Badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { GlowCard } from "@/components/ui/GlowCard";
import { getFundBySlug, getFunds } from "@/lib/cms";

type PageProps = {
  params: { slug: string };
};

function riskStyle(risk: string) {
  if (risk === "Alto") return "bg-pink-500/15 text-pink-200 ring-pink-500/20";
  if (risk === "Moderado")
    return "bg-violet-500/15 text-violet-200 ring-violet-500/20";
  return "bg-emerald-400/15 text-emerald-200 ring-emerald-400/20";
}

export async function generateStaticParams() {
  const funds = await getFunds();
  return funds.map((f) => ({ slug: f.slug }));
}

export default async function FundPage({ params }: PageProps) {
  const fund = await getFundBySlug(params.slug);

  if (!fund) notFound();

  return (
    <main className="relative">
      <Container>
        <div className="py-16 md:py-20">
          {/* Top */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{fund.strategy}</Badge>

                <span
                  className={[
                    "rounded-full px-3 py-1 text-xs ring-1",
                    riskStyle(fund.riskLevel),
                  ].join(" ")}
                >
                  Risco: {fund.riskLevel}
                </span>

                {fund.cnpj ? <Badge>CNPJ: {fund.cnpj}</Badge> : null}
              </div>

              <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-white">
                {fund.name}
              </h1>

              <p className="mt-5 text-white/70 md:text-lg">
                {fund.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {fund.factsheetPdf?.url ? (
                  <PrimaryButton href={fund.factsheetPdf.url}>
                    Baixar Lâmina (PDF)
                  </PrimaryButton>
                ) : (
                  <PrimaryButton href="/contato">Falar com RI</PrimaryButton>
                )}

                <SecondaryButton href="/fundos">
                  Voltar para Fundos
                </SecondaryButton>
              </div>
            </div>

            {/* Mini info box */}
            <div className="w-full md:w-[360px]">
              <GlowCard className="p-6">
                <div className="text-sm text-white/70">Resumo</div>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white/60">Estratégia</span>
                    <span className="text-white">{fund.strategy}</span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white/60">Risco</span>
                    <span className="text-white">{fund.riskLevel}</span>
                  </div>

                  {fund.inceptionDate ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/60">Início</span>
                      <span className="text-white">{fund.inceptionDate}</span>
                    </div>
                  ) : null}

                  {fund.minimumInvestment ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/60">Aplicação mín.</span>
                      <span className="text-white">
                        {fund.minimumInvestment}
                      </span>
                    </div>
                  ) : null}

                  {fund.administrator ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/60">Administrador</span>
                      <span className="text-white">{fund.administrator}</span>
                    </div>
                  ) : null}
                </div>
              </GlowCard>
            </div>
          </div>

          {/* Performance placeholder */}
          <div className="mt-10">
            <GlowCard className="p-6">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-lg font-semibold text-white">
                    Performance
                  </div>
                  <div className="text-sm text-white/70">
                    Área preparada para integração de dados (CVM/API/JS embed).
                  </div>
                </div>

                <Badge className="w-fit">Embed ready</Badge>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-xs text-white/60">12M</div>
                  <div className="mt-1 text-xl font-semibold text-white">—</div>
                  <div className="mt-1 text-sm text-white/70">Retorno</div>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-xs text-white/60">Volatilidade</div>
                  <div className="mt-1 text-xl font-semibold text-white">—</div>
                  <div className="mt-1 text-sm text-white/70">Anualizada</div>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-xs text-white/60">Sharpe</div>
                  <div className="mt-1 text-xl font-semibold text-white">—</div>
                  <div className="mt-1 text-sm text-white/70">Indicador</div>
                </div>
              </div>

              {/* Espaço embed */}
              <div className="mt-6 rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                <div className="text-xs text-white/60">
                  Espaço para script/iframe (CVM / gráfico / tabela)
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Coloque aqui seu componente de performance quando integrarmos
                  a API.
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Documentos */}
          <div className="mt-10">
            <GlowCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">
                    Documentos
                  </div>
                  <div className="text-sm text-white/70">
                    Lâmina, apresentações e materiais institucionais.
                  </div>
                </div>

                {fund.factsheetPdf?.url ? (
                  <SecondaryButton href={fund.factsheetPdf.url}>
                    Abrir PDF
                  </SecondaryButton>
                ) : (
                  <Badge>Sem PDF</Badge>
                )}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="text-sm font-medium text-white">
                    Lâmina do Fundo
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    {fund.factsheetPdf?.name ?? "Não disponível"}
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <div className="text-sm font-medium text-white">
                    Apresentação Institucional
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    (pronto para ligar com a Biblioteca/CMS)
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </Container>
    </main>
  );
}
