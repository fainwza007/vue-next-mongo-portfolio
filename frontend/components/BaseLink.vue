<script setup>
const props = defineProps({
  size: String,
  variant: String,
  onClick: Function,
});

const elementSizeClass = computed(() => useActionableSizeClass(props.size));
const elementVariantClass = computed(() =>
  useActionableVariantClass(props.variant)
);
</script>

<template>
  <NuxtLink :class="[elementVariantClass, elementSizeClass]">
    <slot />
  </NuxtLink>
</template>
