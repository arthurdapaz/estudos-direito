# AGENTS.md

Instruções para agentes que forem trabalhar neste repositório.

## Objetivo do repositório

Este repositório publica estudos interativos do Curso de Direito em GitHub Pages. O foco é criar materiais de estudo objetivos, navegáveis em desktop e mobile, usando HTML, CSS, JavaScript, Canvas e 3D quando isso ajudar a compreensão.

O site público fica em:

- `https://arthurdapaz.github.io/estudos-direito/`

## Arquitetura

- `index.html`: catálogo geral dos estudos e porta de entrada do GitHub Pages.
- `disciplinas/<slug-da-disciplina>/index.html`: página de uma disciplina.
- `disciplinas/<slug-da-disciplina>/<slug-do-estudo>/index.html`: estudo, experimento, documento ou simulador específico.
- `.nojekyll`: mantém o GitHub Pages servindo arquivos estáticos sem processamento Jekyll.
- `README.md`: descrição curta do repositório para humanos.

O projeto é intencionalmente estático. Não há build step, bundler, package manager ou framework. Cada estudo deve abrir diretamente via servidor estático.

## Convenções de organização

- Use slugs em minúsculas, sem acentos e separados por hífen.
- Crie uma página de disciplina antes de adicionar estudos dentro dela.
- Sempre atualize o catálogo raiz quando publicar uma nova disciplina ou estudo relevante.
- Sempre atualize a página da disciplina quando adicionar, renomear ou remover um estudo.
- Use links relativos, como `./disciplina/` ou `../`, para funcionar em localhost e no subpath do GitHub Pages.
- Não use URLs absolutas começando com `/`, porque o site roda sob `/estudos-direito/` no GitHub Pages.
- Evite salvar screenshots, previews temporários ou arquivos grandes no repositório, salvo quando forem parte real do estudo.

## Padrões de estudo

Cada estudo deve priorizar:

- Clareza visual e densidade informativa.
- Funcionamento em desktop e mobile.
- Interação útil para memorização, comparação ou exploração do conteúdo.
- Conteúdo jurídico organizado por disciplina, tema e finalidade de estudo.
- Textos curtos, precisos e revisáveis.

Quando o estudo for interativo:

- Elementos clicáveis devem ter feedback visual claro.
- Painéis explicativos não devem obstruir a navegação principal.
- O usuário deve conseguir trocar de item sem precisar fechar painéis desnecessariamente.
- A UI deve ser validada em viewport desktop e mobile.

## Conteúdo jurídico

O conteúdo é material de estudo, não parecer jurídico. Ao incluir informação normativa, jurisprudencial ou doutrinária:

- Prefira linguagem objetiva e verificável.
- Indique base normativa ou entendimento quando isso for essencial para estudar.
- Diferencie regra vigente, regra revogada, entendimento majoritário e exceções relevantes.
- Evite afirmar como definitivo algo que dependa de atualização legislativa ou jurisprudencial recente sem verificar.
- Preserve nomes de professores, disciplinas e esquemas conforme solicitado pelo usuário.

## Padrões técnicos

- Mantenha HTML, CSS e JS coesos quando o estudo for pequeno ou experimental.
- Extraia arquivos separados apenas quando isso melhorar manutenção real.
- Use APIs nativas do navegador quando bastarem.
- Para 3D, use Three.js por import map/CDN, como no estudo da Pirâmide de Kelsen.
- Não introduza dependências, build tools ou frameworks sem necessidade clara.
- Garanta que o estudo funcione com um servidor estático simples, por exemplo:

```bash
python3 -m http.server 8001
```

## Áudio narrado neural

Quando um estudo tiver narração, siga o padrão criado na Pirâmide de Kelsen:

- Use áudio estático pré-gerado, não TTS em tempo real no navegador. O site deve continuar sendo apenas GitHub Pages, sem backend, chaves de API em produção ou chamadas pagas no runtime.
- Use MP3 como formato principal dos arquivos publicados. Ele é o melhor compromisso atual para estes estudos: alta compatibilidade em desktop/mobile, bom tamanho para voz e reprodução previsível em navegadores.
- Guarde os arquivos em `audio/<id>.mp3`, dentro da pasta do estudo. O `<id>` deve bater com o identificador do item clicável, por exemplo `medida-provisoria.mp3`.
- Coloque o script de geração em `tools/generate-audio.mjs`, dentro da pasta do estudo. O script deve poder regenerar todos os áudios a partir da fonte de dados do próprio estudo.
- Use voz neural masculina em português do Brasil quando possível. No estudo da Pirâmide de Kelsen usamos `edge-tts` com `pt-BR-AntonioNeural`, `rate=-4%` e `pitch=-12Hz`.
- Não use `say` do macOS para áudio final; ele serve no máximo para teste rápido, porque a qualidade não é adequada ao padrão desejado.
- Não duplique manualmente o conteúdo jurídico em texto solto para o áudio. Gere o texto falado a partir dos mesmos objetos de dados que alimentam a interface, com uma camada de normalização para pronúncia.
- Preserve a diferença entre texto visual e texto falado. A interface pode mostrar `CF`, `TIDH`, `art. 5º, §3º`; a narração deve expandir isso para português natural.
- O player deve usar um único `<audio>` e trocar o `src` conforme o item ativo. Em estudos guiados, a sequência deve abrir o painel correspondente quando o próximo áudio começa.
- Trate bloqueio de autoplay: navegadores podem rejeitar `audio.play()` até haver gesto real do usuário. A UI deve ficar em estado recuperável, por exemplo “Leitura pronta”, sem avançar a fila sozinha.
- Mantenha fallback com `speechSynthesis` apenas para emergência, nunca como qualidade principal. O fallback deve usar o mesmo texto normalizado para pronúncia.

