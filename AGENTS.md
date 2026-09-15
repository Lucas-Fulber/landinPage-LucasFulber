# Agentes

Este arquivo existe para agentes que procuram `AGENTS.md` por convenção. Ele não duplica as regras — ele aponta para elas.

**Leia [`CLAUDE.md`](CLAUDE.md).** É a fonte de verdade das instruções de trabalho deste repositório.

## Início rápido

```bash
npm run ai:preflight
```

Depois: `CLAUDE.md` → `PROJECT_STATE.md` → `HANDOFF.md` → a task ativa em `TASKS.md` → `.ai/MEMORY_INDEX.md`.

`.ai/MEMORY_INDEX.md` diz onde está todo o resto. Consulte-o antes de explorar o repositório.

## Encerramento

```bash
npm run ai:health
npm run ai:postflight
```

Atualize a task, reescreva `HANDOFF.md`, e registre trabalho incompleto como `PARTIAL` ou `BLOCKED` com o próximo passo exato.

## Dois limites que não se negociam

- Não commite, não faça push, não abra PR sem autorização explícita. Push em `main` publica em produção.
- Responda em português do Brasil.
