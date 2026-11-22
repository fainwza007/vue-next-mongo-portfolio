<script setup>
defineProps({
  cover: String,
  title: String,
  excerpt: String,
  badges: Array,
  datetime: String,
});
</script>

<template>
  <article
    class="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 overflow-hidden"
  >
    <!-- Cover Image -->
    <div class="relative w-full h-52 overflow-hidden bg-slate-100">
      <BaseImage
        :url="cover"
        :alt="title || 'Portfolio cover'"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
      />
      <span
        v-if="datetime"
        class="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/75 text-white backdrop-blur-md"
      >
        <svg
          class="w-3.5 h-3.5 text-sky-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {{ datetime }}
      </span>
    </div>

    <!-- Card Body -->
    <div class="flex-1 flex flex-col justify-between p-5 md:p-6">
      <div>
        <div class="flex items-start justify-between gap-2">
          <h3
            class="font-bold text-slate-900 text-base md:text-lg group-hover:text-primary transition-colors line-clamp-1"
          >
            {{ title }}
          </h3>
          <span
            class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-200 shrink-0"
          >
            <svg
              class="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </span>
        </div>

        <p
          class="text-slate-600 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed"
        >
          {{ excerpt }}
        </p>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100">
        <BaseBadgeList :badges="badges" />
      </div>
    </div>
  </article>
</template>
