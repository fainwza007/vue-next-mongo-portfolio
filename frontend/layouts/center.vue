<script setup>
const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <main class="min-h-screen w-full">
    <slot />
    <BaseToastContainer />
  </main>
</template>
