# ADR-001 — Tokens semânticos de cor e tema claro/escuro por classe

Status: Aceita
Data: 2026-09-14 (registrada retroativamente em 2026-09-15)

## Contexto

O site precisava de tema claro e escuro. Usar utilitários de cor do Tailwind direto nos componentes (`bg-slate-900`, `text-white`) exigiria duplicar cada cor com a variante `dark:`, espalhando a decisão de cor por todos os componentes e tornando qualquer ajuste de paleta uma edição em massa.

Decisão tomada no commit `0f1c633`.

## Decisão

Cores são nomeadas por **função**, não por aparência: `canvas`, `surface`, `surface-raised`, `edge`, `fg`, `accent`, `on-accent`, `info`, `scrim`.

- Os valores vivem em `:root` (tema claro, padrão) e `.dark` (tema escuro) em `src/globals.css`.
- `@theme inline` apenas aponta os utilitários do Tailwind para essas variáveis.
- A variante escura é uma **classe** no `<html>`, declarada via `@custom-variant dark (&:where(.dark, .dark *))`, não `prefers-color-scheme`.
- Um script inline em `index.html` lê `localStorage.tema` e aplica a classe `dark` antes da primeira pintura, evitando flash.
- `src/hooks/useTheme.ts` é o dono do estado e usa a mesma chave (`"tema"`) e o mesmo valor (`"escuro"`) do script inline.

Componentes nunca usam cor literal.

## Alternativas

- **`dark:` do Tailwind com cores literais** — rejeitada: duplica cada cor em cada componente e espalha a paleta.
- **`prefers-color-scheme` puro, sem classe** — rejeitada: não permite o usuário escolher e sobrepor a preferência do sistema.
- **Trocar variáveis CSS via `data-theme`** — equivalente na prática; a classe foi escolhida por integrar direto com `@custom-variant` do Tailwind 4.

## Consequências

- Trocar a paleta é editar dois blocos em um arquivo.
- **Adicionar um papel de cor exige três edições coordenadas:** a variável em `:root`, a variável em `.dark`, e o mapeamento em `@theme inline`. Esquecer o `@theme inline` produz uma classe Tailwind que não existe e falha em silêncio — foi exatamente o que aconteceu com `bg-background` (task AI-002).
- O contrato entre `index.html` e `useTheme.ts` (chave `"tema"`, valor `"escuro"`) é implícito e não testado. Alterar um lado sem o outro reintroduz o flash de tema.
- Como a classe vence o sistema, a preferência de tema do SO é ignorada na primeira visita. Consequência conhecida e aceita; ver task AI-005.
- `--selection` ficou fora do `@theme inline` de propósito (é usado direto no `::selection`), então não existe utilitário para ele.
