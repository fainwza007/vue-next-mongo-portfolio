<script setup>
const props = defineProps({
  skills: Array,
});

const emits = defineEmits(["submit", "cancel"]);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: useSkillsValidationSchema(),
  validateOnInput: true,
  keepValuesOnUnmount: true,
  initialValues: {
    skills: props.skills,
  },
});

const onSubmit = handleSubmit((values) => {
  emits("submit", values);
});
</script>

<template>
  <form
    @submit="onSubmit"
    class="bg-white rounded-2xl border border-primary/30 p-6 md:p-8 shadow-sm"
  >
    <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
      <div>
        <h2 class="text-lg md:text-xl font-bold text-slate-900">
          Edit Technical Skills
        </h2>
        <p class="text-xs md:text-sm text-slate-500">
          Press Enter or comma to add a skill tag
        </p>
      </div>
      <BaseFormPanel :is-saving="isSubmitting" @cancel="$emit('cancel')" />
    </div>
    <BaseInputTags name="skills" placeholder="Input your skills..." />
  </form>
</template>
