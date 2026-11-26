import type { ReactNode } from "react";

type Props = {
  /** `accent` para estado ativo, `info` para participação, `neutral` para o resto. */
  tone?: "accent" | "info" | "neutral";
  children: ReactNode;
};

const tones = {
  accent: "text-accent border-accent/30",
  info: "text-info border-info/30",
  neutral: "text-fg-muted border-edge-strong",
} as const;

/** A única etiqueta da página: status e marcadores curtos. */
export default function Tag({ tone = "neutral", children }: Props) {
  return (
    <span className={`inline-block font-mono text-meta border rounded-edge px-1.5 py-px ${tones[tone]}`}>
      {children}
    </span>
  );
}
