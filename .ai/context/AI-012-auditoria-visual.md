# Context pack — AI-012 · Auditoria visual e arquitetural do frontend

> Warm memory. Este é o **relatório da auditoria** que precede a refatoração visual.
> Carregue quando trabalhar em AI-003, AI-006, AI-008 ou em qualquer task AI-013+ da refatoração.
> Verificado contra o commit `7b3b9a3` + a correção de AI-002, em 2026-09-15.
> Medições feitas no navegador (Chrome headless via CDP) em 1440, 1024, 768 e 390 px, nos dois temas.

## Objetivo

Descrever o frontend como ele é hoje — estrutura, inventário visual, duplicações, contraste, responsividade — para que a refatoração de identidade seja decidida com base em medição, não em impressão. Nenhuma mudança visual foi feita nesta auditoria.

## A. Estado atual

Single-page, oito `<section>` irmãs em `src/App.tsx:16-25`, sem rotas. Altura total do documento: **5651 px** em 1440, **7660 px** em 390.

Sete das oito seções compartilham o mesmo esqueleto, na mesma ordem:

```
<section id className="py-24 px-4 [bg-surface]">
  <div className="max-w-5xl mx-auto">
    <motion.div initial={{opacity:0,y:30}} whileInView viewport={{once:true}} transition={{duration:0.6}}>
      <h2 className="text-3xl font-bold text-fg mb-2">Título</h2>
      <div className="w-12 h-0.5 bg-accent mb-10" />
    </motion.div>
    <div className="grid sm:grid-cols-2 gap-N"> … cards … </div>
  </div>
</section>
```

O Hero é a única exceção estrutural. As seções alternam fundo `canvas` / `surface` sem régua divisória: canvas em Hero, Sobre, Experiência, Certificações, Contato; `bg-surface` em Skills, Formação, Projetos.

| Seção | Arquivo | Fundo | Layout | Altura 1440 | Altura 390 |
| --- | --- | --- | --- | --- | --- |
| Hero | `Hero.tsx` | canvas + glow | centralizado, `max-w-3xl`, `min-h-screen` | 900 | 844 |
| Sobre | `About.tsx` | canvas | `grid md:grid-cols-2 gap-12 items-center` — prosa + 4 cards 2×2 | 656 | 998 |
| Skills | `Skills.tsx` | surface | `grid sm:grid-cols-2 gap-8` — 4 grupos de pills | 510 | 736 |
| Experiência | `Experience.tsx` | canvas | timeline vertical + 3 cards | 954 | 1146 |
| Formação | `Education.tsx` | surface | `grid sm:grid-cols-2 gap-4` — 4 cards | 522 | 782 |
| Certificações | `Certifications.tsx` | canvas | `grid sm:grid-cols-2 gap-8` — 2 colunas de lista | 714 | 1042 |
| Projetos | `Projects.tsx` | surface | `grid sm:grid-cols-2 gap-6` — 2 cards + 2 placeholders | 701 | 1226 |
| Contato | `Contact.tsx` | canvas | centralizado, 4 cards + CTA + copyright | 694 | 886 |

## B. Sinais de aparência genérica, por impacto

