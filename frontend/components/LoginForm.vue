<script setup>

const emits = defineEmits(['submit'])

const { handleSubmit, isSubmitting } = useForm({
    validationSchema: useLoginValidationSchema(),
    validateOnInput: true
})

const onSubmit = handleSubmit(values => {
    emits('submit', values)
})

</script>

<template>

    <form @submit.prevent="onSubmit" class="space-y-3">
        <div>
            <!-- <input v-bind="username" name="username" placeholder="Username" /> -->
            <BaseInput name="username" placeholder="Username" />
        </div>
        <div>
            <!-- <input v-bind="password" name="password" type="password" /> -->

            <BaseInput name="password" type="password" placeholder="Password" />
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