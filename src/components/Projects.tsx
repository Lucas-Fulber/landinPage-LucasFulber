"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

type Project = {
  name: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
};

const projects: Project[] = [
  {
    name: "Seal World",
    description:
      "Landing page temática e totalmente responsiva sobre focas, com hero section em vídeo de fundo. Projeto focado em semântica HTML, responsividade avançada com media queries e experiência visual imersiva.",
    stack: ["HTML5", "CSS3", "Media Queries"],
    github: "https://github.com/Lucas-Fulber/seal-world",
    demo: "https://lucas-fulber.github.io/seal-world",
  },
  {
    name: "Sistema de Agendamento API",
    description:
      "Backend acadêmico para gerenciamento de agendamentos de serviços com dois perfis de usuário — cliente e prestador. Implementa autenticação JWT, permissões por perfil e endpoints REST completos.",
    stack: ["Python", "Django", "Django REST Framework", "SQLite", "JWT"],
    github: "https://github.com/Lucas-Fulber/agendamento-api",
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Projetos</h2>
          <div className="w-12 h-0.5 bg-accent mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.015 }}
              className="group bg-white/3 border border-white/8 rounded-xl p-6 flex flex-col hover:border-accent/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <div className="flex gap-2 shrink-0 ml-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-accent transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-accent transition-colors"
                      aria-label="Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-md bg-accent/8 text-accent border border-accent/15 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
