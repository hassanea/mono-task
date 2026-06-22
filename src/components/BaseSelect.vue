<template>
  <base-form-control>
    <base-input-label :id="selectId" variant="input" :class="selectLabelClasses">{{
      label
    }}</base-input-label>
    <p v-if="description" class="font sr-only" :id="selectDescId">
      {{ description }}
    </p>
    <div
      class="select-wrapper-content after:text-light relative mx-0 my-2.5 after:absolute after:bottom-5 after:left-82 after:inline-block after:-translate-x-1 after:translate-y-0 after:cursor-pointer after:align-middle after:text-xl after:leading-normal md:my-3 md:after:left-115"
    >
      <select
        class="read-only:dark:bg-form-dark read-only:dark:text-light read-only:text-dark font-sans2 dark:border-form-border-dark border-form-border-light focus:border-highlight active:bg-selection active:text-dark hover:dark:text-light hover:text-dark pointer-events-auto mx-0 mb-1 block h-20 w-full max-w-150 min-w-70 cursor-grab appearance-none rounded-lg border-2 border-solid p-2.5 text-center text-[0.94rem] leading-normal font-medium not-italic transition-all duration-100 ease-in-out select-auto read-only:bg-transparent hover:bg-[#8B87BD] hover:font-bold focus:border-4 focus:border-solid focus:outline-none active:font-bold disabled:pointer-events-none disabled:bg-gray-700 disabled:opacity-75 disabled:select-none md:p-3 hover:dark:bg-[#343159]"
        :class="selectClasses"
        v-model="model"
        :name="selectName"
        :aria-describedby="selectDescId"
        :disabled="isDisabled"
        :readonly="isReadOnly"
        :id="selectId"
        :multiple="selectMultiple"
        :size="selectMultipleSize"
      >
        <option value="" disabled="true" class="select-option">Please select an option...</option>
        <option
          v-for="choice in choices"
          :value="choice"
          :key="`option-${choice.toLowerCase()}`"
          :selected="model === choice"
          class="select-option"
          :class="{ 'font-black': model === choice, 'font-normal': model !== choice }"
        >
          {{ choice }}
        </option>
      </select>
    </div>
  </base-form-control>
</template>

<script lang="ts" setup>
import BaseFormControl from "@/components/BaseFormControl.vue";
import BaseInputLabel from "@/components/BaseInputLabel.vue";
import { computed, useId } from "vue";
const props = defineProps({
  showLabel: {
    type: Boolean,
    required: false,
    default: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  choices: {
    type: Array,
    required: false,
    default: () => {
      return ["Alpha", "Beta", "Gamma", "Delta"];
    },
  },
  selectMultiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  isReadOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const model = defineModel({ default: "" });

const selectId = useId();
const selectDescId = useId();

const selectName = computed(() => {
  return `select-${selectId}`;
});

const selectMultipleSize = computed(() => {
  return props.selectMultiple ? 0 : "";
});

const selectClasses = computed(() => {
  return {
    "select-disabled": props.isDisabled,
    "select-read-only": props.isReadOnly,
  };
});

const selectLabelClasses = computed(() => {
  return { "sr-only": !props.showLabel, "not-sr-only": props.showLabel };
});
</script>

<style lang="css" scoped>
@import "../assets/css/main.css";

.select-wrapper-content::after {
  content: "▼";
}
</style>
