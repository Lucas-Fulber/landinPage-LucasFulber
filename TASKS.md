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

### AI-003 — Contraste de superfície: cards invisíveis em seções elevadas

**Status:** READY · **Prioridade:** MÉDIA · **Tipo:** bug visual

**Objetivo**
Em `Education` e `Projects`, a seção usa `bg-surface` e os cards dentro também usam `bg-surface`. O card repete o token do pai e a elevação pretendida é nula por construção.

**Evidência**
Seção `Education.tsx:46` vs card `:66`; seção `Projects.tsx:54` vs cards `:75` e `:127`. Contraexemplo correto no próprio repositório: `Skills.tsx:29` (seção `surface`) com pills `surface-raised` (`:61`).

Medido no navegador (ver context pack): card contra fundo dá razão de contraste **1.061** no claro e **1.066** no escuro. A auditoria mostrou que o card sobre canvas tem razão praticamente igual (1.062 / 1.051) — ou seja, a escala de superfície é curta em geral, e aqui há **também** colisão de token.

**Correção recomendada**
Opção A do diagnóstico: card passa a `bg-surface-raised` nas duas seções elevadas. Razão sobe para ~1.13–1.15, alinhando com o padrão já usado em Skills. As opções B (alongar os alphas dos tokens), C (inverter a elevação) e D (remover o card) pertencem à refatoração visual, não a este bug.

**Critérios de aceitação**
- [ ] Card em seção elevada usa um nível de superfície acima do fundo da seção.
- [ ] Solução idêntica em `Education` e `Projects`.
- [ ] Seções em canvas (`Experience`, `Contact`, `About`) permanecem intocadas.
- [ ] Nenhuma cor literal; nenhum token novo.
- [ ] Verificado visualmente nos dois temas.

**Risco:** baixo — duas linhas, sem mudança estrutural.
**Validação visual:** obrigatória (mudança de cor).
**Depende de:** nada
**Áreas:** `src/components/Education.tsx`, `src/components/Projects.tsx`
**Contexto:** `.ai/context/AI-012-auditoria-visual.md` (seção I), `docs/DESIGN_SYSTEM.md`

---

### AI-016 — Extrair primitivos e composições

**Status:** READY · **Prioridade:** MÉDIA · **Tipo:** refatoração

**Objetivo**
Não existe nenhum primitivo de UI no projeto. O cabeçalho de seção está reimplementado 7×, o card tem 5 paddings diferentes, a etiqueta pequena tem 6 implementações e a caixa de ícone tem 3. Extrair os primitivos e as composições que ADR-004 mantiver, já consumindo a escala de AI-014.

**Critérios de aceitação**
- [ ] `SectionHeader`, `Container` (duas faixas) e `Prose` existem e são usados por todas as seções que os pedem.
- [ ] Uma implementação de etiqueta, uma de botão, uma de card.
- [ ] Um marcador de item de lista só: hoje há `▸` (`Experience.tsx:98`) e `◆` (`Certifications.tsx:76`).
- [ ] Os primitivos usam os tokens de AI-014 (`text-*` nomeados, `rounded-edge`, `gap-*`, `max-w-reading`/`max-w-grid`), não a escala padrão do Tailwind.
- [ ] `BrandIcon` resolve a duplicação de `GithubIcon` (absorve AI-009 se ainda estiver aberta).
- [ ] Ao final, avaliar remover a escala padrão do Tailwind do `@theme` — só depois que nenhum componente a usar.
- [ ] Nenhuma mudança visual não intencional: comparar capturas antes/depois nos quatro viewports.
- [ ] Composições extraídas apenas onde há repetição real — não criar abstração para uso único.

**Risco:** médio — refatoração ampla sem teste automatizado.
**Validação visual:** obrigatória (é o único controle de regressão que existe).
**Depende de:** nada — AI-014 concluída
**Relacionada:** AI-009 (subconjunto)
**Áreas:** novo `src/components/ui/`, todos os componentes de seção
**Contexto:** `.ai/context/AI-012-auditoria-visual.md` (seções D, F e L), ADR-004

**Notas**
Comparação de capturas tem um ruído conhecido: o hero e os cards "Em Breve" têm animação em loop, então suas imagens nunca saem idênticas entre duas rodadas. Compare as outras seções byte a byte e use as métricas (altura de seção, overflow) para essas duas — ou faça AI-019 antes, que remove os loops.

