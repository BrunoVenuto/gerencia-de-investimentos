import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "ghost";

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ClickProps = {
  onClick: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type Props = LinkProps | ClickProps;

export function Button(props: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition";

  const variant: ButtonVariant = props.variant ?? "primary";

  const defaultStyles = variant === "primary" ? "btn-gradient" : "btn-outline";

  const cls =
    `${base} ${defaultStyles} ` +
    ("className" in props && props.className ? props.className : "");

  if ("href" in props) {
    return (
      <Link href={props.href} className={cls}>
        {props.children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={cls}>
      {props.children}
    </button>
  );
}
