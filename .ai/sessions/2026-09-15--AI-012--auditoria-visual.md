# 2026-09-15 — AI-012 — Auditoria visual e arquitetural do frontend

**Tasks:** AI-002 (DONE) · AI-012 (DONE) · AI-013 (DONE) · AI-014 (DONE) · **Commit de partida:** `7b3b9a3`

## O que foi feito

AI-002 corrigida (uma linha) e auditoria visual completa do frontend, medida no navegador em 1440/1024/768/390 px nos dois temas. Nenhuma outra mudança de código: cores, fontes, radius, estrutura, textos, animações e dependências ficaram intocados, por instrução explícita do autor.

Relatório completo em `.ai/context/AI-012-auditoria-visual.md`. Não replicado nos outros arquivos de memória.

## Como a auditoria foi feita

Não havia ferramenta de navegador na sessão. Foi escrito um driver CDP em Node puro (sem dependência nova, fora do projeto, no diretório temporário) que sobe o Chrome headless, força o tema, rola a página inteira, captura cada seção e mede contraste e overflow via `getComputedStyle`. Isso trocou impressão por número — e foi o que permitiu diagnosticar AI-003 com precisão e descobrir AI-015.

Dois detalhes do projeto que quebraram a automação na primeira tentativa, e que a próxima sessão deve saber (também registrados em `HANDOFF.md`):

1. **Gravar `localStorage` depois do load não muda o tema.** O `useEffect` de `useTheme` regrava a chave com o estado inicial, desfazendo a escrita. Os dois primeiros lotes de captura mediram o tema claro acreditando medir o escuro. Solução: impor o tema antes do primeiro script do documento (`Page.addScriptToEvaluateOnNewDocument`). A instrumentação que detectou isso — abortar se a classe `dark` não aparecer — deveria existir desde o início.
2. **`whileInView` + `once` deixa o conteúdo abaixo da dobra em `opacity: 0`** até ser rolado. Captura de página inteira sem rolar antes sai com metade do conteúdo invisível.

## Achados que importam

**O problema não é de cor, é de composição.** As oito seções compartilham o mesmo esqueleto — título, divisor verde de 48 px, grade de cards. Sete são literalmente o mesmo markup com dados diferentes. Isso, somado a mais de 30 cards e a densidade uniforme (`py-24` em todas), é o que produz a aparência de template. Trocar paleta ou fonte não resolveria.

**AI-003 estava descrita de forma incompleta.** A hipótese registrada era "card em seção elevada colide com o fundo". A medição mostra que o card sobre canvas tem contraste praticamente igual (1.05) ao card sobre `surface` (1.06): a escala de superfície é curta em geral — 3 % e 6 % de alpha dão no máximo 3 pontos de diferença. Em Formação e Projetos há, além disso, colisão exata de token. Quem separa o card em toda a página é a borda (1.18–1.23), não a superfície. Quatro opções de correção registradas; a recomendada é a de menor risco (`surface-raised` nas seções elevadas), com a decisão de fundo adiada para a refatoração.

**Contraste reprovado em WCAG AA, achado novo:** `fg-faint` (2.56 claro / 2.62 escuro), `fg-subtle` (4.48 / 3.90) e `accent` usado como texto no tema claro (3.30). A assimetria do accent entre temas é grande — 3.30 no claro contra 11.94 no escuro. Virou AI-015 em vez de ser corrigido aqui, porque mexer em `accent` é mudança visível de identidade e a sessão era de auditoria.

**O `@theme inline` tem dois tokens quase mortos:** `--accent-strong` só aparece em `::selection`, e `--info` tem um único uso (status "participação" em Formação). Registrado no inventário; nenhuma ação tomada.

**Opacidade arbitrária funciona, mas engana a medição.** `bg-accent/8` e `border-accent/15` são geradas pelo Tailwind 4 via `color-mix` — verificado no CSS compilado. Mas `getComputedStyle` devolve notação `color(srgb …)` com componentes 0–1; um parser que assume 0–255 produz números plausíveis e errados. A primeira rodada de medição de accent foi descartada por isso.

**Responsividade está sólida.** Zero overflow horizontal nos quatro viewports, nenhum elemento estourando a viewport. Os problemas são de aproveitamento, não de quebra: hero com 40 % vazio em 768 px, `max-w-5xl` deixando 29 % da largura vazia em 1440, colunas de Certificações desbalanceadas (8 itens contra 4), `items-center` desalinhando o topo em Sobre.

**O que já tem personalidade:** a timeline de Experiência é a única seção com forma própria, e a ausência total de sombras é uma decisão coerente e bem executada. São o ponto de partida da identidade, não o que precisa mudar.

## Decisões desta sessão

