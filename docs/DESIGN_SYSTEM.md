# Design System

> Warm memory. Carregue quando a task envolver visual, layout, cor, tipografia ou motion.
> Verificado contra o commit `0f1c633` em 2026-09-15.
>
> Esta é a **fonte de verdade única** das restrições visuais do projeto. Não replique estas regras em `CLAUDE.md` nem em `.claude/rules/`.

## Sistema atual

### Cor

Cores são nomeadas **por função, não por aparência**. Os valores vivem em `:root` (claro) e `.dark` (escuro) em `src/globals.css`; o `@theme inline` só aponta os utilitários do Tailwind para essas variáveis. Ver [ADR-001](decisions/ADR-001-tokens-semanticos-de-cor.md).

| Token | Utilitário | Função |
| --- | --- | --- |
| `--canvas` | `bg-canvas` | Fundo base da página |
| `--surface` | `bg-surface` | Superfície elevada nível 1 (seções alternadas, cards) |
| `--surface-raised` | `bg-surface-raised` | Superfície elevada nível 2 (pills, badges) |
| `--edge` / `--edge-strong` | `border-edge` / `border-edge-strong` | Bordas sutil e definida |
| `--fg` → `--fg-faint` | `text-fg` … `text-fg-faint` | Escala de texto, do mais forte ao mais apagado |
| `--accent` / `--accent-strong` | `text-accent`, `bg-accent` | Verde de identidade |
| `--on-accent` | `text-on-accent` | Texto sobre fundo accent |
| `--info` | `text-info` | Azul, usado só em status de formação |
| `--scrim` | `bg-scrim` | Fundo translúcido da navbar com blur |

**Regra:** nunca use cor literal (`#hex`, `bg-slate-800`, `text-white`) em componente. Se falta um papel, adicione um token em `globals.css` — nos dois temas.

**Atenção:** `--selection` existe em `:root`/`.dark` mas **não** está exposto no `@theme inline`; é consumido direto via `var(--selection)` no `::selection`. Não existe utilitário `bg-selection`.

**Não existe token `background`.** `bg-background` é classe morta — Tailwind não a gera. Ver task AI-002.

### Tipografia

Fonte única: **Geist Variable**, via `@fontsource-variable/geist`, exposta como `--font-sans`/`--font-geist-sans`. Fallback: `system-ui, -apple-system, sans-serif`.

Escala em uso:

| Papel | Classes |
| --- | --- |
| Nome (hero) | `text-4xl sm:text-6xl font-bold tracking-tight` |
| Título de seção | `text-3xl font-bold` |
| Cargo/destaque | `text-xl sm:text-2xl font-medium text-accent` |
| Corpo | `text-base` / `text-sm leading-relaxed` |
| Rótulo/eyebrow | `text-xs font-semibold uppercase tracking-widest` |
| Metadado | `text-xs text-fg-subtle` |

### Espaçamento e grid

- Container: `max-w-5xl mx-auto` (hero usa `max-w-3xl`).
- Ritmo vertical de seção: `py-24`.
- Gutter horizontal: `px-4`.
- Grids: `sm:grid-cols-2` ou `md:grid-cols-2`, gaps de `4`/`6`/`8`/`12`.

Seções alternam `bg-canvas` (implícito, via `body`) e `bg-surface` para separar blocos sem régua.

### Raio e borda

`rounded-lg` (ícones), `rounded-xl` (cards), `rounded-full` (pills e CTAs). Sem sombra em nenhum lugar — a separação vem de borda e superfície. **Mantenha assim:** não introduza `shadow-*`.

### Motion

`framer-motion`, governado por `<MotionConfig reducedMotion="user">` em `App.tsx` — o respeito a `prefers-reduced-motion` é global e não precisa ser repetido por componente. `globals.css` reforça com um bloco `@media (prefers-reduced-motion: reduce)`.

Padrão de entrada de seção, repetido em quase todos os componentes:

```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

Regras: `viewport={{ once: true }}` sempre (nada reanima no scroll de volta); durações entre `0.3s` e `0.6s`; stagger via `delay: idx * 0.1`.

Há duas animações em loop: o `ArrowDown` do hero e o ícone `Settings` dos cards "Em Breve". São as únicas — não adicione mais.

### Responsivo

Mobile-first. Breakpoints usados: `sm:` e `md:`. O menu mobile aparece abaixo de `md:`; o `ThemeToggle` fica sempre visível, fora do menu.

## Restrições — o que evitar

Este é um portfólio pessoal, não uma landing page de SaaS. A identidade vem de composição editorial, tipografia, hierarquia, conteúdo e whitespace.

**Evite:**

- Estética genérica de landing page SaaS.
- Excesso de cards — cards já são o padrão dominante do layout atual; novas seções não deveriam ser mais cards por reflexo.
- Glassmorphism gratuito. O único `backdrop-blur` justificado é o da navbar sobre `bg-scrim`.
- Excesso de gradientes.
- Blobs e glows decorativos.
- Hero gigante sem conteúdo.
- Excesso de pills/badges.
- Copy de marketing genérica — ver `CONTENT_GUIDE.md`.
- Animação gratuita ou decorativa.
- Componentes visualmente repetitivos que não carregam informação nova.
- Sombras (`shadow-*`) — o sistema separa por borda e superfície.
- Cor literal fora de `globals.css`.

**Prefira:** composição editorial, tipografia como estrutura, hierarquia explícita, whitespace, conteúdo específico e verificável, motion intencional.

### Dívida conhecida contra estas regras

O código atual **viola parcialmente** as próprias restrições acima. Registrado, não corrigido nesta sessão:

- `Hero.tsx` tem um glow decorativo (`bg-accent/10 rounded-full blur-3xl`) e um pill de localização — exatamente os padrões "blob decorativo" e "pill". Ver task AI-006.
- Cards com `bg-surface` dentro de seções com `bg-surface` (`Education`, `Projects`) ficam sem contraste de superfície. Ver task AI-003.

Ao mexer nessas áreas, trate isto como direção acordada, não como preferência nova.