---

## Todo

### AI-021 — Reconciliar os fatos de cargo e empresa atual

**Status:** TODO · **Prioridade:** ALTA · **Tipo:** conteúdo

**Objetivo**
O autor começou a atualizar a própria situação profissional em `About.tsx` e `index.html`, e a edição ficou pela metade. Hoje a página se contradiz: `About` diz que ele é **freelancer na "Celeiro Analise de risco" desde o início de 2026**, enquanto `Experience` mantém **"Desenvolvedor Full Stack Jr." na "Celeiro Crédito Agro" desde Mai/2026** com o badge "Atual".

**Divergências verificadas**

| Fato | `About.tsx` (editado) | Resto da página |
| --- | --- | --- |
| Cargo | "Desenvolvedor Full Stack" | "Desenvolvedor Full Stack Jr." — `Hero.tsx:47`, `Experience.tsx:14` |
| Empresa | "Celeiro Analise de risco" | "Celeiro Crédito Agro" — `Experience.tsx:15` |
| Vínculo | freelancer | cargo com badge "Atual", sem indicar freelance — `Experience.tsx:17` |
| Início | "inicio de 2026" | "Mai/2026" — `Experience.tsx:16` |

`index.html` teve só a `description` alterada; `og:title` e `twitter:title` nunca tiveram "Jr.". `docs/CONTENT_GUIDE.md:34-35` ainda registra os fatos antigos na tabela de consistência.

**Revisão de forma no texto novo** (o autor decide, mas está anotado):
- "Celeiro Analise de risco" — sem acento; o nome próprio provavelmente é "Celeiro Análise de Risco".
- "desde o inicio de 2026" — falta o acento em "início".
- "Hoje atuo como Freelancer na … como desenvolvedor freelancer" — o vínculo aparece duas vezes na mesma frase.
- `index.html`: "Desenvolvedor Full Stack. especializado em…" — o ponto sobrou da remoção de "Jr." e ficou antes de minúscula.

**Critérios de aceitação**
- [ ] Cargo, empresa, vínculo e data de início concordam em `index.html`, `Hero.tsx`, `About.tsx` e `Experience.tsx`.
- [ ] `Experience.tsx` reflete o vínculo real (se é freelance, o item da timeline precisa dizer isso).
- [ ] Erros de acentuação e a redundância do texto novo resolvidos.
- [ ] `docs/CONTENT_GUIDE.md` atualizado na tabela de consistência.
- [ ] Nada de layout alterado — é conteúdo.

**Risco:** baixo tecnicamente; alto de credibilidade se publicado inconsistente. **Push em `main` publica em produção.**
**Validação visual:** recomendada (o texto muda de comprimento e afeta a quebra de linha em Sobre).
**Depende de:** o autor confirmar os fatos — nome exato da empresa, natureza do vínculo e mês de início.
**Áreas:** `src/components/About.tsx`, `src/components/Experience.tsx`, `src/components/Hero.tsx`, `index.html`, `docs/CONTENT_GUIDE.md`
**Contexto:** `docs/CONTENT_GUIDE.md` (tabela de consistência)

**Notas**
As mudanças de `About.tsx` e `index.html` estavam **sem commit** no working tree ao fim da sessão de 2026-09-15, feitas pelo autor. Foram preservadas, não revisadas nem revertidas.

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

### AI-015 — Corrigir contraste de texto reprovado em WCAG AA

**Status:** TODO · **Prioridade:** MÉDIA · **Tipo:** acessibilidade

**Objetivo**
Três tokens de texto reprovam em contraste, medido no navegador com o fundo efetivo composto:

| Token | Claro | Escuro | Onde aparece |
| --- | --- | --- | --- |
| `fg-faint` | 2.56 | 2.62 | copyright (`Contact.tsx:123`), chips "Em Breve" (`Projects.tsx:135`), seta do hero (`Hero.tsx:81`) |
| `fg-subtle` | 4.48 | 3.90 | metadados de 12 px em cinco seções |
| `accent` como texto | 3.30 | 11.94 | empresa (`Experience.tsx:84`), destaques da prosa (`About.tsx:29/38/44`), emissor (`Certifications.tsx:59`) |

