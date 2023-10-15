import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import Vue3ColorPicker from 'vue3-colorpicker'
import 'ant-design-vue/dist/reset.css'
import 'vue3-colorpicker/style.css'
import 'dayjs/locale/zh-cn'
import '@/assets/styles/custom.less'
import livekunPluginManager from './plugins'

const app = createApp(App)

dayjs.locale('zh-cn')

app.use(Vue3ColorPicker).use(createPinia()).use(livekunPluginManager).use(router)

app.mount('#app')
