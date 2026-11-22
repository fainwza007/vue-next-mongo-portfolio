<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  name: String,
  modelValue: [Array, String, Date, Object],
});

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});

const style = computed(() => {
  const base =
    "!w-full !border !rounded-xl !px-9 !py-2.5 !text-sm md:!text-base !bg-white !text-slate-900 !transition-all !duration-200 focus:!outline-none focus:!ring-4";
  if (errorMessage.value) {
    return `${base} !border-rose-400 focus:!border-rose-500 focus:!ring-rose-500/15`;
  }
  return `${base} !border-slate-200 hover:!border-slate-300 focus:!border-primary focus:!ring-primary/15`;
});
</script>

<template>
  <div class="w-full">
    <VueDatePicker
      v-model="value"
      v-bind="$attrs"
      :input-class-name="style"
      :month-change-on-scroll="false"
      :enable-time-picker="false"
      type="date"
    />
    <BaseErrorMessage v-if="errorMessage">{{ errorMessage }}</BaseErrorMessage>
  </div>
</template>