**Critérios de aceitação**
- [ ] `fg-faint` e `fg-subtle` atingem 4.5:1 nos dois temas nos tamanhos em que são usados, ou deixam de ser usados em texto.
- [ ] `accent` como texto atinge 4.5:1 no tema claro, ou os usos em 14 px passam a um token de texto.
- [ ] Valores alterados apenas em `globals.css`, nos dois temas — nenhuma cor literal em componente.
- [ ] Contraste conferido por medição, não por estimativa.
- [ ] A identidade verde permanece reconhecível.

**Risco:** médio — mexer em `accent` muda a cor mais visível da página; mexer em `fg-faint` é praticamente invisível.
**Validação visual:** obrigatória, nos dois temas.
**Depende de:** decisão do autor **apenas** para o novo valor de `accent` no claro. As correções de `fg-faint` e `fg-subtle` não dependem de decisão — se só elas forem feitas, marque `PARTIAL`.
**Áreas:** `src/globals.css`, possivelmente os componentes citados
**Contexto:** `.ai/context/AI-012-auditoria-visual.md` (seção H), ADR-001

---

### AI-017 — Desfazer o padrão "tudo é card" em Formação e Certificações

**Status:** TODO · **Prioridade:** MÉDIA · **Tipo:** design

**Objetivo**
Formação e Certificações são listas de texto curto vestidas de card: duas linhas e um badge dentro de uma caixa, 16 caixas somadas. Convertê-las em listas com régua, devolvendo densidade e tirando da página o sinal visual mais repetitivo.

**Critérios de aceitação**
- [ ] Nenhuma das duas seções usa card; a separação vem de régua e espaçamento.
- [ ] O ícone repetido sai onde não carrega informação (o mesmo ícone para todos os itens).
- [ ] Os links de certificado continuam acessíveis e com `aria-label`.
- [ ] O desequilíbrio de colunas de Certificações (8 itens vs 4) é resolvido pela nova forma.
- [ ] Nenhum conteúdo factual alterado — apenas a forma.

**Risco:** médio — é mudança visível de identidade, mas reversível e contida em dois arquivos.
**Validação visual:** obrigatória, nos quatro viewports e nos dois temas.
**Depende de:** nada — a direção foi decidida em ADR-004
**Áreas:** `src/components/Education.tsx`, `src/components/Certifications.tsx`
**Contexto:** `.ai/context/AI-012-auditoria-visual.md` (seções B e J)

**Notas**
Se AI-003 já tiver sido feita, esta task provavelmente torna a correção obsoleta em `Education`. Isso é esperado: AI-003 conserta o bug agora, AI-017 muda a forma depois.

---

### AI-018 — Ritmo vertical e alinhamento

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** design

**Objetivo**
A página tem `py-24` em sete seções, `min-h-screen` num hero que fica 40 % vazio em 768 px, e `items-center` em Sobre desalinhando os cards ~105 px abaixo do texto. O resultado é ritmo uniforme sem hierarquia.

**Critérios de aceitação**
- [ ] Espaçamento vertical varia por peso da seção, conforme a escala de AI-014.
- [ ] `min-h-screen` do hero reavaliado (`Hero.tsx:18`); se mantido, com justificativa registrada.
- [ ] `items-center` de `About.tsx:19` resolvido — algo alinha no topo.
- [ ] Largura de conteúdo reavaliada: hoje `max-w-5xl` (1024 px) deixa 29 % da largura vazia em 1440 e zero respiro em 1024.
- [ ] Sem overflow horizontal em 1440/1024/768/390 — é o estado atual e não pode regredir.

**Risco:** baixo por arquivo, médio no conjunto — mexe em todas as seções.
**Validação visual:** obrigatória, nos quatro viewports.
**Depende de:** AI-014 (a direção já está decidida em ADR-004)
**Relacionada:** AI-006 (hero)
**Áreas:** todos os componentes de seção
**Contexto:** `.ai/context/AI-012-auditoria-visual.md` (seções A e G)

---

### AI-019 — Reduzir motion a uma entrada por seção

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** design

**Objetivo**
Cerca de 57 elementos animam individualmente na entrada, incluindo stagger de 0,04 s por pill em Skills e 0,05 s por certificado. A animação não distingue o que importa; é decoração.

