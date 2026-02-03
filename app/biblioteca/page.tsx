import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getLibraryItems } from "@/lib/cms";
import { LibraryClient } from "./LibraryClient";

export default async function LibraryPage() {
  const items = await getLibraryItems();

  const categories = Array.from(
    new Set(items.map((i) => i.category).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));

  return (
    <main className="relative">
      <Container>
        <div className="py-16 md:py-20">
          <SectionTitle
            title="Biblioteca"
            subtitle="Lâminas, apresentações e materiais institucionais. Upload mensal via CMS (JSON)."
          />

          <div className="mt-10">
            <LibraryClient items={items} categories={categories} />
          </div>
        </div>
      </Container>
    </main>
  );
}
