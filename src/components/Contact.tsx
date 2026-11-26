import { Mail, MapPin, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import BrandIcon from "@/components/ui/BrandIcon";
import Button from "@/components/ui/Button";
import Prose from "@/components/ui/Prose";
import Section from "@/components/ui/Section";

type LinkItem = {
  label: string;
  value: string;
  href: string | null;
  icon: ReactNode;
};

const iconClass = "text-fg-subtle shrink-0";

const links: LinkItem[] = [
  {
    label: "Email",
    value: "lucasf.lima3010@gmail.com",
    href: "mailto:lucasf.lima3010@gmail.com",
    icon: <Mail size={16} className={iconClass} aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/lucasfulber",
    href: "https://www.linkedin.com/in/lucasfulber/",
    icon: <BrandIcon name="linkedin" className={iconClass} />,
  },
  {
    label: "GitHub",
    value: "github.com/Lucas-Fulber",
    href: "https://github.com/Lucas-Fulber",
    icon: <BrandIcon name="github" className={iconClass} />,
  },
  {
    label: "Localização",
    value: "Porto Alegre, RS — Brasil",
    href: null,
    icon: <MapPin size={16} className={iconClass} aria-hidden="true" />,
  },
];

export default function Contact() {
  return (
    <Section id="contato" index="07" title="Contato" weight="narrative">
      <Prose>
        <p>Aberto a novas oportunidades, projetos freelance ou apenas uma boa conversa sobre tecnologia.</p>
      </Prose>

      <dl className="mt-normal">
        {links.map((link) => (
          <div key={link.label} className="grid grid-cols-[6.5rem_1fr] items-center gap-snug py-tight border-b border-edge">
            <dt className="text-meta text-fg-subtle">{link.label}</dt>
            <dd className="flex items-center gap-tight min-w-0 text-body-sm">
              {link.icon}
              {link.href ? (
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="text-fg-soft hover:text-accent transition-colors duration-150 truncate"
                >
                  {link.value}
                </a>
              ) : (
                <span className="text-fg-soft truncate">{link.value}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <Button href="https://wa.me/5551998718506" target="_blank" rel="noopener noreferrer" className="mt-loose">
        <MessageCircle size={15} aria-hidden="true" />
        Enviar mensagem no WhatsApp
      </Button>
    </Section>
  );
}