**Critérios de aceitação**
- [ ] Uma entrada por seção; nada de stagger por item de lista.
- [ ] Os dois loops infinitos (seta do hero, engrenagem "Em Breve") reavaliados — o segundo tende a sair junto com os placeholders (AI-008).
- [ ] Durações e easing vindos dos tokens de AI-014.
- [ ] `viewport={{ once: true }}` preservado em toda entrada.
- [ ] `MotionConfig reducedMotion="user"` permanece o único lugar que trata preferência de motion.

**Risco:** baixo — remoção, não adição. Reversível.
**Validação visual:** obrigatória (rolar a página inteira nos dois temas).
**Depende de:** nada — a direção foi decidida em ADR-004
**Áreas:** todos os componentes com `motion`
**Contexto:** `.ai/context/AI-012-auditoria-visual.md` (seção E — Motion)

---

### AI-020 — Resolver os dois tokens de cor quase mortos

**Status:** TODO · **Prioridade:** BAIXA · **Tipo:** design system

**Objetivo**
A auditoria encontrou dois tokens de cor que existem sem função clara. Decidir se ganham uso, viram outra coisa, ou saem:

- `--accent-strong` é usado **em um único lugar**, o `::selection` de `globals.css:93`. Nenhum componente usa `text-accent-strong`/`bg-accent-strong`, embora o token esteja exposto no `@theme inline`.
- `--info` é usado **uma vez**: o status "participação" em `Education.tsx:41`. Um papel de cor inteiro para um caso.

**Critérios de aceitação**
- [ ] Cada um dos dois: ganha uso justificado, é absorvido por outro token, ou é removido dos dois temas e do `@theme inline`.
- [ ] Se `--info` sair, o status "participação" passa a se distinguir por outro meio.
- [ ] `docs/DESIGN_SYSTEM.md` e ADR-001 refletem o resultado.
- [ ] Nenhuma cor literal introduzida.

**Risco:** baixo, mas `--accent-strong` é consumido direto por `var()` no `::selection` — remover do `@theme inline` não basta, tem que olhar o CSS.
**Validação visual:** necessária se algum valor mudar (inclui selecionar texto para ver o `::selection`).
**Depende de:** nada. Se AI-017 mudar a forma de Formação, faça depois dela — o destino de `--info` fica mais claro.
**Áreas:** `src/globals.css`, `src/components/Education.tsx`
**Contexto:** `.ai/context/AI-012-auditoria-visual.md` (seção E — Cores)

**Notas**
Registrada ao fechar AI-014: o item estava no plano da foundation como "decidir o destino de `accent-strong` e `info`", e ficaria sem dono agora que aquela task está `DONE`.

---

## Blocked

Nenhuma.

---

## Done

### AI-014 — Foundation: escala tipográfica, espaçamento, radius e motion como decisão

**Status:** DONE · **Prioridade:** ALTA · **Tipo:** design system
**Concluída:** 2026-09-15

**Objetivo**
Substituir os valores escolhidos por hábito (nove tamanhos de texto, nove gaps, quatro radius, sete durações) por escalas nomeadas e registradas, conforme ADR-004.

**Resultado**
- `src/globals.css`: segundo bloco `@theme` com seis papéis tipográficos (`text-meta` → `text-display`, com line-height e tracking pareados), `font-mono` (stack do sistema), quatro passos de espaçamento, ritmo vertical por peso de seção, duas faixas de largura (`max-w-reading` 672px / `max-w-grid` 1088px), um raio (`rounded-edge` 4px) e `--ease-out-soft`.
- `src/motion.ts`: três durações, um easing e `enterOffset`, para o framer-motion, que o CSS não alcança.
- `docs/DESIGN_SYSTEM.md`: as seções de tipografia, espaçamento, raio e motion passaram a distinguir **escala decidida** de **estado atual dos componentes**.
- Geist Mono descartada: seria dependência nova sem necessidade concreta. Mono usa a stack do sistema.

**Verificação**
Os 18 utilitários novos foram confirmados no CSS compilado com uma sonda temporária (`src/__tokens_probe.tsx`, criada e removida) — necessário porque neste projeto classe inexistente não gera erro. Valores conferidos regra por regra.

Nenhuma mudança visual: 19 de 30 capturas saíram byte-idênticas e as 11 restantes são as que contêm as duas animações em loop. Uma rodada de controle sem alteração alguma produziu o mesmo conjunto instável, provando que o ruído é do método. Alturas das oito seções, `bodyHeight` e ausência de overflow idênticas nos quatro viewports.

