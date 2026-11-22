const isDark = ref(false);
let initialized = false;

export const useTheme = () => {
  function applyTheme(dark) {
    isDark.value = dark;
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
    }
  }

  function initTheme() {
    if (initialized || typeof window === "undefined") return;
    initialized = true;

    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") {
      applyTheme(saved === "dark");
    } else {
      applyTheme(false);
    }
  }

  function toggleTheme() {
    applyTheme(!isDark.value);
  }

  return {
    isDark,
    initTheme,
    toggleTheme,
  };
};
