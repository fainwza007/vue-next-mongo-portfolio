<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  name: String,
  modelValue: String,
  options: Array,
});

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});

const style = computed(() => {
  const base =
    "appearance-none w-full border rounded-xl pl-3.5 pr-9 py-2.5 text-sm md:text-base bg-white text-slate-900 transition-all duration-200 focus:outline-none focus:ring-4";
  if (errorMessage.value) {
    return `${base} border-rose-400 focus:border-rose-500 focus:ring-rose-500/15`;
  }

  return `${base} border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-primary/15`;
});
</script>

<template>
  <div class="block mb-1">
    <div class="relative">
      <select v-model="value" ref="select" :class="style" v-bind="$attrs">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
      <IconArrowDown
        class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
      />
    </div>
    <BaseErrorMessage v-if="errorMessage">{{ errorMessage }}</BaseErrorMessage>
  </div>
</template>
