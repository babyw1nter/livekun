import store from '@/store'
import router from '@/router'
import { baseWsURL } from './http'

interface IMessage<T> {
  type: string
  data: T
}

interface ISocketMethodData {
  method: string
}

interface ISocketCustomData {
  key: string
  uid: number | string
  avatarUrl: string
  nickname: string
  userInfo?: unknown
}

const decode = (data: ArrayBuffer): IMessage<unknown> => {
  try {
    return JSON.parse(new TextDecoder().decode(data))
  } catch (error) {
    return {
      type: 'DECODE_ERROR',
      data: {}
    }
  }
}

const encode = <T>(data: T): ArrayBuffer => {
  return new TextEncoder().encode(JSON.stringify(data))
}

const createSocket = (
  onMessageCallback: (ev: MessageEvent, websocket: WebSocket, decodeData?: IMessage<unknown>) => void,
  pluginName: 'gift-capsule' | 'chat-message' | 'gift-card' | string
): WebSocket | null => {
  const uuid = router.currentRoute.value.query.uuid || ''

  if (!uuid) {
    console.warn('没有 UUID 参数，不连接 socket 服务器！')
    return null
  }

  console.log('正在创建 WS 连接...')
  const websocket = new WebSocket(baseWsURL, 'web')
  websocket.binaryType = 'arraybuffer'

  websocket.addEventListener('open', () => {
    console.log('连接成功！')

    // 连接成功后，发送握手协议请求
    websocket.send(
      encode({
        type: 'LOGIN',
        data: {
          pluginName: pluginName,
          uuid: uuid
        }
      })
    )
    store.dispatch('getRemoteConfig')
  })
  websocket.addEventListener('error', () => {
    console.error('连接错误！')
  })
  websocket.addEventListener('close', (ev) => {
    console.warn('连接关闭', ev.code, ev.reason)

    if (ev.code === 1002) {
      console.error('远程服务器拒绝连接，不再尝试重新创建连接，请手动刷新页面！')
      return
    }

    console.log('将于 5 秒后尝试重新创建连接...')

    if (websocket.readyState !== WebSocket.OPEN || websocket.readyState !== WebSocket.CONNECTING) {
      window.setTimeout(() => createSocket(onMessageCallback, pluginName), 1000)
    }
  })
  websocket.addEventListener('message', (ev) => {
    const decodeData = decode(ev.data)

    console.info('接收消息', decodeData)

    onMessageCallback(ev, websocket, decodeData)
  })

  return websocket
}

export { createSocket, encode, decode }
export type { IMessage, ISocketMethodData, ISocketCustomData }
