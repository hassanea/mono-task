<template>
  <error-layout>
    <base-section
      class="border-dark bg-error mx-auto h-auto w-full max-w-125 rounded-lg border-[3px] border-solid p-8 text-center shadow-2xl"
    >
      <template #default>
        <div class="flex flex-col items-center justify-center">
          <font-awesome-icon
            class="inline-block rounded align-middle text-3xl text-rose-700 md:text-4xl"
            icon="fa-solid fa-do-not-enter"
          />
          <h1
            class="text-dark my-5 text-5xl leading-normal font-bold tracking-wide md:my-6 md:text-6xl"
          >
            404
          </h1>
          <p class="font-sans2 text-dark mb-4 text-lg leading-normal font-medium italic md:text-xl">
            Page not found: <span class="font-bold italic">{{ path }}</span>
          </p>
          <base-button
            label="Go to Home"
            @click="handleNavigationToHome"
            @keydown.enter="handleNavigationToHome"
            v-tooltip.bottom="'Go to Home'"
          >
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-house-blank" />
            </template>
          </base-button>
        </div>
      </template>
    </base-section>
  </error-layout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import { definePage } from "vue-router/dist/experimental/index.js";

definePage({
  meta: {
    name: "Error",
  },
});

defineOptions({
  name: "404Error",
});

const appName = import.meta.env.VITE_APP_TITLE;
const router = useRouter();
const { path } = useRoute();
const handleNavigationToHome = () => router.push("/");

onMounted(() => {
  useHead({
    title: `404 Error | ${appName}`,
    titleTemplate: null,
  });
});
</script>

<style lang="css" scoped></style>
