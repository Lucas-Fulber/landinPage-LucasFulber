import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

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

const statusColor = {
  cursando: "text-accent bg-accent/10 border-accent/20",
  concluído: "text-fg-muted bg-surface-raised border-edge-strong",
  participação: "text-info bg-info/10 border-info/20",
};

export default function Education() {
  return (
    <section id="formacao" className="py-24 px-4 bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-fg mb-2">Formação</h2>
          <div className="w-12 h-0.5 bg-accent mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {educations.map((edu, idx) => (
            <motion.div
              key={`${edu.institution}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-surface border border-edge rounded-xl p-5 hover:border-accent/20 transition-colors flex gap-4"
            >
              <div className="mt-0.5 shrink-0">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <GraduationCap size={16} className="text-accent" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-fg truncate">{edu.institution}</h3>
                <p className="text-sm text-fg-muted mt-0.5">{edu.course}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span
                    className={`text-xs border rounded-full px-2 py-0.5 ${statusColor[edu.status]}`}
                  >
                    {edu.status}
                  </span>
                  {edu.status !== "cursando" && (
                    <span className="text-xs text-fg-subtle">{edu.period}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
