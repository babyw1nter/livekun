import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/notification/style/css'
import '@/assets/custom.less'

const app = createApp(App)

dayjs.locale('zh-cn')

app.use(store, key).use(router)

app.mount('#app')
