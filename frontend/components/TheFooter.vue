<template>
  <div
    v-motion
    :initial="{
      opacity: 0,
    }"
    :visibleOnce="{
      opacity: 2,
      transition: {
        duration: 750,
        type: 'keyframes',
        ease: 'easeIn',
      },
    }"
  >
    <footer class="mt-10">
      <div class="w-full px-3 py-10 bg-quaternary text-center md:py-20">
        <h2 class="text-lg mb-4 font-bold text-primary md:text-2xl md:mb-5">Open to work</h2>
        <BaseLink size="large" to="mailto: Akarin.Sangyor@gmail.com" target="blank" class="inline-block">
          <span> Hire me?</span>
          <IconEnvelope class="inline-block w-4"></IconEnvelope>
        </BaseLink>
      </div>
    </footer>
  </div>
</template>