1. **As oito seções têm a mesma composição.** Título à esquerda, divisor verde de 48 px, grade de cards. Nenhuma seção tem forma própria derivada do que ela comunica. É o sinal mais forte, e é estrutural: não se resolve trocando cor.
2. **Tudo é card.** Mais de 30 superfícies `bg-surface border-edge rounded-*` na página. Formação (`Education.tsx:66`) e Certificações (`Certifications.tsx:74`) são listas de texto curto vestidas de card — duas linhas e um badge dentro de uma caixa.
3. **Hero de template.** `min-h-screen` + centralização + pill de localização + nome gigante + cargo em accent + tagline + dois CTAs arredondados + seta pulsando em loop. A soma é reconhecível como gerada, mesmo sendo cada parte defensável.
4. **Glow decorativo** em `Hero.tsx:22` (`w-96 h-96 bg-accent/10 rounded-full blur-3xl`). Único elemento da página puramente decorativo. Já registrado como dívida em `docs/DESIGN_SYSTEM.md`.
5. **Ícone dentro de caixinha arredondada**, 12 ocorrências, sempre `bg-accent/10 border-accent/20`: `Education.tsx:69`, `Certifications.tsx:56`, `Contact.tsx:77`. Em Formação e Contato o ícone é o mesmo para todos os itens, então não carrega informação — é enfeite repetido.
6. **Excesso de etiquetas.** 26 pills em Skills, 12 chips de stack em Projetos, 6 badges de status em Formação/Experiência, 1 pill no Hero. 45 etiquetas pequenas numa página.
7. **Animação de entrada por item.** Cerca de 57 elementos animam individualmente, incluindo stagger de 0,04 s por pill (`Skills.tsx:60`). A animação não diferencia o que importa do que não importa.
8. **Dois cards "Em Breve"** (`Projects.tsx:41-50`) com engrenagem girando: metade da seção de Projetos anuncia ausência de conteúdo. Já é a task AI-008.
9. **Copy genérica** em pontos de maior peso visual: "Transformando códigos complexos em soluções inteligentes." (`Hero.tsx:55`), "Ver Projetos" / "Entrar em Contato", "Aberto a novas oportunidades, projetos freelance ou apenas uma boa conversa sobre tecnologia." (`Contact.tsx:63`).
10. **`min-h-screen` no Hero** (`Hero.tsx:18`): 900 px em 1440, **1024 px em 768** — onde cerca de 40 % da primeira tela fica vazia.
11. **`py-24` idêntico nas sete seções.** O ritmo vertical é uniforme: nada pesa mais que nada.
12. **Conteúdo centralizado em dois blocos inteiros** (Hero e Contato) enquanto o resto é alinhado à esquerda.
13. **Localização repetida três vezes:** pill do Hero, card em Sobre, card em Contato.
14. **Divisor verde de 48 px sob cada título**, sete vezes — assinatura visual de template.

Nenhum destes itens é ruim isoladamente. O que caracteriza a aparência gerada é a **soma**: repetição estrutural + densidade uniforme + decoração sem função.

## C. O que preservar

| Elemento | Por quê |
| --- | --- |
| Tokens semânticos por função (ADR-001) | Base correta e incomum num projeto deste tamanho. A refatoração troca valores, não o sistema. |
| Ausência de sombras | Verificado: `box-shadow: none` em todos os elementos medidos. Decisão coerente e bem executada. |
| Paleta restrita | Um accent, cinco níveis de texto, dois de superfície, dois de borda. `info` usado em um só lugar. |
| Geist Variable com fallback real | `globals.css:49`. |
| Timeline de Experiência | Única seção com forma própria e hierarquia real. É o melhor trecho da página e o ponto de partida da identidade. |
| Certificações agrupadas por emissor, com link por item | Conteúdo específico e verificável — o oposto de genérico. |
| Prosa de Sobre | Fatos técnicos reais (MikroTik, Zabbix, ONUs/OLTs, Django REST), sem marketing. |
| `MotionConfig reducedMotion="user"` global (`App.tsx:14`) + `@media` em `globals.css:113` | Acessibilidade de motion resolvida em um lugar. |
| `backdrop-blur` só na navbar com `scrolled` (`Navbar.tsx:38`) | Único uso justificado de blur. |
| Zero overflow horizontal em 1440/1024/768/390 | Medido. Não regredir. |

## D. Inconsistências

