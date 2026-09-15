# Roteamento de contexto

Escalonamento progressivo. Comece no Level 0 e suba só enquanto a task exigir. **Não comece no Level 5.**

| Level | O que carregar | Quando |
| --- | --- | --- |
| 0 | `CLAUDE.md`, `PROJECT_STATE.md`, `HANDOFF.md`, task ativa, `.ai/MEMORY_INDEX.md` | Sempre |
| 1 | Context pack da task (`.ai/context/AI-XXX.md`) + arquivos diretamente afetados | Quase sempre |
| 2 | Doc de domínio relevante em `docs/` | Quando a task envolve arquitetura, visual, conteúdo ou SEO |
| 3 | ADR relevante em `docs/decisions/` | Quando a task pode contrariar uma decisão registrada |
| 4 | `.ai/sessions/`, `.ai/history/`, log do Git | Só em investigação: "por que isso ficou assim?" |
| 5 | Exploração ampla do repositório | Só quando os níveis anteriores não responderam |

## Atalhos deste repositório

Antes de varrer arquivos, use os mapas — eles existem para isso:

| Pergunta | Vá direto a |
| --- | --- |
| Onde fica a estrutura? | `.ai/maps/architecture.md` |
| Que componentes existem e como se compõem? | `.ai/maps/components.md` |
| Quais são as âncoras/seções? | `.ai/maps/routes.md` |
| O que o projeto depende e por quê? | `.ai/maps/dependencies.md` |
| Onde está o conteúdo X? | Tabela de dados em `docs/ARCHITECTURE.md` |
| Que token de cor eu uso? | Tabela de tokens em `docs/DESIGN_SYSTEM.md` |

O projeto tem 15 arquivos em `src/`. Ler um componente inteiro é barato; varrer o repositório inteiro para encontrá-lo não é.

## Custo

Cada nível a mais é contexto que a task talvez não precisasse. O objetivo é chegar a uma primeira leitura de aproximadamente 5k tokens e só então decidir o que mais abrir.

Sinal de que algo está errado: se você leu mais de três arquivos e ainda não sabe onde mexer, o que falta é um mapa ou um context pack — crie-o ao encerrar, para a próxima sessão não pagar de novo.
