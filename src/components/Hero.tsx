"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowDown } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Location badge */}
        <motion.div {...fadeUp(0.1)}>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            <MapPin size={11} className="text-accent" />
            Porto Alegre, RS — Brasil
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight"
        >
          Lucas Fulber Lima
        </motion.h1>

        {/* Role */}
        <motion.p
          {...fadeUp(0.35)}
          className="text-xl sm:text-2xl font-medium text-accent"
        >
          Desenvolvedor Full Stack Jr.
        </motion.p>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-base sm:text-lg text-gray-400 mx-auto leading-relaxed sm:whitespace-nowrap"
        >
          Transformando lógica em experiências — da infraestrutura ao produto final.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => scrollTo("#projetos")}
            className="px-6 py-3 rounded-full bg-accent text-black text-sm font-semibold hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
          >
            Ver Projetos
          </button>
          <button
            onClick={() => scrollTo("#contato")}
            className="px-6 py-3 rounded-full border border-white/15 text-sm font-medium text-gray-300 hover:border-accent/50 hover:text-white transition-all"
          >
            Entrar em Contato
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => scrollTo("#sobre")}
        className="absolute bottom-8 text-gray-600 hover:text-accent transition-colors"
        aria-label="Rolar para baixo"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
