<script setup>
defineProps({
  skills: Array,
  canEdit: Boolean,
});

defineEmits(["edit"]);
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :visibleOnce="{ opacity: 1, x: 0 }"
    :duration="1000"
  >
    <h2 class="text-xl font-bold mb-3 flex justify-between">
      <span>Skills</span>
      <BaseButton
        v-if="canEdit"
        size="small"
        variant="secondary"
        @click="$emit('edit')"
      >
        Edit
      </BaseButton>
    </h2>
    <BaseBadgeList v-if="skills.length > 0" :badges="skills"></BaseBadgeList>
    <span v-else class="text-grey"></span>
  </div>
</template>
