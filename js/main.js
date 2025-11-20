// Global: mobile menu toggle and progress bars animation
(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Animate skill/course progress bars when visible
  const fills = document.querySelectorAll(".progress-fill");
  const setWidth = (el, percent) => el.style.setProperty("--p", `${percent}%`);

  if (fills.length) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target;
              const percent = Number(el.dataset.percent || 0);
              setWidth(el, 0);
              requestAnimationFrame(() => setWidth(el, percent));
              obs.unobserve(el);
            }
          });
        },
        { threshold: 0.35 }
      );
      fills.forEach((el) => io.observe(el));
    } else {
      fills.forEach((el) => setWidth(el, Number(el.dataset.percent || 0)));
    }
  }
})();

// Diary page: entries list + add form + localStorage persistence
(() => {
  const listEl = document.getElementById("entryList");
  const form = document.getElementById("addEntryForm");
  const addDemoBtn = document.getElementById("addDemoEntryBtn");
  if (!listEl) return; // not on diary page

  const STORAGE_KEY = "diaryEntries";

  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const save = (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

  const seedIfEmpty = () => {
    const cur = load();
    if (cur.length) return;
    const seed = [
      { date: "2024-12-15", title: "Верстка макета сайта", desc: "Сверстал главную и шапку.", status: "done" },
      { date: "2024-12-10", title: "JavaScript основы", desc: "Переменные, функции, массивы.", status: "done" },
      { date: "2024-12-05", title: "Работа с формами", desc: "Валидация и обработчики.", status: "progress" },
      { date: "2024-12-01", title: "Адаптивный дизайн", desc: "Медиазапросы, гриды.", status: "progress" },
    ];
    save(seed);
  };

  const fmt = (iso) => {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  const render = () => {
    const data = load()
      .slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    listEl.innerHTML = "";
    data.forEach((item) => {
      const card = document.createElement("article");
      card.className = "entry";

      const top = document.createElement("div");
      top.className = "entry-top";

      const date = document.createElement("div");
      date.className = "entry-date";
      date.textContent = fmt(item.date);

      const status = document.createElement("div");
      status.className = "entry-status" + (item.status === "progress" ? " status-progress" : "");
      const dot = document.createElement("span");
      dot.className = "status-dot";
      const stText = document.createElement("span");
      stText.textContent = item.status === "done" ? "Выполнено" : "В процессе";
      status.append(dot, stText);

      top.append(date, status);

      const h3 = document.createElement("h3");
      h3.className = "entry-title";
      h3.textContent = item.title;

      const p = document.createElement("p");
      p.className = "entry-desc";
      p.textContent = item.desc || "";

      card.append(top, h3, p);
      listEl.appendChild(card);
    });
  };

  seedIfEmpty();
  render();

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const date = document.getElementById("dateInput").value || new Date().toISOString().slice(0, 10);
      const title = document.getElementById("titleInput").value.trim();
      const status = document.getElementById("statusSelect").value;
      const desc = document.getElementById("descInput").value.trim();
      if (!title) return;
      const cur = load();
      cur.push({ date, title, desc, status });
      save(cur);
      render();
      form.reset();
    });
  }

  if (addDemoBtn) {
    addDemoBtn.addEventListener("click", () => {
      const cur = load();
      const today = new Date().toISOString().slice(0, 10);
      cur.push({ date: today, title: "Новая запись", desc: "Черновое описание...", status: "progress" });
      save(cur);
      render();
    });
  }
})();
