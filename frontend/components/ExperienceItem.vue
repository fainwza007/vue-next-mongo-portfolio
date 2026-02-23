<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import moment from "moment";

const props = defineProps({
  experience: Object,
  index: Number,
});

const experienceType = computed(() => useExperienceType(props.experience.type));
const start = computed(() =>
  moment(props.experience.start).format("MMM Do YY"),
);
const end = computed(() =>
  props.experience.end
    ? moment(props.experience.end).format("MMM Do YY")
    : "Present",
);
const diff = computed(() => {
  const { diffInYear, diffInMonth } = useDateRangeDiff(
    props.experience.start,
    props.experience.end,
  );
  if (diffInYear > 1) return `${diffInYear} year(s)`;
  return `${diffInMonth} month(s)`;
});

const container = ref(null);
const hasAnimated = ref(false);
const isVisible = ref(false);

useIntersectionObserver(container, ([{ isIntersecting }]) => {
  if (isIntersecting && !hasAnimated.value) {
    setTimeout(() => {
      isVisible.value = true;
      hasAnimated.value = true;
    }, props.index * 150); // delay ตาม index
  }
});
</script>

<template>
  <div
    ref="container"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      transition: 'opacity 0.4s ease, transform 1.5s ease',
    }"
  >
    <div class="md:flex md:space-x-2">
      <div class="flex space-x-3 md:flex-1">
        <div>
          <BaseImage :url="experience.logo" class="w-10 h-10 rounded-md" />
        </div>
        <div class="text-sm flex-1 md:text-base">
          <h3 class="font-bold text-base md:text-lg">{{ experience.title }}</h3>
          <div>
            <span> {{ experience.company }} </span>
            <span> : </span>
            <span> {{ experienceType }} </span>
          </div>
          <div>
            <span> {{ start }} - {{ end }} : {{ diff }} </span>
          </div>
          <div>
            <BaseBadgeList :badges="experience.skills" />
          </div>
        </div>
      </div>
      <div class="hidden md:block md:flex-1">
        <p class="whitespace-pre-wrap">{{ experience.detail }}</p>
      </div>
    </div>
  </div>
</template>
