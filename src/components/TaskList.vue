<template>
  <ul
    class="container mx-auto flex h-auto w-full flex-col flex-wrap items-center justify-center gap-3 md:flex-row"
  >
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
defineOptions({
  name: "TaskList",
});
</script>

<style lang="css" scoped>
.goal-list {
  @apply container;
  width: 100%;
  height: auto;
  margin: 4rem auto;
  display: flex;
  flex-flow: row wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
}
</style>
