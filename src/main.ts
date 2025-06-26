import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import { initAuth } from './store'

// Initialiser l'authentification au démarrage de l'application
initAuth()

createApp(App).use(router).mount('#app')
