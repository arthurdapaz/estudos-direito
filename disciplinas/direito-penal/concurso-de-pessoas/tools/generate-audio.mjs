import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const studyDir = resolve(__dirname, '..');
const htmlPath = join(studyDir, 'index.html');
const audioDir = join(studyDir, 'audio');
const tmpDir = join(audioDir, '.tmp');
const voice = process.env.PENAL_TTS_VOICE ?? 'pt-BR-AntonioNeural';
const rate = process.env.PENAL_TTS_RATE ?? '-4%';
const pitch = process.env.PENAL_TTS_PITCH ?? '-12Hz';
const python = process.env.PENAL_TTS_PYTHON ?? 'python3';
const ttsBin = process.env.PENAL_TTS_BIN ?? 'edge-tts';

main();

function main() {
  const source = readFileSync(htmlPath, 'utf8');
  const studyData = evaluateConstObject(source, 'studyData');
  const sequence = [studyData.overview, ...studyData.chapters];

  mkdirSync(audioDir, { recursive: true });
  mkdirSync(tmpDir, { recursive: true });

  for (const item of sequence) {
    const textPath = join(tmpDir, `${item.id}.txt`);
    const mp3Path = join(audioDir, `${item.id}.mp3`);
    writeFileSync(textPath, buildNarrationText(item));
    const args = ['--voice', voice, `--rate=${rate}`, `--pitch=${pitch}`, '--file', textPath, '--write-media', mp3Path];
    let result = spawnSync(ttsBin, args, { stdio: 'inherit' });
    if (result.status !== 0) result = spawnSync(python, ['-m', 'edge_tts', ...args], { stdio: 'inherit' });
    if (result.status !== 0) throw new Error(`Falha ao gerar ${item.id}.mp3`);
    console.log(`generated ${mp3Path}`);
  }

  rmSync(tmpDir, { recursive: true, force: true });
}

function buildNarrationText(item) {
  if (item.narration) return toSpokenText(item.narration);
  const sections = item.sections
    .map((section) => [section.title, ...section.items].join('. '))
    .join('. ');
  return toSpokenText(`${item.title}. ${item.short}. ${sections}`);
}

function toSpokenText(text) {
  return text
    .replaceAll('CP', 'Código Penal')
    .replaceAll('art. 29, § 1º', 'artigo vinte e nove, parágrafo primeiro')
    .replaceAll('Art. 29, § 1º', 'artigo vinte e nove, parágrafo primeiro')
    .replaceAll('art. 29, § 2º', 'artigo vinte e nove, parágrafo segundo')
    .replaceAll('Art. 29, § 2º', 'artigo vinte e nove, parágrafo segundo')
    .replaceAll('arts. 29 a 31', 'artigos vinte e nove a trinta e um')
    .replaceAll('Arts. 29 a 31', 'artigos vinte e nove a trinta e um')
    .replaceAll('art. 29', 'artigo vinte e nove')
    .replaceAll('Art. 29', 'artigo vinte e nove')
    .replaceAll('art. 30', 'artigo trinta')
    .replaceAll('Art. 30', 'artigo trinta')
    .replaceAll('art. 31', 'artigo trinta e um')
    .replaceAll('Art. 31', 'artigo trinta e um')
    .replaceAll('§ 1º', 'parágrafo primeiro')
    .replaceAll('§ 2º', 'parágrafo segundo');
}

function evaluateConstObject(source, name) {
  return vm.runInNewContext(`(${extractConstLiteral(source, name)})`, Object.create(null));
}

function extractConstLiteral(source, name) {
  const declaration = `const ${name} =`;
  const start = source.indexOf(declaration);
  if (start === -1) throw new Error(`Could not find ${declaration}`);

  const literalStart = source.indexOf('{', start);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = literalStart; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') { quote = char; continue; }
    if (char === '{') depth += 1;
    else if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(literalStart, index + 1);
    }
  }
  throw new Error(`Could not extract literal for ${name}`);
}
