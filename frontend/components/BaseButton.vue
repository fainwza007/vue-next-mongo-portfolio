<script setup>
const props = defineProps({
  size: String,
  variant: String,
});

const elementSizeClass = computed(() => useActionableSizeClass(props.size));
const elementVariantClass = computed(() =>
  useActionableVariantClass(props.variant)
);
</script>

<template>
  <button :class="[elementVariantClass, elementSizeClass]">
    <slot />
  </button>
</template>
