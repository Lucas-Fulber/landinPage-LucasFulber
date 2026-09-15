// Utilitários comuns dos scripts de apoio ao agente.
// Regras: determinístico, local, não destrutivo. Não chama IA, não commita, não faz push.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Raiz do repositório, derivada do próprio arquivo — os scripts funcionam de qualquer cwd. */
export const REPO_ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..", "..");

export function repoPath(...parts) {
  return path.join(REPO_ROOT, ...parts);
}

export function exists(relative) {
  return fs.existsSync(repoPath(relative));
}

export function readText(relative) {
  return fs.readFileSync(repoPath(relative), "utf8");
}

export function writeText(relative, content) {
  const target = repoPath(relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}

export function readJson(relative, fallback = null) {
  if (!exists(relative)) return fallback;
  try {
    return JSON.parse(readText(relative));
  } catch {
    return fallback;
  }
}

/** Executa um comando capturando a saída. Nunca lança: devolve `null` quando indisponível. */
export function capture(command, args) {
  const result = spawnSync(command, args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    shell: false,
  });
  if (result.error || result.status !== 0) return null;
  return result.stdout.trim();
}

const IS_WINDOWS = process.platform === "win32";

/**
 * Roda um script do package.json herdando o stdio.
 *
 * No Windows, `npm` é um `.cmd` e o Node se recusa a executá-lo sem shell
 * (endurecimento contra injeção via arquivos de lote). Nesse caso o comando
 * vai como string única — passar `args` junto com `shell: true` é depreciado
 * (DEP0190), justamente porque os argumentos não seriam escapados.
 *
 * @returns {number|null} exit code, ou `null` se o comando não pôde ser executado.
 */
export function runNpmScript(name) {
  if (!/^[a-z0-9:_-]+$/i.test(name)) {
    throw new Error(`Nome de script inválido: ${name}`);
  }

  const result = IS_WINDOWS
    ? spawnSync(`npm run ${name}`, { cwd: REPO_ROOT, stdio: "inherit", shell: true })
    : spawnSync("npm", ["run", name], { cwd: REPO_ROOT, stdio: "inherit", shell: false });

  if (result.error) {
    console.error(`[${name}] não pôde ser executado: ${result.error.message}`);
    return null;
  }
  return result.status;
}

export function packageScripts() {
  const pkg = readJson("package.json", {});
  return pkg?.scripts ?? {};
}

export function gitInfo() {
  return {
    branch: capture("git", ["branch", "--show-current"]),
    commit: capture("git", ["rev-parse", "--short", "HEAD"]),
    status: capture("git", ["status", "--short"]),
  };
}

export function nowIso() {
  return new Date().toISOString();
}
