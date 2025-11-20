// Модальное окно проектов (только на странице проектов)
(() => {
  const modal = document.getElementById("projectModal");
  const grid = document.getElementById("projectGrid");
  if (!modal || !grid) return;

  const projectData = {
    p1: {
      title: "Тренажёр заданий ЕГЭ",
      desc: "Интерактивный тренажёр для подготовки к ЕГЭ: генерация вариантов, мгновенная проверка, объяснения, статистика и сохранение прогресса.",
      tags: ["HTML", "CSS", "JavaScript"],
      gallery: ["/images/project-1.png"],
      live: "#",
      source: "#",
    },
    p2: {
      title: "Копия Twitch",
      desc: "Учебная копия интерфейса стриминговой платформы: страницы каналов, лента трансляций, поиск, подписки и адаптивная навигация.",
      tags: ["React", "JavaScript"],
      gallery: ["/images/project-2.png"],
      live: "#",
      source: "#",
    },
    p3: {
      title: "Сайт заказа пиццы",
      desc: "Конструктор пиццы: выбор размера и теста, добавление ингредиентов, корзина и оформление заказа. Акцент на чистой архитектуре компонентов и управлении состоянием.",
      tags: ["React"],
      gallery: ["/images/project-3.png"],
      live: "#",
      source: "#",
    },
    p4: {
      title: "Портфолио",
      desc: "Адаптивный шаблон портфолио на Bootstrap.",
      tags: ["Bootstrap"],
      gallery: ["https://via.placeholder.com/960x540.png?text=Grid", "https://via.placeholder.com/960x540.png?text=Details"],
      live: "#",
      source: "#",
    },
  };

  const byId = (id) => document.getElementById(id);
  const elTitle = byId("modalTitle");
  const elTags = byId("modalTags");
  const elDesc = byId("modalDesc");
  const elGallery = byId("modalGallery");
  const elLive = byId("modalLive");
  const elSource = byId("modalSource");

  const openModal = () => {
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function renderProject(id) {
    const data = projectData[id];
    if (!data) return;
    elTitle.textContent = data.title;
    elDesc.textContent = data.desc;

    elTags.innerHTML = "";
    data.tags.forEach((t) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      elTags.appendChild(span);
    });

    elGallery.innerHTML = "";
    data.gallery.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = data.title;
      img.loading = "lazy";
      elGallery.appendChild(img);
    });

    const fallback = "https://github.com/Nekoo2022";
    const normalize = (v) => (v && v !== "#" ? v : fallback);
    elLive.href = normalize(data.live);
    elSource.href = normalize(data.source);
  }

  function handleOpen(id) {
    renderProject(id);
    openModal();
  }

  grid.addEventListener("click", (e) => {
    const link = e.target.closest(".open-project");
    if (link) {
      e.preventDefault();
      handleOpen(link.dataset.id);
    }
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const card = e.target.closest(".project-card");
      if (card) handleOpen(card.dataset.id);
    }
  });
})();
