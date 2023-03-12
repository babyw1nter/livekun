import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import dayjs from 'dayjs'
import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import 'dayjs/locale/zh-cn'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/notification/style/css'
import '@/assets/css/custom.less'

const app = createApp(App)

dayjs.locale('zh-cn')

app.use(Vue3ColorPicker)

app.use(store, key).use(router)

app.mount('#app')
