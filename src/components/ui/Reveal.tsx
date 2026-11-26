import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, easeOutSoft, enterOffset } from "@/motion";

/**
 * A única entrada animada de uma seção (AI-019): um bloco, uma vez, sem stagger.
 * Preferência de motion reduzido é tratada só por `MotionConfig` em `App.tsx`.
 */
export default function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: enterOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: duration.section, ease: easeOutSoft }}
    >
      {children}
    </motion.div>
  );
}
