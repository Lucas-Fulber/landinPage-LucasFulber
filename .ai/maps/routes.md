# Mapa de âncoras

> Não há router. A navegação é por âncora numa única página. Ver ADR-003.

| Âncora | Seção | Componente | Fundo |
| --- | --- | --- | --- |
| `#hero` | (nome, cargo, CTAs) | `Hero.tsx` | canvas |
| `#sobre` | Sobre mim | `About.tsx` | canvas |
| `#skills` | Skills | `Skills.tsx` | `bg-surface` |
| `#experiencia` | Experiência | `Experience.tsx` | canvas |
| `#formacao` | Formação | `Education.tsx` | `bg-surface` |
| `#certificacoes` | Certificações | `Certifications.tsx` | canvas |
| `#projetos` | Projetos | `Projects.tsx` | `bg-surface` |
| `#contato` | Contato | `Contact.tsx` | canvas |

As seções alternam fundo para separar blocos. `#hero` não aparece no menu; é alvo do clique no logo.

## Contrato

Os `id` são definidos no `<section>` de cada componente e referenciados pelo array `links` em `Navbar.tsx`. **Renomear um `id` exige atualizar os dois lugares** — e quebra qualquer link externo que aponte para a âncora.

Os `id` são em português sem acento. Mantenha o padrão.

`vercel.json` reescreve qualquer caminho para `/index.html`; isso tolera URLs inesperadas, não indica rotas.
