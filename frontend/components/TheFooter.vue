<template>
  <div
    v-motion
    :initial="{
      opacity: 0,
      y: 40,
    }"
    :visibleOnce="{
      opacity: 1,
      y: 0,
      transition: {
        duration: 750,
        type: 'keyframes',
        ease: 'easeOut',
      },
    }"
  >
    <footer class="mt-16 border-t border-slate-200/80 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div
          class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-darker-primary to-primary px-6 py-10 md:px-12 md:py-14 text-center text-white shadow-xl shadow-primary/15"
        >
          <div
            class="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            class="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl"
            aria-hidden="true"
          />

          <div class="relative z-10 max-w-xl mx-auto">
            <div
              class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-sky-200 text-xs font-semibold mb-4 backdrop-blur-xs"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to work</span>
            </div>

            <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">
              Let's build something great together
            </h2>
            <p class="mt-2.5 text-sm md:text-base text-sky-100/85 leading-relaxed">
              Interested in collaborating or have an opportunity in mind? Feel free to reach out anytime.
            </p>

            <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
              <BaseLink
                size="large"
                to="mailto:Akarin.Sangyor@gmail.com"
                target="_blank"
                class="!bg-white !from-white !to-white !text-primary hover:!bg-sky-50 !shadow-lg"
              >
                <span>Hire me?</span>
                <IconEnvelope class="inline-block w-4 h-4" />
              </BaseLink>
            </div>
          </div>
        </div>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {{ new Date().getFullYear() }} Akarin Sangyor. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <a
              href="mailto:Akarin.Sangyor@gmail.com"
              class="hover:text-primary transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/akarin-sangyor-112282258/?originalSubdomain=th"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://canva.link/hmxj7mj32jfy3zy"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-primary transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
