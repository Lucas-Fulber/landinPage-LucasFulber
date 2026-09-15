# Tasks

> Fonte de verdade semântica do trabalho. Índice para máquina em `.ai/tasks.json` — mantenha os dois em sincronia.
>
> Leia **apenas a task ativa**, não o arquivo inteiro.
>
> Status: `TODO` · `READY` · `IN_PROGRESS` · `PARTIAL` · `BLOCKED` · `DONE` · `CANCELLED`
> `READY` significa que o contexto está suficiente para começar sem decisão pendente.

---

## In Progress

Nenhuma.

---

## Ready

### AI-002 — Corrigir classe de cor inexistente na timeline de Experiência

**Status:** READY · **Prioridade:** ALTA · **Tipo:** bug

**Objetivo**
O marcador circular da timeline em `Experience.tsx` usa `bg-background`, token que não existe. O Tailwind não gera a classe, então o círculo fica com fundo transparente e a linha vertical atravessa o ícone.

**Evidência**
`src/components/Experience.tsx:76`. O `@theme inline` de `src/globals.css` define `--color-canvas`, não `--color-background`. Confirmado que nem `bg-background` nem `bg-canvas` aparecem no CSS gerado — a classe é morta.

**Critérios de aceitação**
- [ ] O marcador tem fundo opaco que cobre a linha vertical, nos dois temas.
- [ ] Nenhuma cor literal introduzida — apenas token existente (`bg-canvas`).
- [ ] Nenhuma outra ocorrência de token inexistente em `src/`.
- [ ] Verificado visualmente em claro e escuro (`npm run dev`), porque lint/typecheck/build não detectam isso.

**Depende de:** nada
**Áreas:** `src/components/Experience.tsx`
**Contexto:** `docs/DESIGN_SYSTEM.md` (tabela de tokens), ADR-001 (as três edições coordenadas)

**Notas**
Cuidado ao procurar outras ocorrências: classe Tailwind inválida falha em silêncio em todo o pipeline. Uma busca por nomes de token fora da tabela do design system é mais confiável que confiar na validação.

---

## Todo

### AI-003 — Contraste de superfície: cards invisíveis em seções elevadas

**Status:** TODO · **Prioridade:** MÉDIA · **Tipo:** bug visual

**Objetivo**
Em `Education` e `Projects`, a seção usa `bg-surface` e os cards dentro também usam `bg-surface`. Card e fundo ficam com a mesma cor; só a borda separa. A elevação pretendida desaparece.

**Evidência**
`Education.tsx:46` (seção) vs `:66` (cards). `Projects.tsx:54` (seção) vs `:75` e `:127` (cards). Em `Skills.tsx` o padrão está correto: seção `bg-surface`, pills `bg-surface-raised`.

**Critérios de aceitação**
- [ ] Card em seção elevada usa um nível de superfície acima do fundo da seção.
- [ ] Solução consistente entre `Education` e `Projects` — o mesmo problema resolvido do mesmo jeito.
- [ ] Seções em canvas (`Experience`, `Contact`) continuam corretas.
- [ ] Verificado nos dois temas.

**Depende de:** nada
**Áreas:** `src/components/Education.tsx`, `src/components/Projects.tsx`
**Contexto:** `docs/DESIGN_SYSTEM.md` (escala de superfície)

---

### AI-004 — Completar metadados de SEO e compartilhamento

**Status:** TODO · **Prioridade:** MÉDIA · **Tipo:** melhoria

**Objetivo**
Fechar as lacunas de metadados verificadas em `docs/SEO.md`. A mais visível: `twitter:card` está como `summary_large_image` sem nenhuma `og:image`, então o card de compartilhamento renderiza vazio.

**Critérios de aceitação**
- [ ] `og:image` presente, com imagem existente em `public/` e dimensões adequadas.
- [ ] `og:url` e `<link rel="canonical">` presentes.
- [ ] `public/robots.txt` presente.
- [ ] JSON-LD `Person` avaliado; incluído ou descartado com justificativa em `docs/SEO.md`.
- [ ] `meta keywords` avaliada para remoção.
- [ ] `docs/SEO.md` atualizado com o novo estado verificado.

