<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const props = defineProps({
  experience: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const experienceType = computed(() => useExperienceType(props.experience.type));
const start = computed(() => formatDisplayDate(props.experience.start));
const end = computed(() =>
  props.experience.end ? formatDisplayDate(props.experience.end) : "Present"
);
const isCurrent = computed(() => !props.experience.end);

const diff = computed(() => {
  const { formatted, diffInYear, diffInMonth } = useDateRangeDiff(
    props.experience.start,
    props.experience.end
  );
  if (formatted) return formatted;
  if (diffInYear > 1) return `${diffInYear} year(s)`;
  return `${diffInMonth} month(s)`;
});

const container = ref(null);
const hasAnimated = ref(false);
const isVisible = ref(false);
let animTimer = null;

const { stop } = useIntersectionObserver(container, ([{ isIntersecting }]) => {
  if (isIntersecting && !hasAnimated.value) {
    hasAnimated.value = true;
    const delay = (props.index % 4) * 140;
    animTimer = setTimeout(() => {
      isVisible.value = true;
    }, delay);
    stop();
  }
});

onBeforeUnmount(() => {
  if (animTimer) {
    clearTimeout(animTimer);
  }
});
</script>

<template>
  <div
    ref="container"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
      transition:
        'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    }"
    class="rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 p-4 sm:p-5"
  >
    <div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
      <!-- Left Column: Role, Company, Dates & Skills -->
      <div class="flex items-start gap-3.5 md:flex-1">
        <BaseImage
          :url="experience.logo"
          :alt="experience.company || 'Company logo'"
          class="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200/80 bg-white shadow-2xs"
        />

        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="font-bold text-slate-900 text-base md:text-lg leading-snug">
              {{ experience.title }}
            </h3>
            <span
              v-if="isCurrent"
              class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Current
            </span>
          </div>

          <div class="mt-0.5 flex flex-wrap items-center gap-1.5 text-sm font-medium text-slate-700">
            <span>{{ experience.company }}</span>
            <span class="text-slate-300">•</span>
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-200/70 text-slate-700"
            >
              {{ experienceType }}
            </span>
          </div>

          <div class="mt-1.5 inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <svg
              class="w-3.5 h-3.5 text-slate-400 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ start }} – {{ end }}</span>
            <span class="text-slate-300">·</span>
            <span class="text-primary font-semibold">{{ diff }}</span>
          </div>

          <!-- Detail on mobile -->
          <div
            v-if="experience.detail"
            class="mt-3 md:hidden text-xs sm:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed bg-white/80 rounded-xl p-3 border border-slate-100"
          >
            {{ experience.detail }}
          </div>

          <div class="mt-3">
            <BaseBadgeList :badges="experience.skills" />
          </div>
        </div>
      </div>

      <!-- Right Column: Achievements Detail on Desktop -->
      <div
        v-if="experience.detail"
        class="hidden md:block md:flex-1 text-sm text-slate-600 bg-white/90 rounded-xl p-4 border border-slate-200/60"
      >
        <p class="whitespace-pre-wrap leading-relaxed">{{ experience.detail }}</p>
      </div>
    </div>
  </div>
</template>
