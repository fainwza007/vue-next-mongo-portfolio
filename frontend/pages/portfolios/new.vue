<script setup>
import { useAuthStore } from "@/stores/auth";
import { usePortfolioStore } from "@/stores/portfolio";

const authStore = useAuthStore();
const store = usePortfolioStore();
const route = useRoute();

if (!authStore.canEdit) {
  navigateTo("/login");
}

useHead({
  title: "Create a new portfolio | Akarin Sangyor",
});
</script>

<template>
  <!-- หน้านี้คือ new portfolio -->

  <PortfolioForm
    :portfolio="store.newPortfolio()"
    :can-delete="authStore.canEdit"
    @submit="store.createPortfolio"
    @cancel="navigateTo('/')"
    @delete="store.deletePortfolio(route.param.id)"
  />
</template>
