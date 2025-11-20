// Валидация формы контактов (только на странице contacts)
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameEl = document.getElementById("cName");
  const emailEl = document.getElementById("cEmail");
  const msgEl = document.getElementById("cMessage");
  const alertEl = document.getElementById("contactAlert");

  const nameErr = document.getElementById("cNameError");
  const emailErr = document.getElementById("cEmailError");
  const msgErr = document.getElementById("cMessageError");

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(el, errEl, message) {
    el.setAttribute("aria-invalid", "true");
    errEl.textContent = message;
    errEl.classList.remove("visually-hidden");
    errEl.setAttribute("role", "alert");
    el.setAttribute("aria-describedby", errEl.id);
  }
  function clearError(el, errEl) {
    el.removeAttribute("aria-invalid");
    el.removeAttribute("aria-describedby");
    errEl.textContent = "";
    errEl.classList.add("visually-hidden");
    errEl.removeAttribute("role");
  }

  [
    [nameEl, nameErr],
    [emailEl, emailErr],
    [msgEl, msgErr],
  ].forEach(([el, err]) => {
    el.addEventListener("input", () => clearError(el, err));
  });

  function showAlert(type, text) {
    alertEl.hidden = false;
    alertEl.className = "alert " + (type === "success" ? "success" : "error");
    alertEl.textContent = text;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = msgEl.value.trim();

    if (name.length < 2) {
      setError(nameEl, nameErr, "Введите имя (минимум 2 символа).");
      ok = false;
    }
    if (!emailRe.test(email)) {
      setError(emailEl, emailErr, "Введите корректный email.");
      ok = false;
    }
    if (message.length < 5) {
      setError(msgEl, msgErr, "Введите сообщение (минимум 5 символов).");
      ok = false;
    }

    if (!ok) {
      showAlert("error", "Исправьте ошибки в форме.");
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    showAlert("success", "Сообщение отправлено! Я свяжусь с вами по email.");
    form.reset();
  });
})();

// Map consent: inject Yandex map only after user clicks
(() => {
  const consent = document.querySelector(".map-consent");
  if (!consent) return;
  const btn = consent.querySelector("[data-load-map]");
  const src = consent.getAttribute("data-src");
  if (!btn || !src) return;
  btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.title = "Карта местоположения";
    iframe.src = src;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    consent.replaceWith(iframe);
  });
})();
