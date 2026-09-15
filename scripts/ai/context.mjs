// Context: concatena a hot memory num único arquivo compacto para leitura rápida.
// Opcionalmente anexa o context pack da task: `node scripts/ai/context.mjs AI-004`.

import { exists, nowIso, readJson, readText, writeText } from "./_shared.mjs";

const HOT = ["PROJECT_STATE.md", "HANDOFF.md", ".ai/MEMORY_INDEX.md"];

const taskId = (process.argv[2] ?? readJson(".ai/tasks.json")?.active_task ?? "").trim();

const parts = ["# Contexto operacional", "", `Gerado: ${nowIso()}`, ""];

for (const file of HOT) {
  if (!exists(file)) continue;
  parts.push(`## ${file}`, "", readText(file).trim(), "");
}

// TASKS.md é grande por natureza; anexar inteiro derrota o orçamento de contexto.
// Referenciamos o arquivo e anexamos só o context pack quando ele existe.
parts.push("## Trabalho", "", "Fonte de verdade das tasks: `TASKS.md`.", "");

const pack = taskId ? `.ai/context/${taskId}.md` : null;
if (pack && exists(pack)) {
  parts.push(`## ${pack}`, "", readText(pack).trim(), "");
} else if (taskId) {
  parts.push(`Sem context pack para ${taskId} (\`${pack}\`). Crie um só se reduzir exploração repetida.`, "");
}

writeText(".ai/runtime/context.md", parts.join("\n"));
console.log(`Escrito .ai/runtime/context.md${taskId ? ` (task ${taskId})` : ""}`);
