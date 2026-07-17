const WHATSAPP_MESSAGE = "Olá! Quero um orçamento da UpGrade.Me.";
const API_BASE = window.location.origin;

let whatsappUrl = null;

async function fetchConfig() {
  try {
    const res = await fetch(`${API_BASE}/api/config`);
    if (!res.ok) throw new Error("Falha ao carregar config");
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar config da API:", error);
    return null;
  }
}

function buildWhatsAppUrl(number) {
  if (!number) return null;
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${number}?text=${text}`;
}

async function setupWhatsAppLinks() {
  if (!whatsappUrl) {
    const config = await fetchConfig();
    whatsappUrl = config?.whatsappUrl || null;
  }

  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    if (whatsappUrl) {
      link.setAttribute("href", whatsappUrl);
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-pending");
    } else {
      link.setAttribute("href", "#");
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-pending");
    }
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

document.addEventListener("DOMContentLoaded", async () => {
  await setupWhatsAppLinks();
  setupMobileMenu();
  setupFaq();
  setupReveal();
});
