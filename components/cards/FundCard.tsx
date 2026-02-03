import Link from "next/link";
import type { Fund } from "@/types/content";

export function FundCard({ fund }: { fund: Fund }) {
  const riskBadge =
    fund.riskLevel === "Alto"
      ? "bg-red-500/15 text-red-200 ring-1 ring-red-500/20"
      : fund.riskLevel === "Moderado"
        ? "bg-yellow-400/15 text-yellow-100 ring-1 ring-yellow-400/20"
        : "bg-emerald-400/15 text-emerald-100 ring-1 ring-emerald-400/20";

  return (
    <Link
      href={`/fundos/${fund.slug}`}
      className="group block rounded-2xl card-surface p-6 transition"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold tracking-tight text-white">
            {fund.name}
          </div>
          <div className="mt-1 text-sm text-white/70">{fund.strategy}</div>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs ${riskBadge}`}>
          Risco: {fund.riskLevel}
        </span>
      </div>

      <p className="mt-4 text-sm text-white/70 line-clamp-3">
        {fund.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-medium text-white group-hover:underline">
          Ver detalhes
        </span>
        {fund.factsheetPdf ? (
          <span className="text-xs text-white/60">PDF disponível</span>
        ) : null}
      </div>
    </Link>
  );
}
