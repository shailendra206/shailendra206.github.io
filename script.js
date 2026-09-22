const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Active section indicator: highlights the nav link for the section currently in view
const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-resume)');
const navBrand = document.querySelector(".nav-brand");
const trackedSections = Array.from(sectionLinks)
  .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
  .filter(Boolean);
const heroSection = document.getElementById("hero");

if (sectionLinks.length && trackedSections.length) {
  const setActiveLink = (id) => {
    sectionLinks.forEach((link) => {
      link.classList.toggle("is-active", id !== null && link.getAttribute("href") === `#${id}`);
    });
    if (navBrand) {
      navBrand.classList.toggle("is-active", id === "hero");
    }
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
  if (heroSection) sectionObserver.observe(heroSection);
}
