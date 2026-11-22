<script setup>
import { VueFinalModal } from "vue-final-modal";

defineProps({
  title: {
    type: String,
    default: "Confirm Action",
  },
  message: {
    type: String,
    default: "Are you sure you want to proceed? This action cannot be undone.",
  },
  confirmText: {
    type: String,
    default: "Delete",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
});

defineEmits(["confirm", "cancel"]);
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center backdrop-blur-xs"
    content-class="flex flex-col w-full max-w-md mx-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xl space-y-4"
  >
    <div class="flex items-start gap-4">
      <div
        class="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/70 dark:border-rose-800/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
          {{ title }}
        </h3>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {{ message }}
        </p>
      </div>
    </div>

    <div class="flex justify-end items-center gap-2.5 pt-2">
      <BaseButton
        type="button"
        size="small"
        variant="secondary"
        @click="$emit('cancel')"
      >
        {{ cancelText }}
      </BaseButton>
      <BaseButton
        type="button"
        size="small"
        variant="danger"
        @click="$emit('confirm')"
      >
        {{ confirmText }}
      </BaseButton>
    </div>
  </VueFinalModal>
</template>
