import http, { IHttpResponse } from '@/api/http'
import { message } from 'ant-design-vue/es'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

export interface IUserStore {
  isLoggedIn: boolean
  uuid: string
}

export const useUserStore = defineStore('userStore', {
  state() {
    return {
      isLoggedIn: false,
      uuid: ''
    } as IUserStore
  },
  actions: {
    async login(username: string, password: string, autologin: boolean) {
      const res: AxiosResponse<IHttpResponse<IUserStore>> = await http.post('/user/login', {
        username,
        password,
        autologin
      })

      if (res.data.code === 200) {
        this.$state = {
          isLoggedIn: true,
          uuid: res.data.data.uuid as string
        }

        localStorage.setItem('isLoggedIn', '1')
        localStorage.setItem('UUID', res.data.data.uuid)

        message.success('登录成功！')

        return Promise.resolve(true)
      } else {
        message.warn(res.data.message as string)
      }

      return Promise.resolve(false)
    },
    async autologin() {
      const res: AxiosResponse<IHttpResponse<IUserStore>> = await http.post('/user/autologin', {})

      if (res.data.code === 200) {
        this.$state = {
          isLoggedIn: true,
          uuid: res.data.data.uuid as string
        }

        localStorage.setItem('isLoggedIn', '1')
        localStorage.setItem('UUID', res.data.data.uuid)

        return Promise.resolve(true)
      } else {
        this.$reset()

        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('UUID')
      }

      return Promise.resolve(false)
    },
    async logout() {
      const res: AxiosResponse<IHttpResponse> = await http.get('/user/logout')

      if (res.data.code === 200) {
        this.$reset()

        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('UUID')

        message.success('退出登录成功！')

        return Promise.resolve(true)
      } else {
        message.warn(res.data.message)
      }

      return Promise.resolve(false)
    }
  }
})
