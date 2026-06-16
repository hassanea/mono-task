<template>
  <default-layout>
    <base-section
      class="bg-light text-dark shadow-dark mx-auto max-w-75 rounded-3xl p-8 shadow-md md:max-w-150 md:p-12 xl:p-25"
      id="about"
    >
      <div class="grid grid-cols-1 place-content-center place-items-center">
        <h2
          class="font-san2 md:text-3-5xl my-3 text-center text-3xl leading-normal font-medium not-italic md:my-4 lg:text-4xl"
        >
          {{ title }} <span class="font-sans font-black not-italic">{{ appName }}</span>
        </h2>
        <p
          class="font-sans2 text-center indent-0 text-lg leading-normal font-medium text-pretty not-italic md:text-left md:indent-4 md:text-xl md:leading-[1.8]"
        >
          {{ description }}
        </p>
      </div>
    </base-section>
  </default-layout>
</template>

<script setup lang="ts">
import { definePage } from "vue-router/dist/experimental/index.js";
import monoTaskData from "@/assets/data/monoTaskData.json";

definePage({
  meta: {
    name: "About",
  },
});

defineOptions({
  name: "AboutPage",
});

const appName = import.meta.env.VITE_APP_TITLE;
const {
  about: { title, description },
} = monoTaskData;
</script>

<style lang="css" scoped></style>
