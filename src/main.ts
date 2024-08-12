import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Set up PrimeVue with the Aura theme
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

// Set up Pinia and the Router
app.use(createPinia())
app.use(router)

// Mount the app
app.mount('#app')
