import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { getProfileAPI, saveProfileAPI } from "@/repositories/profile";
import { getPortfoliosAPI } from "@/repositories/portfolio";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref({
    overallSkills: [],
    experiences: [],
  });
  const portfolios = ref([]);
  const isGettingPortfolios = ref(false);
  const hasMorePortfolios = ref(true);
  const skillsEditMode = ref(false);
  const experiencesEditMode = ref(false);
  const visibleExperiencesNumber = ref(3);

  const hasMoreExperiences = computed(() => {
    const list = profile.value?.experiences ?? [];
    return visibleExperiencesNumber.value < list.length;
  });

  async function getProfile() {
    try {
      const { data: response, error, status } = await getProfileAPI();
      if (status.value === "error" || error.value) {
        throw error.value || new Error("Failed to fetch profile");
      }

      if (response.value) {
        profile.value = {
          overallSkills: response.value.overallSkills ?? [],
          experiences: response.value.experiences ?? [],
        };
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  }

  async function getPortfolios(page, limit) {
    isGettingPortfolios.value = true;

    try {
      const {
        data: response,
        error,
        status,
      } = await getPortfoliosAPI(page, limit);

      if (status.value === "error" || error.value) {
        throw error.value || new Error("Failed to fetch portfolios");
      }

      const items = response.value?.data ?? [];
      const total = response.value?.total ?? 0;

      if (page == 1) {
        portfolios.value = items;
      } else {
        portfolios.value = [...portfolios.value, ...items];
      }

      hasMorePortfolios.value = portfolios.value.length < total;
    } catch (error) {
      console.error("Failed to load portfolios:", error);
      hasMorePortfolios.value = false;
    } finally {
      isGettingPortfolios.value = false;
    }
  }

  async function saveSkills(draftedSkills) {
    const authStore = useAuthStore();
    const toast = useToast();

    try {
      const {
        data: response,
        error,
        status,
      } = await saveProfileAPI(
        { overallSkills: draftedSkills.skills },
        authStore.token
      );
      if (status.value === "error" || error.value) {
        toast.error("Failed to update skills. Please try again.");
        throw error.value || new Error("Failed to save skills");
      }

      if (response.value?.status) {
        skillsEditMode.value = false;
        profile.value.overallSkills = draftedSkills.skills;
        toast.success("Technical skills updated successfully!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function saveExperiences(draftedExperiences) {
    const authStore = useAuthStore();
    const toast = useToast();

    try {
      const {
        data: response,
        error,
        status,
      } = await saveProfileAPI(draftedExperiences, authStore.token);
      if (status.value === "error" || error.value) {
        toast.error("Failed to update experiences. Please try again.");
        throw error.value || new Error("Failed to save experiences");
      }

      if (response.value?.status) {
        profile.value.experiences = draftedExperiences.experiences;
        experiencesEditMode.value = false;
        toast.success("Work experiences updated successfully!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  function isExperienceVisible(index) {
    return index + 1 <= visibleExperiencesNumber.value;
  }

  function increaseVisibleExperiences(amount) {
    visibleExperiencesNumber.value = visibleExperiencesNumber.value + amount;
  }

  function enterSkillsEditMode() {
    skillsEditMode.value = true;
  }

  function enterSkillsViewMode() {
    skillsEditMode.value = false;
  }

  function enterExperiencesEditMode() {
    experiencesEditMode.value = true;
  }

  function enterExperiencesViewMode() {
    experiencesEditMode.value = false;
  }

  return {
    profile,
    skillsEditMode,
    experiencesEditMode,
    visibleExperiencesNumber,
    hasMoreExperiences,
    portfolios,
    isGettingPortfolios,
    hasMorePortfolios,
    getProfile,
    getPortfolios,
    saveSkills,
    saveExperiences,
    isExperienceVisible,
    increaseVisibleExperiences,
    enterSkillsEditMode,
    enterSkillsViewMode,
    enterExperiencesEditMode,
    enterExperiencesViewMode,
  };
});
