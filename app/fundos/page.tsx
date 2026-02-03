import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FundCard } from "@/components/cards/FundCard";
import { getFunds } from "@/lib/cms";

export default async function FundsPage() {
  const funds = await getFunds();

  return (
    <main className="relative">
      <Container>
        <div className="py-16 md:py-20">
          <SectionTitle
            title="Fundos"
            subtitle="Conheça nossas estratégias, acesse lâminas e informações de cada produto."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {funds.map((fund) => (
              <FundCard key={fund.id} fund={fund} />
            ))}
          </div>

          {funds.length === 0 && (
            <div className="mt-10 text-center text-white/70">
              Nenhum fundo cadastrado no momento.
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
