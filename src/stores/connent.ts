import http, { IHttpResponse } from '@/api/http'
import { message } from 'ant-design-vue/es'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

export interface IConnentStore {
  isJoinedRoom: boolean
  roomInfo: {
    liveId: string
    title: string
  }
}

export const useConnentStore = defineStore('connentStore', {
  state() {
    return {
      isJoinedRoom: false,
      roomInfo: {
        liveId: '',
        title: ''
      }
    } as IConnentStore
  },
  actions: {
    async getStatus() {
      const res: AxiosResponse<IHttpResponse<IConnentStore>> = await http.get('/api/getStatus')

      if (res.data.code === 200) {
        this.$state = res.data.data

        return Promise.resolve(true)
      } else {
        this.$reset()
      }

      return Promise.resolve(false)
    },
    async joinRoom(id: string | number) {
      const res: AxiosResponse<IHttpResponse<IConnentStore>> = await http.post('/api/join', {
        liveId: id.toString()
      })

      if (res.data.code === 200) {
        this.$state = res.data.data

        message.success('进入直播间成功！')

        await this.getStatus()

        return Promise.resolve(true)
      } else if (res.data.code === 10001) {
        message.warning('进入直播间失败，请稍后再试！')
      } else {
        message.error('服务器错误！')
      }

      await this.getStatus()

      return Promise.resolve(false)
    },
    async reset() {
      const res: AxiosResponse<IHttpResponse> = await http.post('/api/reset')

      if (res.data.code === 200) {
        this.$reset()

        await this.getStatus()

        message.success('重置成功！')

        return Promise.resolve(true)
      } else {
        message.warning(res.data.message)
      }

      await this.getStatus()

      return Promise.resolve(false)
    }
  }
})
