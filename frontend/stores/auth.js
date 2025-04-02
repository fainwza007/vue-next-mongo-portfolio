import { defineStore } from "pinia";

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

    const {
      data: response,
      error,
      status,
    } = await loginAPI(username, password);

    if (status.value == "error") {
      useCustomError(error.value, (error) => {
        userError.value = error.data.error;
      });
    }

    user.value = {
      loggedIn: true,
      token: Response.value.token,
    };

    const token = useCookie("token");

    token.value = response.value.token;

    isLoggedIn.value = false;
    userError.value = "";

    return true;
  }

  async function setUser(token) {
    user.value = {
      loggedIn: true,
      token,
    };
  }

  return {
    user,
    token,
    canEdit,
    userError,
    login,
    setUser,
  };
});
