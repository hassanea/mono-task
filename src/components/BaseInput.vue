<template>
  <base-form-control v-if="node === 'input'">
    <span class="font-bold text-[#FFC2C2]">*</span>
    <base-input-label :id="inputLabelID">
      <template #default>
        {{ label }}
      </template>
    </base-input-label>
    <input
      type="text"
      :value="props.modelValue"
      @input="emit('update:modelValue', $event?.target.value)"
      :placeholder
      :id="inputLabelID"
    />
  </base-form-control>

  <base-form-control v-else>
    <base-input-label :id="inputLabelID">
      <template #default>
        {{ label }}
      </template>
    </base-input-label>
    <textarea
      :value="props.modelValue"
      @input="emit('update:modelValue', $event?.target.value)"
      :placeholder
      rows="10"
      cols="70"
      :id="inputLabelID"
    ></textarea>
  </base-form-control>
</template>

<script setup lang="ts">
import { useId } from "vue";
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
  node: {
    type: String,
    required: false,
    default: "input",
    validator(value: string) {
      return ["input", "textarea"].includes(value);
    },
  },
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputLabelID = useId();
</script>

<style scoped></style>
