import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "vue-final-modal/style.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
    "@pinia/nuxt",
    "vue3-carousel-nuxt",
  ],
  carousel: {
    prefix: "Base",
  },
  // pinia: {
  //   storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  // },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_API_BASE_URL,
    },
  },
});
