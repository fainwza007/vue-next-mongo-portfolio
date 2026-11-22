<script setup>
import { VueFinalModal } from "vue-final-modal";

defineProps({
  title: String,
});

defineEmits(["confirm"]);
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center backdrop-blur-xs"
    content-class="flex flex-col w-full max-w-md mx-4 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-2xl space-y-4"
  >
    <h2 class="text-lg font-bold text-slate-900">
      {{ title }}
    </h2>
    <slot />
    <div class="flex justify-end pt-2">
      <BaseButton @click="$emit('confirm')" size="small">
        Confirm
      </BaseButton>
    </div>
  </VueFinalModal>
</template>
