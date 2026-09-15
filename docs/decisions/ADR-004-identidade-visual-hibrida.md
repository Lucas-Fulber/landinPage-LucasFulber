# ADR-004 — Identidade visual híbrida: editorial na narrativa, densidade nos dados

Status: Aceita
Data: 2026-09-15

## Contexto

A auditoria AI-012 mediu o frontend no navegador e concluiu que a aparência genérica da página não vem da paleta nem da fonte, e sim da **composição**: sete das oito seções são o mesmo esqueleto (título, divisor verde de 48 px, grade de cards), com mais de 30 cards, `py-24` uniforme e cerca de 57 elementos animando individualmente na entrada. Inventário e medições completas em `.ai/context/AI-012-auditoria-visual.md`.

Três direções foram propostas: **A** editorial técnico, **B** produto/software técnico, **C** híbrido. O autor escolheu **C**.

## Decisão

A identidade é **híbrida, com peso editorial**: tratamento editorial onde o conteúdo é narrativa, densidade de produto onde o conteúdo é dado enumerável.

| Aspecto | Regra |
| --- | --- |
| Faixas de layout | Duas: bloco de leitura estreito para Sobre e Experiência; grade densa para Skills, Formação, Certificações e Projetos. |
| Tipografia | Geist em toda a página. Escala editorial reduzida a ~6 papéis nomeados (hoje há nove tamanhos ad-hoc). Monospace apenas em stack, datas e identificadores. |
| Card | **Deixa de ser o padrão e passa a ser exceção**: sobrevive em Projetos, onde corresponde a um objeto real. Nas outras seções, régua e espaçamento separam. |
| Radius | Um valor pequeno + `rounded-full` só onde é círculo de verdade (marcador da timeline). |
| Bordas | Separador horizontal como padrão, caixa como exceção. Contraste de borda maior que o atual. |
| Sombras | Continuam proibidas. |
| Accent | Um verde só, recalibrado para passar WCAG AA no tema claro (ver AI-015). |
| Motion | Uma entrada por seção. Sem stagger por item, sem loop decorativo. |
| Densidade | Média-alta, **variando por seção** — a variação de densidade é o ritmo da página. |
| Navegação | Barra fixa sóbria, sem pill, com indicação da seção corrente. |
| Experiência | A timeline atual é refinada, não substituída. |

## Alternativas

- **A — editorial técnico puro:** rejeitada. Exigiria mais texto autoral do que a página tem, e uma escolha tipográfica (serifa para títulos) que não se avalia sem protótipo. Listas longas como as 26 skills e as 12 certificações sofrem no formato.
- **B — produto/software puro:** rejeitada. Metade do conteúdo é biográfico e fica frio em tabelas; devolveria a aparência de SaaS que se quer abandonar.

## Consequências

- **"Excesso de cards" deixa de ser uma restrição de estilo e passa a ser uma regra estrutural.** Adicionar um card fora de Projetos contraria esta ADR.
- Formação e Certificações mudam de forma (AI-017). A correção de AI-003 em `Education` é provisória e será substituída — isso é esperado, não retrabalho por erro.
- A escala tipográfica e a de espaçamento precisam ser decididas antes das mudanças de UI, ou cada task escolhe valor por conta (AI-014).
- A recalibração do accent muda a cor mais visível do site. É necessária por acessibilidade (3.30 no claro), mas é mudança de identidade e não só correção.
- Os dois ativos preservados são a **timeline de Experiência** e a **ausência total de sombras**: qualquer proposta que os remova contraria esta ADR.
- O glow e o pill do Hero (AI-006) não têm lugar nesta direção; a task passa a ter um alvo definido em vez de depender de gosto.
- `docs/DESIGN_SYSTEM.md` descreve o sistema **atual**. Enquanto AI-014 não rodar, ele e esta ADR descrevem estados diferentes — a ADR é o destino, o doc é o presente.
