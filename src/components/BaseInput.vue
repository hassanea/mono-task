<template>
  <base-form-control v-if="node === 'input'">
    <base-input-label v-if="setFormLabel" :id="inputLabelID" variant="input">
      <template #default>
        <span
          v-if="isRequired"
          class="mr-1 inline-block text-xl leading-normal font-bold text-[#FFC2C2] after:content-['*']"
        ></span>
        {{ label }}
      </template>
    </base-input-label>
    <input
      type="text"
      v-model="model"
      :placeholder
      :id="inputLabelID"
      :aria-label="setA11yLabel"
      class="border-form-border-light focus:border-highlight dark:border-form-border-dark placeholder:text-form-text pointer-events-auto mx-0 mt-2.25 mb-4.5 block h-16 w-full max-w-150 min-w-62.5 rounded-[5px] border-2 border-solid p-3 text-base caret-[#07ff22] placeholder:pl-[0.8rem] placeholder:font-bold focus:border-2 focus:border-solid focus:outline-0 md:mt-3 md:mb-5 md:p-4 md:text-[1.0625rem]"
    />
  </base-form-control>

  <base-form-control v-else-if="node === 'search'">
    <base-input-label v-if="setFormLabel" :id="inputLabelID" variant="input">
      <template #default>
        <span
          v-if="isRequired"
          class="mr-1 inline-block text-xl leading-normal font-bold text-[#FFC2C2] after:content-['*']"
        ></span>
        {{ label }}
      </template>
    </base-input-label>
    <input
      type="search"
      v-model="model"
      :placeholder
      :id="inputLabelID"
      :aria-label="setA11yLabel"
      class="font-sans2 focus:border-highlight hover:placeholder:text-light search-icon border-b-solid pointer-events-auto mx-auto mt-0.5 mb-0 inline-block h-12 w-full max-w-150 min-w-62.5 rounded-[10px] border-t-2 border-r-0 border-b-2 border-l-0 p-2 text-center align-middle text-base leading-normal font-medium not-italic caret-[#07ff22] select-all placeholder:pl-[0.8rem] placeholder:font-bold placeholder:text-[#ccc] hover:placeholder:font-black hover:placeholder:tracking-wide focus:border-2 focus:border-solid focus:outline-0 md:p-2.5 md:text-[1.0625rem]"
    />
  </base-form-control>

  <base-form-control v-else>
    <base-input-label v-if="setFormLabel" :id="inputLabelID" variant="input">
      <template #default>
        <span
          v-if="isRequired"
          class="mr-1 inline-block text-xl leading-normal font-bold text-[#FFC2C2] after:content-['*']"
        ></span>
        {{ label }}
      </template>
    </base-input-label>
    <textarea
      v-model="model"
      :placeholder
      rows="10"
      cols="70"
      :id="inputLabelID"
      :aria-label="setA11yLabel"
      class="border-form-border-light focus:border-highlight dark:border-form-border-dark placeholder:text-form-text pointer-events-auto mx-0 mt-2.25 mb-4.5 block field-sizing-fixed h-16 w-full max-w-150 min-w-62.5 resize rounded-[5px] border-2 border-solid p-3 text-base caret-[#07ff22] placeholder:pl-[0.8rem] placeholder:font-bold focus:border-2 focus:border-solid focus:outline-0 md:mt-3 md:mb-5 md:p-4 md:text-[1.0625rem]"
    ></textarea>
  </base-form-control>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";
import BaseFormControl from "@/components/BaseFormControl.vue";
import BaseInputLabel from "@/components/BaseInputLabel.vue";

defineOptions({
  name: "BaseInput",
});

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  showLabel: {
    type: Boolean,
    required: false,
    default: true,
  },
  node: {
    type: String,
    required: false,
    default: "input",
    validator(value: string) {
      return ["input", "search", "textarea"].includes(value);
    },
  },
  isRequired: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
});

const model = defineModel({ default: "" });

const setA11yLabel = computed(() => (props.label && !props.showLabel ? props.label : undefined));

const setFormLabel = computed(() => props.label && props.showLabel);

const inputLabelID = useId();
</script>

<style lang="css" scoped>
@import "../assets/css/main.css";

.search-icon {
  background-image: url("https://images.eahassan.com/tasks/search-icon.svg");
  background-position: top left;
  background-size: 20% 90%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-clip: border-box;
  background-origin: border-box;
}
</style>
