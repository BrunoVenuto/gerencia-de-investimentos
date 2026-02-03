import { ReactNode } from "react";

export function SectionTitle({
  title,
  subtitle,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        {subtitle && <p className="mt-2 text-white/70">{subtitle}</p>}

        {children && <div className="mt-2">{children}</div>}
      </div>

      {actionHref && actionLabel && (
        <a
          href={actionHref}
          className="text-sm font-medium text-white/70 hover:text-white hover:underline"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
