<script setup>
import { useAuthStore } from "@/stores/auth";
import { usePortfolioStore } from "@/stores/portfolio";

const authStore = useAuthStore();
const store = usePortfolioStore();

if (!authStore.canEdit) {
  navigateTo("/login");
}

useHead({
  title: "Create a new portfolio | Akarin Sangyor",
});
</script>

<template>
  <PortfolioForm
    :portfolio="store.newPortfolio()"
    :can-delete="false"
    @submit="store.createPortfolio"
    @cancel="navigateTo('/')"
  />
</template>
