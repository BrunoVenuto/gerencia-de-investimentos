/**
 * Formata data ISO para padrão brasileiro
 * Ex: 2026-01-20 -> 20 jan 2026
 */
export function formatDateISO(iso: string) {
  try {
    const date = new Date(iso);

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/**
 * Formata para data longa (se precisar depois)
 */
export function formatDateLong(iso: string) {
  try {
    const date = new Date(iso);

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/**
 * Trunca texto com segurança
 */
export function truncate(text: string, length = 140) {
  if (!text) return "";

  return text.length > length ? text.slice(0, length).trim() + "..." : text;
}