**Depende de:** o autor informar o domínio de produção — `og:url`, canonical e sitemap não podem ser escritos sem ele.
**Bloqueia:** nada
**Áreas:** `index.html`, `public/`
**Contexto:** `.ai/context/AI-004.md`, `docs/SEO.md`

**Notas**
Parcialmente executável sem o domínio: `og:image`, `robots.txt` e JSON-LD não dependem dele. Se for feito só isso, marque `PARTIAL`, não `DONE`.

---

### AI-007 — Decidir estratégia de testes

**Status:** TODO · **Prioridade:** MÉDIA · **Tipo:** decisão

**Objetivo**
Não há test runner. A consequência é concreta: o bug AI-002 passou por lint, typecheck e build sem um aviso. Decidir se o projeto adota testes e de que tipo — não implementar antes de decidir.

**Critérios de aceitação**
- [ ] Decisão registrada como ADR (adotar ou não, com o porquê).
- [ ] Se adotar: escopo definido (o que vale testar num site estático de conteúdo literal), ferramenta escolhida, script `test` adicionado, `.claude/rules/validation.md` e `.ai/config.yml` atualizados.
- [ ] Se não adotar: `.claude/rules/validation.md` registra explicitamente que verificação visual é a checagem obrigatória para mudança de UI.

**Depende de:** decisão do autor
**Áreas:** `package.json`, `.claude/rules/validation.md`, `.ai/config.yml`, `docs/decisions/`

**Notas**
Num site sem lógica de negócio e com conteúdo literal, teste unitário tem retorno baixo. O que falharia de verdade é regressão visual e coerência de tokens. Considere isso antes de instalar um runner por hábito.

---

### AI-005 — Respeitar `prefers-color-scheme` na primeira visita

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** melhoria

**Objetivo**
Sem escolha salva, o site sempre abre no tema claro, ignorando a preferência do sistema. A escolha explícita do usuário deve continuar vencendo o sistema.

**Critérios de aceitação**
- [ ] Sem valor em `localStorage`, o tema inicial segue `prefers-color-scheme`.
- [ ] Com valor salvo, o valor salvo vence.
- [ ] Sem flash na carga — a decisão continua no script inline, antes da primeira pintura.
- [ ] `index.html` e `useTheme.ts` permanecem coerentes: mudar o critério de um exige mudar o outro.
- [ ] ADR-001 atualizado, já que registra a consequência atual como aceita.

**Depende de:** nada
**Áreas:** `index.html`, `src/hooks/useTheme.ts`
**Contexto:** ADR-001

**Notas**
O contrato entre o script inline e o hook é a parte delicada: hoje ambos tratam "ausente" como claro. A lógica precisa ficar igual nos dois lados, ou o flash volta.

---

### AI-009 — Extrair `GithubIcon` duplicado

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** refatoração

**Objetivo**
`GithubIcon` está definido duas vezes, idêntico, em `Projects.tsx` e `Contact.tsx`.

**Critérios de aceitação**
- [ ] Uma definição só, importada pelos dois consumidores.
- [ ] `LinkedinIcon` (hoje só em `Contact.tsx`) segue o mesmo destino, para não criar dois padrões.
- [ ] Nenhuma mudança visual.
- [ ] Renderização inalterada nos dois lugares.

**Depende de:** nada
**Áreas:** `src/components/Projects.tsx`, `src/components/Contact.tsx`, novo arquivo de ícones

**Notas**
Escopo estreito: extrair os SVG de marca, nada mais. Os outros padrões repetidos (cabeçalho de seção, bloco de animação) **não** entram aqui — extrair sete cabeçalhos de seção é mudança de arquitetura de UI e precisa de task própria com decisão do autor.

---

### AI-010 — Semântica e coerência em `Contact.tsx`

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** melhoria

**Objetivo**
Dois problemas pequenos e reais no mesmo arquivo:
1. O copyright está num `<motion.p>` dentro da seção de contato. A página não tem `<footer>`.
2. O CTA "Enviar mensagem" aponta para o WhatsApp (`wa.me/…`) mas usa o ícone `Mail`.

**Critérios de aceitação**
- [ ] O copyright vive em `<footer>`, fora de `<section id="contato">`.
- [ ] O ícone do CTA corresponde ao destino, ou o texto corresponde ao ícone.
- [ ] Ordem visual e espaçamento preservados.

