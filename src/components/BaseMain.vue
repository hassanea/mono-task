<template>
  <main
    id="content"
    class="border-[rgb(50, 50, 50)] flex flex-col flex-nowrap border-solid focus:border-4 focus:outline-0"
    tabindex="-1"
    ref="mainEl"
    :style="pageMinHeight"
  >
    <slot></slot>
  </main>
</template>

<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import { useElementBounding } from "@vueuse/core";
defineOptions({
  name: "BaseMain",
});

const mainEl = useTemplateRef("mainEl");

const { width } = useElementBounding(mainEl);

const pageMinHeight = computed(() => {
  return { minHeight: `calc(${width.value / 3}px)` };
});
</script>

<style lang="css" scoped></style>
