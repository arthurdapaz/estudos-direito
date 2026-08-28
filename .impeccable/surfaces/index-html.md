---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["disciplinas/introducao-ao-estudo-do-direito/index.html","disciplinas/etica/index.html","disciplinas/direito-penal/index.html","disciplinas/direito-constitucional-i/index.html","disciplinas/introducao-ao-estudo-do-direito/piramide-de-kelsen/index.html","disciplinas/etica/procedimento-disciplinar-oab/index.html","disciplinas/direito-penal/teoria-do-crime/index.html","disciplinas/direito-penal/crimes-contra-a-honra/index.html","disciplinas/direito-penal/legitima-defesa/index.html","disciplinas/direito-penal/principio-da-consuncao/index.html","disciplinas/direito-constitucional-i/poder-constituinte/index.html"]
---

# Home e sistema de estudos — direção aprovada

## Norte visual

- Comp aprovado: `.impeccable/mocks/home-a.webp` — Diretório lateral.
- A home é exclusivamente um diretório de disciplinas; subtemas e estudos só aparecem dentro da disciplina.
- A lista semântica à esquerda é a fonte de verdade. O Atomium à direita é gerado a partir dessa mesma lista, logo inclusão, remoção e reordenação de disciplinas recalculam nós, arestas, rótulos e estados.
- As ligações representam apenas a visão do conjunto do curso, nunca pré-requisito ou dependência acadêmica.

## Gramática do sistema

| Elemento | Tratamento |
| --- | --- |
| Fundo | concreto quase branco, textura extremamente discreta, grade técnica rara |
| Estrutura | hastes carbono `#0d0d0f`, cordas finas `#d7262e`, cinzas frios |
| Cantos | quase sempre retos; círculos reservados aos nós e marcadores |
| Linhas | 1px para regras e anotações; 2px vermelho só para ênfase/foco |
| Elevação | mínima; profundidade apenas nos nós via gradiente radial controlado |
| Display | sans condensada técnica, caixa alta, tracking moderado |
| Leitura | sans de sistema, contraste forte e largura confortável |
| Movimento | transições curtas de foco; rede respira discretamente; reduced-motion elimina movimento |

## Inventário e meio de implementação

| Compromisso visível | Meio | Observação |
| --- | --- | --- |
| Cabeçalho compacto e marca textual | HTML/CSS | Sem navegação fictícia |
| Título, explicação e contagem | HTML/CSS | Hierarquia editorial técnica |
| Diretório numerado de disciplinas | HTML semântico | Fonte única de dados da rede |
| Atomium curricular | SVG + JavaScript nativo | Layout determinístico por quantidade e tamanho do container |
| Hastes e cabos | SVG | Animação e foco sincronizados com a lista |
| Esferas/nós | SVG | Links reais, teclado, `aria-label`, área de toque mínima |
| Rótulos e linhas-guia | SVG/HTML | Evitar colisões; reduzir no mobile |
| Textura mineral | CSS | Sem raster; ruído tão discreto que não prejudique leitura |
| Páginas de disciplina | HTML/CSS compartilhado | Cabeçalho contextual + lista de estudos da disciplina |
| Estudos existentes | `study-system.css` + chrome HTML | Preservar interações, conteúdo e áudio; unificar paleta clara, tipografia, ritmo, controles e superfícies |
| Pirâmide de Kelsen | `kelsen-light.css` + Three.js | Preservar a composição 3D; converter toda a experiência para fundo, painéis e iluminação claros |

## Composição responsiva

- Desktop: diretório com aproximadamente 38% e rede com 62%; ambos visíveis no primeiro viewport.
- Tablet: rede e diretório equilibrados em duas colunas menos assimétricas.
- Mobile: diretório vem primeiro; rede vira diagrama compacto abaixo e rótulos redundantes desaparecem. Nenhuma disciplina depende do diagrama para ser alcançada.
- O cálculo funciona para 1, 2, 3, 4, 6 ou mais disciplinas; para muitos nós, distribui em anéis concêntricos e reduz conexões para preservar legibilidade.

## Interação e estados

- Hover, foco, toque e seleção mantêm lista e nó em sincronia.
- Teclado percorre links sem armadilha; foco tem anel vermelho/preto de alto contraste.
- Sem JavaScript, a lista continua completa e navegável; apenas a escultura deixa de aparecer.
- O clique sempre abre a página da disciplina correspondente.

## Regra dos estudos

- Todo estudo convencional usa a classe `study-standard` e a folha `assets/study-system.css`.
- Espaço vazio, alinhamento e tipografia devem separar conteúdo antes de bordas, sombras ou caixas.
- Modo escuro, gradientes decorativos e paletas locais não são permitidos nos estudos convencionais.
- A Pirâmide de Kelsen é a única exceção estrutural registrada. Ela mantém o 3D, mas obrigatoriamente em tema claro com `study-kelsen-light` e `assets/kelsen-light.css`.
