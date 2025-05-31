import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './utils/leaflet-setup'

const app = createApp(App)
app.use(router)
app.mount('#app')