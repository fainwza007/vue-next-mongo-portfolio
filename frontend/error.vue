<script setup>
const props = defineProps({
  error: Object,
});

const is404 = computed(() => props.error?.statusCode === 404);

const handleClearError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
    <div
      class="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10 text-center"
    >
      <div
        class="mx-auto mb-5 w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-primary font-extrabold text-2xl"
      >
        {{ error?.statusCode || 404 }}
      </div>

      <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
        {{ is404 ? "Page Not Found" : "Something went wrong" }}
      </h1>

      <p class="mt-2.5 text-sm text-slate-500 leading-relaxed">
        {{
          error?.statusMessage ||
          "The page or portfolio project you are looking for might have been moved or doesn't exist."
        }}
      </p>

      <div class="mt-7">
        <BaseButton
          type="button"
          size="large"
          variant="primary"
          class="w-full"
          @click="handleClearError"
        >
          ← Back to Portfolio Home
        </BaseButton>
      </div>
    </div>
  </div>
</template>
