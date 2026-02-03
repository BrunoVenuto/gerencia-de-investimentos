import Link from "next/link";

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10 ${className}`}
    >
      {children}
    </Link>
  );
}
