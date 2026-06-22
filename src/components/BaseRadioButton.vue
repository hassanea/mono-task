<template>
  <fieldset
    class="border-form-border-light dark:border-form-border-dark mt-2.5 mb-4 h-auto w-full rounded-md border-2 border-solid p-3 md:mt-3 md:mb-5 md:p-4"
  >
    <legend
      class="border-form-border-light dark:border-form-border-dark rounded-md border-2 border-solid p-1 text-left text-base font-bold uppercase md:text-[1.0625rem]"
    >
      {{ legend }}
    </legend>
    <div class="flex flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
      <template v-for="choice in choices" :key="choice.toLowerCase()">
        <input
          type="radio"
          :id="`${choice.toLowerCase()}-${radioButtonId}`"
          :name="`radio-${radioButtonId}`"
          :value="choice"
          v-model="model"
          class="radio-button-transition accent-highlight checked:border-secondary focus:outline-highlight relative top-1 mb-1 h-7 w-7 appearance-none rounded-full border-2 border-solid border-black checked:border-9 focus:outline-2 focus:outline-solid md:mb-0"
        />
        <base-input-label :id="`${choice.toLowerCase()}-${radioButtonId}`" variant="radio">
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
