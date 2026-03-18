// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Global styles
import './assets/css/styles.css'

// Apply saved theme (dark by default)
const saved = localStorage.getItem('theme') || 'dark'
document.documentElement.setAttribute('data-theme', saved)

createApp(App).use(router).mount('#app')
