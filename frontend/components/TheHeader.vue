<script setup>
import { useAuthStore } from "@/stores/auth";
import {
  smoothScrollToSection,
  animateWindowScrollTo,
} from "@/composables/scroll";

const authStore = useAuthStore();
const route = useRoute();
const { isDark, toggleTheme } = useTheme();

const navSections = [
  { id: "skills", label: "Skills" },
  { id: "experiences", label: "Experience" },
  { id: "portfolios", label: "Portfolios" },
];

const activeSection = ref("skills");
let isProgrammaticScrolling = false;

async function onSelectSection(sectionId) {
  activeSection.value = sectionId;

  if (route.path !== "/") {
    await navigateTo({ path: "/", hash: `#${sectionId}` });
    return;
  }

  isProgrammaticScrolling = true;
  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `#${sectionId}`);
  }

  await smoothScrollToSection(sectionId, 88, 780);
  isProgrammaticScrolling = false;
}

async function scrollToTop() {
  activeSection.value = "skills";
  if (route.path !== "/") {
    await navigateTo("/");
    return;
  }

  isProgrammaticScrolling = true;
  if (window.history?.replaceState) {
    window.history.replaceState(null, "", "/");
  }
  await animateWindowScrollTo(0, 700);
  isProgrammaticScrolling = false;
}

// --- ScrollSpy to highlight active section while scrolling ---
let scrollSpyRaf = null;
function onWindowScroll() {
  if (isProgrammaticScrolling || route.path !== "/") return;
  if (scrollSpyRaf) return;

  scrollSpyRaf = requestAnimationFrame(() => {
    scrollSpyRaf = null;
    const triggerLine = 160;
    let current = navSections[0].id;

    for (const section of navSections) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          current = section.id;
        }
      }
    }
    activeSection.value = current;
  });
}

// --- Hero Motion Variants ---
const avatarInitial = ref({
  y: 80,
  scale: 0.85,
  opacity: 0,
});

const avatarEnter = ref({
  y: 0,
  scale: 1,
  opacity: 1,
  transition: {
    type: "spring",
    stiffness: 160,
    damping: 14,
  },
});

// --- Typewriter with proper cleanup ---
const phrases = [
  "💻 Programmer",
  "🛠️ Software Engineer",
  "🚀 FullStack Developer",
  "🌱 Never Stop Learning!",
];

const typeSpeed = 75;
const deleteSpeed = 35;
const pauseAfterType = 1600;
const pauseAfterDelete = 300;

const displayedText = ref("");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timerId = null;

function tick() {
  const current = phrases[phraseIndex];
  const chars = Array.from(current);

  if (!isDeleting) {
    displayedText.value = chars.slice(0, ++charIndex).join("");
    if (charIndex === chars.length) {
      isDeleting = true;
      timerId = setTimeout(tick, pauseAfterType);
      return;
    }
  } else {
    displayedText.value = chars.slice(0, --charIndex).join("");
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timerId = setTimeout(tick, pauseAfterDelete);
      return;
    }
  }

  timerId = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
}

async function handleLogout() {
  await authStore.logout();
  navigateTo("/login");
}

onMounted(() => {
  timerId = setTimeout(tick, pauseAfterDelete);
  window.addEventListener("scroll", onWindowScroll, { passive: true });
});

onBeforeUnmount(() => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  if (scrollSpyRaf) {
    cancelAnimationFrame(scrollSpyRaf);
    scrollSpyRaf = null;
  }
  window.removeEventListener("scroll", onWindowScroll);
});
</script>

