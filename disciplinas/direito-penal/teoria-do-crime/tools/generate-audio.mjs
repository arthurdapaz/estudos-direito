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
    run(python, [
      '-m', 'edge_tts', '--voice', voice, `--rate=${rate}`, `--pitch=${pitch}`,
      '--file', textPath, '--write-media', mp3Path
    ]);
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
    .replaceAll('art. 13, § 2º', 'artigo treze, parágrafo segundo')
    .replaceAll('Art. 13, § 2º', 'artigo treze, parágrafo segundo')
    .replaceAll('art. 18, I', 'artigo dezoito, inciso primeiro')
    .replaceAll('Art. 18, I', 'artigo dezoito, inciso primeiro')
    .replaceAll('art. 18, II', 'artigo dezoito, inciso segundo')
    .replaceAll('Art. 18, II', 'artigo dezoito, inciso segundo')
    .replaceAll('art. 13', 'artigo treze')
    .replaceAll('Art. 13', 'artigo treze')
    .replaceAll('art. 18', 'artigo dezoito')
    .replaceAll('Art. 18', 'artigo dezoito')
    .replaceAll('art. 19', 'artigo dezenove')
    .replaceAll('Art. 19', 'artigo dezenove')
    .replaceAll('art. 121', 'artigo cento e vinte e um')
    .replaceAll('Art. 121', 'artigo cento e vinte e um')
    .replaceAll('§ 1º', 'parágrafo primeiro')
    .replaceAll('§ 2º', 'parágrafo segundo')
    .replaceAll('§ 3º', 'parágrafo terceiro');
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

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`${command} failed with status ${result.status}`);
}
