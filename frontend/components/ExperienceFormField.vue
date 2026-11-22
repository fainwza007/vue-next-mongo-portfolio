<script setup>
const props = defineProps({
  idx: Number,
  field: Object,
});

defineEmits(["remove"]);

const showLogoModal = ref(false);
const showDeleteConfirmModal = ref(false);
const experienceTypeOptions = useExperienceTypes();
const currentlyWorkHere = ref(props.field.value.end === null);

const onConfirm = () => {
  showLogoModal.value = false;
};

watch(currentlyWorkHere, (val) => {
  if (val) {
    props.field.value.end = null;
  }
});
</script>

<template>
  <div class="border border-slate-200/90 bg-slate-50/50 p-5 rounded-2xl space-y-4">
    <div class="md:flex md:gap-5">
      <div class="flex gap-3.5 md:flex-1">
        <div class="shrink-0">
          <div
            class="group relative w-12 h-12 rounded-xl overflow-hidden cursor-pointer border border-slate-200 bg-white shadow-2xs"
            title="Click to update company logo URL"
            @click="showLogoModal = true"
          >
            <BaseImage
              :url="field.value.logo"
              class="w-full h-full object-cover"
            />
          </div>
          <BaseModal
            title="Company Logo URL"
            v-model="showLogoModal"
            @confirm="onConfirm"
          >
            <div class="my-2">
              <BaseInput
                v-model="field.value.logo"
                :name="`experiences[${idx}].logo`"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </BaseModal>
        </div>

        <div class="text-sm flex-1 md:text-base space-y-2.5">
          <BaseInput
            v-model="field.value.title"
            :name="`experiences[${idx}].title`"
            placeholder="Job Title (e.g. Senior Backend Developer)"
          />

          <div class="flex flex-col sm:flex-row gap-2">
            <div class="flex-1">
              <BaseInput
                v-model="field.value.company"
                :name="`experiences[${idx}].company`"
                placeholder="Company Name"
              />
            </div>
            <div class="flex-1">
              <BaseSelect
                v-model="field.value.type"
                :name="`experiences[${idx}].type`"
                :options="experienceTypeOptions"
                placeholder="Select employment type"
              />
            </div>
          </div>

          <div>
            <div class="flex items-start gap-2 mb-2">
              <BaseInputDate
                :name="`experiences[${idx}].start`"
                placeholder="Start date"
              />
              <span class="py-2 text-slate-400">–</span>
              <BaseInputDate
                v-if="!currentlyWorkHere"
                :name="`experiences[${idx}].end`"
                placeholder="End date"
              />
              <span
                v-else
                class="inline-flex items-center justify-center w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium text-sm border border-emerald-200"
              >
                Present
              </span>
            </div>

            <label
              :for="`experiences[${idx}].currentWork`"
              class="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 cursor-pointer select-none"
            >
              <input
                :id="`experiences[${idx}].currentWork`"
                v-model="currentlyWorkHere"
                :value="true"
                type="checkbox"
                class="rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span>I am currently working in this role</span>
            </label>
          </div>

          <div class="py-1 md:hidden">
            <BaseTextArea
              :name="`experiences[${idx}].detail`"
              v-model="field.value.detail"
              placeholder="Describe your key responsibilities and achievements..."
              class="w-full"
              rows="5"
            />
          </div>

          <BaseInputTags
            :name="`experiences[${idx}].skills`"
            placeholder="Skills used in this role..."
          />
        </div>
      </div>

      <div class="hidden md:block md:flex-1">
        <BaseTextArea
          :name="`experiences[${idx}].detail`"
          v-model="field.value.detail"
          placeholder="Describe your key responsibilities and achievements..."
          class="w-full"
          rows="7"
        />
      </div>
    </div>

    <div class="flex justify-end pt-2 border-t border-slate-200/70">
      <BaseButton
        size="small"
        type="button"
        variant="danger"
        @click="showDeleteConfirmModal = true"
      >
        Delete Experience
      </BaseButton>
      <BaseConfirmModal
        v-model="showDeleteConfirmModal"
        title="Delete Work Experience?"
        :message="`Are you sure you want to remove '${field.value.title || 'this role'}' at '${field.value.company || 'this company'}'?`"
        confirm-text="Delete Role"
        @cancel="showDeleteConfirmModal = false"
        @confirm="
          showDeleteConfirmModal = false;
          $emit('remove', idx);
        "
      />
    </div>
  </div>
</template>
