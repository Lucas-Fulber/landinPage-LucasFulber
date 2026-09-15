# Handoff

> Hot memory. Reescrito por inteiro ao fim de todo trabalho significativo. Só o ponto de continuação — não é diário.

**Atualizado:** 2026-09-15

## Task ativa

**AI-002** — Corrigir classe de cor inexistente na timeline de Experiência (`READY`, prioridade alta).

A task anterior, **AI-001** (bootstrap do AI Repository OS), está `DONE`.

## Concluído

Bootstrap do AI Repository OS: memória em três camadas, roteamento de contexto, sistema de tasks, ADRs, mapas, quatro scripts de apoio testados, `docs/` verificado contra o código. Template `ai-repository-os-template/` removido. Validação executada e verde.

## Pendente

Nada de AI-001. A fila é AI-002 (pronta para começar), depois AI-003, AI-004 e AI-007.

Cinco tasks aguardam decisão do autor, não trabalho de agente: AI-004 (domínio), AI-006 (visual), AI-007 (testes), AI-008 (quais projetos), AI-011 (autorizar CI).

## Arquivos relevantes

- `src/components/Experience.tsx:76` — a linha a corrigir.
- `src/globals.css` — tabela de tokens válidos (`@theme inline`).
- `docs/DESIGN_SYSTEM.md` — tokens e restrições.

## Validação

`.ai/health.json`, verificado em 2026-09-15 no commit `0f1c633`: lint `pass`, typecheck `pass`, build `pass`, tests `not_available`.

Mudanças desta sessão não estão commitadas.

## Bloqueios

Nenhum.

## Próximo passo exato

Ler `TASKS.md` → AI-002. Em `src/components/Experience.tsx:76`, trocar `bg-background` por `bg-canvas`. Depois procurar outras classes de cor que não estejam na tabela de tokens de `docs/DESIGN_SYSTEM.md` — classe Tailwind inválida não gera erro em lint, typecheck nem build. Verificar visualmente nos dois temas com `npm run dev`, rodar `npm run ai:health` e reescrever este arquivo.

O working tree tem as mudanças do bootstrap sem commit. Não commite sem autorização explícita.
