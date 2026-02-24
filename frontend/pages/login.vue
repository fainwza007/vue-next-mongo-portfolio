<script setup>
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "center",
});

useHead({
  title: "Login",
});

const store = useAuthStore();

// ถ้า login อยู่แล้วให้ redirect ไปหน้าหลัก
onMounted(() => {
  if (store.user) {
    navigateTo("/");
  }
});

const onSubmit = async (values) => {
  const success = await store.login(values.username, values.password);
  if (success) {
    await navigateTo("/");
  }
};
</script>

<template>
  <!-- <form @submit.prevent="onSubmit">
    <input class="border" name="username" placeholder="Username">
    <input type="password" class="border" name="password" placeholder="Password">
    <BaseButton type="submit">Login</BaseButton>
  </form> -->

  <main class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-sm">
      <LoginForm @submit="onSubmit" :error="store.userError" />
      <!-- <BaseErrorMessage>{{ store.userError }}</BaseErrorMessage> -->
    </div>
  </main>
</template>
