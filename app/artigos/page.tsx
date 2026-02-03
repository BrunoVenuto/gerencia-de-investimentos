import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getArticles } from "@/lib/cms";
import { ArticlesClient } from "./ArticlesClient";

export default async function ArticlesPage() {
  const articles = await getArticles();

  const categories = Array.from(
    new Set(articles.map((a) => a.category).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b));

  return (
    <main className="relative">
      <Container>
        <div className="py-16 md:py-20">
          <SectionTitle
            title="Artigos"
            subtitle="Cartas, análises e conteúdos institucionais com linguagem clara e objetiva."
          />

          <div className="mt-10">
            <ArticlesClient articles={articles} categories={categories} />
          </div>
        </div>
      </Container>
    </main>
  );
}
