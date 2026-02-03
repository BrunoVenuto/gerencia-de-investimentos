export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
