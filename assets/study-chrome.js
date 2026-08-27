(() => {
  const script = document.currentScript;
  if (!script) return;

  const rootHref = script.dataset.root || "../../../";
  const disciplineHref = script.dataset.disciplineHref || "../";
  const discipline = script.dataset.discipline || "Disciplina";
  const title = document.title.split("|")[0].trim();

  const mount = () => {
    if (document.querySelector(".study-site-chrome")) return;

    const chrome = document.createElement("nav");
    chrome.className = "study-site-chrome";
    chrome.setAttribute("aria-label", "Navegação dos estudos");
    chrome.innerHTML = `
      <a class="study-chrome-brand" href="${rootHref}" aria-label="Voltar ao diretório de disciplinas">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M7 8.5 16 4l9 6.5-3 12.5-13 2Z" fill="none" stroke="currentColor" stroke-width="1.6"/>
          <path d="m7 8.5 15 14.5M25 10.5 9 25M16 4l6 19" fill="none" stroke="#c71f2d" stroke-width="1.25"/>
          <circle cx="7" cy="8.5" r="2.2"/><circle cx="16" cy="4" r="2.2" fill="#c71f2d"/>
          <circle cx="25" cy="10.5" r="2.2"/><circle cx="22" cy="23" r="2.2"/><circle cx="9" cy="25" r="2.2"/>
        </svg>
        <span>Estudos de Direito</span>
      </a>
      <span class="study-chrome-path">
        <a href="${rootHref}">Disciplinas</a>
        <span class="study-chrome-separator" aria-hidden="true">/</span>
        <a href="${disciplineHref}">${discipline}</a>
        <span class="study-chrome-separator" aria-hidden="true">/</span>
        <span aria-current="page">${title}</span>
      </span>`;
    document.body.prepend(chrome);
  };

  if (document.body) {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  }
})();
