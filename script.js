// Small interactions: reveal-on-scroll, project filters, and mobile navigation.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project-card");
  const projectGrid = document.querySelector(".project-grid");
  filters.forEach(button => {
    button.addEventListener("click", () => {
      filters.forEach(filter => filter.classList.toggle("active", filter === button));
      const category = button.dataset.filter;
      projectGrid?.classList.toggle("design-filtered", category === "design");
      projects.forEach(project => {
        const visible = category === "all" || project.dataset.category === category;
        project.classList.toggle("hidden", !visible);
      });
    });
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  // If the showreel file has not been added yet, keep the placeholder visible.
  const video = document.getElementById("showreelVideo");
  const placeholder = document.getElementById("reelPlaceholder");
  if (video && placeholder) {
    video.addEventListener("loadeddata", () => { placeholder.style.display = "none"; });
    video.addEventListener("error", () => { placeholder.style.display = "flex"; });
  }
});
