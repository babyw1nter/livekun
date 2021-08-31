import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import {
  ConfigProvider,
  Layout,
  PageHeader,
  Button,
  Input,
  InputNumber,
  Switch,
  Slider,
  Checkbox,
  Divider,
  Space,
  Menu,
  Tabs,
  Form,
  Alert,
  Typography,
  Avatar,
  Image,
  Tooltip
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import '@/assets/custom.less'

const app = createApp(App)

dayjs.locale('zh-cn')

app
  .use(store, key)
  .use(router)
  .use(ConfigProvider)
  .use(Layout)
  .use(PageHeader)
  .use(Button)
  .use(Menu)
  .use(Input)
  .use(InputNumber)
  .use(Switch)
  .use(Slider)
  .use(Checkbox)
  .use(Divider)
  .use(Space)
  .use(Tabs)
  .use(Form)
  .use(Alert)
  .use(Typography)
  .use(Avatar)
  .use(Image)
  .use(Tooltip)
  .mount('#app')
