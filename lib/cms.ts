import { promises as fs } from "fs";
import path from "path";

import type { Fund, Article, LibraryItem, Career } from "@/types/content";

// ===== Tipagem das Páginas =====

export type HomePage = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    titleStrong: string;
    titleGradient: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  steps: Array<{
    step: string;
    pill: string;
    title: string;
    description: string;
  }>;
  sections: {
    funds: {
      title: string;
      subtitle: string;
      actionLabel: string;
      actionHref: string;
    };
    articles: {
      title: string;
      subtitle: string;
      actionLabel: string;
      actionHref: string;
    };
  };
};

// ===== Helpers =====

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function sortByDateDesc<T>(items: T[], getDate: (i: T) => string | undefined) {
  return [...items].sort((a, b) =>
    (getDate(b) ?? "").localeCompare(getDate(a) ?? ""),
  );
}

// ===== PÁGINAS INSTITUCIONAIS =====

export async function getPage<T = unknown>(slug: string): Promise<T | null> {
  const filePath = path.join(PAGES_DIR, `${slug}.json`);
  return readJsonFile<T | null>(filePath, null);
}

// ===== FUNDOS =====

export async function getFunds(): Promise<Fund[]> {
  const filePath = path.join(CONTENT_DIR, "funds.json");
  return readJsonFile<Fund[]>(filePath, []);
}

export async function getFundBySlug(slug: string): Promise<Fund | null> {
  const funds = await getFunds();
  return funds.find((f) => f.slug === slug) ?? null;
}

// ===== ARTIGOS =====

export async function getArticles(): Promise<Article[]> {
  const filePath = path.join(CONTENT_DIR, "articles.json");
  const articles = await readJsonFile<Article[]>(filePath, []);
  return sortByDateDesc(articles, (a) => a.publishedAt);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) ?? null;
}

// ===== BIBLIOTECA =====

export async function getLibraryItems(): Promise<LibraryItem[]> {
  const filePath = path.join(CONTENT_DIR, "library.json");
  const items = await readJsonFile<LibraryItem[]>(filePath, []);
  return sortByDateDesc(items, (i) => i.date);
}

// ===== CARREIRA =====

export async function getCareers(): Promise<Career[]> {
  const filePath = path.join(CONTENT_DIR, "careers.json");
  const careers = await readJsonFile<Career[]>(filePath, []);
  return sortByDateDesc(careers, (c) => c.publishedAt);
}

export async function getCareerBySlug(slug: string): Promise<Career | null> {
  const careers = await getCareers();
  return careers.find((c) => c.slug === slug) ?? null;
}
