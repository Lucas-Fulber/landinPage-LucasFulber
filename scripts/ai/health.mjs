// Health: roda as validações que o repositório realmente oferece e grava .ai/health.json.
// Nunca inventa resultado: script ausente vira "not_available"; script não executado, "not_run".
//
// Uso:
//   node scripts/ai/health.mjs              # lint + typecheck + test + build
//   node scripts/ai/health.mjs --skip-build # ciclo rápido durante o desenvolvimento

import { capture, nowIso, packageScripts, runNpmScript, writeText } from "./_shared.mjs";

const skipBuild = process.argv.includes("--skip-build");
const scripts = packageScripts();

// `build` roda `tsc --noEmit && vite build`, então typecheck aparece duas vezes.
// A redundância é intencional: separada, ela diz qual etapa quebrou.
const ORDER = ["lint", "typecheck", "test", "build"];

const checks = {};
const notes = skipBuild ? ["build pulado via --skip-build"] : [];

for (const name of ORDER) {
  if (!scripts[name]) {
    checks[name] = "not_available";
    continue;
  }
  if (name === "build" && skipBuild) {
    checks[name] = "not_run";
    continue;
  }
  console.log(`\n--- ${name} ---`);
  const code = runNpmScript(name);

  if (code === null) {
    // Não conseguimos rodar o comando. Isso não é falha do check —
    // registrar "fail" aqui seria inventar resultado.
    checks[name] = "not_run";
    notes.push(`${name}: comando não pôde ser executado`);
    continue;
  }
  checks[name] = code === 0 ? "pass" : "fail";
}

const result = {
  schema_version: 1,
  last_checked: nowIso(),
  commit: capture("git", ["rev-parse", "--short", "HEAD"]),
  checks,
  notes,
};

writeText(".ai/health.json", JSON.stringify(result, null, 2) + "\n");

console.log("\n--- resultado ---");
console.log(JSON.stringify(result, null, 2));

if (Object.values(checks).includes("fail")) process.exitCode = 1;
