import type { ReactNode } from "react";

/** Bloco de leitura: corpo de texto com espaçamento entre parágrafos. */
export default function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-snug text-body text-fg-muted [&_strong]:font-medium [&_strong]:text-fg">{children}</div>;
}
