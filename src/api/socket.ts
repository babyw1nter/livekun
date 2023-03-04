import store from '@/store'
import router from '@/router'
import { baseWsURL } from './http'
import { PluginNames, PluginActions } from './plugins'

interface IPluginCommonMessage {
  key: string
  uid: number | string
  avatarUrl: string
  nickname: string
  userInfo?: unknown
}

interface IBaseSocketMessageMap {
  /** socket 握手协议 */
  CONNECT_RESPONSE: {
    serverVersion: string
  }
  /** @tudo 登录 */
  LOGIN: {
    [key: string]: unknown
  }
  /** 插件握手协议 */
  PLUGIN_CONNECT: {
    uuid: string
    pluginName: PluginNames
  }
  /** @see PluginActions */
  PLUGIN_ACTION: {
    action: PluginActions
  }
  /** 插件消息 */
  PLUGIN_MESSAGE: IPluginCommonMessage
  UNKNOWN: {
    [key: string]: unknown
  }
}

interface IBaseSocketMessage<K extends keyof IBaseSocketMessageMap> {
  type: K | string
  data: IBaseSocketMessageMap[K]
}

const decode = (data: ArrayBuffer): IBaseSocketMessage<'UNKNOWN'> => {
  try {
    return JSON.parse(new TextDecoder().decode(data))
  } catch (error) {
    return {
      type: 'UNKNOWN',
      data: {}
    }
  }
}

const encode = <T>(data: T): ArrayBuffer => {
  return new TextEncoder().encode(JSON.stringify(data))
}

interface CreateSocketCallbackFn {
  (
    /** 绑定插件的名称 */
    pluginName: PluginNames,
    /** 插件 action 事件的回调函数 */
    onPluginActionEventCallbackFn?: (action: PluginActions) => void,
    /** 插件 message 事件的回调函数 */
    onPluginMessageEventCallbackFn?: (message: IPluginCommonMessage) => void,
    /** websocket message 事件的回调函数 */
    onWebSocketMessageCallbackFn?: (
      ev: MessageEvent,
      websocket: WebSocket,
      message?: IBaseSocketMessage<'UNKNOWN'>
    ) => void
  ): WebSocket | null
}

const createSocket: CreateSocketCallbackFn = (
  pluginName,
  onPluginActionEventCallbackFn,
  onPluginMessageEventCallbackFn,
  onWebSocketMessageCallbackFn
) => {
  const uuid = router.currentRoute.value.query.uuid?.toString() || ''

  if (!uuid) {
    console.warn('没有 UUID 参数，不连接 socket 服务器！')
    return null
  }

  console.log('正在创建 WS 连接...')

  const websocket = new WebSocket(baseWsURL, 'web')
  websocket.binaryType = 'arraybuffer'

  const send = <K extends keyof IBaseSocketMessageMap>(data: IBaseSocketMessage<K>) => {
    websocket.send(encode(data))
  }

  websocket.addEventListener('open', () => {
    console.log('连接成功！')

    // 连接成功后，发送握手协议请求
    send({
      type: 'PLUGIN_CONNECT',
      data: {
        pluginName: pluginName,
        uuid: uuid
      }
    })

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

    console.warn('将于 5 秒后尝试重新创建连接...')

    if (websocket.readyState !== WebSocket.OPEN || websocket.readyState !== WebSocket.CONNECTING) {
      window.setTimeout(
        () =>
          createSocket(
            pluginName,
            onPluginActionEventCallbackFn,
            onPluginMessageEventCallbackFn,
            onWebSocketMessageCallbackFn
          ),
        5000
      )
    }
  })
  websocket.addEventListener('message', (ev) => {
    const message = decode(ev.data)

    console.info('接收消息', message)

    if (typeof onWebSocketMessageCallbackFn !== 'undefined') onWebSocketMessageCallbackFn(ev, websocket, message)

    if (typeof onPluginActionEventCallbackFn !== 'undefined') {
      if (message?.type === 'PLUGIN_ACTION') {
        const msg = message as unknown as IBaseSocketMessage<'PLUGIN_ACTION'>
        onPluginActionEventCallbackFn(msg.data.action)
      }
    }

    if (typeof onPluginMessageEventCallbackFn !== 'undefined') {
      if (message?.type === 'PLUGIN_MESSAGE') {
        const msg = message as unknown as IBaseSocketMessage<'PLUGIN_MESSAGE'>
        onPluginMessageEventCallbackFn(msg.data)
      }
    }
  })

  return websocket
}

export { createSocket, encode, decode }
export type { IBaseSocketMessage, IBaseSocketMessageMap, IPluginCommonMessage }
