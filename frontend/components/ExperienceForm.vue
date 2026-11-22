<script setup>
const props = defineProps({
  experiences: Array,
});

const emits = defineEmits(["submit", "cancel"]);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: useExperiencesValidationSchema(),
  validateOnInput: true,
  keepValuesOnUnmount: true,
  initialValues: {
    experiences: props.experiences,
  },
});

const { remove, prepend, fields } = useFieldArray("experiences");

const onAdd = () =>
  prepend({
    logo: "",
    title: "",
    company: "",
    type: "",
    start: "",
    end: "",
    skills: [],
    detail: "",
  });

const onRemove = (idx) => {
  remove(idx);
};

const onSubmit = handleSubmit((values) => {
  emits("submit", values);
});
</script>

<template>
  <form
    @submit="onSubmit"
    class="bg-white rounded-2xl border border-primary/30 p-6 md:p-8 shadow-sm"
  >
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3">
        <h2 class="text-lg md:text-xl font-bold text-slate-900">
          Edit Work Experiences
        </h2>
        <BaseButton
          type="button"
          size="small"
          variant="secondary"
          @click="onAdd"
        >
          + Add Role
        </BaseButton>
      </div>
      <BaseFormPanel :is-saving="isSubmitting" @cancel="$emit('cancel')" />
    </div>

    <ol class="space-y-5">
      <li v-for="(field, idx) in fields" :key="field.key">
        <ExperienceFormField
          :field="field"
          :idx="idx"
          @remove="onRemove"
        />
      </li>
    </ol>
  </form>
</template>