| # | Inconsistência | Onde |
| --- | --- | --- |
| 1 | Cabeçalho de seção reimplementado 7× (mesmo `h2` + divisor + wrapper de motion) | `About.tsx:13`, `Skills.tsx:37`, `Experience.tsx:57`, `Education.tsx:54`, `Certifications.tsx:42`, `Projects.tsx:62`, `Contact.tsx:60` (variante: divisor centralizado, `mb-6`) |
| 2 | Cinco paddings para a mesma ideia de card | `p-4` (`About.tsx:64`), `p-5` (`Experience.tsx:80`, `Education.tsx:66`), `p-6` (`Projects.tsx:75`), `px-5 py-4` (`Contact.tsx:75`), `px-3 py-2.5` (`Certifications.tsx:74`) |
| 3 | Seis implementações de etiqueta pequena, com dois radius e quatro opacidades | `Hero.tsx:28` (`rounded-full` surface-raised), `Skills.tsx:61` (idem + hover), `Experience.tsx:89` (`accent/10` + `accent/20`), `Education.tsx:38-42` (três variantes), `Projects.tsx:111` (`rounded-md` + `accent/8` + `accent/15`), `Projects.tsx:135` (`rounded-md` + surface) |
| 4 | Três caixas de ícone, dois tamanhos, mesma decoração | `Education.tsx:69` (36 px), `Certifications.tsx:56` (28 px), `Contact.tsx:77` (36 px) |
| 5 | Botão primário com dois paddings | `Hero.tsx:62` (`px-6 py-3`) vs `Contact.tsx:112` (`px-7 py-3.5`) |
| 6 | Quatro larguras de container | `max-w-5xl` (8×), `max-w-3xl` (`Hero.tsx:25`), `max-w-2xl` (`Contact.tsx:67`), `max-w-md` (`Contact.tsx:62`) |
| 7 | Dois glifos decorativos diferentes para marcar item de lista | `▸` (`Experience.tsx:98`), `◆` (`Certifications.tsx:76`) |
| 8 | `GithubIcon` duplicado, idêntico | `Projects.tsx:4`, `Contact.tsx:4` — task AI-009 |
| 9 | Opacidades de accent sem escala: `/8`, `/10`, `/15`, `/20`, `/30`, `/40`, `/50`, `/90` | vários |
| 10 | `items-center` desalinha o topo em Sobre: os cards começam ~105 px abaixo do primeiro parágrafo | `About.tsx:19` |
| 11 | Ícone `Mail` num CTA que aponta para WhatsApp | `Contact.tsx:112-114` — task AI-010 |
| 12 | Copyright dentro de `<section id="contato">`, página sem `<footer>` | `Contact.tsx:118` — task AI-010 |

## E. Inventário visual

### Cores

Todas as cores vêm de tokens; **nenhuma cor literal** em componente (verificado por varredura de `bg-|text-|border-` em `src/`). Tokens definidos em `globals.css:10-28` e expostos ao Tailwind por `@theme inline`:

`canvas` · `surface` · `surface-raised` · `edge` · `edge-strong` · `fg` · `fg-soft` · `fg-muted` · `fg-subtle` · `fg-faint` · `accent` · `accent-strong` · `on-accent` · `info` · `scrim`

Observações verificadas:

- `--selection` existe em `:root`/`.dark` mas não está no `@theme inline` — não há utilitário; é consumido direto em `::selection`.
- `--accent-strong` só é usado em `::selection` (`globals.css:93`). Nenhum componente usa `text-accent-strong`/`bg-accent-strong`.
- `--info` é usado em um único lugar: status "participação" em `Education.tsx:41`.
- `bg-background` era classe morta em `Experience.tsx:76`; corrigido para `bg-canvas` (AI-002). Não há outra ocorrência de token inexistente.
- Uso por frequência: `text-accent` 29×, `text-fg` 15×, `text-fg-muted` 13×, `bg-surface` 13×, `border-edge` 10×, `bg-accent` 9×, `text-fg-subtle` 9×.

### Tipografia

Uma família: Geist Variable. **Nove** tamanhos e **três** pesos em uso, para seis papéis reais:

| Papel | Classes | Ocorrências |
| --- | --- | --- |
| Nome (hero) | `text-4xl sm:text-6xl font-bold tracking-tight leading-tight` | 1 |
| Título de seção | `text-3xl font-bold` | 7 |
| Cargo (hero) | `text-xl sm:text-2xl font-medium` | 1 |
| Corpo | `text-base` (4), `text-sm leading-relaxed` | 15× `text-sm` |
| Rótulo/eyebrow | `text-xs font-semibold uppercase tracking-widest` | 2 |
| Metadado | `text-xs` | 13 |

