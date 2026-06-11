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
- A Grundnorm no topo com o olho.
- Normas clicáveis pairando sobre os níveis da pirâmide.
- Painel explicativo limpo, sem numeração fixa nas seções.
- Conector saindo do canto do chip ativo.
- Layout responsivo com atenção especial ao mobile.
