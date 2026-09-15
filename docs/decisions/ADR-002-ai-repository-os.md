# ADR-002 — Repositório como memória operacional (AI Repository OS)

Status: Aceita
Data: 2026-09-15

## Contexto

O trabalho neste repositório é feito em sessões de agentes de IA que não compartilham memória entre si. Antes desta decisão, o único contexto versionado era um `CLAUDE.md` de quatro linhas com a regra de idioma. Todo o resto — estado do projeto, decisões tomadas, trabalho pela metade, próximo passo — vivia apenas na conversa e desaparecia com ela.

O resultado prático: cada nova sessão reexplorava o repositório do zero, redescobria as mesmas restrições e perdia trabalho incompleto.

## Decisão

O repositório é a memória persistente do projeto. A conversa não é.

Memória em três camadas, com escalonamento explícito de contexto:

- **Hot** — lida no início de toda sessão, mantida pequena: `CLAUDE.md`, `PROJECT_STATE.md`, `HANDOFF.md`, a task ativa de `TASKS.md`, `.ai/MEMORY_INDEX.md`.
- **Warm** — carregada só quando a task exige: `docs/`.
- **Cold** — consultada só em investigação histórica: `.ai/sessions/`, `.ai/history/`, `.ai/archive/`, Git.

Cada informação tem **um** lugar principal; os outros documentos referenciam. Markdown carrega significado; os JSON em `.ai/` carregam estado compacto para máquina e não replicam documentos.

Decorrências operacionais:

- `.claude/rules/` passa a ser **versionado**. Antes, `.gitignore` ignorava `.claude/` por inteiro, o que tornava as regras invisíveis para qualquer outro clone — incompatível com "o repositório é a memória". Segue ignorado apenas `.claude/settings.local.json`, que é configuração de máquina.
- `.ai/runtime/` é ignorado: é saída gerada, não memória.
- Os scripts de `scripts/ai/` são determinísticos e locais. Não chamam IA, não commitam, não fazem push.
- Resultados de validação têm uma fonte só: `.ai/health.json`. Nenhum outro arquivo replica a tabela.

## Alternativas

- **Manter só `CLAUDE.md`, mais longo** — rejeitada: mistura regra permanente com estado volátil, e cresce até ninguém conseguir manter.
- **Memória fora do repositório** (memória do agente, wiki, Notion) — rejeitada: desacopla do commit, então documentação e código divergem sem sinal, e outro agente não a encontra.
- **Copiar o template sobre o repositório** — rejeitada: o template era genérico, com placeholders `TODO` e scripts sintaticamente quebrados. Conteúdo não verificado é pior que ausência de conteúdo, porque é lido como fato.
- **Um único arquivo de memória** — rejeitada: força ler estado histórico para descobrir o próximo passo, que é justamente o custo que se quer eliminar.

## Consequências

- Uma sessão nova consegue partir de "Continue o projeto" lendo cinco arquivos curtos.
- **Encerrar trabalho tem custo fixo:** atualizar task, reescrever handoff, e atualizar estado quando ele mudou. Pular isso quebra o sistema para a sessão seguinte, silenciosamente.
- A memória pode divergir do código. A hierarquia de fontes de verdade em `CLAUDE.md` resolve o empate: código vence documentação, e documentação obsoleta deve ser corrigida quando detectada.
- `.ai/sessions/` cresce. Sem a política de compactação de `.claude/rules/memory.md`, volta a virar contexto caro.
- `.claude/rules/` versionado significa que mudança de regra é revisável em diff — e também que ela chega a todos os clones.
- Adicionados os scripts `typecheck` e `ai:*` ao `package.json`. `typecheck` existe para que a validação diga qual etapa quebrou, já que `build` junta type-check e bundle.
