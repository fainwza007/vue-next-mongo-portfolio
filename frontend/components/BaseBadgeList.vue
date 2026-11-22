<script setup>
defineProps({
  badges: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ul class="flex flex-wrap gap-1.5 md:gap-2">
    <li v-for="(item, index) in badges" :key="`${item}-${index}`">
      <BaseBadgeItem>{{ item }}</BaseBadgeItem>
    </li>
  </ul>
</template>
