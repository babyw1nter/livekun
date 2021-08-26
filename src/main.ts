import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/assets/custom.less'

const app = createApp(App)

app
  .use(store, key)
  .use(router)
  .use(antd)
  .mount('#app')
