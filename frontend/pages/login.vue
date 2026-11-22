<script setup>
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "center",
});

useHead({
  title: "Sign In | Akarin Sangyor Portfolio",
});

const store = useAuthStore();

onMounted(() => {
  store.userError = "";
  if (store.user.loggedIn === true) {
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
  <LoginForm
    :error="store.userError"
    :loading="store.isLoggedIn"
    @submit="onSubmit"
  />
</template>
