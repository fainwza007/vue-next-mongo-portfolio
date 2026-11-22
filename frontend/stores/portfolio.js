import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import {
  getPortfolioAPI,
  savePortfolioAPI,
  createPortfolioAPI,
  deletePortfolioAPI,
} from "@/repositories/portfolio";

export const usePortfolioStore = defineStore("portfolio", () => {
  const portfolio = ref(newPortfolio());
  const editMode = ref(false);

  function newPortfolio() {
    return {
      cover: "",
      images: [],
      title: "",
      content: "",
      excerpt: "",
      skills: [],
      publishedAt: new Date().toISOString(),
    };
  }

  async function getPortfolio(id) {
    try {
      const { data: response, error, status } = await getPortfolioAPI(id);
      if (status.value === "error" || error.value) {
        throw error.value || new Error("Failed to fetch portfolio");
      }

      portfolio.value = response.value;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function createPortfolio(draftedPortfolio) {
    const authStore = useAuthStore();
    const toast = useToast();

    try {
      const {
        data: response,
        error,
        status,
      } = await createPortfolioAPI(draftedPortfolio, authStore.token);
      if (status.value === "error" || error.value) {
        toast.error("Failed to create portfolio project.");
        throw error.value || new Error("Failed to create portfolio");
      }

      if (response.value?.status) {
        portfolio.value = draftedPortfolio;
        editMode.value = false;
        toast.success("New portfolio project published!");
        navigateTo("/");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function savePortfolio(draftedPortfolio) {
    const authStore = useAuthStore();
    const toast = useToast();

    try {
      const {
        data: response,
        error,
        status,
      } = await savePortfolioAPI(
        draftedPortfolio.id,
        draftedPortfolio,
        authStore.token
      );
      if (status.value === "error" || error.value) {
        toast.error("Failed to save portfolio changes.");
        throw error.value || new Error("Failed to save portfolio");
      }

      if (response.value?.status) {
        portfolio.value = draftedPortfolio;
        editMode.value = false;
        toast.success("Portfolio project saved successfully!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function deletePortfolio(id) {
    const authStore = useAuthStore();
    const toast = useToast();

    try {
      const {
        data: response,
        error,
        status,
      } = await deletePortfolioAPI(id, authStore.token);
      if (status.value === "error" || error.value) {
        toast.error("Failed to delete portfolio project.");
        throw error.value || new Error("Failed to delete portfolio");
      }

      if (response.value?.status) {
        editMode.value = false;
        toast.info("Portfolio project deleted.");
        navigateTo("/");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  function enterEditMode() {
    editMode.value = true;
  }

  function enterViewMode() {
    editMode.value = false;
  }

  return {
    portfolio,
    editMode,
    getPortfolio,
    newPortfolio,
    createPortfolio,
    savePortfolio,
    deletePortfolio,
    enterEditMode,
    enterViewMode,
  };
});
