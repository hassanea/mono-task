<template>
  <section :id class="h-auto w-full">
    <slot />
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: "BaseSection",
});

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
});
</script>

<style lang="css" scoped></style>
