"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="sobre" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Sobre mim
          </h2>
          <div className="w-12 h-0.5 bg-accent mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="space-y-5 text-gray-400 leading-relaxed"
          >
            <p>
              Olá! Meu nome é Lucas, tenho 23 anos e sou{" "}
              <span className="text-accent font-medium">Desenvolvedor Full Stack Jr.</span>{" "}
              na Celeiro Crédito Agro, onde atuo desde maio de 2026. Minha trajetória começou
              em infraestrutura e redes, o que me deu uma base sólida para entender sistemas
              de ponta a ponta.
            </p>
            <p>
              Por mais de dois anos na Resolutto IT, atuei como{" "}
              <span className="text-white/80 font-medium">Analista de Redes e Suporte</span>,
              desenvolvendo scripts em{" "}
              <span className="text-accent font-medium">Python</span> para automação, gerenciando
              equipamentos MikroTik, ONUs e OLTs, e monitorando ambientes com Zabbix.
            </p>
            <p>
              A transição para o desenvolvimento full stack foi natural: a curiosidade em
              construir as soluções, e não apenas operá-las, me levou a me especializar em{" "}
              <span className="text-accent font-medium">React, Next.js, TypeScript e Django REST</span>.
              Hoje, estudo ADS na FAQI Porto Alegre e Desenvolvimento Fullstack na One Bit Code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Ano de início", value: "2020" },
              { label: "Foco atual", value: "Full Stack" },
              { label: "Localização", value: "Porto Alegre, RS" },
              { label: "Disponibilidade", value: "Aberto a projetos" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/3 border border-white/8 rounded-xl p-4"
              >
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
