# Ciclo de vida do agente

Referenciado por `CLAUDE.md`. Este arquivo é o procedimento; `CLAUDE.md` é o resumo.

## START

```text
git status
    ↓
preflight  (npm run ai:preflight)
    ↓
CLAUDE.md
    ↓
PROJECT_STATE.md
    ↓
HANDOFF.md
    ↓
task ativa em TASKS.md
    ↓
.ai/MEMORY_INDEX.md
    ↓
código/docs relevantes à task
```

Pare no nível mínimo que responde à task. Não carregue `docs/` inteiro, não leia `.ai/sessions/` por hábito, não varra `src/` antes de saber o que a task pede. Ver `context-routing.md`.

Se `HANDOFF.md` aponta uma task `PARTIAL` ou `BLOCKED`, leia o "Próximo passo exato" dela antes de qualquer outra coisa — é o caminho mais curto para retomar.

## WORK

```text
inspecionar
    ↓
implementar
    ↓
validar premissas contra o código
    ↓
manter o escopo
```

- Leia o arquivo antes de editá-lo.
- Procure antes de criar. Este projeto tem padrões repetidos (animação de entrada, wrappers de layout, tokens de cor) — siga o que existe.
- Verifique premissa contra código, nunca contra documentação. Se divergirem, o código vence e a documentação deve ser corrigida.
- Trabalho novo e não relacionado vira **task nova**, não escopo esticado. Ver `memory.md`.
- Não atualize memória a cada edição pequena. Atualize no encerramento.

## FINISH

```text
validação  (npm run ai:health)
    ↓
git diff
    ↓
atualizar task (TASKS.md + .ai/tasks.json)
    ↓
atualizar PROJECT_STATE.md se o estado operacional mudou
    ↓
reescrever HANDOFF.md
    ↓
docs/ADR se necessário
    ↓
registro de sessão se a sessão foi significativa
    ↓
manutenção de memória se os limiares estouraram
```

`npm run ai:postflight` imprime esse checklist com o diff ao lado.

Nunca reivindique validação sem ter rodado. Distinga falha causada pela sua mudança de falha pré-existente.

## Trabalho incompleto

Nunca deixe trabalho incompleto sem registro. Use `PARTIAL` (começou, não terminou) ou `BLOCKED` (não pode prosseguir).

Em qualquer dos dois, registre na task:

- o que foi feito;
- o que falta;
- o motivo da parada;
- arquivos envolvidos;
- estado da validação;
- **próximo passo exato** — uma ação concreta, não "continuar a implementação".

E reescreva `HANDOFF.md` apontando para lá.

## Segurança

- Não commite, não faça push, não abra PR sem pedido explícito.
- Nunca sem aprovação explícita: `push --force`, `reset --hard`, reescrita de histórico, deleção de branch, `clean` destrutivo, deleção em massa.
- Preserve mudanças não commitadas do usuário que estiverem no working tree.
- Nunca grave segredo em arquivo de memória: senha, token, chave de API, certificado, valor real de `.env`.
