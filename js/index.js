document.addEventListener("DOMContentLoaded", function () {
  const themeIcon = document.getElementById("theme-icon");
  const themeButtons = document.querySelectorAll(".dropdown-item");

  function updateThemeIcon(theme) {
    const iconMap = {
      light: "sunny-outline",
      dark: "moon-outline",
      auto: "contrast-outline",
    };
    themeIcon.setAttribute("name", iconMap[theme] || "contrast-outline");
  }

  let savedTheme = localStorage.getItem("theme") || "auto";
  updateThemeIcon(savedTheme);
  document.body.setAttribute("data-theme", savedTheme);

  themeButtons.forEach((btn) => {
    const isActive = btn.getAttribute("data-bs-theme-value") === savedTheme;
    btn.querySelector(".check-icon").classList.toggle("d-none", !isActive);
  });

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedTheme = this.getAttribute("data-bs-theme-value");

      localStorage.setItem("theme", selectedTheme);
      document.body.setAttribute("data-theme", selectedTheme);

      updateThemeIcon(selectedTheme);

      themeButtons.forEach((b) =>
        b.querySelector(".check-icon").classList.add("d-none")
      );
      this.querySelector(".check-icon").classList.remove("d-none");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const themeIcon = document.getElementById("theme-icon");
  const themeButtons = document.querySelectorAll(".dropdown-item");
  const body = document.body;

  const iconMap = {
    light: "sunny-outline",
    dark: "moon-outline",
    auto: "contrast-outline",
  };

  let savedTheme = localStorage.getItem("theme") || "auto";
  applyTheme(savedTheme);

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedTheme = this.getAttribute("data-bs-theme-value");

      localStorage.setItem("theme", selectedTheme);
      applyTheme(selectedTheme);
    });
  });

  function applyTheme(theme) {
    if (theme === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      theme = prefersDark ? "dark" : "light";
    }
    body.setAttribute("data-bs-theme", theme);

    themeIcon.setAttribute("name", iconMap[theme]);

    themeButtons.forEach((btn) => {
      const isActive =
        btn.getAttribute("data-bs-theme-value") ===
        localStorage.getItem("theme");
      btn.querySelector(".check-icon").classList.toggle("d-none", !isActive);
    });
  }
});
