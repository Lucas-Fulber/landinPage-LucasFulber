import { motion } from "framer-motion";
import { MapPin, ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { duration, easeOutSoft, enterOffset } from "@/motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Uma entrada para o bloco inteiro (AI-019) */}
      <motion.div
        initial={{ opacity: 0, y: enterOffset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.section, ease: easeOutSoft }}
        className="max-w-3xl mx-auto text-center space-y-6"
      >
        {/* Location badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted bg-surface-raised border border-edge-strong rounded-full px-3 py-1">
            <MapPin size={11} className="text-accent" />
            Porto Alegre, RS — Brasil
          </span>
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-fg leading-tight">
          Lucas Fulber Lima
        </h1>

        {/* Role */}
        <p className="text-xl sm:text-2xl font-medium text-accent">
          Desenvolvedor Full Stack
        </p>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-fg-muted mx-auto leading-relaxed sm:whitespace-nowrap">
          Transformando códigos complexos em soluções inteligentes.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button href="#projetos">Ver Projetos</Button>
          <Button href="#contato" variant="secondary">
            Entrar em Contato
          </Button>
        </div>
      </motion.div>

      {/* Indicador de rolagem: estático, sem loop (AI-019) */}
      <a
        href="#sobre"
        className="absolute bottom-8 text-fg-faint hover:text-accent transition-colors duration-150"
        aria-label="Rolar para a seção Sobre"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