### Arquitetura recomendada para narração

- Defina os itens clicáveis com `id`, `name`, `short`, `status`, `statusKind` e `sections`.
- Defina um item de visão geral, por exemplo `visao-geral`, com texto sintético próprio em `narration`.
- Monte a sequência de estudo a partir dos dados: visão geral, conceitos de topo, depois itens do conteúdo em ordem pedagógica.
- Use uma função `buildNarrationText(item)` para montar: nome falado, nível, situação e seções.
- Use uma função `toSpokenText(text)` para normalizar siglas, abreviações, artigos, parágrafos, temas e números jurídicos.
- Use o mesmo `toSpokenText` no script de geração e no fallback do navegador. Se uma regra de pronúncia mudar, atualize os dois lugares.
- Se um termo precisar de leitura diferente só no áudio, prefira adicionar uma propriedade própria, como `spokenName` ou `narration`, em vez de piorar o texto visual.

### Dicionário de pronúncia jurídica

Mantenha e expanda um dicionário de pronúncia por estudo. Regras já usadas:

- `CF` -> `Constituição Federal`
- `TIDH` -> `Tratado Internacional de Direitos Humanos`
- `art. 5º, §3º` -> `artigo quinto, parágrafo terceiro`
- `art. 5º` -> `artigo quinto`
- `art.` -> `artigo`
- `arts.` -> `artigos`
- `§2º` -> `parágrafo segundo`
- `§3º` -> `parágrafo terceiro`
- `RE 466.343/SP` -> `Recurso Extraordinário quatrocentos e sessenta e seis mil trezentos e quarenta e três, São Paulo`

Antes de gerar os áudios finais, procure no conteúdo por siglas e abreviações comuns que podem virar fala errada, como `CF`, `STF`, `STJ`, `MP`, `EC`, `LC`, `LO`, `DL`, `ADI`, `ADC`, `ADPF`, `RE`, `REsp`, `art.`, `arts.`, `§`, incisos em algarismos romanos e números ordinais.

### Fluxo de geração e validação

Para gerar ou regenerar áudio em um estudo:

```bash
python3 -m pip install --user edge-tts
node disciplinas/<disciplina>/<estudo>/tools/generate-audio.mjs
```

Depois valide:

- Confirme que existe um MP3 por item narrável.
- Confira duração e codec com `ffprobe`.
- Rode servidor estático local e teste o player em desktop e mobile.
- Clique em itens com siglas difíceis e confira se carregam o arquivo correto.
- Quando possível, ouça trechos críticos. Ajuste `toSpokenText` e regenere se a voz pronunciar errado.
- Faça commit dos MP3s gerados junto com o script e o HTML que os consome.

## Validação antes de concluir

Antes de finalizar uma mudança:

- Rode um servidor estático local quando houver HTML/JS navegável.
- Teste a home, a página da disciplina e o estudo alterado.
- Verifique o console do navegador.
- Valide pelo menos um viewport desktop e um mobile quando a UI mudar.
- Confirme `git status --short` antes de reportar o resultado.

Se publicar no GitHub Pages:

- Faça commit em `main`.
- Envie para `origin/main`.
- Confirme o estado do Pages com `gh api repos/arthurdapaz/estudos-direito/pages`.
- Teste a URL pública depois que o status estiver `built`.

## Git e publicação

- A branch principal é `main`.
- O remoto esperado é `origin` apontando para `https://github.com/arthurdapaz/estudos-direito.git`.
- Commits devem ser pequenos e descrever a mudança de forma direta.
- Não reescreva histórico sem pedido explícito.
- Não remova estudos existentes sem pedido explícito.

## Estudo existente

O primeiro estudo publicado é:

- Disciplina: Introdução ao Estudo do Direito
- Caminho: `disciplinas/introducao-ao-estudo-do-direito/piramide-de-kelsen/`
- Tema: Pirâmide de Kelsen brasileira em 3D, com normas clicáveis e detalhes sobre criação, hierarquia e situação atual.

Ao mexer nesse estudo, preserve:

- O esquema único baseado na compreensão geral do STF.
- A Grundnorm como vértice superior da pirâmide, sem olho, com raios ao redor da ponta.
- O vértice da Grundnorm deve ficar levemente destacado acima do bloco constitucional e usar textura prateada quase branca.
- Normas clicáveis pairando sobre os níveis da pirâmide.
- Rótulos dos blocos embutidos na face direita da pirâmide, com quebra vertical de linha quando o texto for longo.
- Painel explicativo limpo, sem numeração fixa nas seções.
- Conector saindo do canto do chip ativo.
- Áudios neurais em MP3 para a visão geral, Grundnorm e normas clicáveis. O gerador fica em `tools/generate-audio.mjs` dentro do estudo e usa `edge-tts` com voz `pt-BR-AntonioNeural`.
- Layout responsivo com atenção especial ao mobile.
