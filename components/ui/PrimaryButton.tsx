import Link from "next/link";

export function PrimaryButton({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium btn-primary ${className}`}
    >
      {children}
    </Link>
  );
}
