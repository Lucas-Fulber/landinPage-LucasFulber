import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { tema, alternar } = useTheme();
  const escuro = tema === "escuro";
  const rotulo = escuro ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={rotulo}
      title={rotulo}
      className="p-2 rounded-lg text-fg-muted hover:text-accent hover:bg-surface transition-colors cursor-pointer"
    >
      <motion.span
        key={tema}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="block"
      >
        {escuro ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </button>
  );
}
