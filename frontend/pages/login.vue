<script setup>

import { useAuthStore } from '~/stores/auth';

definePageMeta({
  layout: 'center',
});

useHead({
  title: 'Login'
})

const store = useAuthStore()

const normalVariable = 1

const reactiveVariable = ref(1)

console.log("🚀 ~ normalVariable:", normalVariable)
console.log("🚀 ~ reactiveVariable:", reactiveVariable)
console.log("🚀 ~ reactiveVariable.value:", reactiveVariable.value)

const onSubmit = async (value) => {
  console.log("🚀 ~ onSubmit ~ value:", value)
}
</script>

<template>

  <!-- <form @submit.prevent="onSubmit">
    <input class="border" name="username" placeholder="Username">
    <input type="password" class="border" name="password" placeholder="Password">
    <BaseButton type="submit">Login</BaseButton>
  </form> -->

  <main class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-sm">
      <LoginForm @submit="onSubmit" />

      <p>{{ store.number }}</p>
      <p>{{ store.multiplyByTwo }}</p>
      <BaseButton size="small" @click="store.increase">
        Increase
      </BaseButton>
    </div>
  </main>

</template>
