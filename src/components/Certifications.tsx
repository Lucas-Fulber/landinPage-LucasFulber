import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";

type Cert = { name: string; url?: string };
type Issuer = { name: string; certs: Cert[] };

const issuers: Issuer[] = [
  {
    name: "Alura",
    certs: [
      { name: "BI com Excel", url: "https://cursos.alura.com.br/user/lucasf-lima3010/course/bi-excel-criando-dashboard-sem-complicacao/certificate" },
      { name: "Excel: Automatizando tarefas com macros", url: "https://cursos.alura.com.br/user/lucasf-lima3010/course/excel-automatizando-tarefas-macros/certificate" },
      { name: "ChatGPT: otimizando qualidade dos resultados", url: "https://cursos.alura.com.br/user/lucasf-lima3010/course/chatgpt-otimizando-qualidade-resultados/certificate" },
      { name: "ChatGPT com Excel: automatização de macros", url: "https://cursos.alura.com.br/user/lucasf-lima3010/course/chatgpt-excel-automacao-macros/certificate" },
      { name: "ChatGPT: Desvendadando a IA e suas aplicações", url: "https://cursos.alura.com.br/user/lucasf-lima3010/course/chatgpt-desvendando-ia-conversas-aplicacoes/certificate" },
      { name: "Comunicação Assertiva", url: "https://cursos.alura.com.br/user/lucasf-lima3010/course/comunicacao-assertiva-reduzindo-conflitos-e-frustracaoes/certificate" },
      { name: "Customer Success", url: "https://cursos.alura.com.br/user/lucasf-lima3010/course/customer-success-cultura-centrada-cliente/certificate" },
      { name: "Formação Excel", url: "https://cursos.alura.com.br/degree/certificate/edba25d3-3be7-4057-b71f-cfca00a2cb42?lang=pt" },
    ],
  },
  {
    name: "Fiber School",
    certs: [
      { name: "Fibra Óptica do Zero", url: "https://www.linkedin.com/in/lucasfulber/overlay/Certifications/197652609/treasury/?profileId=ACoAAC-h9DUBiqKMNsu52Zw9q7-EC7FduO_16CI" },
      { name: "Dominando o Ping", url: "https://www.linkedin.com/in/lucasfulber/overlay/Certifications/197723826/treasury/?profileId=ACoAAC-h9DUBiqKMNsu52Zw9q7-EC7FduO_16CI" },
      { name: "Redes TCP/IP", url: "https://www.linkedin.com/in/lucasfulber/overlay/Certifications/197780664/treasury/?profileId=ACoAAC-h9DUBiqKMNsu52Zw9q7-EC7FduO_16CI" },
      { name: "Wi-Fi Premium Residencial", url: "https://www.linkedin.com/in/lucasfulber/overlay/Certifications/197979932/treasury/?profileId=ACoAAC-h9DUBiqKMNsu52Zw9q7-EC7FduO_16CI" },
    ],
  },
];

/** Lista única, emissor como metadado: as duas colunas fecham com 6 itens cada. */
const certs = issuers.flatMap((issuer) => issuer.certs.map((cert) => ({ ...cert, issuer: issuer.name })));

export default function Certifications() {
  return (
    <Section id="certificacoes" index="05" title="Certificações" weight="data">
      <ul className="grid sm:grid-cols-2 gap-x-loose">
        {certs.map((cert) => {
          const content = (
            <>
              <span className="flex-1 min-w-0">{cert.name}</span>
              <span className="font-mono text-meta text-fg-subtle shrink-0">{cert.issuer}</span>
              {cert.url && <ArrowUpRight size={14} className="shrink-0 text-fg-subtle group-hover:text-accent" aria-hidden="true" />}
            </>
          );
          const row = "flex items-baseline gap-snug py-tight text-body-sm text-fg-soft";
          return (
            <li key={cert.name} className="border-b border-edge">
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Certificado: ${cert.name}, ${cert.issuer} (abre em nova aba)`}
                  className={`${row} group hover:text-fg transition-colors duration-150`}
                >
                  {content}
                </a>
              ) : (
                <div className={row}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
