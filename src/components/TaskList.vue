<template>
  <ul
    class="container mx-auto flex h-auto w-full flex-col flex-wrap items-center justify-center gap-5.5 p-4 md:flex-row md:gap-3"
  >
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
defineOptions({
  name: "TaskList",
});
</script>

<style lang="css" scoped></style>
