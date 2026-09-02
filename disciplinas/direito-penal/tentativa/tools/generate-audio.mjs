import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const dir = resolve(here, '..');
const audio = join(dir, 'audio');
const tmp = join(audio, '.tmp');
const python = process.env.TENTATIVA_TTS_PYTHON ?? 'python3';

const source = readFileSync(join(dir, 'index.html'), 'utf8');
const data = vm.runInNewContext(`(${extract(source)})`);
const items = [data.overview, ...data.chapters];

mkdirSync(tmp, { recursive: true });

for (const item of items) {
  const text = join(tmp, `${item.id}.txt`);
  const out = join(audio, `${item.id}.mp3`);
  writeFileSync(text, item.narration);
  const result = spawnSync(
    python,
    ['-m', 'edge_tts', '--voice', 'pt-BR-AntonioNeural', '--rate=-4%', '--pitch=-12Hz', '--file', text, '--write-media', out],
    { stdio: 'inherit' }
  );
  if (result.status !== 0) throw new Error('edge_tts failed');
  console.log(`generated ${out}`);
}

rmSync(tmp, { recursive: true, force: true });

function extract(sourceText) {
  const at = sourceText.indexOf('const studyData =');
  let start = sourceText.indexOf('{', at);
  let depth = 0;
  let quote = null;
  let esc = false;

  for (let i = start; i < sourceText.length; i += 1) {
    const char = sourceText[i];
    if (quote) {
      if (esc) esc = false;
      else if (char === '\\') esc = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}' && !--depth) return sourceText.slice(start, i + 1);
  }

  throw new Error('studyData not found');
}