**Depende de:** nada
**Áreas:** `src/components/Contact.tsx`, possivelmente `src/App.tsx`

---

### AI-006 — Revisão editorial do Hero

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** design

**Objetivo**
O Hero contradiz as restrições registradas em `docs/DESIGN_SYSTEM.md`: tem um glow decorativo (`bg-accent/10 rounded-full blur-3xl`) e um pill de localização — exatamente os padrões "blob decorativo" e "excesso de pills" que o projeto declara evitar. Avaliar se a composição fica mais editorial sem eles.

**Critérios de aceitação**
- [ ] Decisão tomada sobre o glow e sobre o pill, com o raciocínio registrado.
- [ ] Se mudar: hierarquia e tipografia carregam o peso visual, sem elemento decorativo novo.
- [ ] `sm:whitespace-nowrap` do tagline reavaliado (hoje força a linha em telas maiores).
- [ ] `docs/DESIGN_SYSTEM.md` atualizado na seção "Dívida conhecida".

**Depende de:** decisão do autor — é mudança visível de identidade, não correção
**Áreas:** `src/components/Hero.tsx`

---

### AI-008 — Substituir placeholders "Em Breve" em Projetos

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** conteúdo

**Objetivo**
`Projects.tsx` tem dois cards "Em Breve" com stack anunciada e sem projeto. Um portfólio com metade dos cards vazios enfraquece a seção.

**Critérios de aceitação**
- [ ] Ou projetos reais substituem os placeholders, ou os placeholders saem e a grade se ajusta a dois cards.
- [ ] Descrições seguem `docs/CONTENT_GUIDE.md`: contexto, papel e decisões técnicas reais.

**Depende de:** o autor decidir quais projetos entram — é conteúdo, não implementação
**Áreas:** `src/components/Projects.tsx`
**Contexto:** `docs/CONTENT_GUIDE.md`

---

### AI-011 — CI no GitHub Actions rodando a validação

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** infraestrutura

**Objetivo**
Não há CI. Nada impede que um push em `main` — que dispara deploy em produção — leve lint ou build quebrados.

**Critérios de aceitação**
- [ ] Workflow rodando `npm ci` e `npm run ai:health` em pull request.
- [ ] Versão de Node fixada, coerente com a máquina de desenvolvimento (v24).
- [ ] Não interfere no deploy da Vercel.

**Depende de:** autorização explícita do autor — cria automação que roda na conta dele no GitHub
**Áreas:** `.github/workflows/`

**Notas**
Não foi criado no bootstrap justamente por ser uma ação que passa a executar fora da máquina local. O template trazia um exemplo; ele foi lido e descartado, e o conteúdo útil está nestes critérios.

---

## Blocked

Nenhuma.

---

## Done

### AI-001 — Bootstrap do AI Repository OS

**Status:** DONE · **Prioridade:** ALTA · **Tipo:** infraestrutura
**Concluída:** 2026-09-15

**Objetivo**
Auditar o repositório, consolidar a infraestrutura AI-first existente com o template `ai-repository-os-template/`, e implantar memória operacional persistente adaptada à arquitetura real.

**Resultado**
- Auditoria completa do repositório e do template.
- Memória em três camadas implantada, com roteamento de contexto por níveis.
- `CLAUDE.md`, `AGENTS.md`, `PROJECT_STATE.md`, `HANDOFF.md`, `TASKS.md` na raiz.
- `.ai/` (índice, config, state, tasks, health, mapas, context, sessions, history, archive, runtime).
- `.claude/rules/` com seis regras, versionado (antes `.claude/` era ignorado por inteiro).
- `docs/` com arquitetura, design system, conteúdo e SEO — todos verificados contra o código.
- Três ADRs, sendo dois registrando decisões que já estavam implícitas no código.
- Quatro scripts em `scripts/ai/`, reescritos: os do template tinham erro de sintaxe e quebravam `npm run lint`.
- `typecheck` e `ai:*` adicionados ao `package.json`; ESLint passou a cobrir `scripts/`.
- Template removido após verificação de que nada restou só nele.

**Detalhes:** `.ai/sessions/2026-09-15--AI-001--bootstrap-ai-repository-os.md`, ADR-002

---

## Cancelled

Nenhuma.
