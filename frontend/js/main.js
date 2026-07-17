/**
 * Contatos e redes — cole os links quando tiver.
 * WhatsApp: DDI + DDD + número (só dígitos).
 */
const WHATSAPP_NUMBER = "5519992538677";
const WHATSAPP_MESSAGE = "Olá! Quero um orçamento da UpGrade.Me.";

const SOCIAL = {
  instagram: "https://instagram.com/uppgrade.me",
  channel: "https://whatsapp.com/channel/0029Vb8auZnHAdNOqE20Fb3d",
};

const COOKIE_KEY = "upgrade_me_cookie_consent";

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

function setupSocialLinks() {
  const map = [
    [".js-instagram", SOCIAL.instagram, "Instagram em breve"],
    [".js-channel", SOCIAL.channel, "Canal em breve"],
  ];

  map.forEach(([selector, url, pendingLabel]) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (url) {
        el.setAttribute("href", url);
        el.removeAttribute("aria-disabled");
        el.classList.remove("is-pending");
        return;
      }

      el.setAttribute("href", "#");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-pending");
      if (el.matches(".community-card a, .btn-secondary")) {
        el.textContent = pendingLabel;
      }

      el.addEventListener("click", (event) => {
        event.preventDefault();
      });
    });
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
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

function setupCookies() {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");
  if (!banner || !acceptBtn || !rejectBtn) return;

  let saved = null;
  try {
    saved = localStorage.getItem(COOKIE_KEY);
  } catch {
    saved = null;
  }

  if (!saved) {
    banner.hidden = false;
  }

  const save = (value) => {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch {
      /* ignore */
    }
    banner.hidden = true;
  };

  acceptBtn.addEventListener("click", () => save("accepted"));
  rejectBtn.addEventListener("click", () => save("essential"));
}

document.addEventListener("DOMContentLoaded", () => {
  setupWhatsAppLinks();
  setupSocialLinks();
  setupMobileMenu();
  setupFaq();
  setupReveal();
  setupCookies();
});