- **Direção visual escolhida pelo autor ainda nesta sessão: C — híbrida** (editorial na narrativa, densidade nos dados), que era a recomendação. Registrada em **ADR-004**. A consequência estrutural é que card deixa de ser o padrão de layout e passa a ser exceção, válida só em Projetos. AI-013 fechada; AI-014 promovida a `READY`.
- Não implementar nada da direção nesta sessão — a instrução do autor era auditar, e a decisão chegou no fim. A execução começa em AI-014.
- A auditoria propôs as três direções sem protótipo. Editorial puro foi descartado por exigir mais texto autoral do que a página tem; produto puro, por esfriar o conteúdo biográfico.
- O relatório mora num context pack, não em `docs/`. É um instantâneo de estado que serve a um grupo de tasks; `docs/` guarda o sistema, não a auditoria. `docs/DESIGN_SYSTEM.md` só aponta para ele.
- AI-003 promovida de `TODO` a `READY`: ganhou diagnóstico, número e correção definida.
- AI-009 mantida aberta, mas marcada como subconjunto de AI-016, para não fazer o mesmo trabalho duas vezes.
- Não corrigir nada encontrado na auditoria além de AI-002, mesmo sendo tentador (o `items-center` de Sobre é uma linha). Escopo estreito: auditoria não refatora.

## AI-014, na sequência da decisão

Com a direção definida, a foundation foi implementada na mesma sessão: escalas nomeadas em `globals.css` (segundo bloco `@theme`, valores literais, separado do `@theme inline` das cores) e tokens de motion em `src/motion.ts`, porque o CSS não alcança o framer-motion.

Três coisas que valem para quem continuar:

**Sonda descartável para provar que o token existe.** Como classe inexistente passa em silêncio neste projeto, os 18 utilitários novos foram verificados criando um `src/__tokens_probe.tsx` com todas as classes, buildando, conferindo regra por regra no CSS e apagando o arquivo. Sem isso, "o token está definido" seria suposição — e foi exatamente esse tipo de suposição que gerou AI-002.

**Comparação de capturas tem ruído estrutural.** A conferência de "nada mudou" acusou 11 de 30 imagens diferentes. Uma rodada de controle, sem alteração alguma no código, produziu o mesmo conjunto: são as seções com animação em loop (seta do hero, engrenagem "Em Breve") capturadas em frames distintos. Sem o controle, isso teria sido lido como regressão. É mais um argumento para fazer AI-019 antes das migrações grandes.

**Geist Mono foi descartada.** A ADR pede monospace para stack e datas; instalar `@fontsource-variable/geist-mono` seria dependência nova sem necessidade concreta, então `--font-mono` usa a stack do sistema. Se a coesão tipográfica exigir, vira task.

O escopo de AI-014 foi ajustado e o ajuste está registrado na task: o critério original incluía *aplicar* o ritmo vertical, o que se sobrepunha a AI-018 e causaria retrabalho (o radius único mudaria cards que AI-017 vai remover). AI-014 ficou com definir e documentar.

## Validação

`npm run ai:health` após a correção de AI-002: lint `pass`, typecheck `pass`, build `pass`, tests `not_available`. Resultados em `.ai/health.json`.

Verificação visual: 21 capturas em quatro viewports e dois temas. A correção de AI-002 foi confirmada na imagem — o marcador é opaco e interrompe a linha vertical nos dois temas. Confirmado também no CSS compilado que `.bg-canvas` é gerada e que `bg-background` não existe.

Artefato da captura, não bug: a navbar é `fixed`, então aparece no meio das capturas de página inteira.

## Follow-ups

Oito tasks novas: AI-012, AI-013 e AI-014 fechadas aqui; AI-015 a AI-019 abertas. A próxima é **AI-016** (`READY`) — primitivos consumindo a escala nova. Independentes: AI-003, AI-017, AI-018, AI-019 e a parte de cinzas de AI-015.

Dívida deliberada: as duas escalas de tipografia/raio coexistem até o fim de AI-016. Remover a padrão do Tailwind antes disso quebra a página sem erro de build.

Duas tasks registradas no encerramento, por terem ficado sem dono:

- **AI-020** — `accent-strong` (só no `::selection`) e `info` (um único uso) estavam no plano da foundation como "decidir o destino"; com AI-014 fechada, o item ficaria órfão.
- **AI-021** — ao rodar o postflight apareceram `About.tsx` e `index.html` modificados, que **não** eram da sessão: o autor alterou cargo, empresa, vínculo e data de início, e a edição ficou pela metade (Hero e Experience seguem com os dados antigos). As mudanças foram preservadas e não revisadas; a task tem o mapa das quatro divergências e a revisão de forma. Prioridade alta por ser conteúdo factual visível.

Lição de processo: o `git status` do encerramento não serve só para gerar a mensagem de commit — foi ele que revelou trabalho de terceiro no working tree que eu poderia ter empacotado junto sem perceber.

A mudança de AI-002 ficou **sem commit** no working tree, por política do repositório.
