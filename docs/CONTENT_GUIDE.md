# Guia de conteúdo

> Warm memory. Carregue quando a task envolver texto visível ao usuário.
> Verificado contra o commit `0f1c633` em 2026-09-15.

## Idioma

Todo o conteúdo visível é em **português do Brasil**, com acentuação correta. `index.html` declara `lang="pt-BR"` e `og:locale=pt_BR`.

Identificadores de código, nomes de tecnologias e termos técnicos consagrados permanecem no original (`Skills`, `Full Stack`, `Next.js`). Os `id` das seções são em português sem acento (`#experiencia`, `#formacao`, `#certificacoes`) — ver `.ai/maps/routes.md`.

O código tem comentários em português. Mantenha.

## Tom

Direto, factual, específico, primeira pessoa quando falar de si. O texto de `About.tsx` é a referência de tom: conta trajetória concreta (infra → redes → full stack), nomeia empresas, tecnologias e datas reais.

**Escreva:** responsabilidades reais, tecnologias efetivamente usadas, decisões técnicas tomadas, resultados que você consegue sustentar numa conversa.

**Não escreva:** superlativos vagos ("soluções inovadoras", "paixão por tecnologia", "apaixonado por resolver problemas"), promessas de marketing, adjetivos sem lastro, jargão de IA.

## Onde cada conteúdo vive

Não existe arquivo de conteúdo centralizado. Cada texto é literal no componente da seção — ver a tabela de dados em `ARCHITECTURE.md`.

Ao editar conteúdo, mude **somente** o array/objeto relevante. Conteúdo não é motivo para refatorar componente.

## Consistência factual

Estes fatos aparecem em mais de um lugar e precisam concordar entre si:

| Fato | Onde aparece |
| --- | --- |
| Cargo atual ("Desenvolvedor Full Stack Jr.") | `index.html` (title, og, twitter), `Hero.tsx`, `About.tsx`, `Experience.tsx` |
| Empresa atual (Celeiro Crédito Agro, desde Mai/2026) | `About.tsx`, `Experience.tsx` |
| Localização (Porto Alegre, RS) | `index.html`, `Hero.tsx`, `About.tsx`, `Contact.tsx` |
| Formação em andamento (FAQI, One Bit Code) | `About.tsx`, `Education.tsx` |
| Stack principal | `index.html` (description/keywords), `About.tsx`, `Skills.tsx` |

Ao atualizar qualquer um deles, verifique todos os lugares da linha. Isso é a causa mais provável de divergência de conteúdo no projeto.

## Estrutura sugerida para caso de projeto

Os cards de `Projects.tsx` hoje trazem descrição em um parágrafo. Se algum projeto crescer para um estudo de caso, use:

Contexto → Problema → Papel → Restrições → Solução → Decisões técnicas → Resultado → Aprendizados.

## Placeholders

`Projects.tsx` tem dois cards "Em Breve" com stack anunciada e sem projeto. São placeholders deliberados; substituí-los por projetos reais é decisão de conteúdo do autor, não de um agente. Ver task AI-008.
