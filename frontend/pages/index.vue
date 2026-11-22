<script setup>
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";

const authStore = useAuthStore();
const store = useProfileStore();

useHead({
  title: "Akarin Sangyor | Software Engineer Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Akarin Sangyor's software engineering portfolio, technical skills, professional work experience, and featured projects.",
    },
    {
      property: "og:title",
      content: "Akarin Sangyor | Software Engineer Portfolio",
    },
    {
      property: "og:description",
      content:
        "Explore Akarin Sangyor's software engineering portfolio, technical skills, work experience, and featured projects.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});

const limit = 4;
const currentPortfoliosPage = ref(1);

await Promise.all([
  store.getProfile(),
  store.getPortfolios(currentPortfoliosPage.value, limit),
]);

const onPortfoliosMore = async () => {
  const nextPage = currentPortfoliosPage.value + 1;
  await store.getPortfolios(nextPage, limit);
  currentPortfoliosPage.value = nextPage;
};
</script>

<template>
  <div class="space-y-10 md:space-y-12">
    <section id="skills" class="scroll-mt-20">
      <BaseEditable :edit-mode="store.skillsEditMode">
        <template #view>
          <SkillList
            :skills="store.profile.overallSkills"
            :can-edit="authStore.canEdit"
            @edit="store.enterSkillsEditMode"
          />
        </template>
        <template #edit>
          <LazySkillForm
            :skills="store.profile.overallSkills"
            @submit="store.saveSkills"
            @cancel="store.enterSkillsViewMode"
          />
        </template>
      </BaseEditable>
    </section>

    <section id="experiences" class="scroll-mt-20">
      <BaseEditable :edit-mode="store.experiencesEditMode">
        <template #view>
          <ExperienceList
            :experiences="store.profile.experiences"
            :can-edit="authStore.canEdit"
            :has-more-experiences="store.hasMoreExperiences"
            :is-experience-visible="store.isExperienceVisible"
            @edit="store.enterExperiencesEditMode"
            @more="store.increaseVisibleExperiences(8)"
          />
        </template>
        <template #edit>
          <LazyExperienceForm
            :experiences="store.profile.experiences"
            @cancel="store.enterExperiencesViewMode"
            @submit="store.saveExperiences"
          />
        </template>
      </BaseEditable>
    </section>

    <section id="portfolios" class="scroll-mt-20">
      <PortfolioList
        :portfolios="store.portfolios"
        :can-edit="authStore.canEdit"
        :is-getting-portfolios="store.isGettingPortfolios"
        :has-more-portfolios="store.hasMorePortfolios"
        @more="onPortfoliosMore"
      />
    </section>
  </div>
</template>