Pesos: `font-bold` 9×, `font-semibold` 9×, `font-medium` 9×. `leading-relaxed` 3×, `leading-tight` 1×, `tracking-tight` 2×, `tracking-widest` 2×, `truncate` 2×, `whitespace-nowrap` 1× (`Hero.tsx:53`, força a tagline em uma linha a partir de `sm:`).

### Espaçamento

- Ritmo de seção: `py-24` em 7 seções. Hero: `pt-20 pb-16` + `min-h-screen`.
- Gutter: `px-4` em todas (10×).
- Container: `max-w-5xl` (1024 px) em 8 lugares.
- Gaps em uso: `1`, `1.5`, `2`, `2.5`, `3`, `4`, `6`, `8`, `12` — nove valores.
- Paddings de bloco: `p-4`, `p-5`, `p-6`, `px-3 py-2.5`, `px-5 py-4`, `px-6 py-3`, `px-7 py-3.5`.
- Margens recorrentes: `mb-2` 7× (título→divisor), `mb-10` 6× (divisor→conteúdo), `mb-12` 2×, `mt-16` 1×.

### Radius

Quatro valores, sem escala declarada: `rounded-full` 9× · `rounded-xl` 6× (cards) · `rounded-lg` 6× (ícones, itens de certificação, botões de navbar) · `rounded-md` 2× (chips de stack).

### Bordas

Sempre `1px`. Cores: `border-edge` (10 % claro / 8 % escuro), `border-edge-strong` (16 % / 14 %), mais `border-accent/{15,20,30,40,50}`, `border-info/20`, e um `border-dashed` (`Projects.tsx:127`).

### Sombras

Nenhuma. Confirmado por `getComputedStyle`: `box-shadow: none` em todos os elementos medidos. A separação vem de borda + superfície.

### Motion

`framer-motion`, com `reducedMotion="user"` global.

- 20 blocos `whileInView` com `viewport={{ once: true }}`.
- Easing: `easeOut` 19×, `easeInOut` 1× (loop da seta).
- Durações: `0.2`, `0.3`, `0.45`, `0.5`, `0.55`, `0.6`, `1.8` — sete valores.
- Delays: `idx * 0.1`, `idx * 0.15`, `catIdx * 0.1 + skillIdx * 0.04`, `issuerIdx * 0.15 + certIdx * 0.05`, e fixos `0.1`/`0.15`/`0.2`/`0.3`/`0.35`/`0.4`/`0.5`/`0.6`/`0.65`/`1.2`.
- Loops infinitos: 2 — seta do hero (`Hero.tsx:85`) e engrenagem "Em Breve" (`Projects.tsx:129`, `animate-spin` com `animationDuration: 4s`).
- Hover: `transition-colors` 16×, `transition-all` 5×, `whileHover={{scale:1.015}}` 1× (`Projects.tsx:74`), `hover:scale-105 active:scale-95` 2× (os dois CTAs de accent).
- Navbar: `transition-all duration-300` no estado `scrolled`.

## F. Inventário de componentes

Hoje existem 11 componentes. **Não há nenhum primitivo** — não existe `src/components/ui/`.

### Primitive — inexistentes

Nenhum. `ThemeToggle.tsx` é o único componente reutilizável por natureza, e tem um só consumidor.

### Composition — inexistentes como abstração

Implementados inline dentro das seções:

| Composição implícita | Onde vive hoje | Repetições |
| --- | --- | --- |
| Cabeçalho de seção | inline em 7 seções | 7 |
| Card de superfície | inline em 6 seções | 6 variantes |
| Etiqueta / badge / pill | inline em 5 seções | 6 variantes |
| Caixa de ícone | inline em 3 seções | 3 variantes |
| Botão de accent | inline em 2 seções | 2 variantes |
| Item de timeline | inline em `Experience.tsx:67-104` | 1 |
| Linha de certificação | inline em `Certifications.tsx:65-89` | 1 |
| Card de projeto | inline em `Projects.tsx:68-117` | 1 |
| Card "Em Breve" | inline em `Projects.tsx:121-141` | 1 |
| Linha de contato | inline em `Contact.tsx:70-86` | 1 |
| Par rótulo/valor | inline em `About.tsx:62-68` | 1 |
| Ícone de marca (SVG) | `GithubIcon` 2×, `LinkedinIcon` 1× | 3 definições |

