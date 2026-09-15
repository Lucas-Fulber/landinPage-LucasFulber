# Regras de memória

## Um lugar por informação

Esta é a regra mais fácil de violar e a que mais degrada o sistema.

| Informação | Lugar único |
| --- | --- |
| Regras permanentes de trabalho | `CLAUDE.md` (resumo) + `.claude/rules/` (procedimento) |
| Estado operacional atual | `PROJECT_STATE.md` |
| Ponto de continuação imediato | `HANDOFF.md` |
| Trabalho: o quê, status, critérios | `TASKS.md` |
| Índice de tasks para máquina | `.ai/tasks.json` |
| Estado para máquina | `.ai/state.json` |
| Resultados de validação | `.ai/health.json` — e **somente** ali |
| Arquitetura detalhada | `docs/ARCHITECTURE.md` |
| Restrições visuais | `docs/DESIGN_SYSTEM.md` |
| Decisões duráveis | `docs/decisions/` |
| Navegação rápida | `.ai/maps/` |
| Contexto de uma task | `.ai/context/AI-XXX.md` |
| Histórico | `.ai/sessions/` → `.ai/history/` → Git |

Referencie; não copie. `PROJECT_STATE.md` resume e aponta para `docs/ARCHITECTURE.md`, não o reproduz. Nenhum documento replica a tabela de health.

## O que persistir

Restrições não óbvias, decisões duráveis, armadilhas recorrentes, estado de task, bloqueios, estado verificado e ponto de continuação exato.

## O que não persistir

Diffs, saída de terminal, ruído de depuração, fatos óbvios a partir do código, especulação, segredos. O Git já guarda o histórico técnico.

Teste rápido: **se o código responde, não escreva.** Se responder exige ler seis arquivos, escreva um mapa.

## Trabalho descoberto fora do escopo

Não implemente em silêncio e não deixe passar. Crie task nova em `TASKS.md` com ID, status `TODO`, e o suficiente para alguém decidir a prioridade depois. Registre onde você viu.

## Compactação

Limiares em `.ai/config.yml`. Quando `.ai/sessions/` passar de 10 arquivos:

1. leia as sessões antigas;
2. extraia o que é durável;
3. promova para ADR, `PROJECT_STATE.md` ou `TASKS.md` o que ainda importa;
4. escreva um resumo em `.ai/history/` (por marco ou por mês, não um log gigante);
5. mova as sessões compactadas para `.ai/archive/`;
6. descarte o resto.

Mesma política para a seção `Done` de `TASKS.md` quando passar de ~10 itens.

**Nunca compacte contexto ainda necessário para task aberta.** Antes de arquivar uma sessão, verifique se alguma task `PARTIAL`, `BLOCKED`, `TODO` ou `READY` a referencia.

Compactação é trabalho de manutenção: registre que você a fez, no registro de sessão.
