// Preflight: coleta branch, commit, git status, scripts disponíveis e estado operacional.
// Somente leitura, exceto pelo arquivo gerado em .ai/runtime/.

import { gitInfo, nowIso, packageScripts, readJson, writeText } from "./_shared.mjs";

const git = gitInfo();
const scripts = packageScripts();
const state = readJson(".ai/state.json");
const tasks = readJson(".ai/tasks.json");
const health = readJson(".ai/health.json");

const activeTask = tasks?.tasks?.find((t) => t.id === tasks?.active_task) ?? null;

const lines = [
  "# AI Preflight",
  "",
  `Gerado: ${nowIso()}`,
  "",
  "## Git",
  "",
  "```text",
  `branch: ${git.branch ?? "[indisponível]"}`,
  `commit: ${git.commit ?? "[indisponível]"}`,
  "",
  git.status === null ? "[git status indisponível]" : git.status || "working tree limpo",
  "```",
  "",
  "## Scripts disponíveis",
  "",
  "```json",
  JSON.stringify(scripts, null, 2),
  "```",
  "",
  "## Estado operacional",
  "",
  "```json",
  JSON.stringify(
    {
      current_focus: state?.current_focus ?? null,
      active_task: tasks?.active_task ?? null,
      last_verified_commit: state?.last_verified_commit ?? null,
      last_updated: state?.last_updated ?? null,
    },
    null,
    2,
  ),
  "```",
  "",
  "## Task ativa",
  "",
  activeTask
    ? "```json\n" + JSON.stringify(activeTask, null, 2) + "\n```"
    : "Nenhuma task ativa registrada em `.ai/tasks.json`.",
  "",
  "## Última validação",
  "",
  health
    ? "```json\n" +
      JSON.stringify({ last_checked: health.last_checked, commit: health.commit, checks: health.checks }, null, 2) +
      "\n```"
    : "Sem `.ai/health.json`.",
  "",
  "## Próximo passo",
  "",
  "Ler `HANDOFF.md`, depois a task ativa em `TASKS.md`. Só então carregar docs/código relevantes.",
  "",
];

const report = lines.join("\n");
writeText(".ai/runtime/preflight.md", report);
console.log(report);