### Section — existentes

`Hero`, `About`, `Skills`, `Experience`, `Education`, `Certifications`, `Projects`, `Contact` — todas com dados literais no topo do próprio arquivo.

### Page / chrome

`App.tsx` (composição única), `Navbar.tsx`, `ThemeToggle.tsx`, `hooks/useTheme.ts`.

## G. Problemas de responsividade

Medido em 1440, 1024, 768 e 390 px. **Sem overflow horizontal em nenhum deles** (`scrollWidth == innerWidth` nos quatro) e sem elemento estourando a viewport.

| Viewport | Achado |
| --- | --- |
| 1440 | O conteúdo ocupa `max-w-5xl` = 1024 px de 1440 → 29 % da largura é margem vazia. Não há breakpoint acima de `md`, então telas largas não ganham nada. |
| 1440 | Certificações: colunas com 8 e 4 itens deixam ~350 px de vazio na coluna direita. |
| 1440/1024 | Sobre: `items-center` faz os cards começarem ~105 px abaixo do texto; nada alinha no topo. |
| 1024 | `max-w-5xl` iguala a largura da tela: o respiro lateral é só `px-4` (16 px), e o conteúdo fica colado às bordas. |
| 768 | A navbar desktop aparece a partir de `md` (768 px): logo + 7 links + toggle ocupam quase toda a largura, com o último link terminando a ~649 px. Cabe, sem folga. |
| 768 | Hero com `min-h-screen` = 1024 px de altura, ~40 % vazio. |
| 768 | Página mais alta (6046 px) que em 1024 (5545 px) por empilhamento de grids em um ponto em que ainda há largura sobrando. |
| 390 | Projetos com 1226 px de altura, metade em placeholders "Em Breve". |
| 390 | Sobre passa de 656 para 998 px; os 4 cards viram 2×2 estreitos. |
| 390 | CTAs do Hero em largura total — correto. |

## H. Light e dark

Os dois temas foram verificados no navegador. Estrutura de tokens simétrica; os problemas são de **valor**, não de arquitetura.

Contraste WCAG medido (texto sobre o fundo efetivo, com alpha composto):

| Token | Claro | Escuro | Tamanho de uso | Situação |
| --- | --- | --- | --- | --- |
| `fg` | 17.85 | 18.95 | 30 px | ok |
| `fg-soft` | 10.35 | 13.44 | 14 px | ok |
| `fg-muted` | 7.58 | 8.20 | 14 px | ok |
| `fg-subtle` | **4.48** | **3.90** | 12 px | limítrofe no claro, **falha AA no escuro** |
| `fg-faint` | **2.56** | **2.62** | 12–16 px | **falha AA nos dois** |
| `accent` como texto | **3.30** | 11.94 | 14–18 px | **falha AA no claro** para texto pequeno |

Consequências concretas:

- `text-accent` em 14 px aparece em `Experience.tsx:84` (empresa), `About.tsx:29/38/44` (destaques na prosa) e `Certifications.tsx:59`. No tema claro, 3.30 fica abaixo de 4.5.
- `fg-faint` é usado no copyright (`Contact.tsx:123`), nos chips "Em Breve" (`Projects.tsx:135`) e na seta do hero (`Hero.tsx:81`). Falha nos dois temas.
- A assimetria do accent entre temas (3.30 vs 11.94) é o maior desequilíbrio do sistema de cor: o verde escuro `#16a34a` sobre branco é bem mais fraco que o `#4ade80` sobre quase-preto.

Superfícies (razão entre o card e o fundo em que ele assenta):

| Card | Claro | Escuro |
| --- | --- | --- |
| Sobre / Experiência / Contato (seção em canvas) | 1.062 | 1.051 |
| Formação / Projetos (seção em `bg-surface`) | 1.061 | 1.066 |
| Pills de Skills (`surface-raised` sobre `surface`) | 1.128 | 1.151 |
| Pill do Hero (`surface-raised` sobre canvas) | 1.129 | 1.123 |
| Borda dos cards contra o fundo | 1.226 | 1.182 |

