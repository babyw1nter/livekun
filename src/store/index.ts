import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { message } from 'ant-design-vue'
import router from '@/router'
import http from '@/api/http'

export interface IConfig {
  giftCapsule: {
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
  }
  giftCard: {
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

export const defaultConfig: IConfig = {
  giftCapsule: {
    level: [0, 200, 500],
    duration: [5, 15, 30],
    maximum: 10,
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
    }
  },
  giftCard: {
    level: [0, 200, 500],
    minMoney: 0.01,
    comment: {
      use: false,
      prefix: '留言：',
      giftMinMoney: 0.01,
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
  config: IConfig
  status: IStatus
  auth: {
    isLoggedIn: boolean
    uuid: string
  }
}

export const key: InjectionKey<Store<State>> = Symbol(0)

export default createStore<State>({
  state: {
    config: defaultConfig,
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
    update(state, newValue: IConfig) {
      state.config = newValue
      // console.log('更新 vuex 配置', newValue)
    },
    reset(state) {
      state.config = defaultConfig
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
            const remoteConfig = responseData.data as IConfig
            context.commit('update', remoteConfig)
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
      // if (!context.state.auth.isLoggedIn) {
      //   console.warn('[config]', '用户未登录，不获保存远程配置！')
      //   return
      // }

      console.log('保存远程配置...')
      http
        .post('/user/update-config', context.state.config)
        .then(res => {
          const responseData = res.data as IResponse
          if (responseData.code === 200) {
            const remoteConfig = responseData.data as IConfig
            context.commit('update', remoteConfig)
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
