import { ExternalLink } from "lucide-react";
import BrandIcon from "@/components/ui/BrandIcon";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

type Project = {
  name: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
};

type ComingSoonProject = {
  name: string;
  stack: string[];
};

const projects: Project[] = [
  {
    name: "Seal World",
    description:
      "Landing page temática e totalmente responsiva sobre focas, com hero section em vídeo de fundo. Projeto focado em semântica HTML, responsividade avançada com media queries e experiência visual imersiva.",
    stack: ["HTML5", "CSS3", "Media Queries"],
    github: "https://github.com/Lucas-Fulber/site-focas",
    demo: "https://lucas-fulber.github.io/site-focas/",
  },
  {
    name: "Sistema de Agendamento API",
    description:
      "Backend acadêmico para gerenciamento de agendamentos de serviços com dois perfis de usuário — cliente e prestador. Implementa autenticação JWT, permissões por perfil e endpoints REST completos.",
    stack: ["Python", "Django", "Django REST Framework", "SQLite", "JWT"],
    github: "https://github.com/Lucas-Fulber/sistema-agendamento-api",
  },
];

const comingSoonProjects: ComingSoonProject[] = [
  {
    name: "Em Breve",
    stack: ["React", "Node.js"],
  },
  {
    name: "Em Breve",
    stack: ["Next.js", "PostgreSQL"],
  },
];

const linkClass = "text-fg-subtle hover:text-accent transition-colors duration-150";

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-snug gap-y-1 font-mono text-meta text-fg-subtle">
      {items.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  );
}

export default function Projects() {
  return (
    <Section id="projetos" index="06" title="Projetos" weight="data" raised>
      <div className="grid sm:grid-cols-2 gap-normal">
        {projects.map((project) => (
          <Card key={project.name} className="flex flex-col">
            <div className="flex items-start justify-between gap-snug mb-tight">
              <h3 className="text-body font-semibold text-fg">{project.name}</h3>
              <div className="flex gap-tight shrink-0">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${project.name} no GitHub`}>
                  <BrandIcon name="github" />
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`Demo de ${project.name}`}>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-body-sm text-fg-muted flex-1">{project.description}</p>

            <div className="mt-snug pt-tight border-t border-edge">
              <Stack items={project.stack} />
            </div>
          </Card>
        ))}

        {comingSoonProjects.map((project, idx) => (
          <Card key={`coming-soon-${idx}`} variant="placeholder" className="flex flex-col justify-center items-start min-h-40">
            <p className="text-body-sm font-semibold text-fg-subtle mb-tight">{project.name}</p>
            <Stack items={project.stack} />
          </Card>
        ))}
      </div>
    </Section>
  );
}
