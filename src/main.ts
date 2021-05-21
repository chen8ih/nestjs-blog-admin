import "normalize.css/normalize.css"
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus).use(store).use(router)

router.isReady().then(() => app.mount('#app'))
