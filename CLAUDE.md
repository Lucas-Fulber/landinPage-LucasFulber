# Instruções do projeto

## Idioma

Sempre responda em **português brasileiro (pt-BR)**, independentemente do idioma usado pelo usuário. Acentuação correta, sempre. Vale para respostas, comentários de código, commits e documentação. Identificadores de código e termos técnicos permanecem no original.

## Como este repositório funciona

Este repositório é a **memória persistente** do projeto. A conversa não é. Toda sessão deve terminar deixando o repositório em estado que outra sessão continue sem precisar do histórico do chat. Ver ADR-002.

### Início de sessão

1. `git status`
2. `npm run ai:preflight`
3. Este arquivo
4. `PROJECT_STATE.md`
5. `HANDOFF.md`
6. A task ativa em `TASKS.md` — **só ela**
7. `.ai/MEMORY_INDEX.md`
8. Só então: código e docs relevantes à task

Não carregue histórico por padrão. Não varra `src/` antes de saber o que a task pede. Procedimento completo em `.claude/rules/agent-lifecycle.md`; níveis de contexto em `.claude/rules/context-routing.md`.

Alvo de contexto inicial: ~5k tokens.

### Fim de sessão

`npm run ai:health` → `git diff` → atualizar task (`TASKS.md` + `.ai/tasks.json`) → atualizar `PROJECT_STATE.md` se o estado mudou → reescrever `HANDOFF.md` → docs/ADR se necessário → registro de sessão se foi significativa.

`npm run ai:postflight` imprime esse checklist com o diff.

**Trabalho incompleto nunca desaparece.** Use `PARTIAL` ou `BLOCKED` e registre o próximo passo exato.

## Fontes de verdade

1. **Código-fonte** — verdade da implementação.
2. **`package.json` e configs** (`tsconfig.json`, `vite.config.ts`, `eslint.config.mjs`, `vercel.json`) — verdade de scripts, dependências e tooling.
3. **`docs/decisions/`** — decisões duráveis.
4. **`TASKS.md`** — trabalho. Status: `TODO`, `READY`, `IN_PROGRESS`, `PARTIAL`, `BLOCKED`, `DONE`, `CANCELLED`.
5. **`PROJECT_STATE.md`** — estado operacional atual.
6. **`HANDOFF.md`** — apenas o ponto de continuação.
7. **`.ai/health.json`** — resultados de validação. Única fonte.
8. **`.ai/sessions/`, `.ai/history/`, Git** — histórico.

Documentação divergindo do código: o **código vence**. Verifique a implementação e corrija a documentação obsoleta.

Cada informação tem um lugar só. Referencie, não copie — ver `.claude/rules/memory.md`.

## O projeto

Portfólio pessoal de Lucas Fulber Lima. Single-page estática, oito seções de conteúdo literal.

**Stack:** React 19.2.4 (fixado) · Vite 8 · TypeScript strict · Tailwind CSS 4 (sem config, tokens em `src/globals.css`) · framer-motion · lucide-react · Geist Variable.

**Sem:** backend, rotas, gerenciador de estado, cliente HTTP, variáveis de ambiente, testes, CI.

**Comandos:**

| | |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | `tsc --noEmit && vite build` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run ai:preflight` · `ai:context` · `ai:health` · `ai:postflight` | Apoio ao ciclo do agente |

**Arquitetura:** `docs/ARCHITECTURE.md` · mapas em `.ai/maps/`
**Visual:** `docs/DESIGN_SYSTEM.md` — inclui as restrições estéticas do projeto
**Conteúdo:** `docs/CONTENT_GUIDE.md` · **SEO:** `docs/SEO.md`

## Regras de trabalho

- Inspecione antes de modificar. Procure antes de criar.
- Reutilize os padrões que já existem — este projeto repete padrões de propósito.
- Mantenha o escopo estreito. Trabalho novo e não relacionado vira **task nova**, não escopo esticado.
- Sem refatoração oportunista, sem dependência nova sem necessidade concreta, sem abstração sem caso de uso real.
- Nunca afirme validação sem ter rodado. Distinga falha sua de falha pré-existente.
- **Cuidado específico deste projeto:** classe Tailwind inválida passa por lint, typecheck e build sem um aviso. Mudança visual exige verificação visual.
- Preserve mudanças não commitadas do usuário.
- Prefira ações reversíveis.

## Segurança

**Push em `main` publica em produção** (Vercel, deploy automático, sem staging).

Nunca sem pedido explícito: `commit`, `push`, PR. Nunca sem aprovação explícita: `push --force`, `reset --hard`, reescrita de histórico, deleção de branch ou deleção em massa. Autorização é por ação e por momento.

Nunca grave segredo em arquivo de memória. Detalhes em `.claude/rules/git.md`.
