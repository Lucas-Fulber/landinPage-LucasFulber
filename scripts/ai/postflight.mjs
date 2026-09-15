// Postflight: mostra o que mudou e lembra o que precisa ser atualizado antes do handoff.
// Somente leitura, exceto pelo arquivo gerado em .ai/runtime/.

import { capture, nowIso, readJson, writeText } from "./_shared.mjs";

const status = capture("git", ["status", "--short"]);
const diffStat = capture("git", ["diff", "--stat"]);
const stagedStat = capture("git", ["diff", "--cached", "--stat"]);
const health = readJson(".ai/health.json");

const lines = [
  "# AI Postflight",
  "",
  `Gerado: ${nowIso()}`,
  "",
  "## Git status",
  "",
  "```text",
  status === null ? "[indisponível]" : status || "working tree limpo",
  "```",
  "",
  "## Diff (não-staged)",
  "",
  "```text",
  diffStat === null ? "[indisponível]" : diffStat || "sem mudanças",
  "```",
  "",
  "## Diff (staged)",
  "",
  "```text",
  stagedStat === null ? "[indisponível]" : stagedStat || "sem mudanças",
  "```",
  "",
  "## Última validação registrada",
  "",
  health
    ? "```json\n" + JSON.stringify({ last_checked: health.last_checked, checks: health.checks }, null, 2) + "\n```"
    : "Sem `.ai/health.json` — rode `npm run ai:health`.",
  "",
  "## Checklist de encerramento",
  "",
  "- [ ] Validação executada (`npm run ai:health`).",
  "- [ ] `git diff` revisado.",
  "- [ ] Status da task atualizado em `TASKS.md` e `.ai/tasks.json`.",
  "- [ ] Trabalho incompleto marcado como `PARTIAL` ou `BLOCKED`, com próximo passo exato.",
  "- [ ] Follow-ups descobertos registrados como tasks novas.",
  "- [ ] `PROJECT_STATE.md` atualizado apenas se o estado operacional mudou.",
  "- [ ] `HANDOFF.md` reescrito.",
  "- [ ] ADR criado apenas se houve decisão durável.",
  "- [ ] Registro de sessão em `.ai/sessions/` se a sessão foi significativa.",
  "",
  "Este script não commita e não faz push.",
  "",
];

const report = lines.join("\n");
writeText(".ai/runtime/postflight.md", report);
console.log(report);
