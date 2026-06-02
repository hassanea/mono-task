<template>
  <label class="ml-1 block text-left text-base font-bold uppercase md:text-[1.0625rem]" :for="id">
    <slot />
  </label>
</template>

<script setup lang="ts">
defineOptions({ name: "BaseInputLabel" });

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>

<style lang="css" scoped></style>
