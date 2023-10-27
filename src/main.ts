import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import '@/assets/styles/global.less'
import '@/assets/styles/antdv-style-override.less'
import '@/assets/styles/custom.less'
import livekunPluginManager from './plugins'

dayjs.locale('zh-cn')

const app = createApp(App)

app.config.performance = true

app
  .use(createPinia())
  .use(Vue3ColorPicker)
  .use(livekunPluginManager)
  .use(router)

app.mount('#app')
