# Estado do projeto

> Hot memory. Descreve o projeto **como ele é agora**. Não é histórico — histórico vai para `.ai/history/`.

**Última verificação:** 2026-11-25
**Verificado contra o commit:** `e5207c9` + a migração visual no working tree (não commitada)

## Foco atual

**Refatoração visual do frontend — quase concluída.** A direção híbrida da **ADR-004** está aplicada às sete seções de conteúdo, via primitivos em `src/components/ui/` (AI-016). Formação e Certificações deixaram de ser cards (AI-017), o motion é uma entrada por seção (AI-019) e o ritmo vertical varia por peso de seção (AI-018).

O que resta depende do autor: o Hero (AI-006, que arrasta o fim de AI-016 e AI-018) e o novo `accent` do tema claro (AI-015).

**Regra estrutural, vinda da ADR-004:** card não é padrão de layout — só em Projetos. Seção nova entra por `<Section>`.

**Armadilha ativa:** `Navbar` e `Hero` ainda usam a escala padrão do Tailwind. Removê-la do `@theme` antes de migrá-los quebra a página **sem erro de build**.

## Saúde

Resultados em `.ai/health.json` — fonte única, não replicada aqui. Rode `npm run ai:health` para atualizar.

Resumo em 2026-11-25: lint, typecheck e build passando. **Não há testes** (task AI-007).

Validação visual nesta sessão: sem overflow horizontal em 1440/1024/768/390 px, nos dois temas. Esse estado não deve regredir.

## Arquitetura em uma frase

Single-page estática em React 19 + Vite 8 + TypeScript + Tailwind 4, oito seções de conteúdo literal, sem backend, sem rotas, sem variáveis de ambiente. Detalhe em `docs/ARCHITECTURE.md`; mapa em `.ai/maps/architecture.md`.

## Áreas ativas

| Área | Situação |
| --- | --- |
| `src/components/ui/` | Novo. Primitivos `Section`, `Container`, `SectionHeader`, `Reveal`, `Prose`, `Tag`, `Button`, `Card`, `BrandIcon`. Mapa em `.ai/maps/components.md`. |
| `src/components/` | Sete seções migradas. `Hero` e `Navbar` ainda na escala antiga (AI-006 / AI-016). Novo `Footer.tsx`. |
| `src/globals.css` + tema | `fg-subtle` e `fg-faint` recalibrados para AA. `accent` no claro ainda reprova como texto (AI-015). |
| `src/motion.ts` | Consumido por `Reveal` e pelo Hero. |
| `index.html` | Metadados incompletos (AI-004). |
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

1. `accent` como texto no tema claro: 3,30:1 (cargo do Hero, `Tag tone="accent"`). Aguarda decisão do novo valor (AI-015).
2. Hero com glow e pill decorativos, contra a ADR-004 (AI-006).
3. Dois cards "Em Breve" sem projeto (AI-008).
4. `twitter:card` declarado como `summary_large_image` sem `og:image` (AI-004).

## Marcos recentes

- **2026-11-25** — Direção da ADR-004 aplicada às seções de conteúdo (AI-016 parcial, AI-017, AI-018 parcial, AI-019); fatos de cargo reconciliados (AI-021); cinzas em AA (AI-015 parcial).

- **2026-09-15** — Foundation do design system definida e verificada (AI-014).
- **2026-09-15** — Direção da identidade visual escolhida: híbrida (ADR-004).
- **2026-09-15** — Auditoria visual completa do frontend (AI-012); AI-002 corrigida.
- **2026-09-15** — AI Repository OS implantado (ADR-002).
- **2026-09-14** (`0f1c633`) — Tema claro/escuro com tokens semânticos de cor (ADR-001).
- **2026-09-14** (`c2890de`) — Migração para React + Vite + Tailwind 4.
