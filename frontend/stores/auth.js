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

  // async function login(username, password) {
  //   isLoggedIn.value = true;

  //   const {
  //     data: response,
  //     error,
  //     status,
  //   } = await loginAPI(username, password);

  //   if (status.value == "error") {
  //     useCustomError(error.value, (error) => {
  //       userError.value = error.data.error;
  //     });
  //   }

  //   user.value = {
  //     loggedIn: true,
  //     token: response.value.token,
  //   };

  //   const token = useCookie("token");

  //   token.value = response.value.token;

  //   isLoggedIn.value = false;
  //   userError.value = "";

  //   return true;
  // }

  async function login(username, password) {
    isLoggedIn.value = true;
    userError.value = ""; // reset ก่อนทุกครั้ง

    const {
      data: response,
      error,
      status,
    } = await loginAPI(username, password);

    if (status.value === "error") {
      useCustomError(error.value, (error) => {
        userError.value = error.data.error;
      });
      isLoggedIn.value = false;
      return false; // 🔑 return ออกเลย ไม่รันต่อ
    }

    user.value = {
      loggedIn: true,
      token: response.value.token,
    };

    const token = useCookie("token");
    token.value = response.value.token;

    isLoggedIn.value = false;

    return true;
  }

  async function setUser(token) {
    user.value = {
      loggedIn: true,
      token,
    };
  }

  async function logout() {
    try {
      // เผื่อไว้ (optional) ยิง API ถ้ามี backend invalidate token
      // await logoutAPI();
    }
    catch (error) {
      console.log(error)
    }

    // 1. เคลียร์ state
    user.value = {
      loggedIn: false,
      token: ""
    }

    // 2. ลบ cookie
    const token = useCookie("token");
    token.value = null;

    // 3. reset error
    userError.value = "";
  }

  return {
    user,
    token,
    canEdit,
    userError,
    login,
    logout,
    setUser,
  };
});
