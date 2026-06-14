<template>
  <fieldset
    class="mt-3 mb-5 h-auto w-full rounded-md border-2 border-solid border-[#626262] p-4 dark:border-[#494949]"
  >
    <legend
      class="rounded-md border-2 border-solid border-[#626262] p-1 text-center text-base font-bold dark:border-[#494949]"
    >
      {{ legend }}
    </legend>
    <div class="flex flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
      <template v-for="choice in choices" :key="choice.toLowerCase()">
        <input
          type="radio"
          :id="radioButtonId"
          :name="`radio-${radioButtonId}`"
          :value="choice"
          v-model="model"
          class="radio-button-transition relative top-1 mb-1 h-7 w-7 appearance-none rounded-full border-2 border-solid border-black accent-[#ffd700] checked:border-9 checked:border-[#173282] focus:outline-2 focus:outline-[#ffd700] focus:outline-solid md:mb-0"
        />
        <base-input-label :id="radioButtonId" variant="radio">
          {{ choice }}
        </base-input-label>
      </template>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { useId } from "vue";
import BaseInputLabel from "@/components/BaseInputLabel.vue";

const props = defineProps({
  legend: {
    type: String,
    required: true,
  },
  choices: {
    type: Array,
    required: false,
    default: () => {
      return ["A", "B", "C"];
    },
  },
});

const model = defineModel({ default: "Low" });
const radioButtonId = useId();
</script>

<style lang="css" scoped>
.radio-button-transition {
  transition: all 0.25s cubic-bezier(0.91, -0.35, 0.55, 1.79);
}
</style>
