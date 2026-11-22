import { defineStore } from "pinia";
import { loginAPI } from "~/repositories/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({
    loggedIn: false,
    token: "",
  });

  const isLoggedIn = ref(false);
  const userError = ref("");

  const token = computed(() => user.value.token);
  const canEdit = computed(() => user.value.loggedIn);

  async function login(username, password) {
    isLoggedIn.value = true;
    userError.value = "";
    const toast = useToast();

    try {
      const {
        data: response,
        error,
        status,
      } = await loginAPI(username, password);

      if (status.value === "error" || error.value) {
        useCustomError(error.value, (err) => {
          userError.value =
            err?.data?.error || "Invalid username or password.";
        });
        return false;
      }

      user.value = {
        loggedIn: true,
        token: response.value.token,
      };

      const tokenCookie = useCookie("token");
      tokenCookie.value = response.value.token;

      toast.success("Welcome back! Signed in as Admin.");
      return true;
    } catch (err) {
      userError.value =
        err?.data?.error ||
        "Unable to connect to authentication server. Please try again.";
      return false;
    } finally {
      isLoggedIn.value = false;
    }
  }

  async function setUser(token) {
    user.value = {
      loggedIn: true,
      token,
    };
  }

  async function logout() {
    user.value = {
      loggedIn: false,
      token: "",
    };

    const tokenCookie = useCookie("token");
    tokenCookie.value = null;

    userError.value = "";

    const toast = useToast();
    toast.info("Signed out successfully.");
  }

  return {
    user,
    isLoggedIn,
    token,
    canEdit,
    userError,
    login,
    logout,
    setUser,
  };
});
