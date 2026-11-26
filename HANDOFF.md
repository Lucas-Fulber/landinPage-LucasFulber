# Handoff

> Hot memory. Reescrito por inteiro ao fim de todo trabalho significativo. Só o ponto de continuação — não é diário.

**Atualizado:** 2026-11-25

## Task ativa

**AI-016** — Extrair primitivos e composições (`PARTIAL`). Falta só migrar `Navbar` e `Hero` para a escala nova e, depois, avaliar remover a escala padrão do Tailwind.

## Concluído nesta sessão

- **AI-021:** fatos confirmados pelo autor (freelancer na Celeiro Análise de Risco, desde maio de 2026) e alinhados em `index.html`, `Hero`, `About`, `Experience` e `CONTENT_GUIDE.md`.
- **AI-003, AI-009, AI-010, AI-017, AI-019:** `DONE`. Detalhe de cada uma em `TASKS.md`.
- **AI-016, AI-018, AI-015:** `PARTIAL`, com o que falta registrado em cada task.

Resultado visível: a direção da ADR-004 aplicada às sete seções de conteúdo — régua + índice mono no cabeçalho, card só em Projetos, Formação e Certificações como listas, uma entrada animada por seção, ritmo por peso de seção, faixas `reading`/`grid`, `<footer>` próprio.

## Pendente — precisa do autor

| Task | Decisão |
| --- | --- |
| AI-015 | Novo `accent` no tema claro. Candidato medido: `#15803d` (5,02 sobre branco). |
| AI-006 | Glow e pill do Hero; com ela, o `min-h-screen` (resto de AI-018) e a migração do Hero (resto de AI-016). |
| AI-008 | O que fazer com os dois "Em Breve" de Projetos. |
| AI-021 | Confirmar a grafia "Celeiro Análise de Risco" (o autor escreveu sem acento). |
| AI-004, AI-007, AI-011 | Domínio, testes, autorizar CI. |

Sem decisão: AI-020 (`accent-strong`/`info`) e AI-005.

## Arquivos relevantes

- `src/components/ui/` — primitivos. `Section` é a porta de entrada de toda seção nova.
- `.ai/maps/components.md` — mapa atualizado de seções e primitivos.
- `docs/DESIGN_SYSTEM.md` — estado atual após a migração.

## Validação

`npm run ai:health` em 2026-11-25: lint, typecheck e build `pass`; testes `not_available`.

Visual: capturas headless (Chrome do sistema + `puppeteer-core` fora do repositório) em 1440/1024/768/390, nos dois temas, rolando a página inteira. Sem overflow horizontal em nenhuma. Os utilitários novos (incluindo valores arbitrários) foram conferidos no CSS compilado.

**Nada está commitado.** Push em `main` publica em produção.

## Próximo passo exato

Se o autor decidir AI-006: refazer o Hero com `text-display`/`text-lead`, sem glow nem pill, reavaliando `min-h-screen`; migrar `Navbar` (`text-sm` → `text-body-sm`, sem pill, ADR-004 pede indicação da seção corrente); então `grep` por `text-(xs|sm|base|lg|xl|[2-6]xl)\b` e `rounded-(md|lg|xl)` em `src/` — se vazio, remover a escala padrão e conferir de novo no CSS compilado.

## Notas de ferramental

1. Para impor o tema na captura, grave `localStorage.tema` antes do primeiro script (`evaluateOnNewDocument`); depois do load o `useTheme` regrava a chave.
2. Role a página inteira antes de capturar: `Reveal` usa `whileInView` com `once`.
3. Sem loops de animação agora: capturas são comparáveis entre rodadas.
4. Classe Tailwind inexistente não gera erro. Para conferir no CSS compilado, use `grep -F` — os nomes vêm escapados (`sm\:pl-loose`, `size-\[11px\]`).
