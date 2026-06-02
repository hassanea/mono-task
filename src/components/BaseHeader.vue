<template>
  <header class="text-light h-auto w-full bg-[#BF4f51] dark:bg-[#7f1734]">
    <base-navbar
      :toggle
      :links="routes"
      label="Main Navigation"
      @handle-toggle="handleToggleMobileNavigation"
      @handle-close="handleCloseMobileNavigation"
    ></base-navbar>
    <div
      class="flex h-[40vh] w-screen flex-col items-center justify-center pt-25 md:pt-20 xl:pt-25"
    >
      <h1
        class="text-light md:text-4-5xl font-sans text-4xl leading-normal font-bold tracking-[0.25rem] lg:text-5xl xl:text-[2.75rem]"
      >
        <span class="mr-1 md:mr-2">
          <image-kit-provider :url-endpoint="endPoint">
            <Image
              :src="`${dir}clipboard-task-icon.svg`"
              alt=""
              width="32"
              height="32"
              class="filter-light inline-block h-7 w-7 align-middle md:h-8 md:w-8"
            />
          </image-kit-provider>
        </span>
        {{ heading }}
      </h1>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ImageKitProvider, Image } from "@imagekit/vue";
import BaseNavbar from "@/components/BaseNavbar.vue";

defineOptions({
  name: "BaseHeader",
});

const { VITE_APP_ENDPOINT: endPoint, VITE_APP_ENDPOINT_DIR: dir } = import.meta.env;

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
});

const toggle = ref(false);

const routes = useRouter()
  .getRoutes()
  .filter((route) => route.meta.name !== "Error");

const handleToggleMobileNavigation = () => (toggle.value = !toggle.value);

const handleCloseMobileNavigation = () => (toggle.value = false);
</script>

<style lang="css" scoped></style>