Leitura: **o card praticamente não se distingue do fundo em lugar nenhum** — a razão fica entre 1.05 e 1.07, e quem separa o card é a borda (1.18–1.23). Onde `surface-raised` é usado (Skills, Hero), a separação dobra.

## I. Diagnóstico de AI-003

**Sintoma registrado:** em Formação e Projetos, seção e card usam `bg-surface`; o card desaparece.

**Confirmado, com uma correção de entendimento.** A medição mostra que o card sobre seção elevada tem razão 1.061 (claro) / 1.066 (escuro) — praticamente a mesma do card sobre canvas (1.062 / 1.051). Ou seja:

- o problema **não** é que a seção elevada seja um caso pior que as outras;
- o problema é que **a escala de superfície é curta**: `--surface` a 3 % e `--surface-raised` a 6 % produzem, no máximo, 3 pontos de alpha de diferença entre dois níveis;
- em Formação e Projetos há, além disso, uma **colisão de token**: o card repete exatamente o token do pai (`bg-surface` sobre `bg-surface`), então a intenção de elevação é nula por construção, não apenas fraca.

**Tokens envolvidos:** `--surface` e `--surface-raised` (`globals.css:33-34` no claro, `:56-57` no escuro); `--edge` como único separador efetivo.

**Ocorrências:** seção `Education.tsx:46` vs card `:66`; seção `Projects.tsx:54` vs cards `:75` e `:127`. Contraexemplo correto no repositório: `Skills.tsx:29` (seção `surface`) com pills `surface-raised` (`:61`).

**Opções de correção:**

| Opção | O que faz | Razão resultante | Risco |
| --- | --- | --- | --- |
| A — card usa `surface-raised` nas seções elevadas | Remove a colisão, mantém os valores atuais | ~1.13–1.15 | Baixo. Duas linhas. Consistente com Skills. |
| B — aumentar os alphas dos tokens (ex. 3 %→5 %, 6 %→10 %) | Alonga a escala para toda a página | ~1.10 / ~1.20 | Médio: muda todas as seções e os dois temas de uma vez. |
| C — inverter: seção elevada com card em `canvas` | Card "recortado" no fundo elevado | ~1.25 | Médio: muda a leitura de elevação; mais editorial. |
| D — remover o card nessas seções | Formação e Certificações viram listas | — | Converge com a refatoração (AI-017); não é correção de bug. |

**Recomendação:** aplicar **A** como correção de baixo risco e escopo estreito, mantendo AI-003 como bug visual. A decisão de fundo entre B, C e D pertence à refatoração, não a esta task.

## J. Três direções visuais

### A. Editorial técnico

Referência mental: caderno técnico, ensaio, documentação bem tipografada.

| Aspecto | Direção |
| --- | --- |
| Tipografia | Carrega toda a estrutura. Escala ampla e decidida (12/14/16/20/28/44), possivelmente uma serifa para títulos contra a Geist no corpo. Números e datas em tabular. |
| Grid | Coluna de leitura estreita (~62–70 caracteres) com margem lateral assimétrica e uma coluna de metadados. Abandona o bloco central simétrico. |
| Cards | Quase nenhum. Informação em listas, tabelas e blocos separados por régua. |
| Radius | 0 a 2 px. |
| Bordas | Régua de 1 px como elemento de composição (separadores horizontais, não caixas). |
| Sombras | Nenhuma. |
| Accent | Um só, usado com parcimônia: link, marcador, estado atual. |
| Motion | Quase nada: fade curto no carregamento, nada por item, nada em loop. |
| Densidade | Alta. Menos ar entre itens, mais ar entre blocos. |
| Navegação | Índice tipográfico no topo ou lateral fixa com numeração de seção. |
| Projetos | Entradas de lista com título, uma linha de descrição e stack em texto corrido — não cartões. |
| Experiência | Tabela cronológica: período à esquerda, cargo e empresa à direita. |

### B. Produto / software técnico

Referência mental: página de documentação de produto, console, painel.

