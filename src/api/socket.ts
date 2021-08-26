import store from '@/store'
import router from '@/router'
import { baseWsURL } from './http'

export const createSocket = (
  onMessageCallback: (ev: MessageEvent, websocket: WebSocket) => void,
  protocols: 'gift-capsule' | 'chat-message' | 'gift-card' | string
): WebSocket | null => {
  const uuid = router.currentRoute.value.query.uuid || ''

  if (!uuid) {
    console.warn('没有 UUID 参数，不连接 socket 服务器！')
    return null
  }

  console.log(`[${protocols}]`, '正在创建 WS 连接...')
  const websocket = new WebSocket(baseWsURL, protocols + '-' + uuid)

  websocket.addEventListener('open', () => {
    console.log(`[${protocols}]`, '连接成功!')
    store.dispatch('getRemoteConfig')
    // store.dispatch('getRemoteStatus')
  })
  websocket.addEventListener('error', () => {
    console.error(`[${protocols}]`, '连接错误!')
  })
  websocket.addEventListener('close', () => {
    console.warn(`[${protocols}]`, '连接关闭!')
    console.log(`[${protocols}]`, '将于 5 秒后尝试重新创建连接...')
    if (websocket.readyState !== WebSocket.OPEN || websocket.readyState !== WebSocket.CONNECTING) {
      window.setTimeout(() => createSocket(onMessageCallback, protocols), 5000)
    }
  })
  websocket.addEventListener('message', ev => onMessageCallback(ev, websocket))

  return websocket
}
