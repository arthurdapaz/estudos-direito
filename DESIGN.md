---
name: "Estudos de Direito"
description: "Diretório acadêmico técnico em concreto, carbono e tensão vermelha."
colors:
  concrete: "#e6e3df"
  void: "#f7f7f8"
  paper: "#efedeb"
  carbon: "#0d0d0f"
  graphite: "#2b2b2e"
  ash: "#6b6a6d"
  line: "rgba(13, 13, 15, 0.18)"
  line-strong: "rgba(13, 13, 15, 0.42)"
  tension-red: "#c71f2d"
  tension-red-dark: "#97131e"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(4rem, 7.2vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.82
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(1.55rem, 3vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 0.98
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(0.98rem, 1.35vw, 1.08rem)"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
  navigation:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  none: "0"
  circle: "50%"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "42px"
components:
  discipline-row:
    backgroundColor: "transparent"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: "13px 4px"
    height: "76px"
  discipline-row-active:
    backgroundColor: "rgba(199, 31, 45, 0.055)"
    textColor: "{colors.tension-red-dark}"
    rounded: "{rounded.none}"
    padding: "13px 4px"
    height: "76px"
  study-row:
    backgroundColor: "transparent"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: "24px 8px"
    height: "138px"
  study-chrome:
    backgroundColor: "{colors.concrete}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: "10px 24px"
    height: "60px"
  study-surface:
    backgroundColor: "{colors.void}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: "clamp(28px, 5vw, 56px)"
    height: "auto"
---

# Design System: Estudos de Direito

## Overview

**Creative North Star: "Atomium Curricular"**

O sistema apresenta o curso como uma estrutura acadêmica construída: concreto claro e regras suíças formam o plano de trabalho; hastes de carbono, colares metálicos e cabos vermelhos transformam a lista de disciplinas em uma escultura navegável. A sensação é técnica, objetiva e concentrada, sem perder a fisicalidade que torna o diretório memorável.

A identidade compartilhada cobre a home, os índices de disciplina e todo o interior dos estudos convencionais. Mapa, trilha, quiz e áudio podem variar como ferramentas pedagógicas, mas usam a mesma paleta clara, tipografia, ritmo, botões e superfícies. A Pirâmide de Kelsen é a única exceção estrutural: preserva a composição 3D em tela cheia, também convertida para um ambiente claro e integrada pelo mesmo chrome.

**Key Characteristics:**

- Concreto quase branco, carbono profundo e vermelho usado como tensão, não como preenchimento.
- Tipografia condensada e auto-hospedada para estrutura; sans de sistema para leitura longa.
- Cantos retos, regras raras de um pixel e profundidade concentrada na escultura SVG.
- Hierarquia de três níveis: disciplinas, índice da disciplina e estudo específico.
- Lista semântica como verdade; visualização como extensão progressiva e sincronizada.
- Espaço vazio como principal instrumento de separação, ritmo e hierarquia.

## Colors

A paleta é mineral e fria, com um único acento vermelho que opera como cabo estrutural, numeração e resposta de estado.

### Primary

- **Vermelho de Tensão:** acento raro para cabos do Atomium, números, seleção, foco, marcadores e pequenos detalhes do símbolo.
- **Vermelho de Tensão Profundo:** estado de texto ativo ou apontado, mantendo contraste sobre concreto e papel.

### Neutral

- **Concreto Claro:** fundo exterior e superfície contínua do chrome dos estudos.
- **Vazio Frio:** plano claro do shell e texto invertido sobre nós escuros.
- **Papel Mineral:** alternativa neutra intermediária para superfícies claras.
- **Carbono:** texto principal, hastes, nós e marca estrutural.
- **Grafite:** texto explicativo de prioridade intermediária.
- **Cinza-Cinória:** metadados, legendas e conteúdo secundário.
- **Regra Suave / Regra Estrutural:** divisores de baixa e média ênfase; a diferença de opacidade comunica hierarquia sem caixas.

### Named Rules

**The Red Tension Rule.** O vermelho aparece em uma fração pequena da tela e sempre sinaliza conexão, posição ou resposta; nunca deve virar uma grande superfície decorativa.

**The Carbon Legibility Rule.** Texto de leitura usa Carbono ou Grafite sobre os fundos claros; Cinza-Cinória fica restrito a metadados e notas curtas.

## Typography

**Display Font:** Barlow Condensed, auto-hospedada em WOFF2, com fallback sans-serif.

**Body Font:** pilha sans nativa do sistema.

**Character:** A Barlow Condensed dá precisão de placa técnica, alto rendimento espacial e um eixo vertical forte. A pilha nativa devolve conforto e neutralidade aos parágrafos, evitando que o gesto condensado invada a leitura jurídica.

### Hierarchy

- **Display** (peso 600, escala fluida, entrelinha muito compacta): títulos da home e das disciplinas, em caixa alta e com largura deliberadamente curta.
- **Headline** (peso 600, escala fluida, entrelinha compacta): títulos de estudos nos índices e cabeçalhos editoriais secundários.
- **Body** (peso regular, escala levemente fluida, entrelinha aberta): introduções, resumos e descrições, normalmente limitados entre 52 e 70 caracteres por linha.
- **Label** (peso 600, pequena, tracking amplo, caixa alta): modos, contagens, códigos, metadados e anotações técnicas.
- **Navigation** (peso 600, compacta, tracking moderado): marca textual e elementos de deslocamento estrutural.

Os arquivos locais cobrem os pesos 500, 600 e 700. O shell usa 600 como peso dominante e pré-carrega esse corte na home; não depender de fonte remota para a identidade.

### Named Rules

**The Two-Voice Rule.** Barlow Condensed organiza e nomeia; a sans de sistema explica e sustenta leitura. Não usar a condensada em parágrafos longos.

**The Tight Display Rule.** Títulos grandes usam entrelinha abaixo de 1 e tracking levemente negativo; labels fazem o oposto, com caixa alta e tracking positivo.

## Layout

O shell central mede no máximo 1480px e preserva 16px de respiro lateral no desktop, com cabeçalho de 72px e rodapé de 54px. A home divide o primeiro viewport em um diretório lateral de aproximadamente 38% e uma área visual de 62%; os limites mínimos evitam que texto e diagrama colapsem antes dos breakpoints. O diretório usa alinhamento vertical, divisores e uma lista numerada, nunca uma grade de cards.

As páginas de disciplina mantêm o mesmo shell. O hero divide título e resumo em duas colunas, depois o índice usa linhas largas de quatro zonas: número, identidade do estudo, descrição e seta. A arquitetura de conteúdo é rígida: a home enumera somente disciplinas; cada página de disciplina enumera somente seus estudos; a página do estudo contém o conteúdo pedagógico.

Em até 980px, home e rede se equilibram em colunas mais próximas e os insets do SVG diminuem. Em até 760px, a home passa para uma coluna: o diretório vem primeiro e ocupa pelo menos o primeiro viewport útil; o Atomium aparece abaixo com 530px de altura; linhas-guia textuais redundantes desaparecem; os índices de disciplina e estudo passam a fluxos de uma coluna sem perder a descrição. O shell encosta nas bordas da tela, com 18px de margem interna. O chrome interno tem seu próprio corte em 680px: reduz altura de 60px para 56px, oculta o nome extenso da marca e comprime o breadcrumb sem retirar o link da disciplina.

O ritmo espacial privilegia múltiplos de 4, 8, 12, 18 e 24px, com 42px para intervalos de seção. Valores fluidos com `clamp()` escalam os títulos e o padding entre esses marcos. Toda extensão deve permanecer sem overflow horizontal a partir de 320px.

### Named Rules

**The Three-Level Rule.** Home, disciplina e estudo são níveis diferentes; nunca promover estudos ou subtemas para o diretório principal.

**The Directory-First Rule.** Em qualquer largura, o caminho textual completo aparece antes da visualização e continua útil sem JavaScript.

## Elevation & Depth

O shell é plano: não há sombras em cabeçalhos, listas, índices ou rodapés. Profundidade nasce da sobreposição tonal do fundo, da grade técnica rara e das regras de um pixel. O Atomium é a exceção expressiva: os nós usam gradiente radial e sombra SVG; hastes recebem gradiente linear, sombra deslocada e colares metálicos. Essa simulação material deve permanecer localizada no diagrama.

### Shadow Vocabulary

- **Sombra do Nó:** `feDropShadow` com deslocamento horizontal de 5px, vertical de 9px, desfoque 7px e Carbono a 24%; separa a esfera do plano sem elevar a interface inteira.
- **Sombra da Haste:** linha de 18px, Carbono a 20%, deslocada 3px na horizontal e 5px na vertical sob a haste de 14px.

### Named Rules

**The Flat Frame, Sculpted Node Rule.** Superfícies de navegação ficam planas; relevo, brilho e volume pertencem apenas aos materiais do Atomium.

## Shapes

Retângulos e painéis são ortogonais, sem cantos arredondados. Círculos são reservados à gramática de rede: nós, órbitas, colares, terminais de linhas-guia e pequenos marcadores de estado. As setas são SVG lineares; divisores horizontais e verticais substituem containers arredondados.

As hastes têm terminações arredondadas porque representam tubos físicos, não porque o sistema use cartões macios. Os nós são esferas escuras com órbita tracejada; colares metálicos assentam cada conexão na borda da esfera; cabos vermelhos são mais finos e cruzam a estrutura como tensão. Linhas-guia partem do nó mais à direita e terminam em um pequeno círculo vermelho; no mobile são omitidas para evitar colisões.

### Named Rules

**The Reserved Circle Rule.** O círculo indica nó, junta, terminal ou estado; não arredondar arbitrariamente listas, painéis ou blocos de leitura.

## Components

### Brand Lockup

- **Structure:** símbolo SVG de cinco pontos conectados seguido por “Estudos de Direito”.
- **Color:** Carbono como estrutura e um único segmento/nó em Vermelho de Tensão.
- **Type:** Barlow Condensed, caixa alta, tracking moderado.
- **Responsive:** no chrome de estudos, o texto some abaixo de 680px, mas o link mantém área mínima de 44px e rótulo acessível.

### Discipline Register Row

- **Structure:** número tabular, nome e contagem, seta; altura mínima de 76px no desktop e 72px no mobile.
- **State:** hover, foco e sincronização com o nó usam um banho vermelho translúcido, texto profundo e seta deslocada 3px.
- **Behavior:** o elemento inteiro é um link; os atributos de código, nome e destino alimentam a rede.

### Study Index Row

- **Structure:** no desktop, quatro zonas; no mobile, número, título e seta ocupam a primeira linha e a descrição começa sob o título.
- **State:** o fundo recebe o mesmo banho vermelho do diretório e a seta avança 4px.
- **Boundary:** descreve e abre um estudo, mas não tenta resumir sua interface interna.

### Study Chrome

- **Structure:** navegação injetada no topo de cada estudo com marca, link para Disciplinas, link para a disciplina atual e título corrente.
- **Configuration:** cada página informa caminhos relativos e nome da disciplina por atributos do script; o título é derivado do `<title>` e o componente evita duplicação.
- **Material:** faixa concreta clara, divisor estrutural e tipografia do sistema, independente da paleta do estudo abaixo.
- **Accessibility:** links de 44px, foco vermelho visível, `aria-current` no estudo e truncamento apenas visual do título longo.

### Shared Study Surface

- **Scope:** obrigatório em todo estudo convencional por meio de `assets/study-system.css` e da classe `study-standard` no `<body>`.
- **Palette:** fundo Vazio Frio, superfícies brancas ocasionais, texto Carbono/Grafite e Vermelho de Tensão restrito a foco, posição, erro e seleção.
- **Hierarchy:** títulos em Barlow Condensed; leitura em sans nativa; largura de texto confortável e intervalos generosos entre grupos.
- **Separation:** espaço vazio é a primeira escolha. Fundos sutis são permitidos para áreas interativas; bordas aparecem somente quando comunicam estado, limite funcional ou estrutura indispensável.
- **Controls:** ações primárias são blocos Carbono sem arredondamento; escolhas usam um banho neutro e estados corretos/incorretos de baixa saturação.
- **Prohibited local overrides:** estudos não podem reintroduzir modo escuro, gradientes decorativos de fundo, grades cosméticas, cartões com borda e sombra, ou paletas próprias concorrentes.

### Kelsen Light Exception

- **Scope:** apenas `disciplinas/introducao-ao-estudo-do-direito/piramide-de-kelsen/`, por meio de `assets/kelsen-light.css` e da classe `study-kelsen-light`.
- **Preserved:** cena Three.js, câmera, pirâmide, Grundnorm, rótulos, normas clicáveis, conectores, áudio e painéis flutuantes.
- **Changed:** fundo, névoa, piso, iluminação, dunas, painéis, chips e textos usam tons claros com contraste escuro.
- **Boundary:** a exceção autoriza a composição espacial; não autoriza retornar ao fundo escuro.

### Atomium Curricular

- **Data model:** a lista ordenada semântica é a fonte única. Código, nome, destino, quantidade e ordem são relidos do DOM; `MutationObserver` reage a alterações e `ResizeObserver` recalcula geometria.
- **Scale:** um, dois, três e quatro nós têm composições determinísticas próprias. A partir de cinco, os nós ocupam um anel externo; acima de dez, até cinco migram para um anel interno.
- **Connections:** até quatro nós formam um conjunto completo. Em coleções maiores, cada nó liga-se aos dois vizinhos seguintes, limitando densidade. Cabos vermelhos aparecem em todas as arestas até quatro e de modo alternado acima disso.
- **Material grammar:** haste de Carbono de 14px, sombra estrutural de 18px, colares radiais junto às esferas, cabo vermelho de 1.6px, órbita tracejada e esfera radial com código central.
- **Interaction:** hover e foco em lista ou nó ativam ambos; cada nó SVG é um link real com nome acessível. O clique sempre abre a disciplina.
- **Progressive enhancement:** sem JavaScript, a lista e todas as rotas permanecem completas; somente a escultura deixa de existir.

### Extension Boundary

Para adicionar uma disciplina, criar primeiro sua página e inserir um único item completo na lista da home, preservando os atributos de código, nome e destino; a rede não deve receber dados duplicados. Para adicionar um estudo, alterar o índice da disciplina correspondente, instalar o chrome compartilhado e aplicar `study-system.css` com `study-standard`. Interações pedagógicas podem criar geometria e comportamento próprios, mas não paletas, tipografia estrutural ou sistemas locais de cartões. Exceções visuais exigem registro explícito neste documento; atualmente, só a Pirâmide de Kelsen possui essa condição.

Movimento compartilhado usa transições de 180ms para cor, fundo e deslocamento, curva rápida `cubic-bezier(0.16, 1, 0.3, 1)` para gestos espaciais e 420ms para a expansão da órbita. `prefers-reduced-motion` reduz toda animação e transição a um estado praticamente imediato.

## Do's and Don'ts

### Do:

- **Do** manter links relativos para que shell, disciplinas, estudos, fontes e scripts funcionem em localhost e no subpath do GitHub Pages.
- **Do** tratar a lista semântica como fonte de verdade e a rede SVG como uma visualização derivada.
- **Do** usar HTML semântico, foco vermelho de alto contraste, áreas interativas de pelo menos 44px e suporte a movimento reduzido.
- **Do** aplicar a superfície clara compartilhada a todo estudo convencional.
- **Do** usar espaço vazio antes de bordas, sombras, caixas ou fundos para separar conteúdos.
- **Do** preservar o chrome concreto como elo entre todos os níveis do repositório.
- **Do** verificar home, índice da disciplina e estudo em desktop e mobile ao estender a arquitetura.

### Don't:

- **Don't** colocar estudos, subtemas, atalhos ou cards promocionais na home.
- **Don't** interpretar arestas do Atomium como pré-requisitos, hierarquia ou dependência entre disciplinas.
- **Don't** transformar o vermelho em grande preenchimento, nem espalhar sombras e gradientes materiais para fora da rede.
- **Don't** substituir o símbolo abstrato por balanças, martelos, colunas, livros ou outros clichês jurídicos.
- **Don't** criar paleta, modo escuro, tipografia estrutural ou linguagem de cartões exclusiva para um estudo convencional.
- **Don't** usar bordas e caixas como separadores automáticos; primeiro resolva a hierarquia com espaço, alinhamento e escala tipográfica.
- **Don't** tratar a Pirâmide de Kelsen como autorização genérica para outras exceções; sua composição 3D clara é uma regra nomeada e isolada.
