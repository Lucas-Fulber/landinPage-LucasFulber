# Regras de Git

## Sempre

- `git status` antes de trabalho significativo.
- `git diff` antes de encerrar.
- Preservar mudanças não commitadas que já estavam no working tree.

## Nunca sem autorização explícita do autor

- `commit`, `push`, abertura de PR.
- `push --force`, `reset --hard`, `rebase` que reescreve histórico.
- Deleção de branch, `clean` destrutivo, deleção em massa de arquivos.

Autorização é por ação e por momento. Ter commitado uma vez não autoriza commitar de novo.

## Contexto deste repositório

- Branch de trabalho: `main`. Remoto: `origin` (SSH).
- **Push em `main` dispara deploy na Vercel.** Não há branch de staging. Por isso commit e push aqui são ações de publicação, não de salvamento.
- `dist/` é ignorado e gerado pelo build.
- `.ai/runtime/` é ignorado: saída transitória dos scripts.
- `.claude/rules/` é versionado de propósito — as regras precisam chegar a todo clone. Ver ADR-002. Só `.claude/settings.local.json` fica fora.

## Mensagens de commit

O histórico usa Conventional Commits em português: `feat:`, `fix:`, com descrição no imperativo. Siga o padrão quando for autorizado a commitar.
