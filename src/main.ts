import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/css/main.css";
import App from "./App.vue";

import { createHead } from "@unhead/vue/client";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faBullseye,
  faCaretDown,
  faCaretUp,
  faCheck,
  faCirclePlus,
  faClose,
  faEraser,
  faGear,
  faMoon,
  faPen,
  faPenToSquare,
  faSun,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faDoNotEnter, faHouseBlank } from "@fortawesome/pro-solid-svg-icons";

/* import font awesome icon component */
import { router } from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import defaultLayout from "./layouts/defaultLayout.vue";
import errorLayout from "./layouts/errorLayout.vue";
import BaseSection from "@/components/BaseSection.vue";
import BaseButton from "@/components/BaseButton.vue";

/* add icons to the library */
library.add(
  faBars,
  faBullseye,
  faCaretDown,
  faCaretUp,
  faCheck,
  faCirclePlus,
  faClose,
  faDoNotEnter,
  faEraser,
  faGear,
  faHouseBlank,
  faMoon,
  faPen,
  faPenToSquare,
  faSun,
  faTrash,
  faXmark,
);

const pinia = createPinia();
const app = createApp(App);
const head = createHead();
app.use(pinia);
app.use(head);
app.use(FloatingVue);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-section", BaseSection);
app.component("base-button", BaseButton);
app.component("default-layout", defaultLayout);
app.component("error-layout", errorLayout);
app.mount("#app");