| Aspecto | Direção |
| --- | --- |
| Tipografia | Escala curta e funcional (12/13/14/16/24/32), peso resolvendo hierarquia. Monospace real para stack, comandos e versões. |
| Grid | 12 colunas explícitas, alinhamento rígido, medianiz constante. |
| Cards | Permanecem, mas como unidade de dados: borda definida, padding uniforme, sem ícone decorativo. |
| Radius | 4 a 6 px, um valor só. |
| Bordas | 1 px com contraste maior que hoje (o dobro do atual). |
| Sombras | Nenhuma ou uma única sombra de 1 px para elemento flutuante. |
| Accent | Funcional: estado, foco, link. Cores de estado adicionais (sucesso/info) legitimadas. |
| Motion | Só feedback de interação: hover, foco, abrir/fechar. Nenhuma entrada por scroll. |
| Densidade | Muito alta. Cabeçalhos pequenos, muito conteúdo por tela. |
| Navegação | Barra fixa com estado ativo por seção, ou sidebar. |
| Projetos | Tabela ou grade compacta: nome, stack em mono, links como ícones à direita. |
| Experiência | Linhas de dados com período em mono e responsabilidades em lista densa. |

### C. Híbrido editorial + produto

Editorial na narrativa, produto nos dados.

| Aspecto | Direção |
| --- | --- |
| Tipografia | Geist em toda a página, escala editorial (13/14/16/20/32/48) + monospace apenas em stack, datas e identificadores. |
| Grid | Duas faixas: bloco de leitura estreito para Sobre/Experiência; grade densa para Skills/Formação/Certificações/Projetos. |
| Cards | Reservados a Projetos — a única seção em que o card corresponde a um objeto. O resto é lista com régua. |
| Radius | Um valor pequeno (4 px) + `full` só onde é círculo de verdade (marcador da timeline). |
| Bordas | Separador horizontal como padrão; caixa como exceção. Contraste de borda maior que o atual. |
| Sombras | Nenhuma — preserva o que já funciona. |
| Accent | Um verde, recalibrado para passar AA no claro. Usado em link, estado "atual" e marcador. |
| Motion | Uma entrada por seção, nenhuma por item, nenhum loop. Hover discreto. |
| Densidade | Média-alta, variando por seção: a variação de densidade passa a ser o ritmo da página. |
| Navegação | Barra fixa sóbria, sem pill, com indicação da seção corrente. |
| Projetos | Card com hierarquia forte: nome grande, descrição em uma frase, stack em mono, links à direita. |
| Experiência | Mantém a timeline atual — refinada, não substituída: período em mono, régua mais discreta, marcador menor. |

## K. Direção recomendada

**C — Híbrido editorial + produto, com peso editorial.**

Por quê, especificamente para este portfólio:

1. **O conteúdo real é misto.** Há uma narrativa forte (infraestrutura e redes → desenvolvimento full stack) que pede tratamento editorial, e há muito dado enumerável (26 skills, 12 certificações, 4 formações) que pede densidade. Editorial puro sofre com listas longas; produto puro devolve a aparência de SaaS que se quer abandonar.
2. **Resolve o sinal nº 1 sem reescrever tudo.** A variação de densidade entre seções narrativas e seções de dados quebra a repetição estrutural — que é o problema mais grave — reaproveitando o conteúdo e o sistema de tokens existentes.
3. **Preserva os dois melhores ativos:** a timeline de Experiência (única forma própria) e a ausência de sombras.
4. **Editorial puro é arriscado aqui:** exigiria mais texto autoral do que o site tem hoje, e uma serifa bem escolhida — decisão tipográfica que não se avalia sem protótipo.
5. **Produto puro brigaria com o conteúdo:** metade do material é biográfico e não se acomoda em tabelas sem ficar frio para um portfólio pessoal.

Implicação prática: cards deixam de ser o padrão e passam a ser a exceção (Projetos), listas com régua tornam-se o padrão, e a escala tipográfica encurta de nove tamanhos para cerca de seis papéis explícitos.

## L. Design system futuro

### FOUNDATION

