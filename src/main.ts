import "normalize.css/normalize.css"
import router from './router'
import { store } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import { createApp } from 'vue'
import App from './App.vue'

// 引入markdown编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

VMdEditor.use(githubTheme)

const app = createApp(App)
app.use(ElementPlus).use(store).use(router).use(VMdEditor)

router.isReady().then(() => app.mount('#app'))

