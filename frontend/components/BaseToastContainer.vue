<script setup>
const { toasts, removeToast } = useToast();
</script>

<template>
  <div
    class="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0"
    aria-live="polite"
  >
    <TransitionGroup name="toast">
      <div
        v-for="item in toasts"
        :key="item.id"
        :class="[
          'pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md text-sm font-medium transition-all',
          item.type === 'error'
            ? 'bg-rose-600/95 text-white border-rose-500 shadow-rose-900/20'
            : item.type === 'info'
              ? 'bg-slate-900/95 text-white border-slate-700 shadow-slate-900/20'
              : 'bg-emerald-600/95 text-white border-emerald-500 shadow-emerald-900/20',
        ]"
      >
        <!-- Icon -->
        <svg
          v-if="item.type === 'success'"
          class="w-5 h-5 shrink-0 text-emerald-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="item.type === 'error'"
          class="w-5 h-5 shrink-0 text-rose-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 shrink-0 text-sky-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span class="flex-1 leading-snug">{{ item.message }}</span>

        <button
          type="button"
          class="p-1 rounded-lg opacity-75 hover:opacity-100 hover:bg-white/15 transition-opacity cursor-pointer"
          aria-label="Close notification"
          @click="removeToast(item.id)"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}
</style>
