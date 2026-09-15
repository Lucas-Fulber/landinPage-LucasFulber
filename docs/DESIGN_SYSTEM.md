# Design System

> Warm memory. Carregue quando a task envolver visual, layout, cor, tipografia ou motion.
> Verificado contra o commit `7b3b9a3` + a correção de AI-002, em 2026-09-15.
>
> Este arquivo descreve o sistema **como ele é**. O inventário medido do que está em uso, com os problemas encontrados, está em `.ai/context/AI-012-auditoria-visual.md` — não replicado aqui.
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

Os tokens de cor vivem em `@theme inline` (apontam para `var()`); as escalas de tipografia, espaçamento, largura, raio e easing vivem num segundo bloco `@theme` com valores literais. Os dois blocos são independentes.

**Atenção:** `--selection` existe em `:root`/`.dark` mas **não** está exposto no `@theme inline`; é consumido direto via `var(--selection)` no `::selection`. Não existe utilitário `bg-selection`.

**Não existe token `background`.** `bg-background` é classe morta — Tailwind não a gera. Já causou um bug visual em produção, corrigido em AI-002; o fundo base é `bg-canvas`.

**Atenção ao contraste:** `fg-faint`, `fg-subtle` e `accent` usado como texto no tema claro reprovam em WCAG AA nos tamanhos em que são aplicados hoje. Valores medidos e afetados em `.ai/context/AI-012-auditoria-visual.md`; correção em AI-015.

### Tipografia

Fonte única: **Geist Variable**, via `@fontsource-variable/geist`, exposta como `--font-sans`/`--font-geist-sans`. Fallback: `system-ui, -apple-system, sans-serif`.

**Escala decidida (AI-014, ADR-004)** — seis papéis, definidos em `@theme` em `globals.css`. Use estes nomes em código novo:

| Papel | Utilitário | Tamanho | Uso |
| --- | --- | --- | --- |
| Display | `text-display` | 44px / 1.05 / −0.02em | Nome no hero. Um por página. |
| Seção | `text-section` | 28px / 1.2 / −0.01em | Título de seção. |
| Lead | `text-lead` | 20px / 1.5 | Cargo, frase de abertura. |
| Corpo | `text-body` | 16px / 1.65 | Prosa. |
| Corpo menor | `text-body-sm` | 14px / 1.6 | Texto de item, descrição de card. |
| Metadado | `text-meta` | 12px / 1.4 | Período, rótulo, eyebrow. |

Monospace: `font-mono`, com stack do sistema — para stack técnica, datas e identificadores. Geist Mono foi descartada por ser dependência nova; se a coesão tipográfica exigir, vira task própria.

**A escala padrão do Tailwind (`text-sm`, `text-3xl`, …) continua disponível e ainda é o que os componentes usam.** As duas coexistem de propósito até a migração (AI-016); remover a padrão antes disso quebraria a página em silêncio.

### Espaçamento e grid

**Escala decidida (AI-014):** quatro passos — `tight` 8px · `snug` 16px · `normal` 24px · `loose` 40px — usáveis como `gap-*`, `p-*`, `m-*`.

Ritmo vertical por peso de seção, em vez de um valor único: `py-section-narrative` (80px) para seções de leitura, `py-section-data` (56px) para seções de dados. Gutter: `px-gutter` (24px).

Duas faixas de largura: `max-w-reading` (672px) para bloco de leitura, `max-w-grid` (1088px) para grade densa.

**Estado atual dos componentes:** container `max-w-5xl mx-auto` (hero usa `max-w-3xl`), ritmo `py-24` uniforme, gutter `px-4`, gaps em nove valores. A migração para a escala acima é AI-018.

Seções alternam `bg-canvas` (implícito, via `body`) e `bg-surface` para separar blocos sem régua.

### Raio e borda

**Escala decidida (AI-014):** um raio só — `rounded-edge` (4px) — mais `rounded-full` onde é círculo de verdade (o marcador da timeline). Ver ADR-004.

**Estado atual:** `rounded-lg` (ícones), `rounded-xl` (cards), `rounded-md` (chips), `rounded-full` (pills e CTAs).

Sem sombra em nenhum lugar — a separação vem de borda e superfície. **Mantenha assim:** não introduza `shadow-*`.

### Motion

`framer-motion`, governado por `<MotionConfig reducedMotion="user">` em `App.tsx` — o respeito a `prefers-reduced-motion` é global e não precisa ser repetido por componente. `globals.css` reforça com um bloco `@media (prefers-reduced-motion: reduce)`.

**Tokens decididos (AI-014):** `src/motion.ts` — três durações (`feedback` 0,15s · `enter` 0,3s · `section` 0,5s), um easing (`easeOutSoft`, espelhando `--ease-out-soft` no CSS) e `enterOffset` de 12px. Mudar o easing exige mudar os dois lugares.

**Estado atual:** sete durações declaradas à mão e cerca de 57 elementos animando individualmente. A migração é AI-019.

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

> **A direção da identidade está decidida em [ADR-004](decisions/ADR-004-identidade-visual-hibrida.md):** híbrida — editorial na narrativa, densidade de produto nos dados. A consequência que mais muda o dia a dia: **card deixa de ser o padrão e passa a ser exceção**, válido só em Projetos. Este documento descreve o sistema atual; a ADR descreve o destino. Enquanto AI-014 não rodar, os dois descrevem estados diferentes.

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

O código atual **viola parcialmente** as próprias restrições acima. A auditoria AI-012 mediu a extensão disso; o inventário completo está em `.ai/context/AI-012-auditoria-visual.md`. Em resumo:

- `Hero.tsx` tem um glow decorativo (`bg-accent/10 rounded-full blur-3xl`) e um pill de localização — exatamente os padrões "blob decorativo" e "pill". Ver task AI-006.
- Cards com `bg-surface` dentro de seções com `bg-surface` (`Education`, `Projects`) ficam sem contraste de superfície. Ver task AI-003.
- **"Excesso de cards" deixou de ser risco e passou a ser o estado:** mais de 30 superfícies com borda arredondada, sendo que Formação e Certificações são listas de texto curto dentro de caixas. Ver AI-017.
- **As oito seções têm a mesma composição** (título + divisor de 48 px + grade de cards), o que contradiz "composição editorial" como fonte de identidade. Ver AI-013.
- **Motion decorativo:** cerca de 57 elementos animam individualmente na entrada, incluindo stagger por pill. Contradiz "animação intencional". Ver AI-019.

A direção que resolve essas quatro está decidida em **ADR-004**; a execução é AI-014, AI-016, AI-017, AI-018 e AI-019.

Ao mexer nessas áreas, trate isto como direção acordada, não como preferência nova.
