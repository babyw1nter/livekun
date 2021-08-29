import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/assets/custom.less'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

const app = createApp(App)

dayjs.locale('zh-cn')

app
  .use(store, key)
  .use(router)
  .use(antd)
  .mount('#app')
