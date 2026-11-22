<script setup>
import TagsInput from "vue3-tags-input";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  name: String,
  modelValue: Array,
});

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});

const style = computed(() => {
  if (errorMessage.value) {
    return "error";
  }

  return "";
});

const onTagsChanged = (tags) => {
  value.value = tags;
};
</script>

<template>
  <div :class="style">
    <TagsInput
      @on-tags-changed="onTagsChanged"
      :add-tag-on-keys="[13, 188]"
      :tags="value"
      v-bind="$attrs"
    />
    <BaseErrorMessage v-if="errorMessage">{{ errorMessage }}</BaseErrorMessage>
  </div>
</template>

<style lang="css">
.error .v3ti {
  border-color: #f43f5e;
}

.error .v3ti--focus {
  border-color: #e11d48;
  box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.15);
}

.v3ti {
  border-width: 1px;
  border-color: #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.35rem 0.5rem;
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.v3ti--focus {
  outline-width: 0px;
  border-color: #0a6ebd;
  box-shadow: 0 0 0 4px rgba(10, 110, 189, 0.15);
}

.v3ti .v3ti-tag {
  background: linear-gradient(135deg, #0a6ebd, #3b82f6);
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  margin: 0.2rem;
}
</style>
