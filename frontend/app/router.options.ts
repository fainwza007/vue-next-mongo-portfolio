import type { RouterConfig } from "@nuxt/schema";
import {
  smoothScrollToSection,
  animateWindowScrollTo,
} from "~/composables/scroll";

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      const sectionId = to.hash.replace(/^#/, "");
      setTimeout(() => {
        smoothScrollToSection(sectionId, 88, 780);
      }, 60);
      return false;
    }

    if (to.path !== from.path) {
      animateWindowScrollTo(0, 500);
      return false;
    }

    return { top: 0 };
  },
};
