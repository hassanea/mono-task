<template>
  <nav
    class="text-light navbar-transition bg-secondary fixed inset-0 z-100 flex w-full flex-col flex-wrap items-center rounded-xs px-3 py-4 align-middle md:h-25 md:flex-row md:px-8 md:py-3"
    :class="navbarClasses"
    :aria-label="label"
    @keydown.esc="closeMobileNavigation"
    ref="navEl"
  >
    <!-- class="w-full md:p-2.5 p-6 bg-primary/95 text-dark flex flex-col md:flex-row flex-wrap justify-center lg:justify-start items-center fixed shadow-2xl font-sans leading-normal text-lg font-bold z-2000 lg:py-[.6rem] lg:px-0 align-middle inset-0 border-t-2 border-solid border-t-dark" -->
    <base-button
      v-if="showMobileMenu"
      variant="btn-mobile-nav"
      label="Mobile Navigation button"
      title="Mobile Navigation button"
      :aria-controls="navId"
      :aria-expanded="isExpanded"
      @click="toggleMobileNavigation"
      @keydown.enter="toggleMobileNavigation"
    >
      <template #icon> <font-awesome-icon :icon="setMobileIcon" /> </template>
    </base-button>
    <ul
      :id="navId"
      class="navbar-transition flex list-none flex-col flex-wrap items-center justify-center gap-6 align-middle md:static md:h-auto md:translate-0 md:flex-row md:gap-4"
      :class="navbarNavClasses"
    >
      <!-- "flex flex-col md:flex-row justify-center items-center flex-wrap md:static md:translate-0 mx-0 md:mx-4 lg:mx-5 xl:mx-6 list-none transition-transform navbar-transition -->
      <li v-for="{ path, meta } in links" :key="meta?.name" ref="regLinks">
        <router-link
          :to="path"
          class="font-sans2 active:bg-light active:text-secondary border-[#97EDAA] text-base leading-normal font-bold tracking-normal not-italic hover:font-extrabold hover:text-[#FFA3D1] hover:uppercase focus:border-t-2 focus:border-r-0 focus:border-b-2 focus:border-l-0 focus:py-2 focus:outline-0 active:p-2"
          >{{ meta.name }}</router-link
        >
      </li>
      <!--             :tabindex="!toggle && !showMobileMenu ? null : -1" -->
      <li class="list-none">
        <base-drop-down-menu
          :toggle="changed"
          node="float"
          label="Website Settings"
          v-tooltip="'Settings'"
          arrow-icon-class="text-light"
          class="nav-link-effects"
          ref="dropDown"
        >
          <template #icon>
            <span class="dropdown-text sr-only md:not-sr-only"> Settings </span>
            <span class="ml-0 inline-block align-middle lg:ml-2">
              <font-awesome-icon icon="fa-solid fa-gear" class="text-light" />
            </span>
          </template>

          <template #default>
            <div
              role="group"
              aria-label="User Website Preferences"
              class="grid h-auto w-full grid-cols-1 gap-2.5"
            >
              <base-button
                variant="btn"
                @click="removeLocalStorageData"
                @keydown.enter="removeLocalStorageData"
                label="Clear LocalStorage Data"
                v-tooltip.left="'Clear LocalStorage Data'"
                class="mx-auto"
              >
                <template #icon>
                  <font-awesome-icon icon="fa-solid fa-eraser" />
                </template>
              </base-button>

              <base-switch
                :mode="colorMode"
                :model-value="isDarkMode"
                :label="setColorSwitchLabel"
                description="Set preferred color scheme on website."
                @update:model-value="handleColorThemeChange"
              >
                <template #icon>
                  <font-awesome-icon :icon="setColorSwitchIcon" />
                </template>
              </base-switch>
            </div>
          </template>
        </base-drop-down-menu>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef, defineAsyncComponent, onUnmounted, useId } from "vue";
// watch,
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useMediaQuery, onClickOutside } from "@vueuse/core";
// import { useFocusTrap } from "@/composables/useFocusTrap";
import { useMyColorModeStore } from "@/stores/useMyColorModeStore";
import { removeLocalStorageData } from "@/utils";
import BaseDropDownMenu from "./BaseDropDownMenu.vue";

defineOptions({
  name: "BaseNavbar",
});

const BaseSwitch = defineAsyncComponent(() => import("@/components/BaseSwitch.vue"));

const colorStore = useMyColorModeStore();

const { colorMode, isDarkMode, setColorSwitchIcon, setColorSwitchLabel } = storeToRefs(colorStore);

const { handleColorThemeChange } = colorStore;

// const { initFocusTrap, clearFocusTrap } = useFocusTrap();

const props = defineProps({
  toggle: {
    type: Boolean,
    required: false,
  },
  links: {
    type: Array,
    required: false,
    default: () => {
      return [];
    },
  },
  label: {
    type: String,
    required: false,
    default: "Main Navigation",
  },
});

const emit = defineEmits(["handle-toggle", "handle-close"]);

const { links, label } = props;

const changed = ref(false);

const navEl = useTemplateRef("navEl");

// const regLinks = useTemplateRef("regLinks");

// const dropDown = useTemplateRef("dropDown");

const showMobileMenu = useMediaQuery("(max-width: 767px)");

const navId = useId();

const toggleMobileNavigation = () => {
  emit("handle-toggle");
};

const closeMobileNavigation = () => {
  emit("handle-close");
};

const stop = onClickOutside(navEl, closeMobileNavigation);

const navbarClasses = computed(() => {
  return {
    "h-94": props.toggle && showMobileMenu,
    "h-25": (!props.toggle && showMobileMenu) || (!props.toggle && !showMobileMenu),
  };
});
const navbarNavClasses = computed(() => {
  return {
    "absolute translate-0": props.toggle,
    "absolute -translate-x-2499.75": !props.toggle,
  };
});

const isExpanded = computed(() => (props.toggle ? true : false));
const setMobileIcon = computed(() => {
  return props.toggle ? "fa-solid fa-close" : "fa-solid fa-bars";
});

// watch(
//   () => props.toggle,
//   (value) => {
//     const elements = [...regLinks?.value, dropDown?.value];
//     if (value) {
//       initFocusTrap();
//       elements.forEach((el) => {
//         el.setAttribute("tabindex", 0);
//       });
//     } else {
//       clearFocusTrap();
//       elements.forEach((el) => {
//         el.setAttribute("tabindex", -1);
//       });
//     }
//   },
// );

onUnmounted(() => stop());
</script>

<style lang="css" scoped>
@import "../assets/css/main.css";

.router-link-active {
  @apply text-highlight;
}

.router-link-active {
  @apply bg-secondary text-highlight;
}

.router-link-exact-active {
  @apply font-black;
}

.navbar .nav-text,
.dropdown-text {
  transition: all 0.4s cubic-bezier(1, 0, 0, -0.92);
  @apply font-sans2 text-light text-base leading-normal font-bold dark:contrast-[0.8];
}

.nav-link-effects {
  @apply active:text-secondary mt-1.5 hover:font-extrabold hover:text-[#FFA3D1] hover:uppercase focus:border-t-2 focus:border-r-0 focus:border-b-2 focus:border-l-0 focus:py-2 focus:outline-0 active:p-2;
  /* hover:border-b-4 hover:border-solid hover:border-b-[#ff0] hover:font-extrabold hover:text-[#eae6e5] focus:outline focus:outline-2 focus:outline-[#b3ffff] focus:outline-none active:border-0 active:text-[#ff0]; */
}

.navbar-transition {
  transition:
    height,
    transform 0.5s cubic-bezier(0.41, 1.12, 0.81, 0.09);
}
</style>
