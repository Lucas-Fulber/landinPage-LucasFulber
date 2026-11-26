# Mapa de componentes

> Mapa de navegação. Todos com `export default`. Verificado em 2026-11-25.

## Seções — `src/components/`

| Componente | Âncora | Estado local | Dados literais | Ícones |
| --- | --- | --- | --- | --- |
| `Navbar` | — | `open`, `scrolled` | `links` (7 âncoras) | `Menu`, `X` |
| `ThemeToggle` | — | via `useTheme` | — | `Sun`, `Moon` |
| `Hero` | `#hero` | — | — | `MapPin`, `ArrowDown` |
| `About` | `#sobre` | — | `facts` (4, em `dl`) | — |
| `Skills` | `#skills` | — | `categories` (4) | — |
| `Experience` | `#experiencia` | — | `experiences` (3) | — |
| `Education` | `#formacao` | — | `educations` (4) | — |
| `Certifications` | `#certificacoes` | — | `issuers` (2), achatado em `certs` | `ArrowUpRight` |
| `Projects` | `#projetos` | — | `projects` (2) + `comingSoonProjects` (2) | `ExternalLink`, `BrandIcon` |
| `Contact` | `#contato` | — | `links` (4) | `Mail`, `MapPin`, `MessageCircle`, `BrandIcon` |
| `Footer` | — | — | copyright | — |

## Primitivos — `src/components/ui/` (AI-016)

| Primitivo | Papel |
| --- | --- |
| `Section` | Composição de toda seção de conteúdo: `id`, `index`, `title`, `weight` (`narrative`/`data` → ritmo e largura), `raised` (fundo `surface`). |
| `Container` | Faixa de largura: `reading` ou `grid`. |
| `SectionHeader` | Régua + índice mono + `h2`. Usado só via `Section`. |
| `Reveal` | A única entrada animada de uma seção (tokens de `src/motion.ts`). Usado só via `Section`. |
| `Prose` | Bloco de leitura; `<strong>` vira ênfase em `fg`. |
| `Tag` | Etiqueta única (`accent`/`info`/`neutral`). |
| `Button` | Ação, sempre `<a>` (`primary`/`secondary`). |
| `Card` | Só em Projetos (ADR-004). `solid`/`placeholder`. |
| `BrandIcon` | SVG de marca: `github`, `linkedin`. |

## Composição

`App.tsx` renderiza `Navbar`, `<main>` com as oito seções, e `Footer`. As sete seções de conteúdo (todas menos `Hero`) são `<Section>`. Índices `01`–`07` são passados à mão em cada seção: ao reordenar, renumere.

`Navbar` e `Hero` ainda usam a escala padrão do Tailwind — ver AI-016 (pendência) e AI-006.
