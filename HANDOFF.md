# Handoff

> Hot memory. Reescrito por inteiro ao fim de todo trabalho significativo. Só o ponto de continuação — não é diário.

**Atualizado:** 2026-09-15

## Task ativa

**AI-016** — Extrair primitivos e composições (`READY`, prioridade média).

Concluídas nesta sessão: **AI-002**, **AI-012**, **AI-013** e **AI-014**.

## Concluído

- **AI-002:** `Experience.tsx:76`, `bg-background` → `bg-canvas`.
- **AI-012:** auditoria visual completa, medida no navegador. Relatório em `.ai/context/AI-012-auditoria-visual.md`.
- **AI-013:** direção **C — híbrida** escolhida pelo autor e registrada em **ADR-004**.
- **AI-014:** foundation definida em `src/globals.css` (segundo bloco `@theme`) e `src/motion.ts`, documentada em `docs/DESIGN_SYSTEM.md`. Os 18 utilitários novos foram verificados no CSS compilado. Nenhuma mudança visual.

## Pendente

Nenhum componente usa a escala nova ainda. A ordem de migração:

| Task | Estado | O que faz |
| --- | --- | --- |
| AI-016 | `READY` | Primitivos (`SectionHeader`, `Container`, `Prose`, etiqueta, botão, card) consumindo os tokens de AI-014. Termina removendo a escala padrão do Tailwind. |
| AI-017 | `TODO` | Formação e Certificações deixam de ser cards. Independente de AI-016. |
| AI-018 | `TODO` | Ritmo vertical com `py-section-*`, alinhamento de Sobre, largura. |
| AI-019 | `TODO` | Motion a uma entrada por seção, usando `src/motion.ts`. |
| AI-003 | `READY` | Correção de 2 linhas, independente de tudo isso. |
| AI-015 | `TODO` | Cinzas não dependem de decisão; o novo `accent` no claro depende. |
| AI-020 | `TODO` | `accent-strong` e `info` quase sem uso. Item que perdeu o dono quando AI-014 fechou. |

**Antes de qualquer coisa de UI, leia AI-021.** O autor alterou `About.tsx` e `index.html` no working tree, mudando cargo, empresa, vínculo e data de início — e a edição ficou pela metade: `Experience.tsx` e `Hero.tsx` ainda trazem os dados antigos, então a página hoje se contradiz. As mudanças dele foram **preservadas, não revisadas**. Prioridade alta: é o único item que afeta a credibilidade do conteúdo se publicado.

Quatro tasks aguardam decisão do autor: AI-004 (domínio), AI-007 (testes), AI-008 (quais projetos), AI-011 (autorizar CI). AI-021 precisa dele para confirmar os fatos.

## Arquivos relevantes

- `docs/decisions/ADR-004-identidade-visual-hibrida.md` — a direção. Leia antes de qualquer task de UI.
- `docs/DESIGN_SYSTEM.md` — distingue **escala decidida** de **estado atual dos componentes**. É o mapa da migração.
- `src/globals.css` — dois blocos `@theme`: cores (via `var()`) e escalas (valores literais).
- `src/motion.ts` — tokens de motion. O easing espelha `--ease-out-soft`: mudar um exige mudar o outro.
- `.ai/context/AI-012-auditoria-visual.md` — inventário medido, por seção e por camada.

## Validação

`.ai/health.json`, verificado em 2026-09-15 após AI-014: lint `pass`, typecheck `pass`, build `pass`, tests `not_available`.

Verificação visual: sem overflow horizontal em 1440/1024/768/390, nos dois temas. Alturas das oito seções inalteradas por AI-014. Preserve esse estado.

**Nada está commitado.** O diff de código tem duas origens que não devem se misturar num commit só:

- **Meu trabalho:** a linha de AI-002 (`Experience.tsx`), o bloco `@theme` novo (`globals.css`), `src/motion.ts`, mais docs e memória.
- **Do autor, preservado:** `About.tsx` e `index.html` — conteúdo em edição, incompleto. Ver AI-021.

Push em `main` publica em produção — não commite nem faça push sem pedido explícito.

## Bloqueios

Nenhum.

## Próximo passo exato

Começar **AI-016** por `SectionHeader`: hoje o cabeçalho de seção (`h2` + divisor `w-12 h-0.5 bg-accent` + wrapper de `motion`) está reimplementado sete vezes — `About.tsx:13`, `Skills.tsx:37`, `Experience.tsx:57`, `Education.tsx:54`, `Certifications.tsx:42`, `Projects.tsx:62` e `Contact.tsx:60`, este último com o divisor centralizado e `mb-6`. Extrair um componente que cubra as duas variantes, usando `text-section`, e trocar as sete chamadas. Uma seção por vez, comparando capturas.

**Não remova a escala padrão do Tailwind do `@theme` antes do fim da migração** — `text-sm` e `rounded-xl` ainda estão em uso e a remoção não gera erro de build, só quebra a página.

## Notas de ferramental

Para verificação visual automatizada:

1. Gravar `localStorage` **depois** do load não muda o tema: o `useEffect` de `useTheme` regrava a chave com o estado inicial. Imponha o tema antes do primeiro script do documento (em CDP, `Page.addScriptToEvaluateOnNewDocument`).
2. As entradas usam `whileInView` com `once`, então role a página inteira antes de capturar.
3. **Comparação de capturas tem ruído conhecido:** o hero (seta pulsando) e os cards "Em Breve" (`animate-spin`) nunca saem idênticos entre duas rodadas — verificado com uma rodada de controle sem alteração alguma. Para essas seções, compare as métricas (altura, overflow) em vez do hash; ou faça AI-019 primeiro, que remove os loops e torna a comparação confiável para o resto da migração.
4. Classe Tailwind inexistente não gera erro em lint, typecheck nem build. Ao criar tokens, confirme no CSS compilado (`dist/assets/*.css`) que o utilitário existe.
