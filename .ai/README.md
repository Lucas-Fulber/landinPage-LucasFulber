# .ai

Contexto operacional voltado a agentes. Markdown carrega significado; JSON carrega estado compacto para máquina.

| Caminho | Papel |
| --- | --- |
| `MEMORY_INDEX.md` | Roteador: onde está cada informação. Hot memory. |
| `config.yml` | Política de memória, contexto, retenção e validação. |
| `state.json` | Estado operacional compacto. |
| `tasks.json` | Índice de tasks para localização rápida. Semântica fica em `TASKS.md`. |
| `health.json` | Resultado da última validação. Fonte única. |
| `maps/` | Mapas de navegação curtos. Não duplicam `docs/`. |
| `context/` | Context packs por task (`AI-XXX.md`). |
| `sessions/` | Registros de sessões significativas. Memória fria. |
| `history/` | Resumos compactados de sessões antigas. |
| `archive/` | Contexto antigo, fora do startup normal. |
| `runtime/` | Saída gerada pelos scripts. Ignorado pelo Git — não é memória. |

Os JSON não replicam documentos. `state.json` aponta para `health.json` em vez de copiar os resultados.
