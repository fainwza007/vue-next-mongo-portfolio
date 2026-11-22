const toasts = ref([]);
let toastCounter = 0;

export const useToast = () => {
  function removeToast(id) {
    const idx = toasts.value.findIndex((t) => t.id === id);
    if (idx !== -1) {
      toasts.value.splice(idx, 1);
    }
  }

  function addToast(message, type = "success", duration = 3500) {
    const id = ++toastCounter;
    toasts.value.push({ id, message, type });

    if (typeof window !== "undefined" && duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }

  return {
    toasts,
    removeToast,
    success: (msg, duration) => addToast(msg, "success", duration),
    error: (msg, duration) => addToast(msg, "error", duration),
    info: (msg, duration) => addToast(msg, "info", duration),
  };
};
