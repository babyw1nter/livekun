import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import Vue3ColorPicker from 'vue3-colorpicker'
import PluginChatMessage from './components/plugins/ChatMessage'
import PluginPaid from './components/plugins/Paid'
import PluginTicket from './components/plugins/Ticket'
import 'vue3-colorpicker/style.css'
import 'dayjs/locale/zh-cn'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/notification/style/css'
import '@/assets/css/custom.less'

const app = createApp(App)

dayjs.locale('zh-cn')

app.use(Vue3ColorPicker)

// ================================
/**
 * 注册插件必须在注册 router 之前调用
 */
app.use(PluginChatMessage)
app.use(PluginTicket)
app.use(PluginPaid)
// ================================

app.use(createPinia()).use(router)

app.mount('#app')
