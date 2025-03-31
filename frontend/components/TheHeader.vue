<template>
    <header class="mb-10">
        <div
            class="w-full px-3 py-9 bg-quaternary flex space-x-3.5 justify-center md:flex-col md:items-center md:space-x-0">
            <div class="flex-none">
                <img src="@/assets/images/avatar.jpg" alt="Avatar"
                    class="rounded-full w-20 h-20 border-2 border-primary md:w-52 md:h-52 md:mb-4" />
            </div>
        </div>

        <div>
            <div class="font-bold text-xl text-center md:text-2xl">
                Akarin Sangyor
            </div>
            <p class="text-base text-center md:text-xl">
                Never Stop Learning!
            </p>
            <div class="pt-2 flex flex-wrap gap-2 justify-center md:mt-2">
                <BaseLink size="small" to="mailto: Akarin.Sangyor@gmail.com"
                    class="md:text-base md:px-7 md:py-3 md:space-x-2">
                    <span>Email</span>
                    <IconEnvelope class="inline-block w3 md:w-4"> </IconEnvelope>
                </BaseLink>
                <BaseLink size="small" to="https://www.linkedin.com/in/akarin-sangyor-112282258/?originalSubdomain=th"
                    class="md:text-base md:px-7 md:py-3 md:space-x-2" target="blank">
                    <span>Linkedin</span>
                    <IconLinkedin class="inline-block w3 md:w-4"> </IconLinkedin>
                </BaseLink>
            </div>
        </div>
    </header>
</template>