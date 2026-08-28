# Estudos de Direito

Repositório de estudos interativos para o Curso de Direito.

O objetivo é publicar estudos em HTML, CSS, JavaScript, Canvas e 3D que facilitem revisão e consulta em desktop e mobile. O Jekyll compõe as páginas e o GitHub Pages entrega o resultado estático.

## Estrutura

- `_data/disciplines.yml`: fonte única do catálogo acadêmico.
- `_layouts/`: estruturas compartilhadas da home, das disciplinas e dos estudos.
- `_includes/`: componentes reutilizáveis de marca, navegação, rodapé e índices.
- `assets/`: sistema visual compartilhado, estilos específicos e rede curricular adaptativa.
- `disciplinas/<disciplina>/`: página declarativa da disciplina.
- `disciplinas/<disciplina>/<estudo>/`: conteúdo e interação específicos do estudo.

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

A home contém apenas disciplinas. `_data/disciplines.yml` é a fonte de verdade que gera a lista HTML, os índices das disciplinas e os metadados dos estudos. A rede SVG lê a lista renderizada e recalcula automaticamente nós, conexões e contagem.

## Sistema visual dos estudos

Todo estudo convencional usa `assets/study-system.css` e a classe `study-standard`: fundo claro, tipografia compartilhada, controles consistentes e espaço vazio como principal recurso de separação e hierarquia. Bordas, sombras e caixas ficam restritas a necessidades funcionais.

A Pirâmide de Kelsen é a única exceção estrutural registrada. Ela preserva a experiência 3D em tela cheia, mas usa obrigatoriamente o tema claro definido em `assets/kelsen-light.css`. As regras completas estão documentadas em `DESIGN.md`.

## Desenvolvimento local

```bash
RBENV_VERSION=3.2.0 rbenv exec bundle exec jekyll build
RBENV_VERSION=3.2.0 rbenv exec bundle exec jekyll serve
RBENV_VERSION=3.2.0 rbenv exec ruby tools/validate-jekyll.rb
```

O `Gemfile` usa a gem `github-pages`, mantendo o build local alinhado ao ambiente de publicação.
