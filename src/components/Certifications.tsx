"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

type Cert = { name: string };
type Issuer = { name: string; certs: Cert[] };

const issuers: Issuer[] = [
  {
    name: "Alura",
    certs: [
      { name: "BI com Excel" },
      { name: "ChatGPT: otimizando qualidade dos resultados" },
      { name: "ChatGPT: dicas e técnicas" },
      { name: "Comunicação Assertiva" },
      { name: "Customer Success" },
      { name: "Formação Excel" },
    ],
  },
  {
    name: "Fiber School",
    certs: [
      { name: "Fibra Óptica do Zero" },
      { name: "Dominando o Ping" },
      { name: "Redes TCP/IP" },
      { name: "Wi-Fi Premium Residencial" },
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
                    className="flex items-start gap-2.5 text-sm text-gray-400 bg-white/3 border border-white/8 rounded-lg px-3 py-2.5 hover:border-accent/20 hover:text-gray-300 transition-colors"
                  >
                    <span className="text-accent text-xs mt-0.5">◆</span>
                    {cert.name}
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
