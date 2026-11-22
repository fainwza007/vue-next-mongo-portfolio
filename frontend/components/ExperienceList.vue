<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

defineProps({
  experiences: {
    type: Array,
    default: () => [],
  },
  canEdit: Boolean,
  hasMoreExperiences: Boolean,
  isExperienceVisible: Function,
});

defineEmits(["edit", "more"]);

const container = ref(null);
const hasAnimated = ref(false);
const isVisible = ref(false);

const { stop } = useIntersectionObserver(container, ([{ isIntersecting }]) => {
  if (isIntersecting && !hasAnimated.value) {
    isVisible.value = true;
    hasAnimated.value = true;
    stop();
  }
});
</script>

<template>
  <div
    ref="container"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      transition:
        'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
    }"
    class="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs"
  >
    <div class="flex items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3">
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 text-primary border border-sky-200/60"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
        <div>
          <h2 class="text-lg md:text-xl font-bold text-slate-900">
            Work Experiences
          </h2>
          <p class="text-xs md:text-sm text-slate-500">
            Professional career journey and key achievements
          </p>
        </div>
      </div>

      <BaseButton
        v-if="canEdit"
        size="small"
        variant="secondary"
        @click="$emit('edit')"
      >
        Edit
      </BaseButton>
    </div>

    <ol
      v-if="experiences && experiences.length > 0"
      class="relative border-l-2 border-slate-200/90 ml-3 md:ml-4 pl-5 md:pl-7 space-y-6"
    >
      <template
        v-for="(experience, index) in experiences"
        :key="experience.id || `${experience.company}-${experience.title}-${index}`"
      >
        <li
          v-if="isExperienceVisible ? isExperienceVisible(index) : true"
          class="relative group"
        >
          <!-- Timeline Dot -->
          <span
            class="absolute -left-[27px] md:-left-[35px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-primary bg-white group-hover:bg-primary group-hover:scale-125 transition-all duration-200"
          />
          <ExperienceItem :experience="experience" :index="index" />
        </li>
      </template>
    </ol>
    <p v-else class="text-sm text-slate-400 italic">No experiences listed yet.</p>

    <BaseButton
      v-if="hasMoreExperiences"
      @click="$emit('more')"
      type="button"
      size="small"
      variant="secondary"
      class="w-full mt-6"
    >
      Load More Experiences
    </BaseButton>
  </div>
</template>
