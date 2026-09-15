# Mapa de arquitetura

> Mapa de navegação. Detalhe em `docs/ARCHITECTURE.md`.

```text
index.html                 shell + SEO + script de tema pré-paint
└── src/main.tsx           createRoot, StrictMode, fonte Geist, globals.css
    └── src/App.tsx        MotionConfig reducedMotion="user"
        ├── Navbar         fixed, scroll spy, menu mobile, ThemeToggle
        └── main
            ├── Hero
            ├── About
            ├── Skills
            ├── Experience
            ├── Education
            ├── Certifications
            ├── Projects
            └── Contact     (contém o rodapé/copyright)
```

## Arquivos por papel

| Papel | Arquivo |
| --- | --- |
| Shell, metadados, tema pré-paint | `index.html` |
| Bootstrap React | `src/main.tsx` |
| Composição das seções | `src/App.tsx` |
| Tokens, temas, reset, scrollbar | `src/globals.css` |
| Estado do tema | `src/hooks/useTheme.ts` |
| Seções | `src/components/*.tsx` |
| Alias `@/` → `src/` | `tsconfig.json` + `vite.config.ts` (os dois) |
| Deploy | `vercel.json` |

## Onde não olhar

Sem `src/pages/`, `src/services/`, `src/lib/`, `src/store/`, `src/utils/`, `src/types/`, `src/data/`. Sem testes. Sem `.env`. Sem CI.

Conteúdo é literal dentro de cada componente.
