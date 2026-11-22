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
const showDeleteConfirmModal = ref(false);

const onSubmit = handleSubmit((values) => {
  emits("submit", values);
});
</script>

<template>
  <form
    @submit="onSubmit"
    class="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6"
  >
    <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
      <div>
        <h2 class="text-lg md:text-xl font-bold text-slate-900">
          Portfolio Project Details
        </h2>
        <p class="text-xs md:text-sm text-slate-500">
          Configure cover image, screenshots, tech stack, and case study content
        </p>
      </div>
      <BaseFormPanel :is-saving="isSubmitting" @cancel="$emit('cancel')" />
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Cover Image URL
        </label>
        <BaseInput name="cover" placeholder="https://example.com/cover.jpg" />
      </div>

      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Gallery Images
        </label>
        <div
          :class="[
            'w-full border rounded-2xl p-4 space-y-3 bg-slate-50/60',
            submitCount > 0 && imageError
              ? 'border-rose-400'
              : 'border-slate-200/90',
          ]"
        >
          <ul v-if="fields.length > 0" class="space-y-2.5">
            <li
              v-for="(field, idx) in fields"
              :key="field.key"
              class="flex items-start gap-2"
            >
              <div class="flex-1">
                <BaseInput
                  :name="`images[${idx}]`"
                  :value="field.value"
                  v-model="field.value"
                  placeholder="https://example.com/screenshot.jpg"
                />
              </div>
              <BaseButton
                variant="danger"
                size="small"
                class="mt-0.5"
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
            + Add Gallery Image
          </BaseButton>

          <ErrorMessage v-if="submitCount > 0" name="images" v-slot="{ message }">
            <div class="text-rose-600 text-xs font-medium">{{ message }}</div>
          </ErrorMessage>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Project Title
        </label>
        <BaseInput name="title" placeholder="Project Title" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Skills &amp; Technologies
          </label>
          <BaseInputTags name="skills" placeholder="Input related skills..." />
        </div>
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Published Date
          </label>
          <BaseInputDate name="publishedAt" placeholder="Published Date" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Project Content &amp; Description
        </label>
        <BaseTextArea
          name="content"
          rows="16"
          placeholder="Write about the project architecture, challenges, and results..."
        />
      </div>
    </div>

    <div v-if="canDelete" class="pt-4 border-t border-slate-100 flex justify-end">
      <BaseButton
        type="button"
        size="small"
        variant="danger"
        @click="showDeleteConfirmModal = true"
      >
        Delete this portfolio
      </BaseButton>
      <BaseConfirmModal
        v-model="showDeleteConfirmModal"
        title="Delete Portfolio Project?"
        :message="`Are you sure you want to permanently delete '${portfolio?.title || 'this project'}'? This action cannot be undone.`"
        confirm-text="Yes, Delete Project"
        @cancel="showDeleteConfirmModal = false"
        @confirm="
          showDeleteConfirmModal = false;
          $emit('delete');
        "
      />
    </div>
  </form>
</template>
