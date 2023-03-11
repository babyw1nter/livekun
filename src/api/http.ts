import router from '@/router'
import { message } from 'ant-design-vue'
import axios from 'axios'

const devURL = '10.0.0.230:39075'
const prodURL = 'livekun-webapi.anankun.icu:4433'

const baseURL = process.env.NODE_ENV === 'development' ? `http://${devURL}` : `https://${prodURL}`
const baseWsURL = process.env.NODE_ENV === 'development' ? `ws://${devURL}` : `wss://${prodURL}`

axios.defaults.withCredentials = true

const http = axios.create({
  baseURL,
  timeout: 10000
})

http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

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

interface IHttpResponse<T> {
  code: number
  message: string
  data: T
}

export { baseURL, baseWsURL }
export type { IHttpResponse }
export default http
