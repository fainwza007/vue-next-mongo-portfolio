<script setup>
import { ref, computed } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const props = defineProps({
  portfolios: {
    type: Array,
    default: () => [],
  },
  canEdit: Boolean,
  isGettingPortfolios: Boolean,
  hasMorePortfolios: Boolean,
});

defineEmits(["more"]);

const selectedSkill = ref("ALL");

const availableSkills = computed(() => {
  const counts = new Map();
  for (const item of props.portfolios ?? []) {
    for (const skill of item.skills ?? []) {
      counts.set(skill, (counts.get(skill) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
});

const filteredPortfolios = computed(() => {
  const list = props.portfolios ?? [];
  if (selectedSkill.value === "ALL") return list;
  return list.filter((item) =>
    (item.skills ?? []).includes(selectedSkill.value)
  );
});

const container = ref(null);
const hasAnimated = ref(false);
const isVisible = ref(false);

const { stop } = useIntersectionObserver(container, ([{ isIntersecting }]) => {
  if (isIntersecting && !hasAnimated.value) {
    hasAnimated.value = true;
    setTimeout(() => {
      isVisible.value = true;
    }, 80);
    stop();
  }
});
</script>

<template>
  <div
    ref="container"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(70px)',
      transition:
        'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
    }"
    class="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs"
  >
    <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </span>
        <div>
          <h2 class="text-lg md:text-xl font-bold text-slate-900">
            Featured Portfolios
          </h2>
          <p class="text-xs md:text-sm text-slate-500">
            Selected projects, case studies, and engineering work
          </p>
        </div>
      </div>

      <BaseLink
        v-if="canEdit"
        type="button"
        size="small"
        variant="secondary"
        to="/portfolios/new"
      >
        + Add Project
      </BaseLink>
    </div>

    <!-- Interactive Skill Filter Bar -->
    <div
      v-if="availableSkills.length > 1"
      class="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-100"
    >
      <button
        type="button"
        @click="selectedSkill = 'ALL'"
        :class="[
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer',
          selectedSkill === 'ALL'
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-xs shadow-primary/25'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900',
        ]"
      >
        <span>All Projects</span>
        <span
          :class="[
            'px-1.5 py-0.2 rounded-full text-[10px]',
            selectedSkill === 'ALL'
              ? 'bg-white/20 text-white'
              : 'bg-slate-200/90 text-slate-600',
          ]"
        >
          {{ portfolios.length }}
        </span>
      </button>

      <button
        v-for="skill in availableSkills"
        :key="skill.name"
        type="button"
        @click="
          selectedSkill = selectedSkill === skill.name ? 'ALL' : skill.name
        "
        :class="[
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
          selectedSkill === skill.name
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-xs shadow-primary/25 font-semibold'
            : 'bg-slate-100/90 text-slate-600 hover:bg-sky-50 hover:text-primary',
        ]"
      >
        <span>{{ skill.name }}</span>
        <span
          :class="[
            'px-1.5 py-0.2 rounded-full text-[10px]',
            selectedSkill === skill.name
              ? 'bg-white/20 text-white'
              : 'bg-slate-200/80 text-slate-500',
          ]"
        >
          {{ skill.count }}
        </span>
      </button>
    </div>

    <ul
      v-if="filteredPortfolios && filteredPortfolios.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <li
        v-for="(portfolio, index) in filteredPortfolios"
        :key="portfolio.id"
        class="relative h-full"
        :style="{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 4) * 110}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 4) * 110}ms`,
        }"
      >
        <BaseLink
          v-if="canEdit"
          :to="`/portfolios/${portfolio.id}?edit`"
          size="small"
          variant="secondary"
          class="absolute right-3 top-3 z-10 !bg-white/95 backdrop-blur-xs shadow-sm"
        >
          Edit
        </BaseLink>
        <NuxtLink :to="`/portfolios/${portfolio.id}`" class="block h-full">
          <BaseCard
            :title="portfolio.title"
            :excerpt="
              portfolio.excerpt
                ? portfolio.excerpt.endsWith('...')
                  ? portfolio.excerpt
                  : portfolio.excerpt + '...'
                : ''
            "
            :cover="portfolio.cover"
            :badges="portfolio.skills"
            :datetime="formatMonthYear(portfolio.publishedAt)"
          />
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="text-sm text-slate-400 italic">
      No portfolio projects match the selected filter.
    </p>

    <BaseButton
      v-if="isGettingPortfolios"
      size="small"
      variant="disabled"
      type="button"
      class="w-full mt-6"
      :disabled="true"
    >
      Loading projects...
    </BaseButton>
    <BaseButton
      v-else-if="hasMorePortfolios"
      @click="$emit('more')"
      size="small"
      variant="secondary"
      type="button"
      class="w-full mt-6"
    >
      Load More Projects
    </BaseButton>
  </div>
</template>
