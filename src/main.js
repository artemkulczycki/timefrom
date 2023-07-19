import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import './assets/main.scss'
import 'primeicons/primeicons.css'
import "primevue/resources/themes/lara-light-indigo/theme.css"

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
