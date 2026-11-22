import { MotionPlugin } from "@vueuse/motion";

export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp.vueApp.directive("motion")) {
    nuxtApp.vueApp.use(MotionPlugin);
  }
});
