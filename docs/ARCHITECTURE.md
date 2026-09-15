# Arquitetura

> Warm memory. Carregue quando a task envolver estrutura, composição ou fluxo de dados.
> Verificado contra o commit `0f1c633` em 2026-09-15.

## Visão geral

Single-page application estática. Sem backend, sem rotas, sem chamadas de rede em runtime, sem variáveis de ambiente. Todo o conteúdo é literal no código-fonte.

```text
index.html  →  src/main.tsx  →  src/App.tsx  →  seções em src/components/
```

O build produz HTML/CSS/JS estáticos em `dist/`. Ver [ADR-003](decisions/ADR-003-single-page-sem-router.md) para a decisão de não usar router.

## Pontos de entrada

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Shell HTML, metadados/SEO, `<div id="root">` e script inline que aplica o tema antes da primeira pintura. |
| `src/main.tsx` | Monta o React em `#root` sob `StrictMode`; importa a fonte Geist e `globals.css`. |
| `src/App.tsx` | Envolve tudo em `MotionConfig reducedMotion="user"` e ordena as seções. |

O script inline em `index.html` é deliberado: ele lê `localStorage.tema` e aplica a classe `dark` antes do React montar, evitando flash de tema. Isso cria um acoplamento intencional entre `index.html` e `src/hooks/useTheme.ts` — **os dois usam a chave `"tema"` e o valor `"escuro"`**. Alterar um exige alterar o outro.

## Roteamento

Não há. A navegação é por âncora e scroll suave dentro de uma única página. Ver `.ai/maps/routes.md` para a lista de âncoras.

## Composição de UI

Uma seção por componente, todas irmãs diretas de `<main>`. Não existe hierarquia de componentes aninhados nem biblioteca de componentes compartilhados. Ver `.ai/maps/components.md`.

Consequência prática: cada seção repete seu próprio bloco de animação de entrada e seus próprios wrappers de layout (`max-w-5xl mx-auto`, `py-24 px-4`). Não há abstração. Isso é aceitável na escala atual e é um ponto de atenção se novas seções forem adicionadas.

## Dados

Todos os dados são arrays/objetos literais no topo do componente que os consome:

| Dado | Onde vive |
| --- | --- |
| Links de navegação | `src/components/Navbar.tsx` (`links`) |
| Experiências | `src/components/Experience.tsx` (`experiences`) |
| Formação | `src/components/Education.tsx` (`educations`) |
| Certificações | `src/components/Certifications.tsx` (`issuers`) |
| Projetos | `src/components/Projects.tsx` (`projects`, `comingSoonProjects`) |
| Skills | `src/components/Skills.tsx` (`categories`) |
| Contatos | `src/components/Contact.tsx` (`links`) |

Não há camada de dados, fetch, CMS ou arquivo de conteúdo centralizado. Atualizar conteúdo significa editar o componente.

## Estado

O único estado não-local é o tema, em `src/hooks/useTheme.ts`. Ele não usa Context: guarda estado com `useState` e escreve na classe do `<html>` e no `localStorage`.

**Restrição importante:** `useTheme` tem exatamente um consumidor (`ThemeToggle`). Como não há Context, chamar o hook em um segundo componente criaria uma instância de estado independente e os dois dessincronizariam. O comentário em `Navbar.tsx` registra que o `ThemeToggle` fica fora do menu mobile justamente para existir só uma vez. Se outro componente precisar ler o tema, o hook precisa virar Context primeiro.

Demais estados são locais: `open` e `scrolled` em `Navbar`.

## Serviços e integrações

Nenhuma integração em runtime. Existem apenas links externos de saída (LinkedIn, GitHub, Alura, WhatsApp, `mailto:`).

## Direção de dependências

```text
App → components → hooks
components → @/… (alias para src/)
```

Sem dependências circulares. Nenhum componente importa outro componente, com uma exceção: `Navbar` importa `ThemeToggle`.

## Restrições

- **Alias `@/`** aponta para `src/` e está declarado em dois lugares que precisam ficar em sincronia: `tsconfig.json` (`paths`) e `vite.config.ts` (`resolve.alias`).
- **Tailwind CSS 4** sem arquivo de config: tokens e variantes vivem em `src/globals.css` via `@theme inline` e `@custom-variant`.
- **Deploy Vercel**, preset fixado em `vercel.json`, com rewrite de todas as rotas para `/index.html`. Push em `main` dispara deploy.
- **Sem testes e sem test runner** instalado.
- `tsc --noEmit` cobre `src` e `vite.config.ts` apenas (ver `include` no `tsconfig.json`) — scripts em `scripts/` não são type-checked.
