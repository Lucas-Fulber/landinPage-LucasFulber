# Regras de documentação

## Documentação segue implementação

Nunca o contrário. Documente o que existe; proponha em task o que deveria existir. Se um doc descreve algo que o código não faz, ele está errado — corrija o doc ou marque a divergência explicitamente.

## Quando atualizar

Atualize um doc quando sua mudança o tornou **materialmente** obsoleto. Não atualize por mudança cosmética.

| Mudou | Atualize |
| --- | --- |
| Estrutura, fluxo de dados, estado, dependência nova | `docs/ARCHITECTURE.md`, mapa em `.ai/maps/` |
| Token, tipografia, espaçamento, motion | `docs/DESIGN_SYSTEM.md` |
| Texto visível, fato biográfico | `docs/CONTENT_GUIDE.md` se o fato estiver na tabela de consistência |
| Metadado, indexação | `docs/SEO.md` |
| Script, dependência, comando | `README.md`, `.claude/rules/validation.md` |
| Decisão que um agente futuro poderia desfazer | ADR novo em `docs/decisions/` + entrada no `INDEX.md` |

## Verificabilidade

Todo doc em `docs/` carrega a data e o commit contra o qual foi verificado. Ao revisar um doc, atualize esse cabeçalho — ele é o que diz a um agente futuro se pode confiar no arquivo.

Marque incerteza como incerteza. Não apresente suposição como fato: um doc errado custa mais que um doc ausente, porque é lido como verdade.

## ADR

Só para decisão durável — as que um agente futuro poderia desfazer por engano ou "por boa prática". Não crie ADR para correção de bug, escolha de classe CSS, ajuste de conteúdo ou detalhe de implementação.

ADR não se edita para mudar de ideia: cria-se um novo com status `Aceita` e marca-se o antigo como `Substituída por ADR-YYY`.

## Estilo

Português do Brasil, com acentuação correta. Direto e curto. Tabela em vez de lista longa. Sem preâmbulo. Prefira afirmar o que é verdade a explicar o que se pretendia.
