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
const voice = process.env.KELSEN_TTS_VOICE ?? 'pt-BR-AntonioNeural';
const rate = process.env.KELSEN_TTS_RATE ?? '-4%';
const pitch = process.env.KELSEN_TTS_PITCH ?? '-12Hz';

const overviewStudyItem = {
  id: 'visao-geral',
  name: 'Visão geral da pirâmide',
  levelTitle: 'Ordenamento jurídico',
  status: 'Guia completo',
  statusKind: 'active',
  isOverview: true,
  narration: 'A Pirâmide de Kelsen organiza o ordenamento jurídico como uma cadeia de validade. No topo está a Grundnorm, a norma fundamental hipotética. Abaixo dela, no direito brasileiro, a Constituição Federal e as normas equivalentes ocupam o bloco constitucional. Depois aparecem os tratados internacionais de direitos humanos com força supralegal, acima das leis e abaixo da Constituição. No plano legal ficam leis, medidas provisórias, decretos legislativos, resoluções legislativas e tratados comuns. Na base estão os atos infralegais, como decretos regulamentares, regulamentos, portarias e instruções normativas, que executam normas superiores sem poder contrariá-las.'
};

main();

function main() {
  const source = readFileSync(htmlPath, 'utf8');
  const schemes = evaluateConstObject(source, 'schemes');
  const grundnormDetail = evaluateConstObject(source, 'grundnormDetail');
  const sequence = createStudySequence(schemes.stf, grundnormDetail);

  mkdirSync(audioDir, { recursive: true });
  mkdirSync(tmpDir, { recursive: true });

  for (const item of sequence) {
    const text = buildNarrationText(item);
    const textPath = join(tmpDir, `${item.id}.txt`);
    const mp3Path = join(audioDir, `${item.id}.mp3`);

    writeFileSync(textPath, text);
    run('python3', [
      '-m',
      'edge_tts',
      '--voice',
      voice,
      `--rate=${rate}`,
      `--pitch=${pitch}`,
      '--file',
      textPath,
      '--write-media',
      mp3Path
    ]);
    console.log(`generated ${mp3Path}`);
  }

  rmSync(tmpDir, { recursive: true, force: true });
}

function createStudySequence(scheme, grundnormDetail) {
  const normsTopDown = scheme.layers
    .slice()
    .reverse()
    .flatMap((layer) => layer.norms.map((norm) => ({ ...norm, levelTitle: layer.title })));

  return [overviewStudyItem, grundnormDetail, ...normsTopDown];
}

function buildNarrationText(item) {
  if (item.narration) {
    return item.narration;
  }

  const intro = `${item.name}. ${item.levelTitle}. Situação: ${item.status}.`;
  const body = item.sections
    .map((section) => [
      section.title ? `${section.title}.` : '',
      ...section.items
    ].filter(Boolean).join(' '))
    .join(' ');

  return `${intro} ${body}`;
}

function evaluateConstObject(source, name) {
  const literal = extractConstLiteral(source, name);
  return vm.runInNewContext(`(${literal})`, Object.create(null));
}

function extractConstLiteral(source, name) {
  const declaration = `const ${name} =`;
  const start = source.indexOf(declaration);

  if (start === -1) {
    throw new Error(`Could not find ${declaration}`);
  }

  const literalStart = source.indexOf('{', start);
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = literalStart; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;

      if (depth === 0) {
        return source.slice(literalStart, index + 1);
      }
    }
  }

  throw new Error(`Could not extract literal for ${name}`);
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });

  if (result.status !== 0) {
    throw new Error(`${command} failed with status ${result.status}`);
  }
}
