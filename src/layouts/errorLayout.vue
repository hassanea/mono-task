<template>
  <base-main class="p-16 md:p-20">
    <slot />
  </base-main>
</template>

<script setup lang="ts">
import BaseMain from "@/components/BaseMain.vue";

defineOptions({
  name: "errorLayout",
});
</script>

<style lang="css" scoped></style>
