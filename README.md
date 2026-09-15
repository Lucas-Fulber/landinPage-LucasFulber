# Landing Page — Lucas Fulber

Portfólio pessoal desenvolvido com React e Tailwind CSS, apresentando projetos, habilidades, formação e informações de contato.

## Tecnologias

- [React 19](https://react.dev)
- [Vite 8](https://vite.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Type-check + build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Verificação de lint |
| `npm run typecheck` | Type-check isolado (`tsc --noEmit`) |

## Trabalhando com agentes de IA

Este repositório funciona como memória operacional persistente: estado, tarefas e decisões vivem em arquivos versionados, não na conversa.

| Arquivo | Papel |
| --- | --- |
| [CLAUDE.md](CLAUDE.md) | Regras de trabalho — comece por aqui |
| [PROJECT_STATE.md](PROJECT_STATE.md) | Estado atual do projeto |
| [HANDOFF.md](HANDOFF.md) | Ponto de continuação imediato |
| [TASKS.md](TASKS.md) | Tarefas e status |
| [.ai/MEMORY_INDEX.md](.ai/MEMORY_INDEX.md) | Onde encontrar cada coisa |
| [docs/](docs/) | Arquitetura, design system, conteúdo, SEO, decisões |

| Comando | Descrição |
| --- | --- |
| `npm run ai:preflight` | Branch, commit, status, scripts e estado operacional |
| `npm run ai:context` | Concatena a memória ativa em `.ai/runtime/context.md` |
| `npm run ai:health` | Roda a validação disponível e grava `.ai/health.json` |
| `npm run ai:postflight` | Diff e checklist de encerramento |

Os scripts são locais e determinísticos: não chamam IA, não commitam e não fazem push.

## Deploy

Hospedado na [Vercel](https://vercel.com). Qualquer push na branch `main` dispara um novo deploy automaticamente.

O preset de build é fixado em `vercel.json` (`framework: "vite"`), então a configuração acompanha o repositório.
