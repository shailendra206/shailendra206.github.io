(function () {
    "use strict";

    var html = document.documentElement;
    var themeToggleBtn = document.getElementById("theme-toggle");
    var typingTextEl = document.getElementById("typing-text");
    var backToTopBtn = document.getElementById("back-to-top");
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function getPreferredTheme() {
        var stored = localStorage.getItem("theme");
        if (stored) {
            return stored;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme) {
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        if (themeToggleBtn) {
            var label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
            themeToggleBtn.setAttribute("aria-label", label);
        }
    }

    applyTheme(getPreferredTheme());

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            var current = html.getAttribute("data-theme");
            var next = current === "dark" ? "light" : "dark";
            applyTheme(next);
        });
    }

    var typingPhrases = [
        "Frontend Developer",
        "UI/UX Enthusiast",
        "React Specialist",
        "Creative Coder"
    ];

    var typingConfig = {
        phraseIndex: 0,
        charIndex: 0,
        isDeleting: false,
        typeSpeed: 80,
        deleteSpeed: 40,
        pauseAfterType: 2000,
        pauseAfterDelete: 500
    };

    function typeEffect() {
        if (!typingTextEl) return;

        var phrase = typingPhrases[typingConfig.phraseIndex];
        var speed;

        if (!typingConfig.isDeleting) {
            typingConfig.charIndex++;
            typingTextEl.textContent = phrase.substring(0, typingConfig.charIndex);
            speed = typingConfig.typeSpeed;

            if (typingConfig.charIndex === phrase.length) {
                speed = typingConfig.pauseAfterType;
                typingConfig.isDeleting = true;
            }
        } else {
            typingConfig.charIndex--;
            typingTextEl.textContent = phrase.substring(0, typingConfig.charIndex);
            speed = typingConfig.deleteSpeed;

            if (typingConfig.charIndex === 0) {
                typingConfig.isDeleting = false;
                typingConfig.phraseIndex = (typingConfig.phraseIndex + 1) % typingPhrases.length;
                speed = typingConfig.pauseAfterDelete;
            }
        }

        setTimeout(typeEffect, speed);
    }

    if (prefersReducedMotion && typingTextEl) {
        typingTextEl.textContent = typingPhrases[0];
    } else {
        typeEffect();
    }

    function toggleBackToTop() {
        if (!backToTopBtn) return;

        if (window.scrollY > 400) {
            backToTopBtn.removeAttribute("hidden");
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
            setTimeout(function () {
                if (!backToTopBtn.classList.contains("visible")) {
                    backToTopBtn.setAttribute("hidden", "");
                }
            }, 300);
        }
    }

    window.addEventListener("scroll", toggleBackToTop);

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function initScrollFades(wrapperId, gridId) {
        var wrapper = document.getElementById(wrapperId);
        var grid = document.getElementById(gridId);

        if (!grid || !wrapper) return;

        function updateFades() {
            var scrollLeft = grid.scrollLeft;
            var maxScroll = grid.scrollWidth - grid.clientWidth;

            if (scrollLeft <= 5) {
                wrapper.classList.remove("can-scroll-left");
            } else {
                wrapper.classList.add("can-scroll-left");
            }

            if (scrollLeft >= maxScroll - 5) {
                wrapper.classList.remove("can-scroll-right");
            } else {
                wrapper.classList.add("can-scroll-right");
            }
        }

        grid.addEventListener("scroll", updateFades);
        window.addEventListener("resize", updateFades);
        updateFades();
    }

    initScrollFades("skills-scroll-wrapper", "skills-grid");
    initScrollFades("projects-scroll-wrapper", "projects-grid");

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            var href = this.getAttribute("href");
            if (href === "#") return;
            
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    });
})();