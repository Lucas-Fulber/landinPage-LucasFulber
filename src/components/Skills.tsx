import Section from "@/components/ui/Section";

type Category = {
  name: string;
  skills: string[];
};

const categories: Category[] = [
  {
    name: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    name: "Backend",
    skills: ["Python", "Node.js", "Django", "REST Framework", "SQL", "SQLite", "JWT"],
  },
  {
    name: "Infra & Redes",
    skills: ["Zabbix", "MikroTik", "Redes TCP/IP", "Wi-Fi", "ONUs / OLTs", "Fibra Óptica"],
  },
  {
    name: "Ferramentas",
    skills: ["Git", "GitHub", "VS Code", "Linux", "Postman"],
  },
];

export default function Skills() {
  return (
    <Section id="skills" index="02" title="Skills" weight="data" raised>
      <dl>
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="grid sm:grid-cols-[12rem_1fr] gap-x-normal gap-y-tight py-snug border-b border-edge last:border-b-0"
          >
            <dt className="text-meta font-semibold uppercase tracking-widest text-fg-subtle sm:pt-0.5">
              {cat.name}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-x-normal gap-y-tight font-mono text-body-sm text-fg-soft">
                {cat.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