<template>
  <!-- Sticky Top Navigation Bar -->
  <nav
    class="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/70 shadow-2xs transition-all"
  >
    <div
      class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2"
    >
      <button
        type="button"
        @click="scrollToTop"
        class="inline-flex items-center gap-2.5 group cursor-pointer shrink-0 focus:outline-none"
      >
        <span
          class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm shadow-sm shadow-primary/25 group-hover:scale-105 transition-transform"
        >
          AS
        </span>
        <span
          class="hidden sm:inline font-bold text-slate-900 tracking-tight text-sm sm:text-base group-hover:text-primary transition-colors"
        >
          Akarin Sangyor
        </span>
      </button>

      <div class="flex items-center gap-2 sm:gap-4">
        <div
          class="flex items-center gap-1 sm:gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70"
        >
          <button
            v-for="section in navSections"
            :key="section.id"
            type="button"
            @click="onSelectSection(section.id)"
            :class="[
              'px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer focus:outline-none',
              activeSection === section.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm shadow-primary/25 font-semibold scale-[1.02]'
                : 'text-slate-600 hover:text-primary hover:bg-white/70',
            ]"
          >
            {{ section.label }}
          </button>
        </div>

        <!-- Dark / Light Mode Toggle -->
        <button
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
          class="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200/80 bg-white/90 text-slate-600 hover:text-primary hover:border-primary/40 shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
        >
          <!-- Sun icon for Dark mode -->
          <svg
            v-if="isDark"
            class="w-4 h-4 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <!-- Moon icon for Light mode -->
          <svg
            v-else
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <div v-if="authStore.canEdit" class="flex items-center gap-2">
          <span
            class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/80"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Admin
          </span>
          <button
            type="button"
            @click="handleLogout"
            class="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <IconLogout
              class="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            />
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Header with v-motion animations -->
  <header
    class="relative overflow-hidden border-b border-slate-200/70 bg-white/80"
  >
    <!-- Decorative Background Glows -->
    <div
      class="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-200/35 blur-3xl"
      aria-hidden="true"
    />

    <!-- Hero Profile Section -->
    <div
      class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14"
      v-motion="{
        initial: {
          y: 60,
          opacity: 0,
        },
        enter: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 650,
            ease: 'easeOut',
          },
        },
      }"
    >
      <div class="flex flex-col md:flex-row items-center gap-7 md:gap-10">
        <!-- Avatar Column -->
        <div
          class="relative shrink-0"
          v-motion
          :initial="avatarInitial"
          :enter="avatarEnter"
        >
          <div
            class="relative p-1.5 rounded-full bg-gradient-to-tr from-primary via-secondary to-sky-300 shadow-xl shadow-primary/15"
          >
            <img
              src="@/assets/images/avatar.jpg"
              alt="Akarin Sangyor"
              width="176"
              height="176"
              fetchpriority="high"
              decoding="async"
              class="rounded-full w-32 h-32 md:w-44 md:h-44 object-cover border-4 border-white bg-slate-100"
            />
          </div>
          <!-- Available Status Badge -->
          <div
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-700 text-xs font-semibold shadow-md border border-slate-200/80"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
              ></span>
            </span>
            Open to work
          </div>
        </div>

        <!-- Bio & Actions Column -->
        <div class="flex-1 text-center md:text-left">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/70 text-primary text-xs font-semibold mb-3"
          >
            <span>Portfolio &amp; Engineering Profile</span>
          </div>

          <h1
            class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Akarin Sangyor
          </h1>

          <!-- Typewriter Animation Pill -->
          <div
            class="mt-2.5 h-8 flex items-center justify-center md:justify-start"
          >
            <p
              class="inline-flex items-center font-mono text-sm sm:text-base md:text-lg font-medium text-slate-700 bg-slate-100/90 px-3.5 py-1 rounded-lg border border-slate-200/70"
            >
              <span>{{ displayedText }}</span>
              <span class="cursor ml-0.5 text-primary font-bold">|</span>
            </p>
          </div>

          <!-- Action Links & Resume / CV -->
          <div
            class="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3"
          >
            <BaseLink
              size="small"
              to="mailto:Akarin.Sangyor@gmail.com"
              class="!px-4 !py-2.5"
            >
              <IconEnvelope class="w-4 h-4" />
              <span>Email Me</span>
            </BaseLink>

            <BaseLink
              size="small"
              variant="secondary"
              to="https://www.linkedin.com/in/akarin-sangyor-112282258/?originalSubdomain=th"
              target="_blank"
              rel="noopener noreferrer"
              class="!px-4 !py-2.5"
            >
              <IconLinkedin class="w-4 h-4" />
              <span>LinkedIn</span>
            </BaseLink>

            <!-- Grouped Resume | CV -->
            <div
              class="inline-flex items-stretch rounded-xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden"
            >
              <a
                href="https://canva.link/hmxj7mj32jfy3zy"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-teal-700 hover:bg-teal-50/80 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-teal-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                  />
                </svg>
                <span>Resume</span>
              </a>
              <div class="w-px bg-slate-200"></div>
              <a
                href="https://canva.link/13vy701za1cj541"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-violet-700 hover:bg-violet-50/80 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-violet-600 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                  />
                </svg>
                <span>CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cursor {
  display: inline-block;
  animation: blink 0.75s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
