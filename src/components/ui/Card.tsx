import type { ReactNode } from "react";

type Props = {
  /** `placeholder` para conteúdo ainda inexistente: borda tracejada, sem fundo. */
  variant?: "solid" | "placeholder";
  className?: string;
  children: ReactNode;
};

/**
 * Card é exceção, não padrão: só em Projetos, onde corresponde a um objeto real (ADR-004).
 * Fica um nível de superfície acima da seção `surface` em que vive (AI-003).
 */
export default function Card({ variant = "solid", className = "", children }: Props) {
  const look =
    variant === "solid"
      ? "bg-surface-raised border-edge hover:border-accent/30 transition-colors duration-150"
      : "border-dashed border-edge-strong";
  return <div className={`border rounded-edge p-normal ${look} ${className}`}>{children}</div>;
}
