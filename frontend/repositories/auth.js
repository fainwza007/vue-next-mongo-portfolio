export function loginAPI(username, password) {
  return useFetchAPI("/auth/login", {
    method: "POST",
    body: {
      username,
      password,
    },
  });
}
