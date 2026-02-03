import Link from "next/link";
import type { Article } from "@/types/content";
import { formatDateISO } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/artigos/${article.slug}`}
      className="block rounded-2xl card-surface p-6 transition"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-white/60">{article.category}</span>
        <span className="text-xs text-white/60">
          {formatDateISO(article.publishedAt)}
        </span>
      </div>

      <div className="mt-2 text-lg font-semibold tracking-tight text-white">
        {article.title}
      </div>

      <p className="mt-3 text-sm text-white/70 line-clamp-3">
        {article.excerpt}
      </p>

      <div className="mt-5 text-sm font-medium text-white hover:underline">
        Ler artigo
      </div>
    </Link>
  );
}
