<script setup>
const props = defineProps({
  error: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["submit"]);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: useLoginValidationSchema(),
  validateOnInput: true,
});

const isBusy = computed(() => props.loading || isSubmitting.value);

const onSubmit = handleSubmit((values) => {
  emits("submit", values);
});

const showPassword = ref(false);
const capsLockOn = ref(false);

function checkCapsLock(event) {
  if (typeof event?.getModifierState === "function") {
    capsLockOn.value = event.getModifierState("CapsLock");
  }
}
</script>

<template>
  <div class="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <!-- Animated Background Blobs & Grid -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="bg-grid-pattern absolute inset-0 opacity-40" />
      <div class="blob blob-1" />
      <div class="blob blob-2" />
      <div class="blob blob-3" />
    </div>

    <!-- Top Bar: Back to Portfolio -->
    <div class="relative z-10 max-w-5xl w-full mx-auto flex items-center justify-between">
      <NuxtLink
        to="/"
        class="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 hover:text-primary text-xs sm:text-sm font-semibold border border-slate-200/80 shadow-2xs hover:shadow-sm backdrop-blur-md transition-all duration-200"
      >
        <svg
          class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Portfolio</span>
      </NuxtLink>

      <div class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-slate-200/70 text-xs font-medium text-slate-500 backdrop-blur-md">
        <span class="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span>Portfolio Management Portal</span>
      </div>
    </div>

    <!-- Center Login Card -->
    <div class="relative z-10 my-auto py-8 flex items-center justify-center">
      <div
        class="w-full max-w-md bg-white/85 backdrop-blur-xl rounded-3xl border border-white/90 shadow-2xl shadow-primary/10 p-7 sm:p-10"
        v-motion="{
          initial: { y: 40, opacity: 0, scale: 0.97 },
          enter: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 140,
              damping: 18,
            },
          },
        }"
      >
        <!-- Brand / Shield Header -->
        <div class="flex flex-col items-center text-center mb-7">
          <div class="relative mb-4">
            <div
              class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-primary/30 ring-4 ring-white"
            >
              <svg
                class="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M12 11a3 3 0 100-6 3 3 0 000 6z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M5.5 13.5C7 12.5 9.5 12 12 12s5 .5 6.5 1.5L20 15c0 3.5-3 6.5-8 7.5C7 21.5 4 18.5 4 15l1.5-1.5z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M9.5 17l1.5 1.5 3.5-3.5"
                />
              </svg>
            </div>
            <span
              class="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white ring-2 ring-white shadow-xs"
              title="Secure Admin Access"
            >
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>

          <span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-50 border border-sky-200/80 text-primary text-xs font-semibold mb-2">
            Admin Access
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p class="mt-1.5 text-xs sm:text-sm text-slate-500">
            Sign in to manage your skills, experiences, and portfolios
          </p>
        </div>

        <!-- Server / Auth Error Banner -->
        <Transition name="fade-shake">
          <div
            v-if="error"
            role="alert"
            class="mb-5 flex items-start gap-3 rounded-2xl bg-rose-50/95 border border-rose-200 px-4 py-3 text-rose-700 shadow-2xs"
          >
            <svg
              class="w-5 h-5 text-rose-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div class="flex-1 text-xs sm:text-sm font-medium leading-snug">
              {{ error }}
            </div>
          </div>
        </Transition>

        <!-- Login Form -->
        <form @submit.prevent="onSubmit" class="space-y-5" novalidate>
          <!-- Username Field -->
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Username
            </label>
            <div class="login-field-wrap group relative">
              <span
                class="pointer-events-none absolute left-3.5 top-[22px] -translate-y-1/2 z-10 text-slate-400 group-focus-within:text-primary transition-colors"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <BaseInput
                name="username"
                placeholder="Enter your username"
                autocomplete="username"
                class="!pl-11 !py-2.5 !rounded-xl !bg-slate-50/70 focus:!bg-white"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <span
                v-if="capsLockOn"
                class="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                Caps Lock is ON
              </span>
            </div>

            <div class="login-field-wrap group relative">
              <span
                class="pointer-events-none absolute left-3.5 top-[22px] -translate-y-1/2 z-10 text-slate-400 group-focus-within:text-primary transition-colors"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <BaseInput
                name="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                autocomplete="current-password"
                class="!pl-11 !pr-11 !py-2.5 !rounded-xl !bg-slate-50/70 focus:!bg-white"
                @keyup="checkCapsLock"
                @keydown="checkCapsLock"
              />

              <button
                type="button"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                class="absolute right-3 top-[22px] -translate-y-1/2 z-10 p-1 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors cursor-pointer"
                @click="showPassword = !showPassword"
              >
                <svg
                  v-if="!showPassword"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <BaseButton
              v-if="!isBusy"
              class="w-full !py-3 !text-base group"
              size="large"
              variant="primary"
              type="submit"
            >
              <span>Sign In</span>
              <svg
                class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </BaseButton>

            <BaseButton
              v-else
              class="w-full !py-3 !text-base"
              size="large"
              variant="disabled"
              type="submit"
              disabled
            >
              <span class="spinner" />
              <span>Signing in...</span>
            </BaseButton>
          </div>
        </form>

        <!-- Bottom Card Footer -->
        <div class="mt-7 pt-5 border-t border-slate-200/70 flex items-center justify-center gap-2 text-xs text-slate-400">
          <svg
            class="w-3.5 h-3.5 text-slate-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Secured with JWT Authentication</span>
        </div>
      </div>
    </div>

    <!-- Bottom Page Copyright -->
    <div class="relative z-10 text-center text-xs text-slate-400">
      © {{ new Date().getFullYear() }} Akarin Sangyor · Portfolio Admin
    </div>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 24px 24px;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
  animation: drift 14s ease-in-out infinite alternate;
}

.blob-1 {
  width: 440px;
  height: 440px;
  background: rgba(10, 110, 189, 0.25);
  top: -120px;
  left: -100px;
  animation-duration: 14s;
}

.blob-2 {
  width: 380px;
  height: 380px;
  background: rgba(99, 102, 241, 0.22);
  bottom: -100px;
  right: -80px;
  animation-duration: 11s;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: rgba(56, 189, 248, 0.22);
  top: 40%;
  left: 55%;
  animation-duration: 16s;
}

@keyframes drift {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(35px, 25px) scale(1.08);
  }
}

.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(148, 163, 184, 0.35);
  border-top-color: #0a6ebd;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-shake-enter-active {
  animation: shakeError 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.fade-shake-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-shake-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@keyframes shakeError {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  20% {
    opacity: 1;
    transform: translateX(-6px);
  }
  40% {
    transform: translateX(6px);
  }
  60% {
    transform: translateX(-4px);
  }
  80% {
    transform: translateX(4px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
