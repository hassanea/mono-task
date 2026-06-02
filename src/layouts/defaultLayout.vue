<template>
  <router-view>
    <base-skip-link v-focus to="#content" label="Skip to main content" />
    <base-header :heading></base-header>
    <base-main class="px-0 py-18 md:py-22 lg:py-25">
      <slot></slot>
    </base-main>
    <base-footer :year="currentYear"></base-footer>
  </router-view>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/useAppStore";
import { vFocus } from "@/directives/v-focus.js";
import BaseSkipLink from "@/components/BaseSkipLink.vue";
import BaseHeader from "@/components/BaseHeader.vue";
import BaseMain from "@/components/BaseMain.vue";
import BaseFooter from "@/components/BaseFooter.vue";

defineOptions({
  name: "defaultLayout",
});

const appStore = useAppStore();

const { currentYear } = storeToRefs(appStore);

const heading = import.meta.env.VITE_APP_TITLE;
</script>

<style lang="css" scoped></style>
