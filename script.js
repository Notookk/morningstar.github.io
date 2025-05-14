// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Initialize particles only on large screens
    if (window.innerWidth > 768 && document.querySelector('.particle-container')) {
        createParticles();
    }

    // Start typing effect
    setTimeout(typeText, 1500);

    // Restore theme
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

// Sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector("header");
    if (header) header.classList.toggle("sticky", window.scrollY > 100);
});

// Toggle mobile menu
const menuIcon = document.querySelector("#menu-icon");
if (menuIcon) {
    menuIcon.addEventListener("click", () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) navbar.classList.toggle("active");
    });
}

// Close mobile nav on link click
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) navbar.classList.remove("active");
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

// Apply saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});


// Particle generator
function createParticles() {
    const container = document.querySelector(".particle-container");
    const colors = ["#917fb3", "#e5beec", "#fde2f3"];

    for (let i = 0; i < 50; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");

        p.style.left = `${Math.random() * window.innerWidth}px`;
        p.style.top = `${Math.random() * window.innerHeight}px`;
        p.style.width = p.style.height = `${Math.random() * 5 + 1}px`;
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDelay = `${Math.random() * 5}s`;
        p.style.animationDuration = `${Math.random() * 5 + 5}s`;

        container.appendChild(p);
    }
}

// Typing effect
const textAnimate = document.querySelector(".text-animate h3");
let charIndex = 0;
const originalText = textAnimate ? textAnimate.textContent : "";
if (textAnimate) textAnimate.textContent = "";

function typeText() {
    if (!textAnimate) return;

    if (charIndex < originalText.length) {
        textAnimate.textContent += originalText.charAt(charIndex++);
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (!textAnimate) return;

    if (charIndex > 0) {
        textAnimate.textContent = originalText.substring(0, --charIndex);
        setTimeout(eraseText, 50);
    } else {
        setTimeout(typeText, 1000);
    }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: "smooth"
            });
        }
    });
});

// Contact form handling
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form && formStatus) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        formStatus.textContent = "Sending...";

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            console.error(err);
            formStatus.textContent = "Oops! Something went wrong. Please try again later.";
        }
    });
}

// Animate on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll("section, .animate-on-scroll").forEach(el => observer.observe(el));

// 3D tilt effect
document.querySelectorAll('.projects-box').forEach(box => {
    const maxTilt = 15; // max tilt angle in degrees
    const transitionTime = 300; // in ms

    box.style.transition = `transform ${transitionTime}ms ease`;

    box.addEventListener('mousemove', e => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the box
        const y = e.clientY - rect.top;  // y position within the box

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const rotateX = percentY * -maxTilt;
        const rotateY = percentX * maxTilt;

        box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

    // Optional: Reset instantly if user stops moving
    box.addEventListener('mouseenter', () => {
        box.style.transition = `transform ${transitionTime}ms ease`;
    });
});