`npm run ai:health`: lint, typecheck e build `pass`.

**Ajuste de escopo registrado**
O critério original incluía *aplicar* o ritmo vertical aos componentes ("deixa de ser `py-24` uniforme"). Isso se sobrepunha a AI-018, que já tem exatamente esse critério, e aplicar antes de AI-016/AI-017 causaria retrabalho — o radius, por exemplo, mudaria cards que AI-017 vai remover. AI-014 ficou com **definir e documentar**; a aplicação é AI-016 (primitivos), AI-018 (ritmo) e AI-019 (motion).

**Consequência a não esquecer**
As duas escalas coexistem: a padrão do Tailwind (`text-sm`, `text-3xl`, `rounded-xl`) continua ativa e é o que os componentes usam. Removê-la do `@theme` antes da migração quebraria a página **sem erro de build**. A remoção é o último passo de AI-016.

---

### AI-013 — Escolher a direção visual da refatoração

**Status:** DONE · **Prioridade:** ALTA · **Tipo:** decisão
**Concluída:** 2026-09-15

**Objetivo**
Escolher entre as três direções da auditoria para que as tasks de refatoração tivessem um alvo.

**Resultado**
O autor escolheu **C — híbrido, com peso editorial**, que era a direção recomendada. Registrada em **ADR-004**: editorial na narrativa (Sobre, Experiência), densidade de produto nos dados (Skills, Formação, Certificações, Projetos).

A consequência estrutural: **card deixa de ser o padrão e passa a ser exceção**, sobrevivendo só em Projetos. A timeline de Experiência e a ausência de sombras ficam preservadas por decisão explícita.

Destravou AI-014 (agora `READY`), AI-016, AI-017, AI-018, AI-019, e deu alvo definido a AI-006.

**Detalhes:** `docs/decisions/ADR-004-identidade-visual-hibrida.md`

---

### AI-012 — Auditoria visual e arquitetural do frontend

**Status:** DONE · **Prioridade:** ALTA · **Tipo:** auditoria
**Concluída:** 2026-09-15

**Objetivo**
Descrever o frontend como ele é — estrutura, inventário visual, duplicações, contraste, responsividade — antes de decidir qualquer refatoração de identidade.

**Resultado**
- Relatório completo em `.ai/context/AI-012-auditoria-visual.md`, verificado no navegador em 1440/1024/768/390 px nos dois temas.
- 14 sinais de aparência genérica ordenados por impacto; 12 inconsistências com arquivo e linha; inventário de cor, tipografia, espaçamento, radius, borda, sombra e motion extraído do código.
- Contraste medido: `fg-faint`, `fg-subtle` e `accent` no claro reprovam em WCAG AA → task AI-015.
- AI-003 diagnosticada com número e quatro opções de correção; promovida a `READY`.
- Zero overflow horizontal nos quatro viewports — estado verificado, a preservar.
- Três direções visuais propostas com recomendação justificada → decisão em AI-013.
- Plano de refatoração dividido em AI-013 a AI-019.

**Nenhuma mudança visual foi feita.** A única alteração de código da sessão foi AI-002.

**Detalhes:** `.ai/sessions/2026-09-15--AI-012--auditoria-visual.md`

---

### AI-002 — Corrigir classe de cor inexistente na timeline de Experiência

**Status:** DONE · **Prioridade:** ALTA · **Tipo:** bug
**Concluída:** 2026-09-15

**Objetivo**
O marcador circular da timeline usava `bg-background`, token inexistente. O Tailwind não gerava a classe, o círculo ficava transparente e a linha vertical atravessava o ícone.

**Resultado**
- `Experience.tsx:76`: `bg-background` → `bg-canvas`. Uma linha, nada mais.
- Varredura de todas as classes de cor em `src/`: nenhuma outra aponta para token inexistente.
- Confirmado no CSS compilado que `.bg-canvas{background-color:var(--canvas)}` é gerada e que `bg-background` não existe.
- Verificado visualmente nos dois temas em 1440 px: o marcador é opaco e interrompe a linha vertical.
- `npm run ai:health`: lint, typecheck e build `pass`.

**Notas**
A seção `#experiencia` não declara fundo, então herda `--canvas` do `body` — por isso `bg-canvas` é o token correto, e não `bg-surface`.

---

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
