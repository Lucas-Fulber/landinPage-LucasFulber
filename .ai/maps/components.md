# Mapa de componentes

> Mapa de navegação. Todos em `src/components/`, todos com `export default`.

| Componente | Âncora | Estado local | Dados literais | Ícones |
| --- | --- | --- | --- | --- |
| `Navbar` | — | `open`, `scrolled` | `links` (7 âncoras) | `Menu`, `X` |
| `ThemeToggle` | — | via `useTheme` | — | `Sun`, `Moon` |
| `Hero` | `#hero` | — | — | `MapPin`, `ArrowDown` |
| `About` | `#sobre` | — | 4 cards de fato | — |
| `Skills` | `#skills` | — | `categories` (4) | — |
| `Experience` | `#experiencia` | — | `experiences` (3) | `Briefcase` |
| `Education` | `#formacao` | — | `educations` (4) | `GraduationCap` |
| `Certifications` | `#certificacoes` | — | `issuers` (2) | `Award`, `ExternalLink` |
| `Projects` | `#projetos` | — | `projects` (2) + `comingSoonProjects` (2) | `Settings`, `ExternalLink`, SVG GitHub inline |
| `Contact` | `#contato` | — | `links` (4) | `Mail`, `MapPin`, SVG GitHub e LinkedIn inline |

## Composição

Nenhum componente importa outro, **exceto** `Navbar → ThemeToggle`. Todas as seções são irmãs diretas em `App.tsx`.

Não existe biblioteca de componentes compartilhados. Não existe componente de card, de seção ou de título, ainda que os três padrões se repitam em quase todos os arquivos.

## Duplicações conhecidas

- `GithubIcon` está definido **duas vezes**, idêntico, em `Projects.tsx` e `Contact.tsx`. Ver task AI-009.
- O bloco de cabeçalho de seção (`h2` + régua `w-12 h-0.5 bg-accent`) repete em 7 componentes.
- O bloco de animação de entrada repete em quase todos.

Ao adicionar seção, siga esses padrões em vez de inventar um novo — extraí-los é uma task própria, não um efeito colateral.
