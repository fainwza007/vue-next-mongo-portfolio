<script setup>

definePageMeta({
  layout: 'center',
});

useHead({
  title: 'Login'
})

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

  <main class="m-auto w-[300px]">
    <LoginForm @submit="onSubmit" />
  </main>

</template>