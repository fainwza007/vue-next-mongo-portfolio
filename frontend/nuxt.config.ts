import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0a6ebd" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap",
        },
      ],
    },
  },
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
    "@vueuse/motion/nuxt",
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
