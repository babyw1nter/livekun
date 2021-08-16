import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios'
import { message } from 'ant-design-vue'

const host = 'http://localhost:39074'

export interface IConfig {
  giftCapsule: {
    level: Array<number>
    duration: Array<number>
    maximum: number
    minMoney: number
  }
  chatMessage: {
    show: {
      join: boolean
      follow: boolean
      gift: boolean
    }
  }
  giftCard: {
    level: Array<number>
    minMoney: number
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
    level: [1, 200, 500],
    duration: [60 * 1000, 300 * 1000, 600 * 1000],
    maximum: 10,
    minMoney: 0.01
  },
  chatMessage: {
    show: {
      join: false,
      follow: false,
      gift: false
    }
  },
  giftCard: {
    level: [1, 200, 500],
    minMoney: 0.01
  }
}

interface IResponse {
  code: number
  data: unknown
}

interface State {
  config: IConfig
  status: IStatus
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
    }
  },
  mutations: {
    update(state, newValue: IConfig) {
      state.config = newValue
    },
    reset(state) {
      state.config = defaultConfig
    },
    updateStatus(state, newValue: IStatus) {
      state.status = newValue
    },
    resetStatus(state) {
      state.status = defaultStatus
    }
  },
  actions: {
    getRemoteStatus(context) {
      console.log('请求远程状态...')
      axios.get(host + '/get-status').then(res => {
        const responseData = res.data as IResponse
        const remoteStatus = responseData.data as IStatus
        context.commit('updateStatus', remoteStatus)
      })
    },
    getRemoteConfig(context) {
      console.log('请求远程配置...')
      axios.get(host + '/get-config').then(res => {
        const responseData = res.data as IResponse
        const remoteConfig = responseData.data as IConfig
        context.commit('update', remoteConfig)
      })
    },
    saveRemoteConfig(context) {
      console.log('保存远程配置...')
      axios
        .post(host + '/update-config', context.state.config)
        .then(res => {
          const responseData = res.data as IResponse
          const remoteConfig = responseData.data as IConfig
          context.commit('update', remoteConfig)
          message.success('设置已保存！')
        })
        .catch(() => {
          message.error('设置保存失败！')
        })
    }
  },
  modules: {}
})
