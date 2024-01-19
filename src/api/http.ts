import router from '@/router'
import { message } from 'ant-design-vue/es'
import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? `http://${__DEV_URL__}`
    : `https://${__PROD_URL__}`

const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true
})

http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

http.interceptors.response.use((res) => {
  if (res.status !== 200) {
    message.error('网络错误！')
  }

  if (res.data.code === 530) {
    message.warning('需要登录！')
    router.push({
      path: '/user/login'
    })
  }

  return res
})

interface IHttpResponse<T = unknown> {
  code: number
  message: string
  data: T
  timestamp?: number
}

export { baseUrl }
export type { IHttpResponse }
export default http
