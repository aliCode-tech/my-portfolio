// Typewriter Effect
const phrases = [
  "Data Analyst",
  "SAP SD Module",
  "Garment Merchandising Operations",
  "Variance & Cost Analyst"
];

let currentPhraseIdx = 0;
let currentCharIdx = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function type() {
  const currentPhrase = phrases[currentPhraseIdx];
  
  if (isDeleting) {
    typewriterEl.textContent = currentPhrase.substring(0, currentCharIdx - 1);
    currentCharIdx--;
  } else {
    typewriterEl.textContent = currentPhrase.substring(0, currentCharIdx + 1);
    currentCharIdx++;
  }

  let typeSpeed = isDeleting ? 40 : 90;

  if (!isDeleting && currentCharIdx === currentPhrase.length) {
    typeSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && currentCharIdx === 0) {
    isDeleting = false;
    currentPhraseIdx = (currentPhraseIdx + 1) % phrases.length;
    typeSpeed = 400;
  }

  setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typewriterEl) type();
});

// Theme Toggle
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.body.classList.remove("dark-mode");
  document.body.classList.add("light-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("light-mode")) {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("portfolio-theme", "light");
  }
});

// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Project Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Contact Form Handling
const contactForm = document.getElementById("contact-form");
const feedbackEl = document.getElementById("form-feedback");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      feedbackEl.style.display = "block";
      feedbackEl.style.color = "#ef4444";
      feedbackEl.textContent = "Please fill in all required fields.";
      return;
    }

    // Compose mailto as fallback direct message
    const mailtoUri = `mailto:alinurislam403@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUri;

    feedbackEl.style.display = "block";
    feedbackEl.style.color = "#22c55e";
    feedbackEl.textContent = "Thank you! Opening your email client to deliver the message...";
    contactForm.reset();
  });
}