| Camada | Existe hoje | Falta |
| --- | --- | --- |
| Colors | Sistema completo e semântico (`globals.css:10-70`) | Recalibrar `accent` no claro (AA), `fg-faint`/`fg-subtle`; alongar a escala de superfície; decidir o destino de `accent-strong` (hoje só em `::selection`) e de `info` (um único uso) |
| Typography | Uma família com fallback | Escala como decisão: ~6 papéis nomeados em vez de 9 tamanhos ad-hoc; monospace para dados; tabular-nums em datas |
| Spacing | Escala do Tailwind; `py-24`/`px-4`/`max-w-5xl` por convenção | Ritmo vertical por tipo de seção (não `py-24` uniforme); escala de gap reduzida de 9 valores para 4; largura de leitura separada da largura de grade |
| Radius | 4 valores por hábito | Um valor + `full` para círculos reais |
| Borders | `edge` / `edge-strong` | Contraste maior; régua horizontal como token de composição |
| Shadows | Deliberadamente ausente | Nada a fazer — manter |
| Motion | `MotionConfig` global; convenção repetida à mão | Tokens de duração e easing; regra de "uma entrada por seção"; remover loops |

### PRIMITIVES — a criar (nenhum existe)

`Container` (duas larguras: leitura e grade) · `SectionHeader` · `Prose` · `Badge` · `Chip` · `Button` (primário/secundário) · `ExternalLink` · `IconBox` (só se sobreviver à direção) · `Divider` · `DataRow` (rótulo + valor) · `BrandIcon` (Github/Linkedin, hoje duplicado — AI-009)

### COMPOSITIONS — a extrair do inline

`ExperienceItem` · `EducationRow` · `CertificationGroup` + `CertificationRow` · `ProjectCard` · `ContactRow` · `SkillGroup` · `StatPair`

### SECTIONS

As oito já existem como componentes; passariam a consumir primitivos e composições em vez de reimplementar markup.

### PAGES

Uma só (`App.tsx`). Não há motivo para mudar — ver ADR-003.

## Restrições

- Nunca cor literal em componente: token novo entra em `globals.css`, nos dois temas (ADR-001).
- Sem sombras.
- `viewport={{ once: true }}` em toda entrada.
- Contrato `index.html` ↔ `useTheme.ts`: chave `"tema"`, valor `"escuro"`. Mudar um lado exige mudar o outro (AI-005).
- `max-w-5xl` aparece em 8 lugares: trocar container é mudança coordenada.
- Conteúdo é literal nos componentes; fatos repetidos entre seções precisam concordar (`docs/CONTENT_GUIDE.md`).

## Riscos conhecidos

- **Classe Tailwind inválida não é detectada** por lint, typecheck nem build. Foi a causa de AI-002. Toda mudança de cor ou espaçamento exige conferir no navegador ou no CSS gerado (`dist/assets/*.css`).
- Opacidades arbitrárias (`bg-accent/8`) **são** geradas pelo Tailwind 4 via `color-mix` — verificado no CSS compilado. Mas voltam de `getComputedStyle` em notação `color(srgb …)` com componentes 0–1: ao medir contraste por script, converta antes de comparar.
- Animação de entrada com `whileInView` + `once` deixa conteúdo abaixo da dobra em `opacity: 0` até ser rolado. Automação que capture a página precisa rolar tudo antes.
- Gravar `localStorage` **depois** do load não muda o tema: o `useEffect` de `useTheme` regrava a chave com o estado inicial. Para forçar tema em automação, grave antes do primeiro script do documento.

## Validação

- `npm run ai:health` (lint + typecheck + build) não prova nada sobre aparência.
- Verificação visual obrigatória em 1440, 1024, 768 e 390, **nos dois temas**.
- Para contraste, medir em vez de estimar: fundo efetivo com alpha composto, não o valor declarado do token.

## Fora de escopo desta auditoria

Nenhuma mudança visual foi aplicada. A única alteração de código feita na sessão foi AI-002 (`bg-background` → `bg-canvas`, uma linha). Não foram alterados cores, fontes, radius, estrutura de seção, textos, animações, nem dependências.
