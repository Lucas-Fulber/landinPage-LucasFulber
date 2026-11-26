import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";

type Experience = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    role: "Desenvolvedor Full Stack · Freelancer",
    company: "Celeiro Análise de Risco",
    period: "Mai/2026",
    current: true,
    bullets: [
      "Desenvolvimento de aplicações web com Next.js, React e TypeScript",
      "Construção e manutenção de APIs RESTful",
      "Participação em ciclos de desenvolvimento ágil",
    ],
  },
  {
    role: "Analista de Redes e Suporte",
    company: "Resolutto IT",
    period: "Jun/2024 — Mai/2026",
    bullets: [
      "Desenvolvimento de scripts Python para automação de tarefas e geração de relatórios",
      "Configuração e suporte remoto de redes Wi-Fi, equipamentos MikroTik, ONUs e OLTs",
      "Gerenciamento de endereçamento IP e segmentação de redes",
      "Monitoramento de ambientes de rede com Zabbix",
    ],
  },
  {
    role: "Técnico de Informática Autônomo",
    company: "Autônomo",
    period: "2020 — 2024",
    bullets: [
      "Configuração de ambientes computacionais residenciais e empresariais",
      "Manutenção e diagnóstico de hardware e software",
      "Gestão de clientes e prestação de suporte técnico",
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experiencia" index="03" title="Experiência" weight="narrative">
      <ol className="relative">
        {/* Linha da timeline: passa pelo centro dos marcadores */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-edge-strong hidden sm:block" aria-hidden="true" />

        {experiences.map((exp, idx) => (
          <li key={`${exp.company}-${idx}`} className="relative sm:pl-loose pb-loose last:pb-0">
            <span
              className={`absolute left-0 top-1.5 size-[11px] rounded-full border-2 hidden sm:block ${
                exp.current ? "bg-accent border-accent" : "bg-canvas border-edge-strong"
              }`}
              aria-hidden="true"
            />

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-snug gap-y-1">
              <h3 className="text-body font-semibold text-fg">{exp.role}</h3>
              <div className="flex items-center gap-tight shrink-0">
                <span className="font-mono text-meta text-fg-subtle">{exp.period}</span>
                {exp.current && <Tag tone="accent">Atual</Tag>}
              </div>
            </div>
            <p className="text-body-sm text-fg-soft">{exp.company}</p>

            <ul className="mt-tight space-y-1">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex gap-tight text-body-sm text-fg-muted">
                  <span className="text-accent shrink-0" aria-hidden="true">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
