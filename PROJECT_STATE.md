# Estado do projeto

> Hot memory. Descreve o projeto **como ele é agora**. Não é histórico — histórico vai para `.ai/history/`.

**Última verificação:** 2026-09-15
**Verificado contra o commit:** `7b3b9a3` + a correção de AI-002 no working tree

## Foco atual

**Refatoração visual do frontend**, com a direção já decidida. A auditoria está concluída (AI-012, relatório em `.ai/context/AI-012-auditoria-visual.md`) e a identidade escolhida é a **híbrida — editorial na narrativa, densidade nos dados** (AI-013 → **ADR-004**).

A foundation já está definida (AI-014): escalas nomeadas de tipografia, espaçamento, largura, raio e motion em `src/globals.css` e `src/motion.ts`, documentadas em `docs/DESIGN_SYSTEM.md`. Nenhum componente as usa ainda.

Próximo passo de execução: **AI-016** (`READY`) — extrair primitivos consumindo a nova escala. Em paralelo e independentes: AI-017, AI-018, AI-019, **AI-003** e a parte de cinzas de **AI-015**.

**Regra estrutural nova, vinda da ADR-004:** card não é mais o padrão de layout — é exceção, válida só em Projetos.

**Armadilha ativa:** as duas escalas coexistem. A padrão do Tailwind (`text-sm`, `rounded-xl`) é o que os componentes usam; removê-la do `@theme` antes de migrar quebra a página **sem erro de build**. É o último passo de AI-016.

## Saúde

Resultados em `.ai/health.json` — fonte única, não replicada aqui. Rode `npm run ai:health` para atualizar.

Resumo em 2026-09-15: lint, typecheck e build passando. **Não há testes** (task AI-007).

Validação verificada no navegador nesta sessão: sem overflow horizontal em 1440/1024/768/390 px, nos dois temas. Esse estado não deve regredir.

## Arquitetura em uma frase

Single-page estática em React 19 + Vite 8 + TypeScript + Tailwind 4, oito seções de conteúdo literal, sem backend, sem rotas, sem variáveis de ambiente. Detalhe em `docs/ARCHITECTURE.md`; mapa em `.ai/maps/architecture.md`.

## Áreas ativas

| Área | Situação |
| --- | --- |
| `src/components/` | Funcional e auditado. Sem primitivos de UI: cabeçalho de seção repetido 7×, card com 5 paddings, etiqueta com 6 implementações. Refatoração planejada em AI-016. |
| `src/globals.css` + tema | Sistema de tokens correto (ADR-001), agora com as escalas de tipografia, espaçamento, largura, raio e easing definidas (AI-014). Valores com problema: `fg-faint`, `fg-subtle` e `accent` no claro reprovam contraste AA (AI-015); escala de superfície curta demais (AI-003). |
| `src/motion.ts` | Novo. Tokens de duração e easing para o framer-motion. Sem consumidor até AI-019. |
| `index.html` | Metadados incompletos (AI-004). |
| `.ai/`, `.claude/`, `docs/`, `scripts/ai/` | Em uso real desde a segunda sessão. O ciclo start/finish se sustentou. |
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

1. Contraste de texto reprovado em WCAG AA: `fg-faint` (2.56 claro / 2.62 escuro), `fg-subtle` (4.48 / 3.90) e `accent` como texto no claro (3.30). Medido no navegador (AI-015).
2. Cards sem contraste de superfície em `Education` e `Projects` — diagnosticada, com correção recomendada (AI-003).
3. A página tem oito seções com a mesma composição e mais de 30 cards; é a causa raiz da aparência genérica. Direção de correção decidida em ADR-004; execução em AI-014 a AI-019.
4. `twitter:card` declarado como `summary_large_image` sem `og:image` — card de compartilhamento vazio (AI-004).

O bug `bg-background` de `Experience.tsx:76` está **resolvido** (AI-002).

## Marcos recentes

- **2026-09-15** — Foundation do design system definida e verificada (AI-014).
- **2026-09-15** — Direção da identidade visual escolhida: híbrida (ADR-004).
- **2026-09-15** — Auditoria visual completa do frontend (AI-012); AI-002 corrigida.
- **2026-09-15** — AI Repository OS implantado (ADR-002).
- **2026-09-14** (`0f1c633`) — Tema claro/escuro com tokens semânticos de cor (ADR-001).
- **2026-09-14** (`c2890de`) — Migração para React + Vite + Tailwind 4.
