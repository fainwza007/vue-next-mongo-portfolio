let currentScrollFrame = null;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function cancelSmoothScroll() {
  if (currentScrollFrame !== null) {
    cancelAnimationFrame(currentScrollFrame);
    currentScrollFrame = null;
  }
}

export function animateWindowScrollTo(targetY, duration = 780) {
  if (typeof window === "undefined") return Promise.resolve();

  cancelSmoothScroll();

  const startY = window.scrollY || window.pageYOffset || 0;
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  const clampedTargetY = Math.min(Math.max(0, targetY), maxScroll);
  const distance = clampedTargetY - startY;

  if (Math.abs(distance) < 2) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let startTime = null;

    const stopOnUserInput = () => {
      cancelSmoothScroll();
      cleanupListeners();
      resolve();
    };

    const cleanupListeners = () => {
      window.removeEventListener("wheel", stopOnUserInput);
      window.removeEventListener("touchstart", stopOnUserInput);
    };

    window.addEventListener("wheel", stopOnUserInput, { passive: true });
    window.addEventListener("touchstart", stopOnUserInput, { passive: true });

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      const nextY = startY + distance * eased;
      window.scrollTo({ top: nextY, behavior: "instant" });

      if (progress < 1) {
        currentScrollFrame = requestAnimationFrame(step);
      } else {
        currentScrollFrame = null;
        cleanupListeners();
        resolve();
      }
    }

    currentScrollFrame = requestAnimationFrame(step);
  });
}

export async function smoothScrollToSection(
  sectionId,
  offset = 88,
  duration = 780
) {
  if (typeof window === "undefined") return;

  const el = document.getElementById(sectionId);
  if (!el) return;

  const elementTop = el.getBoundingClientRect().top + window.scrollY;
  const targetY = Math.max(0, elementTop - offset);

  await animateWindowScrollTo(targetY, duration);

  // Brief highlight pulse on the target section
  el.classList.remove("section-focus-pulse");
  void el.offsetWidth; // trigger reflow
  el.classList.add("section-focus-pulse");
  setTimeout(() => {
    el.classList.remove("section-focus-pulse");
  }, 1100);
}
