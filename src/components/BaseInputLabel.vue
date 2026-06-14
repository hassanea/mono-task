<template>
  <label :class="labelVariationClasses" :for="id">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "BaseInputLabel" });

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: false,
    validator(value: string) {
      return ["input", "radio"].includes(value);
    },
  },
});

const labelVariationClasses = computed(() => {
  return {
    "ml-1 block text-left text-base font-bold uppercase md:text-[1.0625rem]":
      props.variant === "input",
    "font-sans2 ml-0 inline-block text-center align-middle text-base leading-normal font-bold tracking-normal not-italic md:ml-1.5 md:text-[1.0625rem]":
      props.variant === "radio",
  };
});
</script>

<style lang="css" scoped></style>
