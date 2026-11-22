<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  name: String,
  modelValue: String,
});

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});

const style = computed(() => {
  const base =
    "w-full border rounded-xl px-3.5 py-2.5 text-sm md:text-base bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-4";
  if (errorMessage.value) {
    return `${base} border-rose-400 focus:border-rose-500 focus:ring-rose-500/15`;
  }

  return `${base} border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-primary/15`;
});
</script>

<template>
  <div class="block mb-1">
    <input v-model="value" :class="style" v-bind="$attrs" />
  </div>

  <BaseErrorMessage v-if="errorMessage">{{ errorMessage }}</BaseErrorMessage>
</template>
