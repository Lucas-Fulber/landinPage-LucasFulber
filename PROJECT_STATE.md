# Estado do projeto

> Hot memory. Descreve o projeto **como ele é agora**. Não é histórico — histórico vai para `.ai/history/`.

**Última verificação:** 2026-09-15
**Verificado contra o commit:** `0f1c633`

## Foco atual

AI Repository OS recém-implantado. Próximo trabalho: fila de correções pontuais descobertas na auditoria, começando por **AI-002**. Nenhuma mudança de produto em andamento.

## Saúde

Resultados em `.ai/health.json` — fonte única, não replicada aqui. Rode `npm run ai:health` para atualizar.

Resumo em 2026-09-15: lint, typecheck e build passando. **Não há testes** (task AI-007).

## Arquitetura em uma frase

Single-page estática em React 19 + Vite 8 + TypeScript + Tailwind 4, oito seções de conteúdo literal, sem backend, sem rotas, sem variáveis de ambiente. Detalhe em `docs/ARCHITECTURE.md`; mapa em `.ai/maps/architecture.md`.

## Áreas ativas

| Área | Situação |
| --- | --- |
| `src/components/` | Estável. Três tasks de correção pontual abertas (AI-002, AI-003, AI-010). |
| `src/globals.css` + tema | Estável. Tokens semânticos consolidados no commit `0f1c633`. |
| `index.html` | Metadados incompletos (AI-004). |
| `.ai/`, `.claude/`, `docs/`, `scripts/ai/` | Novo. Precisa de uso real para provar que a memória se mantém. |
| Testes | Inexistentes. Decisão pendente (AI-007). |
| CI | Inexistente. Aguarda autorização (AI-011). |

## Restrições

- **Push em `main` publica em produção** (Vercel, deploy automático). Não há staging. Commit e push exigem autorização explícita a cada vez.
- Não há testes: lint, typecheck e build **não** detectam erro visual nem classe Tailwind inválida. Mudança de UI exige verificação visual.
- Conteúdo é literal nos componentes; não há CMS nem arquivo de conteúdo. Fatos repetidos entre arquivos precisam concordar — tabela em `docs/CONTENT_GUIDE.md`.
- Alias `@/` declarado em dois lugares (`tsconfig.json` e `vite.config.ts`), que precisam ficar em sincronia.
- Contrato implícito e não testado entre o script de tema em `index.html` e `src/hooks/useTheme.ts` (chave `"tema"`, valor `"escuro"`).
- `useTheme` não usa Context: só pode ter um consumidor. Ver `docs/ARCHITECTURE.md`.
- Restrições visuais valem e o código as viola em dois pontos conhecidos — ver "Dívida conhecida" em `docs/DESIGN_SYSTEM.md`.

## Problemas conhecidos que afetam o trabalho

1. `bg-background` em `Experience.tsx:76` é classe morta — bug visual ativo em produção (AI-002).
2. Cards sem contraste de superfície em `Education` e `Projects` (AI-003).
3. `twitter:card` declarado como `summary_large_image` sem `og:image` — card de compartilhamento vazio (AI-004).

## Marcos recentes

- **2026-09-15** — AI Repository OS implantado (ADR-002).
- **2026-09-14** (`0f1c633`) — Tema claro/escuro com tokens semânticos de cor (ADR-001).
- **2026-09-14** (`c2890de`) — Migração para React + Vite + Tailwind 4.
