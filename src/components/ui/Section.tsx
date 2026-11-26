import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  id: string;
  index: string;
  title: string;
  /** Peso da seção: define o ritmo vertical (AI-018). */
  weight: "narrative" | "data";
  /** Faixa de largura (ADR-004). Por padrão segue o peso. */
  width?: "reading" | "grid";
  /** Fundo `surface` para alternar blocos. */
  raised?: boolean;
  children: ReactNode;
};

const rhythm = {
  narrative: "py-section-narrative",
  data: "py-section-data",
} as const;

/** Composição de toda seção de conteúdo: ritmo, largura, cabeçalho e uma entrada. */
export default function Section({ id, index, title, weight, width, raised = false, children }: Props) {
  return (
    <section id={id} className={`${rhythm[weight]} px-gutter scroll-mt-16 ${raised ? "bg-surface" : ""}`}>
      <Container width={width ?? (weight === "narrative" ? "reading" : "grid")}>
        <Reveal>
          <SectionHeader index={index} title={title} />
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
