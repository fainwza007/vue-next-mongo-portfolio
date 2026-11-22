<script setup>
const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <slot />
    </main>
    <TheFooter />
    <BaseToastContainer />
  </div>
</template>
