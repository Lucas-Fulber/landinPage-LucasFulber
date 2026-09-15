# SEO

> Warm memory. Carregue quando a task envolver metadados, indexação ou compartilhamento em redes.
> Verificado contra o commit `0f1c633` em 2026-09-15.

## Implementação atual

Tudo vive em `index.html` — não há geração dinâmica de metadados, porque não há SSR nem router.

Presente e correto:

- `lang="pt-BR"` no `<html>`.
- `<title>`: "Lucas Fulber Lima — Desenvolvedor Full Stack".
- `meta description` com stack e localização.
- `meta keywords` e `meta author`.
- Open Graph: `og:title`, `og:description`, `og:type`, `og:locale`, `og:site_name`.
- Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`.
- `favicon.ico` em `public/`.
- Um `<h1>` único (`Hero.tsx`), com `<h2>` por seção e `<h3>` dentro dos cards — hierarquia de headings consistente.
- Nenhuma imagem de conteúdo no site, portanto nenhum `alt` faltando. Os ícones decorativos vêm de `lucide-react` e os dois SVG inline (GitHub, LinkedIn) são acompanhados de `aria-label` no link que os envolve.

## Lacunas verificadas

- **`og:image` ausente**, mas `twitter:card` está declarado como `summary_large_image`. Sem imagem, o card grande renderiza vazio no compartilhamento. Inconsistência real.
- **`og:url` e `<link rel="canonical">` ausentes.**
- **`public/robots.txt` ausente.**
- **`public/sitemap.xml` ausente** — de valor limitado numa single page, mas trivial.
- **Sem dados estruturados** (JSON-LD `Person`), que é o schema natural para portfólio.
- **`meta keywords`** não é usado por buscadores modernos; inofensivo, mas é peso morto.
- O domínio de produção não está registrado em nenhum lugar do repositório, o que bloqueia `og:url`, canonical e sitemap.

Ver task AI-004.

## Regras

- Metadados novos vão em `index.html`, não em componente.
- Ao mudar cargo, stack ou localização, atualize `title`, `description` e os blocos `og:`/`twitter:` juntos — ver a tabela de consistência em `CONTENT_GUIDE.md`.
- Não adicione bibliotecas de SEO (react-helmet e similares): sem router e sem SSR, elas não resolvem nada aqui.
