<template>
  <base-form-control v-if="node === 'input'">
    <span v-if="isRequired" class="font-bold text-[#FFC2C2]">*</span>
    <base-input-label v-if="setFormLabel" :id="inputLabelID" variant="input">
      <template #default>
        {{ label }}
      </template>
    </base-input-label>
    <input
      type="text"
      v-model="model"
      :placeholder
      :id="inputLabelID"
      :aria-label="setA11yLabel"
      class="mx-0 mt-3 mb-5 block h-16 w-full max-w-150 min-w-62.5 rounded-[5px] border-2 border-solid border-[#626262] p-4 text-base caret-[#07ff22] placeholder:pl-[0.8rem] placeholder:font-bold placeholder:text-[#aaa] focus:border-2 focus:border-solid focus:border-[#ffd700] focus:outline-0 md:text-[1.0625rem] dark:border-[#494949]"
    />
  </base-form-control>

  <base-form-control v-else-if="node === 'search'">
    <span v-if="isRequired" class="font-bold text-[#FFC2C2]">*</span>
    <base-input-label v-if="setFormLabel" :id="inputLabelID" variant="input">
      <template #default>
        {{ label }}
      </template>
    </base-input-label>
    <input
      type="search"
      v-model="model"
      :placeholder
      :id="inputLabelID"
      :aria-label="setA11yLabel"
      class="mx-0 mt-3 mb-5 block h-16 w-full max-w-150 min-w-62.5 rounded-[5px] border-2 border-solid border-[#626262] p-4 text-base caret-[#07ff22] placeholder:pl-[0.8rem] placeholder:font-bold placeholder:text-[#aaa] focus:border-2 focus:border-solid focus:border-[#ffd700] focus:outline-0 md:text-[1.0625rem] dark:border-[#494949]"
    />
  </base-form-control>

  <base-form-control v-else>
    <span v-if="isRequired" class="font-bold text-[#FFC2C2]">*</span>
    <base-input-label v-if="setFormLabel" :id="inputLabelID" variant="input">
      <template #default>
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
      class="mx-0 mt-3 mb-5 block h-16 w-full max-w-150 min-w-62.5 rounded-[5px] border-2 border-solid border-[#626262] p-4 text-base caret-[#07ff22] placeholder:pl-[0.8rem] placeholder:font-bold placeholder:text-[#aaa] focus:border-2 focus:border-solid focus:border-[#ffd700] focus:outline-0 md:text-[1.0625rem] dark:border-[#494949]"
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
/* .goal-input-desc {
  width: auto;
  height: auto;
} */

/* .goal-input::before {
  content: '*';
  font-weight: bold;
} */

/* .goal-input.goal-input-desc {
  height: 10rem; */
/* overflow: auto;
} */

/* .goal-input::placeholder {
  color: #aaa;
  font-weight: bold;
  padding-left: 0.8rem;
} */
</style>
