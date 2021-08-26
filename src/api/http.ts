import router from '@/router'
import { message } from 'ant-design-vue'
import axios from 'axios'

const devURL = 'localhost:39074'

const baseURL = process.env.NODE_ENV === 'development' ? `http://${devURL}` : window.location.origin
const baseWsURL = process.env.NODE_ENV === 'development' ? `ws://${devURL}` : `ws://${window.location.host}`

axios.defaults.withCredentials = true

const http = axios.create({
  baseURL,
  timeout: 10000
})

http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

http.interceptors.response.use(res => {
  if (res.status !== 200) {
    message.error('网络错误！')
  }

  if (res.data.code === 530) {
    message.warn('需要登录！')
    router.push({
      path: '/user/login'
    })
  }

  return res
})

export { baseURL, baseWsURL }

export default http
