(function () {
  "use strict";
  const data = window.CAO_DATA;
  const dialog = document.querySelector("#detail-dialog");
  if (!data || !dialog || typeof dialog.showModal !== "function") return;
  const ingredients = new Map(data.ingredients.map(i => [i.id, i]));
  const plants = new Map(data.plants.map(p => [p.id, p]));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let trigger = null;
  let currentItem = null;
  let returnHash = "#ingredients";
  let routePushed = false;
  const text = (id, value) => { document.getElementById(id).textContent = value; };
  function renderItem(item) {
    if (!item) return;
    currentItem = item;
    const plant = plants.get(item.plantId);
    const source = data.sources[item.source || "formula"];
    text("detail-kicker", item.featured ? "INGREDIENT NOTE / 成分解码" : "FORMULA RECORD / 配方记录");
    text("detail-title", item.name);
    text("detail-english", item.english);
    text("detail-position", "第 " + item.position + " 项 / 共 16 项");
    text("detail-role", item.role || "配方记录 · 名称与序位");
    text("detail-plain", item.plain || "这项成分列在老师提供的配方记录第 " + item.position + " 项。本馆保留其名称与顺序，暂不对它展开功能解读。");
    text("detail-evidence", item.evidence || "依据为老师提供的配方记录。序位不代表具体浓度；本页没有据此推导产品功效。");
    const sourceLink = document.getElementById("detail-source");
    sourceLink.href = source.url;
    sourceLink.textContent = source.label + " ↗";
    const image = document.getElementById("detail-image");
    image.hidden = !plant;
    if (plant) { image.src = plant.image; image.alt = plant.name + "品牌插画"; }
    document.getElementById("detail-plant").hidden = !plant;
    dialog.querySelector(".evidence-details").open = false;
    dialog.querySelector(".detail-scroll").scrollTop = 0;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("modal-open");
  }
  function openItem(item, sourceElement, route) {
    if (!item) return;
    trigger = sourceElement || null;
    if (!dialog.open) {
      returnHash = /^(#ingredient=|#plant=|#note-)/.test(location.hash) ? "#ingredients" : location.hash || "#ingredients";
      routePushed = !!route;
      if (route) history.pushState({ caoDetail: true }, "", route);
    }
    renderItem(item);
  }
  function hideDialog() {
    if (dialog.open) dialog.close();
    document.body.classList.remove("modal-open");
    if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
    trigger = null;
  }
  function requestClose() {
    hideDialog();
    if (routePushed) { routePushed = false; history.back(); }
    else history.replaceState(null, "", location.pathname + location.search + returnHash);
  }
  function route() {
    const hash = decodeURIComponent(location.hash);
    const match = hash.match(/^#(ingredient|plant)=([a-z0-9-]+)$/);
    const note = hash.match(/^#note-([a-z0-9-]+)$/);
    let item = null;
    if (match) item = match[1] === "ingredient" ? ingredients.get(match[2]) : ingredients.get(plants.get(match[2])?.ingredientId);
    if (note) item = ingredients.get(note[1]);
    if (item) openItem(item, null, null);
    else { hideDialog(); routePushed = false; }
  }
  document.addEventListener("click", event => {
    const ingredient = event.target.closest("[data-ingredient-id]");
    const plantLink = event.target.closest("[data-plant-id]");
    if (ingredient || plantLink) {
      const item = ingredient ? ingredients.get(ingredient.dataset.ingredientId) : ingredients.get(plants.get(plantLink.dataset.plantId)?.ingredientId);
      if (!item) return;
      event.preventDefault();
      openItem(item, ingredient || plantLink, "#ingredient=" + item.id);
      return;
    }
    const filter = event.target.closest("[data-filter]");
    if (filter) {
      const type = filter.dataset.filter;
      let count = 0;
      document.querySelectorAll(".ingredient-card").forEach(card => {
        card.hidden = type !== "all" && card.dataset.type !== type;
        if (!card.hidden) count++;
      });
      document.querySelectorAll("[data-filter]").forEach(button => {
        const active = button === filter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      text("filter-count", count + " 项重点解码");
    }
  });
  dialog.querySelector(".detail-close").addEventListener("click", requestClose);
  dialog.addEventListener("cancel", event => { event.preventDefault(); requestClose(); });
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose();
  });
  dialog.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll('button:not([hidden]), a[href], summary')].filter(el => el.getClientRects().length);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  function jumpTo(targetId) {
    routePushed = false;
    trigger = null;
    hideDialog();
    history.replaceState(null, "", "#" + targetId);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth", block: "center" });
      target.focus({ preventScroll: true });
    }
  }
  document.getElementById("detail-formula").addEventListener("click", () => {
    const item = currentItem;
    document.querySelectorAll(".sequence-node").forEach(node => node.classList.toggle("is-target", node.id === "formula-entry-" + item.id));
    jumpTo("formula-entry-" + item.id);
  });
  document.getElementById("detail-plant").addEventListener("click", () => {
    const plant = plants.get(currentItem?.plantId);
    if (plant) {
      const link = document.querySelector('[data-plant-id="' + plant.id + '"]');
      jumpTo("plants");
      link.focus({ preventScroll: true });
    }
  });
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  function closeMenu() { nav.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", "展开导航"); }
  menu.addEventListener("click", () => {
    const isOpen = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-label", isOpen ? "收起导航" : "展开导航");
    nav.classList.toggle("is-open", isOpen);
  });
  nav.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", event => { if (!event.target.closest(".site-header")) closeMenu(); });
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("[data-section]")];
  let pendingScroll = false;
  function updateNav() {
    const marker = window.scrollY + Math.min(window.innerHeight * .35, 240);
    let active = sections[0];
    for (const section of sections) if (section.offsetTop <= marker) active = section;
    navLinks.forEach(link => {
      const selected = link.hash === "#" + active.id;
      link.classList.toggle("is-active", selected);
      if (selected) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    pendingScroll = false;
  }
  window.addEventListener("scroll", () => {
    if (!pendingScroll) { pendingScroll = true; requestAnimationFrame(updateNav); }
  }, { passive: true });
  window.addEventListener("resize", () => { if (innerWidth > 600) closeMenu(); updateNav(); });
  window.addEventListener("hashchange", route);
  // 手机抽屉只在顶部手势柄上响应下滑，避免干扰面板内阅读。
  const handle = dialog.querySelector(".drawer-handle");
  let startY = null;
  handle.addEventListener("pointerdown", event => { startY = event.clientY; handle.setPointerCapture(event.pointerId); });
  handle.addEventListener("pointerup", event => { if (startY !== null && event.clientY - startY > 55) requestClose(); startY = null; });
  handle.addEventListener("pointercancel", () => { startY = null; });
  document.documentElement.classList.add("js");
  updateNav();
  route();
})();
