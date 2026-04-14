<template>
  <header class="mb-10">
    <div class="w-full px-3 py-9 bg-quaternary flex space-x-3.5 justify-center md:flex-col md:items-center md:space-x-0"
      v-motion="{
        initial: {
          y: 100,
          opacity: 0.2,
        },
        enter: {
          y: 0,
          opacity: 1,
        },
      }">
      <div class="flex-none">
        <img src="@/assets/images/avatar.jpg" alt="Avatar"
          class="rounded-full w-32 h-32 border-2 border-primary md:w-52 md:h-52 md:mb-4" v-motion :initial="initial"
          :enter="enter" />
      </div>

      <div>
        <div class="font-bold text-lg text-center md:text-2xl">
          Akarin Sangyor
        </div>

        <!-- Typewriter animation -->
        <p class="pt-3 pb-1.5 text-base text-center md:text-xl">
          {{ displayedText }}<span class="cursor">|</span>
        </p>

        <div class="pt-2 flex flex-wrap gap-2 justify-center md:mt-2">
          <BaseLink size="small" to="mailto: Akarin.Sangyor@gmail.com"
            class="text-xs px-4 py-2 space-x-1 md:text-base md:px-7 md:py-3 md:space-x-2">
            <span class="hidden [@media(min-width:321px)]:inline">Email</span>
            <IconEnvelope class="inline-block w-3 md:w-4" />
          </BaseLink>
          <BaseLink size="small" to="https://www.linkedin.com/in/akarin-sangyor-112282258/?originalSubdomain=th"
            class="text-xs px-4 py-2 space-x-1 md:text-base md:px-7 md:py-3 md:space-x-2" target="blank">
            <span class="hidden [@media(min-width:321px)]:inline">Linkedin</span>
            <IconLinkedin class="inline-block w-3 md:w-4" />
          </BaseLink>
        </div>

        <!-- grouped Resume | CV -->
        <div class="flex justify-center mt-3 md:mt-4">
          <div
            class="inline-flex items-stretch border border-primary rounded-xl overflow-hidden min-w-[220px] md:min-w-[288px]">
            <a
            href="https://canva.link/hmxj7mj32jfy3zy"
            target="_blank"
            class="flex flex-1 justify-center items-center gap-2 py-2.5 px-4 md:py-3 md:px-6 bg-white hover:bg-teal-50
            transition-colors"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-teal-600 flex-shrink-0" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
            <span class="text-sm md:text-base font-medium text-teal-600">Resume</span>
            </a>
            <div class="w-px bg-primary opacity-30"></div>
            <a
            href="https://canva.link/13vy701za1cj541"
            target="_blank"
            class="flex flex-1 justify-center items-center gap-2 py-2.5 px-4 md:py-3 md:px-6 bg-white hover:bg-violet-50
            transition-colors"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-violet-600 flex-shrink-0" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
            <span class="text-sm md:text-base font-medium text-violet-600">CV</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const initial = ref({
  y: 100,
  opacity: 0,
});

const enter = ref({
  y: 0,
  opacity: 1,
  transition: {
    type: "spring",
    damping: 15,
  },
});

// --- Typewriter ---
const phrases = [
  "💻 Programmer",
  "🛠️ Software Engineer",
  "🚀 FullStack Developer",
  "🌱 Never Stop Learning!",
];

const typeSpeed = 80; // ms ต่อตัวอักษร (พิมพ์)
const deleteSpeed = 40; // ms ต่อตัวอักษร (ลบ)
const pauseAfterType = 1500; // หยุดหลังพิมพ์เสร็จ (ms)
const pauseAfterDelete = 300; // หยุดหลังลบหมด (ms)

const displayedText = ref("");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function tick() {
  const current = phrases[phraseIndex];
  const chars = Array.from(current);

  if (!isDeleting) {
    displayedText.value = chars.slice(0, ++charIndex).join("");
    if (charIndex === chars.length) {
      isDeleting = true;
      setTimeout(tick, pauseAfterType);
      return;
    }
  } else {
    displayedText.value = chars.slice(0, --charIndex).join("");
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, pauseAfterDelete);
      return;
    }
  }

  setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
}

onMounted(() => {
  setTimeout(tick, pauseAfterDelete);
});
</script>

<style scoped>
.cursor {
  display: inline-block;
  animation: blink 0.7s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
