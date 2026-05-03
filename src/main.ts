import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'

import { createHead } from '@unhead/vue/client'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBullseye, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
/* import { all } from '@awesome.me/kit-KIT_CODE/icons' */

/* add icons to the library */
library.add(faBullseye, faMoon, faSun)

const app = createApp(App)
const head = createHead()
app.use(head)
app.use(FloatingVue)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
