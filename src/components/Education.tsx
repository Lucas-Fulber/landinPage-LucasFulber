import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";

type Education = {
  institution: string;
  course: string;
  period: string;
  status: "cursando" | "concluído" | "participação";
};

const educations: Education[] = [
  {
    institution: "FAQI Porto Alegre",
    course: "Análise e Desenvolvimento de Sistemas",
    period: "Cursando",
    status: "cursando",
  },
  {
    institution: "One Bit Code",
    course: "Desenvolvimento Fullstack",
    period: "Cursando",
    status: "cursando",
  },
  {
    institution: "Instituto Caldeira",
    course: "Análise de Dados e Inteligência Artificial",
    period: "2025",
    status: "participação",
  },
  {
    institution: "CIEE-RS",
    course: "Ocupações Administrativas",
    period: "2019 — 2021",
    status: "concluído",
  },
];

const statusTone = {
  cursando: "accent",
  concluído: "neutral",
  participação: "info",
} as const;

export default function Education() {
  return (
    <Section id="formacao" index="04" title="Formação" weight="data" raised>
      <ul className="grid sm:grid-cols-2 gap-x-loose">
        {educations.map((edu) => (
          <li key={edu.institution} className="py-snug border-b border-edge">
            <div className="flex items-baseline justify-between gap-snug">
              <h3 className="text-body-sm font-semibold text-fg">{edu.institution}</h3>
              <div className="flex items-center gap-tight shrink-0">
                {edu.status !== "cursando" && (
                  <span className="font-mono text-meta text-fg-subtle">{edu.period}</span>
                )}
                <Tag tone={statusTone[edu.status]}>{edu.status}</Tag>
              </div>
            </div>
            <p className="text-body-sm text-fg-muted mt-1">{edu.course}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
