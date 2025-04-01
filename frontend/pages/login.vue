<script setup>

definePageMeta({
  layout: 'center',
});

function onSubmit() {
  console.log('submitted!')
}

</script>

<template>

  <form @submit.prevent="onSubmit">
    <input class="border" name="username" placeholder="Username">
    <input type="password" class="border" name="password" placeholder="Password">
    <BaseButton type="submit">Login</BaseButton>
  </form>

</template>