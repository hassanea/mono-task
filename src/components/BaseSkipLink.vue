<template>
  <div>
    <a
      :href="to"
      class="sr-only-focusable dark:bg-primary-dark bg-primary-light text-dark hover:bg-dark hover:text-primary-light dark:hover:text-primary-dark focus:border-light active:bg-dark active:text-tertiary sr-only absolute top-0 -left-2500 z-100 h-px w-px overflow-hidden rounded-[5px] p-2.5 font-black outline-0 hover:cursor-pointer hover:underline focus:static focus:inset-0 focus:h-auto focus:w-auto focus:border-[3px] focus:border-solid active:cursor-pointer active:underline motion-reduce:transition-none motion-reduce:duration-0"
      :label="label"
      :title="label"
    >
      {{ label }}
    </a>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "BaseSkipLink",
});

const props = defineProps({
  to: {
    type: String,
    required: true,
    validator(value: string) {
      return value.startsWith("#");
    },
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<style lang="css" scoped></style>
