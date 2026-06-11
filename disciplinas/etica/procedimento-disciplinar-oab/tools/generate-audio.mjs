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
const voice = process.env.OAB_TTS_VOICE ?? 'pt-BR-AntonioNeural';
const rate = process.env.OAB_TTS_RATE ?? '-4%';
const pitch = process.env.OAB_TTS_PITCH ?? '-12Hz';

main();

function main() {
  const source = readFileSync(htmlPath, 'utf8');
  const studyData = evaluateConstObject(source, 'studyData');
  const sequence = createStudySequence(studyData);

  mkdirSync(audioDir, { recursive: true });
  mkdirSync(tmpDir, { recursive: true });

  for (const item of sequence) {
    const text = buildNarrationText(studyData, item);
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

function createStudySequence(studyData) {
  return [
    studyData.overview,
    ...studyData.steps,
    studyData.deadlineGuide,
    studyData.examGuide
  ];
}

function buildNarrationText(studyData, item) {
  if (item.narration) {
    return toSpokenText(item.narration);
  }

  const sections = getSectionsForDetail(studyData, item)
    .map((section) => [section.title, ...section.items].join('. '))
    .join('. ');

  return toSpokenText(`${item.title}. ${item.short}. ${sections}`);
}

function getSectionsForDetail(studyData, item) {
  if (item.type === 'deadlines') {
    return [{
      title: 'Memorize',
      items: studyData.deadlines.map((deadline) => `${deadline.label}: ${deadline.text}`)
    }];
  }

  return item.sections || [];
}

function toSpokenText(text) {
  return text
    .replaceAll('OAB', 'Ordem dos Advogados do Brasil')
    .replaceAll('CED', 'Código de Ética e Disciplina')
    .replaceAll('EAOAB', 'Estatuto da Advocacia e da Ordem dos Advogados do Brasil')
    .replaceAll('TEDs', 'Tribunais de Ética e Disciplina')
    .replaceAll('TED', 'Tribunal de Ética e Disciplina')
    .replaceAll('TAC', 'Termo de Ajustamento de Conduta')
    .replaceAll('arts. 55 a 69', 'artigos cinquenta e cinco a sessenta e nove')
    .replaceAll('Artigos 55 a 69', 'artigos cinquenta e cinco a sessenta e nove')
    .replaceAll('artigos 55 a 69', 'artigos cinquenta e cinco a sessenta e nove')
    .replaceAll('Art. 70, § 3º', 'artigo setenta, parágrafo terceiro')
    .replaceAll('art. 70, § 3º', 'artigo setenta, parágrafo terceiro')
    .replaceAll('Art. 58-A', 'artigo cinquenta e oito A')
    .replaceAll('artigo 58-A', 'artigo cinquenta e oito A')
    .replaceAll('Art. 55-A', 'artigo cinquenta e cinco A')
    .replaceAll('artigo 55-A', 'artigo cinquenta e cinco A')
    .replaceAll('art. 58', 'artigo cinquenta e oito')
    .replaceAll('artigo 58', 'artigo cinquenta e oito')
    .replaceAll('art. 59', 'artigo cinquenta e nove')
    .replaceAll('artigo 59', 'artigo cinquenta e nove')
    .replaceAll('art. 60', 'artigo sessenta')
    .replaceAll('artigo 60', 'artigo sessenta')
    .replaceAll('art. 61', 'artigo sessenta e um')
    .replaceAll('artigo 61', 'artigo sessenta e um')
    .replaceAll('art. 62', 'artigo sessenta e dois')
    .replaceAll('artigo 62', 'artigo sessenta e dois')
    .replaceAll('art. 63', 'artigo sessenta e três')
    .replaceAll('artigo 63', 'artigo sessenta e três')
    .replaceAll('art. 64', 'artigo sessenta e quatro')
    .replaceAll('artigo 64', 'artigo sessenta e quatro')
    .replaceAll('art. 65', 'artigo sessenta e cinco')
    .replaceAll('artigo 65', 'artigo sessenta e cinco')
    .replaceAll('art. 66', 'artigo sessenta e seis')
    .replaceAll('artigo 66', 'artigo sessenta e seis')
    .replaceAll('art. 67', 'artigo sessenta e sete')
    .replaceAll('artigo 67', 'artigo sessenta e sete')
    .replaceAll('art. 68', 'artigo sessenta e oito')
    .replaceAll('artigo 68', 'artigo sessenta e oito')
    .replaceAll('art. 69', 'artigo sessenta e nove')
    .replaceAll('artigo 69', 'artigo sessenta e nove')
    .replaceAll('§ 1º', 'parágrafo primeiro')
    .replaceAll('§ 2º', 'parágrafo segundo')
    .replaceAll('§ 3º', 'parágrafo terceiro')
    .replaceAll('§ 4º', 'parágrafo quarto')
    .replaceAll('§ 5º', 'parágrafo quinto')
    .replaceAll('§ 6º', 'parágrafo sexto')
    .replaceAll('§ 7º', 'parágrafo sétimo')
    .replaceAll('§ 8º', 'parágrafo oitavo');
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
