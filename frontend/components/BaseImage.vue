<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  url: String,
  alt: {
    type: String,
    default: "Image",
  },
});

const hasError = ref(false);

watch(
  () => props.url,
  () => {
    hasError.value = false;
  }
);

const isRenderable = computed(() => !hasError.value && useIsValidUrl(props.url));
</script>

<template>
  <img
    v-if="isRenderable"
    :src="url"
    :alt="alt"
    loading="lazy"
    decoding="async"
    v-bind="$attrs"
    @error="hasError = true"
  />
  <slot v-else name="placeholder">
    <div
      class="inline-flex items-center justify-center bg-slate-100 text-slate-400 border border-slate-200/80"
      v-bind="$attrs"
    >
      <IconPlaceholder class="w-1/2 h-1/2 max-w-10 max-h-10 opacity-60" />
    </div>
  </slot>
</template>
