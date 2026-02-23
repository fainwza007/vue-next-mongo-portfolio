<template>
  <header class="mb-10">
    <div
      class="w-full px-3 py-9 bg-quaternary flex space-x-3.5 justify-center md:flex-col md:items-center md:space-x-0"
      v-motion="{
        initial: {
          y: 100,
          opacity: 0.2,
        },
        enter: {
          y: 0,
          opacity: 1,
        },
      }"
    >
      <div class="flex-none">
        <img
          src="@/assets/images/avatar.jpg"
          alt="Avatar"
          class="rounded-full w-32 h-32 border-2 border-primary md:w-52 md:h-52 md:mb-4"
          v-motion
          :initial="initial"
          :enter="enter"
        />
      </div>

      <div>
        <div class="font-bold text-lg text-center md:text-2xl">
          Akarin Sangyor
        </div>
        <p class="text-base text-center md:text-xl">Never Stop Learning!</p>
        <div class="pt-2 flex flex-wrap gap-2 justify-center md:mt-2">
          <BaseLink
            size="small"
            to="mailto: Akarin.Sangyor@gmail.com"
            class="text-xs px-4 py-2 space-x-1 md:text-base md:px-7 md:py-3 md:space-x-2"
          >
            <span class="hidden [@media(min-width:321px)]:inline">Email</span>
            <IconEnvelope class="inline-block w-3 md:w-4" />
          </BaseLink>
          <BaseLink
            size="small"
            to="https://www.linkedin.com/in/akarin-sangyor-112282258/?originalSubdomain=th"
            class="text-xs px-4 py-2 space-x-1 md:text-base md:px-7 md:py-3 md:space-x-2"
            target="blank"
          >
            <span class="hidden [@media(min-width:321px)]:inline">Linkedin</span>
            <IconLinkedin class="inline-block w-3 md:w-4" />
          </BaseLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const initial = ref({
  y: 100,
  opacity: 0,
});

const enter = ref({
  y: 0,
  opacity: 1,
  transition: {
    type: "spring",
    damping: 15,
  },
});
</script>
