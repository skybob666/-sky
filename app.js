(function () {
  "use strict";

  const data = window.CAO_DATA;
  const plantGrid = document.querySelector("#plant-grid");
  const ingredientGrid = document.querySelector("#ingredient-grid");
  const sequenceBand = document.querySelector("#sequence-band");
  const detailBackdrop = document.querySelector("#detail-backdrop");
  const detailPanel = document.querySelector("#detail-panel");
  const detailClose = document.querySelector("#detail-close");
  const relatedButton = document.querySelector("#detail-related-button");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  let lastTrigger = null;
  let activeFilter = "all";

  const plantById = Object.fromEntries(data.plants.map((plant) => [plant.id, plant]));
  const ingredientById = Object.fromEntries(data.ingredients.map((item) => [item.id, item]));

  function plantIcon(kind) {
    const variants = {
      stem: '<path class="mini-stem" d="M55 81 C51 64 55 45 64 22"/><path class="mini-leaf" d="M59 55 C42 41 28 42 21 50 C32 62 46 64 59 55Z"/><path class="mini-leaf" d="M56 70 C39 65 26 70 24 80 C38 85 50 81 56 70Z"/><circle class="mini-flower" cx="66" cy="20" r="10"/>',
      flower: '<path class="mini-stem" d="M55 82 C54 60 57 44 65 28"/><path class="mini-leaf" d="M56 61 C40 53 29 57 26 66 C38 72 49 70 56 61Z"/><circle class="mini-flower" cx="68" cy="25" r="15"/><path class="mini-flower-line" d="M68 11 V39 M54 25 H82 M58 15 L78 35 M78 15 L58 35"/>',
      leaf: '<path class="mini-stem" d="M54 82 C51 59 48 41 41 24"/><path class="mini-leaf" d="M49 62 C28 56 16 44 17 34 C33 33 46 43 49 62Z"/><path class="mini-leaf" d="M48 47 C57 30 69 24 79 27 C75 43 63 50 48 47Z"/><path class="mini-leaf" d="M53 75 C69 61 80 60 88 65 C78 77 66 81 53 75Z"/>'
    };
    return `<svg class="plant-icon" viewBox="0 0 110 100" aria-hidden="true">${variants[kind] || variants.stem}</svg>`;
  }

  function renderPlants() {
    plantGrid.innerHTML = data.plants.map((plant) => `
      <button class="plant-card" type="button" data-plant-id="${plant.id}" aria-label="查看${plant.name}植物卡">
        <span class="plant-card-top"><span>${plant.code}</span><span>VIEW →</span></span>
        <span class="plant-art">${plantIcon(plant.specimen)}</span>
        <span class="plant-card-copy"><em>${plant.latin}</em><strong>${plant.name}</strong><span>${plant.family}</span></span>
        <span class="plant-card-foot"><span>${plant.part}</span><b>查看成分 →</b></span>
      </button>
    `).join("");
  }

  function renderIngredients() {
    const items = activeFilter === "all" ? data.ingredients : data.ingredients.filter((item) => item.type === activeFilter);
    ingredientGrid.innerHTML = items.map((item) => `
      <button class="ingredient-card ${item.type === "plant" ? "is-plant" : ""}" type="button" data-ingredient-id="${item.id}" aria-label="查看${item.name}详情">
        <span class="ingredient-index">${String(item.position).padStart(2, "0")}</span>
        <span class="ingredient-main"><strong>${item.name}</strong><em>${item.english}</em></span>
        <span class="ingredient-tag">${item.alias}</span>
        <span class="ingredient-arrow" aria-hidden="true">↗</span>
      </button>
    `).join("");
  }

  function renderSequence() {
    sequenceBand.innerHTML = data.ingredients.slice().sort((a, b) => a.position - b.position).map((item) => `
      <button class="sequence-node ${item.type === "plant" ? "is-plant" : ""}" type="button" data-ingredient-id="${item.id}" aria-label="第${item.position}项：${item.name}">
        <span class="sequence-dot"></span><span class="sequence-number">${String(item.position).padStart(2, "0")}</span><span class="sequence-name">${item.name}</span>
      </button>
    `).join("");
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value || "—";
  }

  function openIngredient(item, trigger) {
    lastTrigger = trigger || null;
    const plant = item.plantId ? plantById[item.plantId] : null;
    setText("#detail-kicker", item.type === "plant" ? "PLANT EXTRACT / 植物提取物" : "INGREDIENT NOTE / 成分解码");
    setText("#detail-status", "示例资料 · 待核验");
    setText("#detail-title", item.name);
    setText("#detail-subtitle", item.english + (item.alias ? ` · ${item.alias}` : ""));
    setText("#detail-role", item.role);
    setText("#detail-origin", item.origin);
    setText("#detail-position", `示例配方第 ${item.position} 项 / 共 16 项`);
    setText("#detail-plant", plant ? `${plant.name} · ${plant.latin}` : "暂无植物关联");
    setText("#detail-plain", item.plain);
    setText("#detail-evidence-copy", item.evidence);
    detailBackdrop.hidden = false;
    document.body.classList.add("modal-open");
    detailPanel.focus();
    updateHash(`ingredient=${item.id}`);
  }

  function openPlant(plant, trigger) {
    const item = ingredientById[plant.ingredientId];
    if (item) openIngredient(item, trigger);
  }

  function closeDetail(updateUrl) {
    detailBackdrop.hidden = true;
    document.body.classList.remove("modal-open");
    if (updateUrl) clearHash();
    if (lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  }

  function updateHash(value) {
    history.replaceState(null, "", `#${value}`);
  }

  function clearHash() {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  function openFromHash() {
    const hash = window.location.hash.replace(/^#/, "");
    const match = hash.match(/^(ingredient|plant)=([^&]+)/);
    if (!match) return;
    if (match[1] === "ingredient" && ingredientById[match[2]]) openIngredient(ingredientById[match[2]]);
    if (match[1] === "plant" && plantById[match[2]]) openPlant(plantById[match[2]]);
  }

  document.addEventListener("click", (event) => {
    const ingredientTrigger = event.target.closest("[data-ingredient-id]");
    const plantTrigger = event.target.closest("[data-plant-id]");
    const filterTrigger = event.target.closest("[data-filter]");
    if (ingredientTrigger) openIngredient(ingredientById[ingredientTrigger.dataset.ingredientId], ingredientTrigger);
    if (plantTrigger) openPlant(plantById[plantTrigger.dataset.plantId], plantTrigger);
    if (filterTrigger) {
      activeFilter = filterTrigger.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("is-active", button === filterTrigger));
      renderIngredients();
    }
  });

  detailClose.addEventListener("click", () => closeDetail(true));
  relatedButton.addEventListener("click", () => {
    closeDetail(true);
    document.querySelector("#explore").scrollIntoView({ behavior: "smooth" });
  });
  detailBackdrop.addEventListener("click", (event) => {
    if (event.target === detailBackdrop) closeDetail(true);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !detailBackdrop.hidden) closeDetail(true);
  });
  window.addEventListener("hashchange", openFromHash);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.dataset.section}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  document.querySelectorAll("[data-section]").forEach((section) => sectionObserver.observe(section));

  renderPlants();
  renderIngredients();
  renderSequence();
  openFromHash();
})();
