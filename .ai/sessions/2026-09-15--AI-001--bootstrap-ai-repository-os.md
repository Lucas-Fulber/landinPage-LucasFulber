# 2026-09-15 — AI-001 — Bootstrap do AI Repository OS

**Task:** AI-001 · **Resultado:** DONE · **Commit de partida:** `0f1c633`

## O que foi feito

Auditoria do repositório e do `ai-repository-os-template/`, consolidação dos dois e implantação da memória operacional adaptada à arquitetura real. Template removido ao final.

Nenhum arquivo de `src/`, `public/` ou `index.html` foi alterado. Mudanças de tooling limitadas a `package.json` (aditivas) e `eslint.config.mjs`.

## Achados que importam

**O template estava quebrado.** Os quatro scripts em `scripts/ai/` tinham newline literal dentro de string literal — erro de sintaxe. Consequência real: `npm run lint` estava falhando no repositório inteiro por causa deles, porque o ESLint varre a raiz. Reescritos do zero, com `_shared.mjs` para resolução de raiz e execução de comandos multiplataforma (`npm.cmd` no Windows).

**A infraestrutura AI-first existente era um `CLAUDE.md` de quatro linhas** (só a regra de idioma). Não existiam `AGENTS.md`, `.claude/` nem `docs/`, ao contrário do que se supunha ao iniciar. Não houve, portanto, conflito de consolidação — houve criação, preservando a regra de idioma.

**`.claude/` estava inteiramente ignorado pelo Git.** Incompatível com "o repositório é a memória": regras invisíveis em qualquer outro clone. Passou a versionar `.claude/rules/`, ignorando apenas `settings.local.json`. Registrado em ADR-002.

**Bug encontrado na auditoria:** `bg-background` em `Experience.tsx:76` é classe morta — o token é `--color-canvas`. Confirmado que a classe não aparece no CSS gerado. Não corrigido: virou AI-002, para não misturar mudança de produto com bootstrap de infraestrutura.

**O pipeline não pega erro de classe Tailwind.** Lint, typecheck e build passam com classe inexistente. Isso motivou AI-007 (estratégia de testes) e está registrado em `.claude/rules/validation.md` como limite conhecido do tooling.

**Duas decisões estavam implícitas no código e não registradas:** os tokens semânticos de cor (ADR-001) e a opção por single page sem router (ADR-003). São exatamente o tipo de decisão que um agente futuro desfaz "por boa prática". Registradas retroativamente.

## Decisões desta sessão

- ADR-002 — repositório como memória operacional, incluindo versionar `.claude/rules/` e manter `.ai/health.json` como fonte única de validação.
- Não criar CI. Workflow roda na conta GitHub do autor; virou AI-011, aguardando autorização.
- Não replicar a tabela de health em `PROJECT_STATE.md` nem em `state.json` — `state.json` usa `{"$ref": ".ai/health.json"}`.
- `typecheck` adicionado ao `package.json` para que a validação diga qual etapa quebrou, já que `build` junta type-check e bundle.

## Validação

`npm run ai:health` no encerramento: lint `pass`, typecheck `pass`, build `pass`, tests `not_available`. Resultados em `.ai/health.json`.

Baseline antes das mudanças: build e typecheck passavam; lint falhava (4 erros, todos no template).

## Follow-ups

Onze tasks abertas, AI-002 a AI-011, todas com evidência no código. Cinco dependem de decisão do autor: AI-004 (domínio de produção), AI-006 (visual do Hero), AI-007 (testes), AI-008 (quais projetos), AI-011 (autorizar CI).

Nada commitado. O working tree carrega todas as mudanças do bootstrap.
