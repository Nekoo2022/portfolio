// Фильтрация проектов (только на странице проектов)
(() => {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  const buttons = document.querySelectorAll(".filter-btn");
  const cards = grid.querySelectorAll(".project-card");

  const applyFilter = (key) => {
    cards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const show = key === "all" || tags.includes(key) || (key === "html" && (tags.includes("html") || tags.includes("css")));
      card.style.display = show ? "" : "none";
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      applyFilter(btn.dataset.filter);
    });
  });
})();
