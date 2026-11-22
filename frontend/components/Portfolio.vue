<script setup>
const props = defineProps({
  portfolio: {
    type: Object,
    required: true,
  },
  canEdit: Boolean,
});

defineEmits(["edit"]);

const lightboxIndex = ref(-1);
const isLightboxOpen = computed(() => lightboxIndex.value >= 0);
const images = computed(() => props.portfolio?.images ?? []);

function openLightbox(index) {
  if (useIsValidUrl(images.value[index])) {
    lightboxIndex.value = index;
  }
}

function closeLightbox() {
  lightboxIndex.value = -1;
}

function nextLightboxImage() {
  if (images.value.length <= 1) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length;
}

function prevLightboxImage() {
  if (images.value.length <= 1) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + images.value.length) % images.value.length;
}

function onKeydown(e) {
  if (!isLightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextLightboxImage();
  if (e.key === "ArrowLeft") prevLightboxImage();
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-4">
      <BaseLink variant="secondary" size="small" to="/">
        <svg
          class="w-4 h-4"
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
        <span>Back to Overview</span>
      </BaseLink>
      <BaseButton
        v-if="canEdit"
        size="small"
        variant="secondary"
        @click="$emit('edit')"
      >
        Edit Project
      </BaseButton>
    </div>

    <article
      class="mt-6 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-xs"
    >
      <!-- Header Info -->
      <header class="mb-6">
        <div class="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-500 mb-3">
          <span
            v-if="portfolio.publishedAt"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium"
          >
            <svg
              class="w-3.5 h-3.5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ formatMonthYear(portfolio.publishedAt) }}
          </span>
        </div>

        <h1 class="font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
          {{ portfolio.title }}
        </h1>

        <div class="mt-4">
          <BaseBadgeList :badges="portfolio.skills" />
        </div>
      </header>

      <!-- Image Carousel with Click-to-Zoom Lightbox -->
      <div
        v-if="images.length > 0"
        class="my-6 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-50"
      >
        <BaseCarousel :items-to-show="1" :wrap-around="images.length > 1">
          <BaseSlide v-for="(image, index) in images" :key="index">
            <div
              class="group relative w-full cursor-zoom-in"
              title="Click to view full screen"
              @click="openLightbox(index)"
            >
              <BaseImage
                :url="image"
                :alt="`${portfolio.title} screenshot ${index + 1}`"
                class="w-full h-[280px] sm:h-[380px] md:h-[460px] object-cover"
              />
              <span
                class="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/75 text-white text-xs font-medium backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  class="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
                <span>Click to expand ({{ index + 1 }}/{{ images.length }})</span>
              </span>
            </div>
          </BaseSlide>

          <template #addons>
            <BaseNavigation />
            <BasePagination />
          </template>
        </BaseCarousel>
      </div>

      <!-- Content -->
      <div
        class="mt-6 pt-6 border-t border-slate-100 text-slate-700 text-base md:text-lg leading-relaxed whitespace-pre-wrap"
      >
        {{ portfolio.content }}
      </div>
    </article>

    <!-- Fullscreen Image Lightbox Modal -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="isLightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
          @click.self="closeLightbox"
        >
          <!-- Top Bar -->
          <div class="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
            <span class="px-3 py-1 rounded-full bg-white/10 text-xs sm:text-sm font-medium backdrop-blur-xs">
              {{ lightboxIndex + 1 }} / {{ images.length }}
            </span>
            <button
              type="button"
              aria-label="Close full screen preview"
              class="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              @click="closeLightbox"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Previous Button -->
          <button
            v-if="images.length > 1"
            type="button"
            aria-label="Previous image"
            class="absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-10"
            @click.stop="prevLightboxImage"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Fullscreen Image -->
          <img
            :src="images[lightboxIndex]"
            :alt="`${portfolio.title} preview ${lightboxIndex + 1}`"
            class="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl select-none"
          />

          <!-- Next Button -->
          <button
            v-if="images.length > 1"
            type="button"
            aria-label="Next image"
            class="absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-10"
            @click.stop="nextLightboxImage"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
