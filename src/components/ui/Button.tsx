import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & {
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "bg-accent text-on-accent font-semibold hover:bg-accent/90",
  secondary: "border border-edge-strong text-fg-soft font-medium hover:border-accent/50 hover:text-fg",
} as const;

/** Botão de ação. É sempre um link: toda ação da página leva a algum lugar. */
export default function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <a
      {...props}
      className={`inline-flex items-center justify-center gap-tight px-normal py-3 rounded-edge text-body-sm transition-colors duration-150 ${variants[variant]} ${className}`}
    />
  );
}
