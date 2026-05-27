"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

type Experience = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    role: "Desenvolvedor Full Stack Jr.",
    company: "Celeiro Crédito Agro",
    period: "Mai/2026 — presente",
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
    <section id="experiencia" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Experiência</h2>
          <div className="w-12 h-0.5 bg-accent mb-10" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/8 hidden sm:block" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={`${exp.company}-${idx}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: "easeOut" }}
                className="sm:pl-12 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border border-white/10 items-center justify-center hidden sm:flex">
                  <Briefcase size={14} className={exp.current ? "text-accent" : "text-gray-500"} />
                </div>

                <div className="bg-white/3 border border-white/8 rounded-xl p-5 hover:border-accent/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                      <p className="text-sm text-accent">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-gray-500">{exp.period}</span>
                      {exp.current && (
                        <span className="text-xs text-accent bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
                          Atual
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2 text-sm text-gray-400">
                        <span className="text-accent mt-1.5 shrink-0">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
