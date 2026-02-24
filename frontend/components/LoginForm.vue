<script setup>

const props = defineProps({
  error: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['submit'])

const { handleSubmit, isSubmitting } = useForm({
    validationSchema: useLoginValidationSchema(),
    validateOnInput: true
})

const onSubmit = handleSubmit(values => {
    emits('submit', values)
})

const showPassword = ref(false)
</script>

<template>
  <div class="login-wrapper">
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />

    <div class="glass-card" v-motion="{
      initial: { y: 40, opacity: 0 },
      enter:   { y: 0,  opacity: 1, transition: { duration: 600 } },
    }">

    <div class="logo-wrap">
    <div class="logo-ring">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <!-- คน -->
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
            d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
        <!-- shield -->
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
            d="M5.5 13.5C7 12.5 9.5 12 12 12s5 .5 6.5 1.5L20 15c0 3.5-3 6.5-8 7.5C7 21.5 4 18.5 4 15l1.5-1.5z" />
        <!-- check กลาง shield -->
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
            d="M9.5 17l1.5 1.5 3.5-3.5" />
        </svg>
    </div>
    </div>

      <div class="heading">
        <h1>Welcome back</h1>
        <p>Sign in to manage</p>
      </div>

      <form @submit.prevent="onSubmit" class="form-body">

        <!-- Username -->
        <div class="field-group">
          <div class="input-row">
            <span class="field-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <BaseInput name="username" placeholder="Username" class="glass-input" />
          </div>
        </div>

        <!-- Password -->
        <div class="field-group">
          <div class="input-row">
            <span class="field-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <BaseInput
              name="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="glass-input"
            />
            <button type="button" class="eye-btn" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7
                     -1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
                     a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243
                     M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532
                     l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5
                     c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
              </svg>
            </button>
          </div>
        </div>

        <div class="forgot-row">
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <BaseButton v-if="!isSubmitting" class="submit-btn w-full" size="small" type="submit">
          Sign In
        </BaseButton>
        <BaseButton v-else class="submit-btn submit-btn--loading w-full" size="small" variant="disabled" type="submit" disabled>
          <span class="spinner" />
          Signing in…
        </BaseButton>

        <div class="login-error-message"> <BaseErrorMessage v-if="error">{{ error }}</BaseErrorMessage> </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

.login-error-message {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0eaff 0%, #fce4f3 50%, #e8f5e9 100%);
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
  animation: drift 12s ease-in-out infinite alternate;
}
.blob-1 { width: 420px; height: 420px; background: #a5c8ff; top: -120px; left: -100px; animation-duration: 14s; }
.blob-2 { width: 320px; height: 320px; background: #f9a8d4; bottom: -80px; right: -80px; animation-duration: 10s; }
.blob-3 { width: 260px; height: 260px; background: #bbf7d0; top: 40%; left: 55%; animation-duration: 16s; }
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.08); }
}

.glass-card {
  position: relative;
  width: calc(100% - 3rem);
  max-width: 420px;
  padding: 2.5rem 2rem 2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px) saturate(1.6);
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  border: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 8px 32px rgba(100, 120, 200, 0.12), 0 1px 0 rgba(255,255,255,0.8) inset;
  box-sizing: border-box;
}

.logo-wrap { display: flex; justify-content: center; margin-bottom: 1.5rem; }
.logo-ring {
  width: 60px; height: 60px;
  border-radius: 18px;
  background: linear-gradient(135deg, #6ea8fe, #a78bfa);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 20px rgba(110, 168, 254, 0.45);
}
.logo-icon { width: 28px; height: 28px; color: #fff; }

.heading { text-align: center; margin-bottom: 1.75rem; }
.heading h1 {
  font-family: 'Sora', sans-serif;
  font-size: 1.6rem; font-weight: 700;
  color: #1e1e2e; margin: 0 0 0.25rem;
  letter-spacing: -0.3px;
}
.heading p { font-size: 0.875rem; color: #6b7280; margin: 0; }

.form-body {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  width: 100%;
  box-sizing: border-box;
}

/* field-group: column เพื่อให้ error message อยู่ด้านล่าง input */
.field-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

/* error message ที่ BaseInput render ออกมา */
.field-group :deep(.error-message),
.field-group :deep([class*="error"]),
.field-group :deep(p) {
  font-size: 0.75rem;
  color: #ef4444;
  margin: 0.3rem 0 0;
  padding: 0;
  width: 100%;
}


.input-row {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.field-icon {
  position: absolute;
  left: 13px;
  top: 13px;   
  z-index: 1;
  width: 18px; height: 18px;
  color: #9ca3af;
  pointer-events: none;
}

.input-row :deep(> div),
.input-row :deep(> span) {
  flex: 1;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

.field-icon {
  position: absolute;
  left: 13px;
  width: 18px; height: 18px;
  color: #9ca3af;
  pointer-events: none;
  z-index: 1;
  display: flex; align-items: center;
}
.field-icon svg { width: 18px; height: 18px; }

.input-row :deep(input) {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 0.75rem 2.75rem 0.75rem 2.6rem;
  border-radius: 12px;
  border: 1px solid rgba(200, 210, 240, 0.6);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: #1e1e2e;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.input-row :deep(input)::placeholder { color: #b0b8cc; }
.input-row :deep(input):focus {
  border-color: #6ea8fe;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 0 0 3px rgba(110, 168, 254, 0.18);
}

/* ให้ .block เป็น positioning parent ของ eye-btn */
.input-row :deep(.block) {
  position: relative;
}

.eye-btn {
  position: absolute;
  right: 12px;
  top: 13px;   /* ← เปลี่ยนจาก 50% เป็น fixed px แทน */
  transform: none;  /* ← เอา translateY ออก */
  width: 20px; height: 20px;
  color: #9ca3af;
  background: none; border: none;
  cursor: pointer; padding: 0;
  display: flex; align-items: center;
  transition: color 0.15s;
  z-index: 1;
}
.eye-btn:hover { color: #6ea8fe; }
.eye-btn svg { width: 20px; height: 20px; }

.forgot-row { display: flex; justify-content: flex-end; margin-top: -0.25rem; }
.forgot-link {
  font-size: 0.8rem; color: #6ea8fe;
  text-decoration: none; font-weight: 500;
  transition: opacity 0.15s;
}
.forgot-link:hover { opacity: 0.75; }

.submit-btn :deep(button) {
  width: 100%;
  padding: 0.8rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #6ea8fe 0%, #a78bfa 100%) !important;
  border: none;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem; font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(110, 168, 254, 0.4);
  display: flex; align-items: center; justify-content: center;
  gap: 0.5rem;
}
.submit-btn :deep(button):hover {
  opacity: 0.92;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(110, 168, 254, 0.5);
}
.submit-btn :deep(button):active { transform: translateY(0); }
.submit-btn--loading :deep(button) { opacity: 0.7; cursor: not-allowed; }

.spinner {
  display: inline-block;
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>