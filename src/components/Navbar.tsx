import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "Skills", href: "#skills" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Formação", href: "#formacao" },
  { label: "Certificações", href: "#certificacoes" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-scrim backdrop-blur-md border-b border-edge" : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => handleLink("#hero")}
          className="text-fg font-semibold text-lg tracking-tight hover:text-accent transition-colors"
        >
          LF<span className="text-accent">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleLink(link.href)}
                className="text-sm text-fg-muted hover:text-accent transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Ações — o alternador de tema fica fora do menu mobile
            para existir uma única vez e não duplicar estado */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          <button
            className="md:hidden p-2 rounded-lg text-fg-muted hover:text-fg hover:bg-surface transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-scrim backdrop-blur-md border-b border-edge px-4 pb-4"
        >
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleLink(link.href)}
                  className="w-full text-left text-sm text-fg-muted hover:text-accent transition-colors py-1"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
