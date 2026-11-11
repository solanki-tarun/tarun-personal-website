
/* =================================
   1. DARK / LIGHT MODE
================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {

    document.body.classList.toggle("light", theme === "light");

    themeIcon.textContent = theme === "light" ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
    );

    document.querySelector('meta[name="theme-color"]')
        .setAttribute(
            "content",
            theme === "light" ? "#f4f5fb" : "#10152b"
        );

    localStorage.setItem("portfolio-theme", theme);
}

// Restore saved theme
const savedTheme = localStorage.getItem("portfolio-theme");

const systemPrefersLight = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;

applyTheme(savedTheme || (systemPrefersLight ? "light" : "dark"));

// Toggle theme on button click
themeToggle.addEventListener("click", () => {

    const isLight = document.body.classList.contains("light");

    applyTheme(isLight ? "dark" : "light");

});


/* =================================
   2. MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute("aria-expanded", isOpen);

});

// Close menu after selecting a section
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =================================
   3. SCROLL REVEAL ANIMATION
================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =================================
   4. AUTOMATIC COPYRIGHT YEAR
================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();

