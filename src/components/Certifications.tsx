"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

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
      { name: "Formação Excel", url: "https://cursos.alura.com.br/user/lucasf-lima3010/course/excel-domine-editor-planilhas/certificate" },
    ],
  },
  {
    name: "Fiber School",
    certs: [
      { name: "Fibra Óptica do Zero", url: "https://www.linkedin.com/in/lucasfulber/" },
      { name: "Dominando o Ping", url: "https://www.linkedin.com/in/lucasfulber/details/" },
      { name: "Redes TCP/IP", url: "https://www.linkedin.com/in/lucasfulber/" },
      { name: "Wi-Fi Premium Residencial", url: "https://www.linkedin.com/in/lucasfulber/" },
    ],
  },
];

export default function Certifications() {
  return (
    <section id="certificacoes" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Certificações</h2>
          <div className="w-12 h-0.5 bg-accent mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {issuers.map((issuer, issuerIdx) => (
            <motion.div
              key={issuer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: issuerIdx * 0.15, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Award size={13} className="text-accent" />
                </div>
                <h3 className="text-sm font-bold text-accent uppercase tracking-widest">
                  {issuer.name}
                </h3>
              </div>
              <ul className="space-y-2">
                {issuer.certs.map((cert, certIdx) => (
                  <motion.li
                    key={cert.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: issuerIdx * 0.15 + certIdx * 0.05,
                    }}
                    className="flex items-center gap-2.5 text-sm text-gray-400 bg-white/3 border border-white/8 rounded-lg px-3 py-2.5 hover:border-accent/20 hover:text-gray-300 transition-colors"
                  >
                    <span className="text-accent text-xs shrink-0">◆</span>
                    <span className="flex-1">{cert.name}</span>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-accent transition-colors shrink-0"
                        aria-label={`Certificado: ${cert.name}`}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
