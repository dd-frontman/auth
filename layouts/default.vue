<template>
  <div class="flex justify-center items-center min-h-screen" ref="container">
    <!--  в макете указан отступ 122рх, но в браузере получается перенос строки, по этому 8.3vw  -->
    <section
      class="w-2/4 flex items-center justify-center bg-regal-white min-h-screen p-[8.3vw]"
    >
      <div class="w-full">
        <h1
          class="text-[2.5rem] font-bold leading-1 mb-[2.3vh] text-center"
          v-text="leftTitle"
        />
        <div class="px-3">
          <div
            class="flex align-middle justify-center before:content-[' '] before:bg-regal-gray before:h-[1px] before:flex-auto before:mt-[0.9rem] after:content-[' '] after:bg-regal-gray after:h-[1px] after:flex-auto after:mt-[0.9rem]"
            :class="isOtp ? 'mb-2' : 'mb-[2.5vh]'"
          >
            <h6
              class="text-xl text-center text-[0.93rem] text-regal-gray font-medium whitespace-nowrap"
              v-text="leftUnderTitle"
              :class="isOtp ? 'w-[140px]' : 'w-[213px]'"
            />
            <span
              v-if="isOtp"
              class="text-xl text-regal-light-blue font-semibold"
              v-text="userData.user?.email"
            />
          </div>

          <NuxtLink
            v-if="isOtp"
            to="/"
            class="text-regal-light-blue font-bold block ml-2 mb-[25px]"
            v-text="'Change email'"
          />

          <slot name="left" />
        </div>
      </div>
    </section>
    <section
      class="w-2/4 flex justify-center bg-regal-blue bg-80 bg-right-ellipse bg-no-repeat bg-center h-screen min-h-screen p-[4.7vw]"
    >
      <div
        class="flex justify-between flex-col text-white grow bg-no-repeat bg-center bg-contain"
      >
        <div />
        <img
          class="transition ease-in duration-300"
          :src="rightImg"
          alt="image"
          :style="{
            transform: `translate(${Math.trunc(
              xImgCoords * 0.1,
            )}%, ${Math.trunc(yImgCoords * 0.1)}%)`,
          }"
        />
        <div class="text-center">
          <h6 class="text-xl font-bold" v-text="rightTitle" />
          <h6 class="text-base font-medium" v-text="rightUnderTitle" />
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

const props = defineProps({
  leftTitle: String,
  leftUnderTitle: String,
  rightTitle: String,
  rightUnderTitle: String,
  rightImg: String,
  isOtp: Boolean,
});
const userData = useAuthStore();
const xImgCoords = ref(0);
const yImgCoords = ref(0);
const container = ref<HTMLElement | null>(null);

onMounted(() => {
  container.value!.addEventListener("mousemove", handleMouseMove);
  container.value!.addEventListener("mouseleave", resetPosition);
});

onUnmounted(() => {
  if (container.value) {
    container.value!.removeEventListener("mousemove", handleMouseMove);
    container.value!.removeEventListener("mouseleave", resetPosition);
  }
});

function handleMouseMove(e: MouseEvent) {
  xImgCoords.value =
    ((e.clientX - container.value!.offsetWidth / 3) /
      container.value!.offsetWidth) *
    30;
  yImgCoords.value =
    ((e.clientY - container.value!.offsetHeight / 3) /
      container.value!.offsetHeight) *
    30;
}

function resetPosition() {
  xImgCoords.value = 0;
  yImgCoords.value = 0;
}
</script>
