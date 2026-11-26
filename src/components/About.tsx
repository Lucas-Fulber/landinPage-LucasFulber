import Prose from "@/components/ui/Prose";
import Section from "@/components/ui/Section";

const facts = [
  { label: "Ano de início", value: "2020" },
  { label: "Foco atual", value: "Full Stack" },
  { label: "Localização", value: "Porto Alegre, RS" },
  { label: "Disponibilidade", value: "Aberto a projetos" },
];

export default function About() {
  return (
    <Section id="sobre" index="01" title="Sobre mim" weight="narrative">
      <Prose>
        <p>
          Olá! Meu nome é Lucas, tenho 23 anos e sou <strong>Desenvolvedor Full Stack</strong>.
          Desde maio de 2026, atuo como freelancer na Celeiro Análise de Risco. Minha trajetória começou
          em infraestrutura e redes, o que me deu uma base sólida para entender sistemas
          de ponta a ponta, hoje estou me especializando em soluções web Full Stack.
        </p>
        <p>
          Por mais de dois anos na Resolutto IT, atuei como <strong>Analista de Redes e Suporte</strong>,
          desenvolvendo scripts em <strong>Python</strong> para automação, gerenciando
          equipamentos MikroTik, ONUs e OLTs, e monitorando ambientes com Zabbix.
        </p>
        <p>
          A transição para o desenvolvimento full stack foi natural: a curiosidade em
          construir as soluções, e não apenas operá-las, me levou a me especializar em{" "}
          <strong>React, Next.js, TypeScript e Django REST</strong>.
          Hoje, estudo ADS na FAQI Porto Alegre e Desenvolvimento Fullstack na One Bit Code.
        </p>
      </Prose>

      <dl className="mt-loose grid grid-cols-2 sm:grid-cols-4 gap-x-normal gap-y-snug border-t border-edge pt-snug">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-meta text-fg-subtle">{fact.label}</dt>
            <dd className="text-body-sm font-medium text-fg mt-1">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
