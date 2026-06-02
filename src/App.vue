<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "./stores/useAppStore";
import { useMyColorModeStore } from "./stores/useMyColorModeStore";
import { RouterView } from "vue-router";
import { useHead } from "@unhead/vue";

defineOptions({
  name: "App",
});

const appStore = useAppStore();
const colorStore = useMyColorModeStore();
const { tasks, currentYear } = storeToRefs(appStore);

const appTitle = import.meta.env.VITE_APP_TITLE;
const currentRoute = useRoute();
const appRoute = ref("Home");

const { colorMode } = storeToRefs(colorStore);
const { initializeMediaFeature, setMyColorMode, cleanUpMyColorMode } = colorStore;

watch(
  () => currentRoute.meta.name,
  (newValue) => {
    appRoute.value = newValue;
  },
  { immediate: true },
);

onMounted(() => {
  const hasTaskData = localStorage.getItem("tasks");

  if (hasTaskData && JSON.parse(hasTaskData).length !== 0) {
    tasks.value = JSON.parse(hasTaskData);
  }

  currentYear.value = new Date().getFullYear();

  initializeMediaFeature(setMyColorMode);
  useHead({
    title: appRoute,
    titleTemplate: `${appTitle} | %s`,
    htmlAttrs: {
      class: {
        dark: () => colorMode.value === "dark",
        light: () => colorMode.value === "light",
      },
    },
  });
});

onUnmounted(() => cleanUpMyColorMode());
</script>

<style lang="css" scoped></style>
