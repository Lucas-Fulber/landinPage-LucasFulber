# ADR-003 — Single page com navegação por âncora, sem router

Status: Aceita
Data: registrada retroativamente em 2026-09-15 (decisão implícita desde `c2890de`)

## Contexto

O site é um portfólio pessoal: um currículo navegável com sete seções de conteúdo estático. Não há autenticação, área logada, conteúdo dinâmico nem necessidade de deep-link para subpáginas.

Esta decisão nunca foi registrada — está apenas implícita na ausência de dependência de roteamento. Registrada aqui porque é exatamente o tipo de decisão que um agente futuro desfaz "por boa prática", sem perceber que é deliberada.

## Decisão

Uma única página. Navegação por âncora (`#sobre`, `#skills`, …) com `scrollIntoView({ behavior: "smooth" })`, reforçada por `scroll-behavior: smooth` no `html`.

Sem `react-router`, sem history API, sem code splitting por rota. `vercel.json` reescreve tudo para `/index.html`.

## Alternativas

- **`react-router`** — rejeitada: adiciona dependência, build e um modelo mental de rotas para sete âncoras de conteúdo estático.
- **Next.js** — rejeitada: SSR/SSG não agrega a um currículo estático que já é indexável; custo de migração sem retorno.
- **Links `<a href="#secao">` puros** — parcialmente em uso via CSS; o handler em JS existe para também fechar o menu mobile no mesmo clique.

## Consequências

- Não existe estado de navegação e nada é lazy-loaded: o bundle é único (~344 kB, ~108 kB gzip).
- Os `id` das seções são a superfície de navegação pública. Renomear um `id` quebra o link correspondente em `Navbar.tsx` e qualquer link externo. Ver `.ai/maps/routes.md`.
- Metadados de SEO são estáticos em `index.html` — não há como variar `title`/`description` por seção. Ver `docs/SEO.md`.
- **Adicionar um router é uma mudança de arquitetura, não uma melhoria incremental.** Requer novo ADR substituindo este.
- O rewrite em `vercel.json` só existe para tolerar URLs com caminho; não indica intenção de ter rotas.
