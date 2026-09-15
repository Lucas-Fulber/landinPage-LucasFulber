# Mapa de dependências

> Fonte de verdade: `package.json`. Este mapa explica **por que** cada uma existe.

## Runtime

| Pacote | Por que existe | Onde é usado |
| --- | --- | --- |
| `react` / `react-dom` 19.2.4 | Base da UI. Versão **fixada** (sem `^`). | `src/main.tsx`, todos os componentes |
| `framer-motion` ^12 | Animações de entrada e `MotionConfig reducedMotion`. | Todos os componentes exceto `main`/`App` |
| `lucide-react` ^1 | Ícones. | `Navbar`, `ThemeToggle`, `Hero`, `Experience`, `Education`, `Certifications`, `Projects`, `Contact` |
| `@fontsource-variable/geist` ^5 | Fonte auto-hospedada, sem requisição a CDN. | `src/main.tsx` |

Ícones de GitHub e LinkedIn não vêm do `lucide-react`: são SVG inline (a biblioteca não traz marcas). Ver duplicação em `.ai/maps/components.md`.

## Build e tooling

| Pacote | Papel |
| --- | --- |
| `vite` ^8 + `@vitejs/plugin-react` ^6 | Dev server e bundle |
| `tailwindcss` ^4 + `@tailwindcss/vite` ^4 | CSS. **Sem arquivo de config** — tokens em `src/globals.css` |
| `typescript` ^5 | `tsc --noEmit`, modo `strict` |
| `eslint` ^9 + `typescript-eslint` ^8 + `@eslint/js` | Lint, flat config |
| `eslint-plugin-react-hooks` ^7, `eslint-plugin-react-refresh` ^0.5 | Regras de React |
| `globals` ^17 | Globais de browser (ts/tsx) e Node (scripts) |
| `@types/node` ^20, `@types/react` ^19, `@types/react-dom` ^19 | Tipos |

## Ausências deliberadas

Sem router (ADR-003), sem gerenciador de estado, sem cliente HTTP, sem test runner (task AI-007), sem formatter dedicado (não há Prettier), sem biblioteca de SEO (ver `docs/SEO.md`), sem biblioteca de componentes de UI.

**Não adicione dependência sem necessidade concreta.** Peso do bundle atual: ~344 kB, ~108 kB gzip — `framer-motion` é a parcela dominante.

## Ambiente

Node v24, npm 11 na máquina de desenvolvimento. Nenhuma versão de Node fixada no `package.json` (sem `engines`) nem no repositório (sem `.nvmrc`).
