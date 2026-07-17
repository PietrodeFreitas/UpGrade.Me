/**
 * Coloque seu número com DDI + DDD, só dígitos.
 * Exemplo: 5511999999999
 */
const WHATSAPP_NUMBER = "SEU_NUMERO";
const WHATSAPP_MESSAGE = "Olá! Quero um orçamento da UpGrade.Me.";

function buildWhatsAppUrl() {
  const number = String(WHATSAPP_NUMBER).replace(/\D/g, "");
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${number}?text=${text}`;
}

function setupWhatsAppLinks() {
  const url = buildWhatsAppUrl();
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    link.setAttribute("href", url);
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.classList.remove("is-active");
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function setupFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        openItem.classList.remove("is-open");
        openItem.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  setupWhatsAppLinks();
  setupMobileMenu();
  setupFaq();
  setupReveal();
});
