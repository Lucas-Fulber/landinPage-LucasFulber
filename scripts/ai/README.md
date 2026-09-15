# scripts/ai

Apoio determinístico ao ciclo de trabalho do agente. Todos são locais, não destrutivos, não chamam IA, não commitam e não fazem push.

| Script | Comando | O que faz |
| --- | --- | --- |
| `preflight.mjs` | `npm run ai:preflight` | Branch, commit, git status, scripts disponíveis, estado operacional, task ativa e última validação. |
| `context.mjs` | `npm run ai:context` | Concatena a hot memory em `.ai/runtime/context.md`. Aceita um ID de task: `node scripts/ai/context.mjs AI-004`. |
| `health.mjs` | `npm run ai:health` | Roda lint, typecheck, test e build conforme existirem e grava `.ai/health.json`. `--skip-build` para ciclo rápido. |
| `postflight.mjs` | `npm run ai:postflight` | Git status, diff stat e checklist de encerramento. |

`_shared.mjs` concentra leitura de arquivos, execução de comandos e resolução da raiz do repositório — os scripts funcionam de qualquer diretório.

Saídas geradas ficam em `.ai/runtime/`, que é ignorado pelo Git: é contexto transitório, não memória.

`health.mjs` é o único que escreve fora de `.ai/runtime/` — ele grava `.ai/health.json`, a fonte de verdade dos resultados de validação. Nenhum outro arquivo de memória deve replicar esses resultados.
