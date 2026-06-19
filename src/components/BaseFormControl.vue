<template>
  <div class="flex h-full w-full flex-col flex-nowrap justify-center">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "BaseFormControl",
});
</script>

<style lang="css" scoped></style>
