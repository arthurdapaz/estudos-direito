# Estudos de Direito

Repositório de estudos interativos para o Curso de Direito.

O objetivo é publicar experimentos em HTML, CSS, JavaScript, Canvas e 3D que facilitem revisão e consulta em desktop e mobile.

## Estrutura

- `index.html`: diretório geral das disciplinas no GitHub Pages.
- `assets/`: sistema visual compartilhado, navegação dos estudos e rede curricular adaptativa.
- `disciplinas/<disciplina>/`: índice dos estudos de cada disciplina.
- `disciplinas/<disciplina>/<estudo>/`: material interativo específico.

## Estudos publicados

- Introdução ao Estudo do Direito
  - Pirâmide de Kelsen brasileira
- Ética
  - Procedimento disciplinar da OAB
- Direito Penal
  - Do fato típico à imputação subjetiva
  - Calúnia, Difamação e Injúria
  - Legítima defesa
  - Princípio da consunção
- Direito Constitucional I
  - Poder Constituinte

## Diretório adaptativo

A home contém apenas disciplinas. A lista HTML é a fonte de verdade para a rede SVG: ao adicionar, remover ou reordenar uma disciplina, a quantidade de nós, as conexões e a contagem são recalculadas automaticamente.

## Sistema visual dos estudos

Todo estudo convencional usa `assets/study-system.css` e a classe `study-standard`: fundo claro, tipografia compartilhada, controles consistentes e espaço vazio como principal recurso de separação e hierarquia. Bordas, sombras e caixas ficam restritas a necessidades funcionais.

A Pirâmide de Kelsen é a única exceção estrutural registrada. Ela preserva a experiência 3D em tela cheia, mas usa obrigatoriamente o tema claro definido em `assets/kelsen-light.css`. As regras completas estão documentadas em `DESIGN.md`.
