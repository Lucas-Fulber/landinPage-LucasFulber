type Props = {
  /** Índice da seção na página, exibido em monospace como identificador. */
  index: string;
  title: string;
};

/**
 * Cabeçalho de seção: régua no topo, índice e título.
 * A régua substitui o divisor verde de 48 px — separador horizontal como padrão (ADR-004).
 */
export default function SectionHeader({ index, title }: Props) {
  return (
    <header className="border-t border-edge-strong pt-snug mb-loose flex items-baseline gap-snug">
      <span className="font-mono text-meta text-fg-subtle" aria-hidden="true">
        {index}
      </span>
      <h2 className="text-section font-semibold text-fg">{title}</h2>
    </header>
  );
}
