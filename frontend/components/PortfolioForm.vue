<script setup>
import { ErrorMessage } from "vee-validate";

const props = defineProps({
  portfolio: Object,
  canDelete: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["submit", "cancel", "delete"]);

const { handleSubmit, isSubmitting, submitCount } = useForm({
  validationSchema: usePortfolioValidationSchema(),
  validationOnInput: true,
  keepValuesOnUnmount: true,
  initialValues: props.portfolio,
});

const { remove, push, fields } = useFieldArray("images");
const imageError = useFieldError("images");

const onSubmit = handleSubmit((values) => {
  emits("submit", values);
});
</script>

<template>
  <form @submit="onSubmit">
    <div class="flex justify-between">
      <span></span>
      <BaseFormPanel :is-saving="isSubmitting" @cancel="$emit('cancel')" />
    </div>
    <div class="mt-2">
      <BaseInput name="cover" placeholder="Input the cover image url" />
    </div>
    <div
      :class="[
        'w-full border-2 rounded-md p-5 my-2 space-y-2 bg-white focus:outline-0',
        submitCount > 0 && imageError
          ? 'border-red-500'
          : 'border-tertiary focus:border-secondary',
      ]"
    >
      <ul>
        <li
          v-for="(field, idx) in fields"
          :key="field.key"
          class="flex space-x-2"
        >
          <div class="flex-1">
            <BaseInput
              :name="`images[${idx}]`"
              :key="idx"
              :value="field.value"
              v-model="field.value"
              placeholder="Input the image url"
            />
          </div>
          <BaseButton
            variant="danger"
            size="small"
            class="mb-1"
            type="button"
            @click="remove(idx)"
          >
            Delete
          </BaseButton>
        </li>
      </ul>

      <BaseButton
        type="button"
        size="small"
        variant="secondary"
        class="w-full"
        @click="push('')"
      >
        Add a new image
      </BaseButton>

      <ErrorMessage v-if="submitCount > 0" name="images" v-slot="{ message }">
        <div class="text-red-500 text-sm">{{ message }}</div>
      </ErrorMessage>
    </div>

    <div class="space-y-2">
      <BaseInput name="title" placeholder="Title" />
      <div class="flex space-x-2">
        <div class="flex-1">
          <BaseInputTags name="skills" placeholder="Input related skills" />
        </div>
        <div class="flex-1">
          <BaseInputDate name="publishedAt" placeholder="Published Date" />
        </div>
      </div>
      <BaseTextArea name="content" rows="30" />
    </div>
    <div class="mt-10 flex justify-end">
      <BaseButton
        v-if="canDelete"
        type="button"
        size="small"
        variant="danger"
        @click="$emit('delete')"
      >
        Delete this portfolio
      </BaseButton>
    </div>
  </form>
</template>
