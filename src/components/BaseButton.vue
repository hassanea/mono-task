<template>
  <button :type :aria-label="label" :class="buttonClasses">
    <span v-if="$slots.icon" :class="{ 'mr-2 inline-block align-middle': $slots.default }">
      <slot name="icon" />
    </span>
    <slot class="inline-block align-middle" v-if="$slots.default">
      {{ label }}
    </slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
defineOptions({
  name: "BaseButton",
});
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "button",
    validator(value: string) {
      return ["button", "submit", "reset"].includes(value);
    },
  },
  variant: {
    type: String,
    required: false,
    default: "btn",
  },
  label: {
    type: String,
    required: true,
  },
});

const { type, variant, label } = props;

const buttonClasses = computed(() => {
  return {
    btn: variant === "btn",
    "btn-submit submit-transition": variant === "btn-submit",
    "btn-submit edit submit-transition": variant === "btn-submit edit",
    "btn-submit cancel submit-transition": variant === "btn-submit cancel",
    "btn more": variant === "btn-more",
    "btn no-mg": variant === "btn-no-mg",
    "btn media": variant === "btn-media",
    "btn-cta": variant === "btn-cta",
    "btn-close": variant === "btn-close",
    "btn btn-back": variant === "btn-back",
    "btn-mobile-nav": variant === "btn-mobile-nav",
    "btn-lightbox": variant === "btn-lightbox",
    "btn-toolbar": variant === "btn-toolbar",
  };
});
</script>

<style lang="css" scoped>
@import "../assets/css/main.css";

.btn {
  @apply font-sans2 hover:bg-light text-secondary hover:text-secondary focus:border-highlight active:drop-shadow-secondary h-13 w-13 cursor-pointer rounded-full p-3 text-base leading-normal font-extrabold uppercase not-italic focus:border-[3px] focus:outline-none active:drop-shadow-xl;
  -webkit-transition: all 0.6s cubic-bezier(1, -0.62, 0, -0.2);
  transition: all 0.6s cubic-bezier(1, -0.62, 0, -0.2);
}

.btn-submit {
  @apply text-light hover:bg-light font-sans2 dark:hover:text-form-dark hover:text-form-light focus:shadow-highlight inline-block h-auto w-full cursor-pointer rounded-2xl bg-[#343159] p-3 px-4 text-center text-base leading-normal font-bold tracking-normal not-italic transition-all duration-150 focus:shadow-md focus:outline-0 active:border-4 active:border-solid active:border-[#343159] md:w-11/12 md:text-lg;
}

.btn-submit.edit {
  @apply text-light hover:bg-light bg-[#314F59] hover:text-[#314F59] active:border-[#314F59];
}

.btn-submit.cancel {
  @apply text-light hover:bg-light bg-primary-dark hover:text-primary-dark active:border-primary-dark;
}

.submit-transition {
  transition: all 0.7s cubic-bezier(1, 1.46, 0.37, 1.07);
}

.btn-mobile-nav {
  @apply bg-light absolute top-[10%] right-[1%] z-125 mx-0 my-4 inline-block h-12 w-12 cursor-pointer rounded-full p-2 align-middle text-purple-800;
}

.btn-mobile-nav.active {
  left: 1%;
}

.btn-mobile-nav:hover {
  @apply bg-dark text-light;
}

.btn-mobile-nav:active {
  -webkit-box-shadow: 4px 4px 6px #fff599;
  box-shadow: 4px 4px 6px #fff599;
}

.btn-mobile-nav:focus {
  outline: 0;
  background: #b3ffff;
  @apply text-dark;
}

@media screen and (prefers-reduced-motion: reduce) {
  .btn-mobile-nav,
  .btn,
  .btn-submit,
  .btn-submit.edit,
  .btn-submit.cancel,
  button,
  input[type="button"],
  input[type="submit"],
  input[type="reset"],
  button[type="button"],
  button[type="submit"],
  button[type="reset"] {
    @apply motion-reduce:transition-none;
  }
}
</style>
