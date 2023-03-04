import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { message } from 'ant-design-vue'
import router from '@/router'
import http from '@/api/http'

export interface IUserConfig {
  ticket: {
    level: Array<number>
    duration: Array<number>
    maximum: number
    minMoney: number
  }
  chatMessage: {
    style: {
      fontSize: number
    }
    show: {
      join: boolean
      follow: boolean
      gift: boolean
    }
    blacklist: Array<{
      ccid: number | string
      note: string
    }>
  }
  paid: {
    level: Array<number>
    minMoney: number
    comment: {
      use: boolean
      prefix: string
      giftMinMoney: number
      giftWhitelist: string
    }
  }
}

export interface IStatus {
  isJoinRoom: boolean
  roomInfo: {
    liveId: string
    title: string
  }
}

export const defaultStatus: IStatus = {
  isJoinRoom: false,
  roomInfo: {
    liveId: '',
    title: ''
  }
}

export const defaultUserConfig: IUserConfig = {
  ticket: {
    level: [0, 99, 199],
    duration: [5, 15, 30],
    maximum: 100,
    minMoney: 0.01
  },
  chatMessage: {
    style: {
      fontSize: 16
    },
    show: {
      join: false,
      follow: false,
      gift: false
    },
    blacklist: []
  },
  paid: {
    level: [0, 9, 49, 99, 199, 249, 499],
    minMoney: 5,
    comment: {
      use: false,
      prefix: '留言：',
      giftMinMoney: 10,
      giftWhitelist: ''
    }
  }
}

interface IResponse {
  code: number
  message: string
  data: unknown
}

interface State {
  config: IUserConfig
  status: IStatus
  auth: {
    isLoggedIn: boolean
    uuid: string
  }
}

export const key: InjectionKey<Store<State>> = Symbol(0)

export default createStore<State>({
  state: {
    config: defaultUserConfig,
    status: {
      isJoinRoom: false,
      roomInfo: {
        liveId: '',
        title: ''
      }
    },
    auth: {
      isLoggedIn: false,
      uuid: ''
    }
  },
  mutations: {
    updateConfig(state, newValue: IUserConfig) {
      state.config = newValue
      // console.log('更新 vuex 配置', newValue)
    },
    resetConfig(state) {
      state.config = defaultUserConfig
      // console.log('重置 vuex 配置')
    },
    updateStatus(state, newValue: IStatus) {
      state.status = newValue
      // console.log('更新 vuex 状态', newValue)
    },
    resetStatus(state) {
      state.status = defaultStatus
      // console.log('重置 vuex 状态')
    },
    setLoginStatus(state, newValue: boolean) {
      state.auth.isLoggedIn = newValue
    },
    setUUID(state, newValue: string) {
      state.auth.uuid = newValue
    }
  },
  actions: {
    getRemoteStatus(context) {
      if (!context.state.auth.isLoggedIn) {
        console.warn('[status]', '用户未登录，不获取远程状态！')
        return
      }

      console.log('请求远程状态...')
      http
        .get('/api/get-status')
        .then(res => {
          const responseData = res.data as IResponse
          if (responseData.code === 200) {
            const remoteStatus = responseData.data as IStatus
            context.commit('updateStatus', remoteStatus)
            console.log('请求远程状态成功', remoteStatus)
          } else {
            // message.error('请求远程状态失败：' + responseData.code + ' ' + responseData.message)
            console.error('请求远程状态失败：' + responseData.code + ' ' + responseData.message)
          }
        })
        .catch((reason: Error) => {
          // message.error('请求远程状态失败：' + reason.message)
          console.error('请求远程状态失败：' + reason.message)
        })
    },
    getRemoteConfig(context) {
      console.log('请求远程配置...')
      http
        .get('/user/get-config', {
          params: {
            uuid: router.currentRoute.value.query.uuid
          }
        })
        .then(res => {
          const responseData = res.data as IResponse
          if (responseData.code === 200) {
            const remoteConfig = responseData.data as IUserConfig
            context.commit('updateConfig', remoteConfig)
            console.log('请求远程配置成功', remoteConfig)
          } else {
            // message.error('请求远程配置失败：' + responseData.code + ' ' + responseData.message)
            console.error('请求远程配置失败：' + responseData.code + ' ' + responseData.message)
          }
        })
        .catch((reason: Error) => {
          // message.error('请求远程配置失败：' + reason.message)
          console.error('请求远程配置失败：' + reason.message)
        })
    },
    saveRemoteConfig(context) {
      console.log('保存远程配置...')
      http
        .post('/user/update-config', context.state.config)
        .then(res => {
          const responseData = res.data as IResponse
          if (responseData.code === 200) {
            const remoteConfig = responseData.data as IUserConfig
            context.commit('updateConfig', remoteConfig)
            console.log('保存远程配置成功', remoteConfig)
            message.success('配置已保存！')
          } else {
            // message.error('保存远程配置失败：' + responseData.code + ' ' + responseData.message)
            console.error('保存远程配置失败：' + responseData.code + ' ' + responseData.message)
          }
        })
        .catch((reason: Error) => {
          // message.error('保存远程配置失败：' + reason.message)
          console.error('保存远程配置失败：' + reason.message)
        })
    }
  },
  modules: {}
})
