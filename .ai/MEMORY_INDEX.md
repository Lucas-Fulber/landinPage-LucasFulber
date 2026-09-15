# Índice de memória

> Hot memory. Este arquivo é um **roteador**: ele diz onde está cada coisa, para você não procurar às cegas.

## Sempre (Level 0)

| O que | Onde |
| --- | --- |
| Regras de trabalho | `CLAUDE.md` |
| Estado atual do projeto | `PROJECT_STATE.md` |
| Ponto de continuação imediato | `HANDOFF.md` |
| Trabalho e status | `TASKS.md` |
| Índice de tasks (máquina) | `.ai/tasks.json` |

## Procedimento do agente

| O que | Onde |
| --- | --- |
| Ciclo start/work/finish, trabalho incompleto | `.claude/rules/agent-lifecycle.md` |
| Níveis de contexto e atalhos | `.claude/rules/context-routing.md` |
| Um lugar por informação, compactação | `.claude/rules/memory.md` |
| Comandos de validação e estados | `.claude/rules/validation.md` |
| Limites de Git | `.claude/rules/git.md` |
| Quando atualizar doc, quando criar ADR | `.claude/rules/documentation.md` |

## Arquitetura

| O que | Onde |
| --- | --- |
| Estrutura, estado, dados, restrições | `docs/ARCHITECTURE.md` |
| Mapa compacto | `.ai/maps/architecture.md` |
| Componentes e composição | `.ai/maps/components.md` |
| Âncoras/seções | `.ai/maps/routes.md` |
| Dependências e por que existem | `.ai/maps/dependencies.md` |

## Produto

| O que | Onde |
| --- | --- |
| Tokens, tipografia, motion, restrições visuais | `docs/DESIGN_SYSTEM.md` |
| Tom, idioma, consistência factual | `docs/CONTENT_GUIDE.md` |
| Metadados e lacunas | `docs/SEO.md` |

## Decisões

| O que | Onde |
| --- | --- |
| Índice | `docs/decisions/INDEX.md` |
| Tokens de cor e tema | `docs/decisions/ADR-001-tokens-semanticos-de-cor.md` |
| AI Repository OS | `docs/decisions/ADR-002-ai-repository-os.md` |
| Single page sem router | `docs/decisions/ADR-003-single-page-sem-router.md` |
| Direção da identidade visual | `docs/decisions/ADR-004-identidade-visual-hibrida.md` |

## Estado de máquina

| O que | Onde |
| --- | --- |
| Foco, task ativa, commit verificado | `.ai/state.json` |
| Resultado da última validação | `.ai/health.json` |
| Política de memória e limiares | `.ai/config.yml` |

## Histórico (Level 4 — só em investigação)

| O que | Onde |
| --- | --- |
| Sessões recentes | `.ai/sessions/` |
| Resumos compactados | `.ai/history/` |
| Arquivo morto | `.ai/archive/` |
| Histórico técnico | `git log` |

## Context packs

`.ai/context/AI-XXX.md` — contexto de uma task específica. Base em `.ai/context/TEMPLATE.md`.

Existentes:

| Pack | Cobre |
| --- | --- |
| `AI-004.md` | SEO e metadados |
| `AI-012-auditoria-visual.md` | Auditoria visual do frontend: inventário medido, contraste, responsividade, direções e plano. Serve AI-003, AI-006, AI-008 e AI-013 a AI-019. |

Crie um só quando ele evitar exploração repetida. Não crie para toda task.

## Não procure aqui

- Conteúdo de texto do site: está literal nos componentes. Tabela em `docs/ARCHITECTURE.md`.
- Variáveis de ambiente: **não existem** neste projeto.
- Configuração de rotas: **não existe**. Ver ADR-003.
- Testes: **não existem**. Ver task AI-007.
