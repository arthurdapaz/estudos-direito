(() => {
  const host = document.querySelector("[data-course-network]");
  const svg = host?.querySelector("svg");
  const list = document.querySelector(".discipline-list");
  const countLabel = document.querySelector("[data-discipline-count]");
  let links = [...document.querySelectorAll("[data-discipline]")];
  let items = [];

  if (!host || !svg || !list || links.length === 0) return;

  const NS = "http://www.w3.org/2000/svg";
  const collectItems = () => {
    links = [...list.querySelectorAll("[data-discipline]")];
    items = links.map((link, index) => ({
      link,
      index,
      href: link.getAttribute("href"),
      code: link.dataset.code || String(index + 1).padStart(2, "0"),
      name: link.dataset.name || link.textContent.trim(),
    }));
    if (countLabel) countLabel.textContent = `${items.length} no catálogo`;
  };

  collectItems();

  const element = (name, attrs = {}) => {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };

  const positionsFor = (count, width, height) => {
    const cx = width / 2;
    const cy = height / 2;
    const rx = Math.max(120, width * 0.31);
    const ry = Math.max(105, height * 0.34);

    if (count === 1) return [{ x: cx, y: cy }];
    if (count === 2) return [
      { x: cx - rx * 0.72, y: cy },
      { x: cx + rx * 0.72, y: cy },
    ];
    if (count === 3) return [
      { x: cx, y: cy - ry },
      { x: cx + rx * 0.86, y: cy + ry * 0.72 },
      { x: cx - rx * 0.86, y: cy + ry * 0.72 },
    ];
    if (count === 4) return [
      { x: cx, y: cy - ry },
      { x: cx - rx, y: cy - ry * 0.02 },
      { x: cx, y: cy + ry },
      { x: cx + rx, y: cy - ry * 0.02 },
    ];

    const positions = [];
    const innerCount = count > 10 ? Math.min(5, Math.floor(count / 3)) : 0;
    const outerCount = count - innerCount;

    for (let i = 0; i < outerCount; i += 1) {
      const angle = -Math.PI / 2 + (i / outerCount) * Math.PI * 2;
      positions.push({ x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry });
    }
    for (let i = 0; i < innerCount; i += 1) {
      const angle = -Math.PI / 2 + (i / innerCount) * Math.PI * 2 + Math.PI / innerCount;
      positions.push({ x: cx + Math.cos(angle) * rx * 0.46, y: cy + Math.sin(angle) * ry * 0.46 });
    }
    return positions;
  };

  const edgePairs = (count) => {
    if (count < 2) return [];
    if (count <= 4) {
      const pairs = [];
      for (let a = 0; a < count; a += 1) {
        for (let b = a + 1; b < count; b += 1) pairs.push([a, b]);
      }
      return pairs;
    }

    const keys = new Set();
    const add = (a, b) => {
      if (a === b) return;
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      keys.add(key);
    };
    for (let i = 0; i < count; i += 1) {
      add(i, (i + 1) % count);
      add(i, (i + 2) % count);
    }
    return [...keys].map((key) => key.split("-").map(Number));
  };

  const setActive = (index, active) => {
    links[index]?.classList.toggle("is-active", active);
    svg.querySelector(`[data-network-index="${index}"]`)?.classList.toggle("is-active", active);
  };

  const render = () => {
    const width = Math.max(360, host.clientWidth - 40);
    const height = Math.max(350, host.clientHeight - 180);
    const compact = window.matchMedia("(max-width: 760px)").matches;
    const radius = Math.max(30, Math.min(compact ? 42 : 54, 67 - items.length * 2.2));
    const positions = positionsFor(items.length, width, height);
    const pairs = edgePairs(items.length);

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.replaceChildren();

    const title = element("title");
    title.textContent = "Rede adaptativa de disciplinas";
    const description = element("desc");
    description.textContent = "Cada nó abre uma disciplina. As ligações representam o conjunto do curso, não pré-requisitos.";
    svg.append(title, description);

    const defs = element("defs");
    defs.innerHTML = `
      <linearGradient id="rodGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#55565a" />
        <stop offset="0.38" stop-color="#111216" />
        <stop offset="0.7" stop-color="#2b2c30" />
        <stop offset="1" stop-color="#050506" />
      </linearGradient>
      <radialGradient id="collarGradient" cx="32%" cy="26%" r="76%">
        <stop offset="0" stop-color="#f0f0f1" />
        <stop offset="0.32" stop-color="#8c8d91" />
        <stop offset="0.68" stop-color="#34353a" />
        <stop offset="1" stop-color="#0c0c0e" />
      </radialGradient>
      <radialGradient id="nodeGradient" cx="34%" cy="26%" r="72%">
        <stop offset="0" stop-color="#626368" />
        <stop offset="0.28" stop-color="#27282c" />
        <stop offset="0.72" stop-color="#0d0d0f" />
        <stop offset="1" stop-color="#030304" />
      </radialGradient>
      <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="190%">
        <feDropShadow dx="5" dy="9" stdDeviation="7" flood-color="#0d0d0f" flood-opacity="0.24" />
      </filter>`;
    svg.append(defs);

    const guide = element("ellipse", {
      class: "network-guide",
      cx: width / 2,
      cy: height / 2,
      rx: Math.max(110, width * 0.35),
      ry: Math.max(90, height * 0.4),
    });
    svg.append(guide);

    const edgeLayer = element("g", { "aria-hidden": "true" });
    const collarLayer = element("g", { "aria-hidden": "true" });
    pairs.forEach(([a, b], index) => {
      const p1 = positions[a];
      const p2 = positions[b];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.hypot(dx, dy) || 1;
      const ux = dx / distance;
      const uy = dy / distance;
      const shadow = element("line", { class: "network-rod-shadow", x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
      const rod = element("line", { class: "network-rod", x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
      edgeLayer.append(shadow, rod);
      collarLayer.append(
        element("circle", { class: "network-collar", cx: p1.x + ux * (radius - 2), cy: p1.y + uy * (radius - 2), r: Math.max(4.5, radius * 0.13) }),
        element("circle", { class: "network-collar", cx: p2.x - ux * (radius - 2), cy: p2.y - uy * (radius - 2), r: Math.max(4.5, radius * 0.13) }),
      );
      if (index % 2 === 0 || items.length <= 4) {
        const cord = element("line", {
          class: "network-cord",
          x1: p1.x + radius * 0.2,
          y1: p1.y - radius * 0.18,
          x2: p2.x - radius * 0.22,
          y2: p2.y + radius * 0.2,
        });
        edgeLayer.append(cord);
      }
    });
    svg.append(edgeLayer, collarLayer);

    if (!compact && positions.length) {
      const rightmost = positions.reduce((chosen, point) => point.x > chosen.x ? point : chosen, positions[0]);
      const startX = rightmost.x + radius;
      const startY = rightmost.y;
      const endX = width - 18;
      const endY = Math.min(height - 38, Math.max(54, startY + radius * 0.86));
      const elbowX = Math.max(startX + 24, endX - 92);
      const leader = element("g", { class: "network-leader", "aria-hidden": "true" });
      const path = element("path", { d: `M ${startX} ${startY} L ${elbowX} ${startY} L ${endX} ${endY}` });
      const endpoint = element("circle", { cx: endX, cy: endY, r: 3.5 });
      const label = element("text", { x: endX, y: endY - 10, "text-anchor": "end" });
      label.textContent = "nó / disciplina";
      leader.append(path, endpoint, label);
      svg.append(leader);
    }

    const nodeLayer = element("g");
    items.forEach((item, index) => {
      const p = positions[index];
      const anchor = element("a", {
        class: "network-node",
        href: item.href,
        "data-network-index": index,
        "aria-label": `Abrir ${item.name}`,
      });
      const group = element("g", { transform: `translate(${p.x} ${p.y})` });
      const focus = element("circle", { class: "node-focus", r: radius + 12, fill: "none", stroke: "transparent" });
      const orbit = element("circle", { class: "node-orbit", r: radius + 9 });
      const sphere = element("circle", { class: "node-sphere", r: radius });
      const code = element("text", { class: "node-code", y: 4 });
      code.textContent = item.code;
      const number = element("text", { class: "node-index", y: radius * 0.58 });
      number.textContent = String(index + 1).padStart(2, "0");
      group.append(focus, orbit, sphere, code, number);
      anchor.append(group);
      anchor.addEventListener("pointerenter", () => setActive(index, true));
      anchor.addEventListener("pointerleave", () => setActive(index, false));
      anchor.addEventListener("focus", () => setActive(index, true));
      anchor.addEventListener("blur", () => setActive(index, false));
      nodeLayer.append(anchor);
    });
    svg.append(nodeLayer);
  };

  const indexFromEvent = (event) => links.indexOf(event.target.closest?.("[data-discipline]"));
  list.addEventListener("pointerover", (event) => {
    const link = event.target.closest?.("[data-discipline]");
    if (!link || link.contains(event.relatedTarget)) return;
    const index = indexFromEvent(event);
    if (index >= 0) setActive(index, true);
  });
  list.addEventListener("pointerout", (event) => {
    const link = event.target.closest?.("[data-discipline]");
    if (!link || link.contains(event.relatedTarget)) return;
    const index = indexFromEvent(event);
    if (index >= 0) setActive(index, false);
  });
  list.addEventListener("focusin", (event) => {
    const index = indexFromEvent(event);
    if (index >= 0) setActive(index, true);
  });
  list.addEventListener("focusout", (event) => {
    const index = indexFromEvent(event);
    if (index >= 0) setActive(index, false);
  });

  let frame;
  const scheduleRender = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(render);
  };

  new ResizeObserver(scheduleRender).observe(host);
  new MutationObserver(() => {
    collectItems();
    scheduleRender();
  }).observe(list, { childList: true, subtree: true });
  window.addEventListener("orientationchange", scheduleRender);
  render();
})();
