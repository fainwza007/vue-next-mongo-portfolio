<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import moment from "moment";

defineProps({
  portfolios: Array,
  canEdit: Boolean,
  isGettingPortfolios: Boolean,
  hasMorePortfolios: Boolean,
});

defineEmits(["more"]);

const container = ref(null);
const hasAnimated = ref(false);
const isVisible = ref(false);

useIntersectionObserver(container, ([{ isIntersecting }]) => {
  if (isIntersecting && !hasAnimated.value) {
    setTimeout(() => {
      isVisible.value = true;
      hasAnimated.value = true;
    }, 100);
  }
});
</script>

<template>
  <div
    ref="container"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }"
  >
    <section class="mb-10">
      <h2 class="text-xl font-bold mb-3 flex space-x-2">
        <span>Portfolios</span>
        <BaseLink v-if="canEdit" type="button" size="small" variant="secondary" to="/portfolios/new">
          Add
        </BaseLink>
      </h2>
      <ul v-if="portfolios.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <li v-for="portfolio in portfolios" :key="portfolio.id" class="relative">
          <BaseLink v-if="canEdit" :to="`/portfolios/${portfolio.id}?edit`" size="small" variant="secondary"
            class="absolute right-2 top-3">
            Edit
          </BaseLink>
          <NuxtLink :to="`/portfolios/${portfolio.id}`">
            <BaseCard :key="portfolio.id" :title="portfolio.title" :excerpt="portfolio.excerpt + '...'"
              :cover="portfolio.cover" :badges="portfolio.skills"
              :datetime="moment(portfolio.publishedAt).format('MMM YYYY')" />
          </NuxtLink>
        </li>
      </ul>
      <span v-else class="text-grey">None</span>
      <BaseButton v-if="isGettingPortfolios" size="small" variant="disabled" type="button"
        class="block w-full mt-5" disabled="true">Loading</BaseButton>
      <BaseButton v-else-if="hasMorePortfolios" @click="$emit('more')" size="small" variant="secondary"
        type="button" class="block w-full mt-5">Load More</BaseButton>
    </section>
  </div>
</template>