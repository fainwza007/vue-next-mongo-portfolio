<script setup>
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
    <form @submit.prevent="onSubmit" class="space-y-3">
        <div>
            <BaseInput name="username" placeholder="Username" />
        </div>

        <div class="relative">
            <BaseInput
                name="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
            />
            <!-- ปุ่ม toggle password -->
            <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showPassword = !showPassword"
            >
                <!-- show password -->
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <!-- hidden password -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                </svg>
            </button>
        </div>

        <div>
            <BaseButton v-if="!isSubmitting" class="w-full" size="small" type="submit">
                Login
            </BaseButton>
            <BaseButton v-else class="w-full" size="small" variant="disabled" type="submit" disabled>
                Logging In
            </BaseButton>
        </div>
    </form>
</template>