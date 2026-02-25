<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

defineProps({
  experiences: Array,
  canEdit: Boolean,
  hasMoreExperiences: Boolean,
  isExperienceVisible: Function,
});

defineEmits(["edit", "more"]);

const container = ref(null);
const hasAnimated = ref(false);
const isVisible = ref(false);

useIntersectionObserver(container, ([{ isIntersecting }]) => {
  if (isIntersecting && !hasAnimated.value) {
    isVisible.value = true;
    hasAnimated.value = true;
  }
});
</script>

<template>
  <div
    ref="container"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      transition: 'opacity 1.8s ease, transform 1.4s ease',
    }"
  >
    <h2 class="text-xl font-bold mb-6 flex justify-between">
      <span>Experiences</span>
      <BaseButton
        v-if="canEdit"
        size="small"
        variant="secondary"
        @click="$emit('edit')"
      >
        Edit
      </BaseButton>
    </h2>
    <ol v-if="experiences.length > 0" class="space-y-6">
      <li v-for="(experience, index) in experiences" :key="experience.id">
        <div v-if="isExperienceVisible(index)">
          <ExperienceItem :experience="experience" />
        </div>
      </li>
    </ol>
    <span v-else class="text-grey"> None </span>
    <BaseButton
      v-if="hasMoreExperiences"
      @click="$emit('more')"
      type="button"
      size="small"
      variant="secondary"
      class="block w-full mt-5"
    >
      Load More
    </BaseButton>
  </div>
</template>
