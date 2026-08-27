import { readFileSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import vm from "node:vm";

const studyDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(studyDir, "index.html"), "utf8");
const audioDir = join(studyDir, "audio");
const tempDir = join(audioDir, ".tmp");
const python = process.env.PODER_CONSTITUINTE_TTS_PYTHON ?? "python3";
const requestedItem = process.env.PODER_CONSTITUINTE_TTS_ITEM;
const start = html.indexOf("{", html.indexOf("const studyData ="));
let depth = 0, quote = null, escaped = false, end;
for (let index = start; index < html.length; index += 1) {
  const character = html[index];
  if (quote) { if (escaped) escaped = false; else if (character === "\\") escaped = true; else if (character === quote) quote = null; continue; }
  if (["'", '"', "`"].includes(character)) { quote = character; continue; }
  if (character === "{") depth += 1;
  if (character === "}" && !--depth) { end = index + 1; break; }
}
const data = vm.runInNewContext(`(${html.slice(start, end)})`);
const items = [data.overview, ...data.chapters].filter((item) => !requestedItem || item.id === requestedItem);
if (requestedItem && items.length === 0) throw new Error(`Item de áudio não encontrado: ${requestedItem}`);
mkdirSync(tempDir, { recursive: true });
for (const item of items) {
  const textPath = join(tempDir, `${item.id}.txt`);
  const outputPath = join(audioDir, `${item.id}.mp3`);
  writeFileSync(textPath, item.narration);
  const result = spawnSync(python, ["-m", "edge_tts", "--voice", "pt-BR-AntonioNeural", "--rate=-4%", "--pitch=-12Hz", "--file", textPath, "--write-media", outputPath], { stdio: "inherit" });
  if (result.status !== 0) throw new Error(`Falha ao gerar ${item.id}.mp3`);
}
rmSync(tempDir, { recursive: true, force: true });
