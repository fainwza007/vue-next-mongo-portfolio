export const useFetchAPI = (request, opts = {}) => {
  const config = useRuntimeConfig();

  return useFetch(request, {
    baseURL: config.public.baseApiUrl,
    ...opts,
    onResponseError({ response }) {
      if (response?.status === 401 && request !== "/auth/login") {
        const tokenCookie = useCookie("token");
        tokenCookie.value = null;
        if (typeof window !== "undefined") {
          const toast = useToast();
          toast.error("Session expired. Please sign in again.");
          navigateTo("/login");
        }
      }
    },
  });
};
