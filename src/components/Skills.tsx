"use client";

import { motion } from "framer-motion";

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
    skills: ["Python", "Django", "Django REST Framework", "SQL", "SQLite", "JWT"],
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
    <section id="skills" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Skills</h2>
          <div className="w-12 h-0.5 bg-accent mb-10" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
                {cat.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIdx * 0.1 + skillIdx * 0.04 }}
                    className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
