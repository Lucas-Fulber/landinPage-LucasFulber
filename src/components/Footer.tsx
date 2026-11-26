import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="px-gutter py-loose border-t border-edge">
      <Container>
        <p className="text-meta text-fg-faint">
          © {new Date().getFullYear()} Lucas Fulber Lima · Desenvolvido com React, Vite & Tailwind CSS
        </p>
      </Container>
    </footer>
  );
}
