<template>
  <div>
    <label
      :for="selectId"
      class="mx-0 my-3 inline-block text-center font-semibold not-italic"
      :class="selectLabelClasses"
      >{{ label }}</label
    >
    <p v-if="description" class="font sr-only" :id="selectDescId">
      {{ description }}
    </p>
    <div
      class="select-wrapper-content after:text-light relative after:absolute after:right-[0.9rem] after:bottom-[0.9rem] after:inline-block after:-translate-x-1 after:translate-y-0 after:cursor-pointer after:align-middle after:text-xl after:leading-normal"
    >
      <select
        class="bg-secondary font-sans2 hover:bg-selection hover:text-dark focus:border-quaternary active:bg-selection active:text-dark pointer-events-auto mx-auto mb-1 block h-16 w-full max-w-[9.4rem] min-w-0 cursor-grab appearance-none rounded-lg p-3 text-center text-[0.94rem] leading-normal font-medium not-italic transition-all duration-100 ease-in-out select-auto read-only:bg-gray-600 hover:font-bold focus:border-4 focus:border-solid focus:outline-none active:font-bold disabled:pointer-events-none disabled:bg-gray-700 disabled:opacity-75 disabled:select-none"
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
  </div>
</template>

<script lang="ts" setup>
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
.select-wrapper-content::after {
  content: "▼";
}
</style>
