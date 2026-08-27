# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

O usuário principal é um estudante do Curso de Direito que consulta o site para revisar matérias acadêmicas, retomar conteúdos antes das aulas e provas e explorar estudos interativos no desktop e no celular.

## Product Purpose

Organizar os estudos pessoais do Curso de Direito em uma hierarquia acadêmica clara. A página inicial funciona exclusivamente como diretório de disciplinas. Cada disciplina possui sua própria página, onde estudos, mapas, documentos, áudios e simuladores são organizados por tema.

O produto é bem-sucedido quando o estudante identifica rapidamente a disciplina desejada, entra nela e encontra o conteúdo relacionado sem misturar níveis de navegação.

## Positioning

Uma biblioteca acadêmica pessoal em que cada disciplina é uma porta de entrada e cada estudo pode adotar a interação mais útil ao conteúdo — áudio guiado, revisão ativa, mapa, Canvas ou 3D — sem perder a coerência do conjunto.

## Operating Context

- Consulta rápida entre aulas e durante sessões de revisão.
- Leitura e interação em telas desktop e mobile.
- Navegação em três níveis: catálogo de disciplinas, página da disciplina e estudo específico.
- Publicação pública por GitHub Pages.

## Capabilities and Constraints

- Site estático em HTML, CSS e JavaScript, sem build step, framework ou backend.
- Links relativos para funcionar em localhost e no subpath `/estudos-direito/` do GitHub Pages.
- Estudos podem usar APIs nativas do navegador, Canvas e Three.js por CDN quando necessário.
- Áudios narrados são arquivos MP3 pré-gerados; não há TTS pago em tempo de execução.
- A home não deve exibir estudos, subtemas ou atalhos que confundam o nível de disciplina.
- Páginas de disciplina são responsáveis por segmentar e organizar seus estudos.
- Conteúdo jurídico existente, interações, áudios e fontes devem ser preservados durante mudanças visuais.

## Brand Commitments

- Nome do produto: Estudos de Direito.
- Voz objetiva, acadêmica e acolhedora, sem aparência institucional burocrática.
- A experiência deve ser fácil, limpa e propícia à concentração.

## Evidence on Hand

- Quatro disciplinas publicadas e sete estudos interativos no repositório.
- Conteúdo jurídico, quizzes, mapas, áudio narrado e uma visualização 3D já implementados nas páginas existentes.
- Não há logotipo, identidade institucional da faculdade ou biblioteca externa de imagens a preservar.

## Product Principles

1. A arquitetura acadêmica vem antes da promoção de conteúdos individuais.
2. Cada tela deve deixar claro em qual disciplina e nível de navegação o estudante está.
3. A interface deve reduzir esforço cognitivo e favorecer leitura, revisão e retomada.
4. A personalidade nasce da organização e do cuidado tipográfico, não de ornamentos jurídicos genéricos.
5. Interações específicas dos estudos permanecem úteis e reconhecíveis dentro de um sistema visual comum.

## Accessibility & Inclusion

Preservar HTML semântico, navegação por teclado, foco visível, contraste legível, suporte a `prefers-reduced-motion` e funcionamento sem overflow horizontal em telas a partir de 320 px.
