<template>
  <footer
    class="text-light font-sans2 bg-primary-light dark:bg-primary-dark flex h-auto w-full flex-row flex-nowrap items-center justify-center px-8 py-7 text-center text-lg leading-normal font-bold not-italic md:text-xl"
  >
    <p class="main-footer-copyright">{{ copyrightInfo }}</p>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
defineOptions({
  name: "BaseFooter",
});
const props = defineProps({
  year: {
    type: Number,
    required: true,
  },
});

const copyrightInfo = computed(() => `© ${props.year} All Right Reserved.`);
</script>

<style lang="css" scoped></style>
