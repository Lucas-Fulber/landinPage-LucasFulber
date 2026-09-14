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

## Deploy

Hospedado na [Vercel](https://vercel.com). Qualquer push na branch `main` dispara um novo deploy automaticamente.

O preset de build é fixado em `vercel.json` (`framework: "vite"`), então a configuração acompanha o repositório.
