import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import { message } from 'ant-design-vue'
import router from '@/router'
import http, { IHttpResponse } from '@/api/http'
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

interface State {
  status: IStatus
  auth: {
    isLoggedIn: boolean
    uuid: string
  }
}

export const key: InjectionKey<Store<State>> = Symbol(0)

export default createStore<State>({
  state: {
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
        .get('/api/getStatus')
        .then((res) => {
          const responseData = res.data as IHttpResponse<IStatus>
          if (responseData.code === 200) {
            const remoteStatus = responseData.data as IStatus
            context.commit('updateStatus', remoteStatus)
            console.log('请求远程状态成功', remoteStatus)
          } else {
            console.error('请求远程状态失败：' + responseData.code + ' ' + responseData.message)
          }
        })
        .catch((reason: Error) => {
          console.error('请求远程状态失败：' + reason.message)
        })
    }
  }
})
