# Regras de validação

## Comandos reais deste repositório

| Check | Comando | Observação |
| --- | --- | --- |
| Lint | `npm run lint` | ESLint 9 flat config. Cobre `src/` (ts/tsx) e `scripts/` (mjs). |
| Typecheck | `npm run typecheck` | `tsc --noEmit`. Cobre `src` e `vite.config.ts`. |
| Build | `npm run build` | `tsc --noEmit && vite build`. Inclui o typecheck. |
| Tests | — | **Não existe.** Sem test runner instalado. Ver task AI-007. |

`npm run ai:health` roda os quatro na ordem e grava `.ai/health.json`. Use `--skip-build` no ciclo rápido.

## Estados

`pass`, `fail`, `not_available` (o comando não existe no projeto), `not_run` (existe e não foi executado).

Nunca registre `pass` sem ter executado. Nunca registre `not_available` para algo que existe e você só não rodou — isso é `not_run`.

## Disciplina

- Rode a validação antes de encerrar, não no meio de cada edição.
- Distinga falha causada pela sua mudança de falha pré-existente. Se for pré-existente, diga isso e registre como task em vez de esticar o escopo.
- `.ai/health.json` é a única fonte dos resultados. Não copie a tabela para `PROJECT_STATE.md` nem para `HANDOFF.md` — aponte para o arquivo.
- Build verde não é prova de que a UI está correta. Este projeto não tem teste: uma classe Tailwind inexistente passa lint, typecheck e build sem um aviso (foi o caso de `bg-background`). Mudança visual precisa de verificação visual — `npm run dev`.

## Limite do tooling

Type-check não cobre `scripts/` (fora do `include` do `tsconfig.json`), e lint não valida nome de classe Tailwind. Saiba o que a validação **não** garante antes de afirmar que algo está certo.
