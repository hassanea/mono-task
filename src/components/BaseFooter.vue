<template>
  <footer
    class="text-light font-sans2 flex h-auto w-full flex-row flex-nowrap items-center justify-center bg-[#BF4f51] px-8 py-7 text-center text-lg leading-normal font-bold not-italic md:text-xl dark:bg-[#7f1734]"
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
