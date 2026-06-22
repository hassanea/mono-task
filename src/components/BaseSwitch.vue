<template>
  <div class="mt-2.25 mb-3.5 block h-auto w-full text-left md:mt-4 md:mb-5">
    <span
      v-if="showLabel && label"
      class="font-sans2 mr-3 inline-block text-left text-base leading-normal font-bold uppercase not-italic md:text-[1.0625rem]"
      :id="switchLabelId"
      >{{ label }}</span
    >
    <button
      :class="[switchClasses, switchAlignmentClasses]"
      :aria-checked="isChecked"
      :aria-label="setA11yLabel"
      :aria-labelledby="setLabelId"
      :aria-describedby="a11yDescribeBy"
      v-tooltip.left="`${toolTipLabel}`"
      type="button"
      class="switch"
      role="switch"
      @click="toggleSwitch"
      @keydown.enter="toggleSwitch"
    >
      <span class="switch-inner" :class="switchInnerClasses">
        <slot name="icon" />
      </span>
      <slot />
      <p v-if="description" :id="switchDescId" class="sr-only">
        {{ description }}
      </p>
    </button>
    <span
      v-if="showLabel && label"
      aria-hidden="true"
      class="font-sans2 my-2 ml-2 inline-block text-center align-middle font-bold italic md:my-3 md:ml-3"
      >{{ capitalize(mode) }}</span
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, useId } from "vue";
import { capitalize } from "@/utils";
defineOptions({
  name: "BaseSwitch",
});

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: "light",
    validator(value: string) {
      return ["light", "dark", "no-preference", "reduce", "incomplete", "complete"].includes(value);
    },
  },
  label: {
    type: String,
    required: true,
  },
  align: {
    type: String,
    required: false,
    default: "middle",
    validator(value: string) {
      return ["left", "middle"].includes(value);
    },
  },
  showLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const toggled = ref(props.modelValue);

const switchDescId = useId();

const switchLabelId = useId();

const emits = defineEmits(["update:modelValue"]);

const toggleSwitch = () => {
  toggled.value = !toggled.value;
};

watch(toggled, (value) => {
  emits("update:modelValue", value);
});

const isChecked = computed(() => {
  return props.mode === "dark" || props.mode === "reduce" || props.mode === "complete"
    ? true
    : false;
});

const toolTipLabel = computed(() => {
  if (props.mode === "dark") return "Toggle Light Mode!";
  else if (props.mode === "light") return "Toggle Dark Mode!";
  else if (props.mode === "no-preference") return "Toggle Reduce Mode!";
  else if (props.mode === "reduce") return "Toggle No-Preference Mode!";
  else if (props.mode === "incomplete") return "Toggle Complete Mode!";
  else if (props.mode === "complete") return "Toggle Incomplete Mode!";
  else return "";
});

const showLabel = computed(() => {
  return props.showLabel && props.label;
});

const setA11yLabel = computed(() => {
  return showLabel.value ? undefined : props.label;
});

const setLabelId = computed(() => {
  return showLabel.value ? switchLabelId : undefined;
});

const switchClasses = computed(() => {
  return {
    dark: props.mode === "dark" || props.mode === "no-preference" || props.mode === "complete",
    light: props.mode === "light" || props.mode === "reduce" || props.mode === "incomplete",
  };
});

const switchAlignmentClasses = computed(() => {
  return { "my-0 mx-auto": props.align === "middle", "my-0 mx-0": props.align === "left" };
});

const switchInnerClasses = computed(() => {
  return { unchecked: !toggled.value, checked: toggled.value };
});

const a11yDescribeBy = computed(() => (props.description ? switchDescId : undefined));
</script>

<style lang="css" scoped>
@import "../assets/css/main.css";
.switch,
button[role="switch"] {
  width: 4.8rem;
  height: 3rem;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  border-radius: 75px;
  padding: 0.625rem;
  border: 0;
  cursor: pointer;
  @apply text-light;
}

.switch.dark:hover,
button[role="switch"].dark:hover,
.switch.dark:active,
button[role="switch"].dark:active {
  background: #330867;
  @apply text-light;
}

.switch.light:hover,
button[role="switch"].light:hover,
.switch.light:active,
button[role="switch"].light:active {
  background: #ffff8e;
  @apply text-dark;
}

.switch:focus,
button[role="switch"]:focus {
  outline: 0;
}

.switch.dark:active,
button[role="switch"].dark:active,
.switch.dark:focus,
button[role="switch"].dark:focus {
  border: 3px dashed #ffff8e;
}

.switch.light:active,
button[role="switch"].light:active .switch.light:focus,
button[role="switch"].light:focus {
  border: 3px dashed #330867;
}

.switch-inner {
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  padding: 0.25rem;
  transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
  @apply border-light border-2 border-solid;
}

.switch-inner:hover {
  @apply border-light border-2 border-solid;
}

.switch-inner.unchecked {
  top: 32%;
  left: 18%;
  transform: translate(-32%, -18%);
}

.switch-inner.checked {
  top: 20%;
  right: -4%;
  transform: translate(-20%, -4%);
}

.switch.dark,
button[role="switch"].dark {
  background: #330867;
  @apply text-light;
}
.switch.light,
button[role="switch"].light {
  background: #ffff8e;
  @apply text-dark;
}
</style>
