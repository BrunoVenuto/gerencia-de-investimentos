import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/Badge";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { GlowCard } from "@/components/ui/GlowCard";
import { getArticleBySlug, getArticles } from "@/lib/cms";
import { formatDateISO } from "@/lib/format";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <main className="relative">
      <Container>
        <div className="py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{article.category}</Badge>
              <Badge>{formatDateISO(article.publishedAt)}</Badge>
              {article.author?.name ? (
                <Badge>{article.author.name}</Badge>
              ) : null}
            </div>

            <h1 className="mt-6 text-3xl md:text-5xl font-semibold tracking-tight text-white">
              {article.title}
            </h1>

            <p className="mt-5 text-white/70 md:text-lg">{article.excerpt}</p>

            <div className="mt-8">
              <SecondaryButton href="/artigos">
                Voltar para Artigos
              </SecondaryButton>
            </div>
          </div>

          <div className="mt-10 max-w-3xl">
            <GlowCard className="p-7">
              <div className="prose prose-invert max-w-none">
                {/* conteúdo simples (texto) */}
                {article.content.split("\n").map((p, idx) => (
                  <p key={idx} className="text-white/80 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </Container>
    </main>
  );
}
