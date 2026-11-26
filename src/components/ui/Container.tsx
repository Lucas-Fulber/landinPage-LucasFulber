import type { ReactNode } from "react";

type Props = {
  /** `reading` para narrativa (Sobre, Experiência), `grid` para dados. Ver ADR-004. */
  width?: "reading" | "grid";
  className?: string;
  children: ReactNode;
};

const widths = {
  reading: "max-w-reading",
  grid: "max-w-grid",
} as const;

export default function Container({ width = "grid", className = "", children }: Props) {
  return <div className={`${widths[width]} mx-auto ${className}`}>{children}</div>;
}
