import store from '@/store'
import router from '@/router'
import { baseWsURL } from './http'
import { IMessage } from '@/types/socket'

const decode = (data: ArrayBuffer): string => {
  return new TextDecoder().decode(data)
}

const encode = (data: string): ArrayBuffer => {
  return new TextEncoder().encode(data)
}

const createSocket = (
  onMessageCallback: (ev: MessageEvent, websocket: WebSocket, decodeData?: IMessage<unknown>) => void,
  protocols: 'gift-capsule' | 'chat-message' | 'gift-card' | string
): WebSocket | null => {
  const uuid = router.currentRoute.value.query.uuid || ''

  if (!uuid) {
    console.warn('没有 UUID 参数，不连接 socket 服务器！')
    return null
  }

  console.log(`[${protocols}]`, '正在创建 WS 连接...')
  const websocket = new WebSocket(baseWsURL, protocols + '-' + uuid)
  websocket.binaryType = 'arraybuffer'

  websocket.addEventListener('open', () => {
    console.log(`[${protocols}]`, '连接成功！')
    store.dispatch('getRemoteConfig')
  })
  websocket.addEventListener('error', () => {
    console.error(`[${protocols}]`, '连接错误！')
  })
  websocket.addEventListener('close', ev => {
    console.warn(`[${protocols}]`, '连接关闭', ev.code, ev.reason)

    if (ev.code === 1002) {
      console.error(`[${protocols}]`, '远程服务器拒绝连接，不再尝试重新创建连接，请手动刷新页面！')
      return
    }

    console.log(`[${protocols}]`, '将于 5 秒后尝试重新创建连接...')

    if (websocket.readyState !== WebSocket.OPEN || websocket.readyState !== WebSocket.CONNECTING) {
      window.setTimeout(() => createSocket(onMessageCallback, protocols), 5000)
    }
  })
  websocket.addEventListener('message', ev => {
    try {
      const decodeData = JSON.parse(decode(ev.data)) as IMessage<unknown>
      onMessageCallback(ev, websocket, decodeData)
    } catch (err) {
      console.error(err)
    }
  })

  return websocket
}

export { createSocket, encode, decode }
