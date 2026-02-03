"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/types/content";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Badge } from "@/components/ui/Badge";

export function ArticlesClient({
  articles,
  categories,
}: {
  articles: Article[];
  categories: string[];
}) {
  const [selected, setSelected] = useState<string>("Todos");
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    const byCategory = articles.filter((a) =>
      selected === "Todos" ? true : a.category === selected,
    );

    const byQuery = byCategory.filter((a) => {
      if (!query) return true;

      const inTitle = a.title?.toLowerCase().includes(query) ?? false;
      const inExcerpt = a.excerpt?.toLowerCase().includes(query) ?? false;
      const inContent = a.content?.toLowerCase().includes(query) ?? false;

      return inTitle || inExcerpt || inContent;
    });

    // Mais recente primeiro (publishedAt ISO)
    return byQuery.sort((a, b) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
    );
  }, [articles, selected, q]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelected("Todos")}
            className={[
              "rounded-full px-4 py-2 text-sm ring-1 transition",
              selected === "Todos"
                ? "bg-white/10 text-white ring-white/20"
                : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            Todos
          </button>

          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelected(c)}
              className={[
                "rounded-full px-4 py-2 text-sm ring-1 transition",
                selected === c
                  ? "bg-white/10 text-white ring-white/20"
                  : "bg-white/5 text-white/70 ring-white/10 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Badge>{filtered.length} artigos</Badge>
          </div>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título, resumo ou conteúdo..."
            className="w-full md:w-[340px] rounded-full bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl card-surface p-8 text-center">
          <div className="text-white font-semibold">Nada encontrado</div>
          <div className="mt-2 text-sm text-white/70">
            Tente trocar o filtro ou buscar por outra palavra.
          </div>
        </div>
      )}
    </div>
  );
}
