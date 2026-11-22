<script setup>
defineProps({
  skills: {
    type: Array,
    default: () => [],
  },
  canEdit: Boolean,
});

defineEmits(["edit"]);
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :visibleOnce="{
      opacity: 1,
      x: 0,
      transition: {
        duration: 800,
        type: 'spring',
        stiffness: 90,
        damping: 16,
      },
    }"
    class="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs"
  >
    <div class="flex items-center justify-between gap-4 mb-5">
      <div class="flex items-center gap-3">
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 text-primary border border-sky-200/60"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </span>
        <div>
          <h2 class="text-lg md:text-xl font-bold text-slate-900">
            Technical Skills
          </h2>
          <p class="text-xs md:text-sm text-slate-500">
            Core technologies, frameworks, and tools
          </p>
        </div>
      </div>

      <BaseButton
        v-if="canEdit"
        size="small"
        variant="secondary"
        @click="$emit('edit')"
      >
        Edit
      </BaseButton>
    </div>

    <BaseBadgeList v-if="skills && skills.length > 0" :badges="skills" />
    <p v-else class="text-sm text-slate-400 italic">No skills listed yet.</p>
  </div>
</template>
