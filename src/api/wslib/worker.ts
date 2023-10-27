import router from '@/router'
import chalk from 'chalk'
import { PluginNames, PluginActions } from '../plugins'
import EventEmitter from 'eventemitter3'

const ctx: SharedWorkerGlobalScope = self as never

interface IPluginCommonMessage {
  key: string
  uid: number | string
  avatarUrl: string
  nickname: string
  userInfo?: unknown
}

interface IBaseWsMessageMap {
  /** socket 握手协议 */
  CONNECT_RESPONSE: {
    serverVersion: string
  }
  /** @todo 登录 */
  LOGIN: {
    [key: string]: unknown
  }
  /** 插件握手协议 */
  PLUGIN_CONNECT: {
    uuid: string
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

interface IBaseWsMessage<K extends keyof IBaseWsMessageMap> {
  type: K | string
  data: IBaseWsMessageMap[K]
}

interface IWorkerPortMessage {
  type: string
  data: {
    [key: string]: unknown
  }
}

const baseWsUrl =
  process.env.NODE_ENV === 'development'
    ? `ws://${__DEV_URL__}`
    : `wss://${__PROD_URL__}`

const ee: EventEmitter = new EventEmitter()

const decode = (data: ArrayBuffer): IBaseWsMessage<'UNKNOWN'> => {
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

const initWs = (
  onWsMessageCallbackFn?: (message: IBaseWsMessage<'UNKNOWN'>) => void
) => {
  console.log('[websocket]', '开始执行初始化步骤...')

  const websocket = new WebSocket(baseWsUrl, 'web')
  websocket.binaryType = 'arraybuffer'

  const send = <K extends keyof IBaseWsMessageMap>(data: IBaseWsMessage<K>) => {
    websocket.send(encode(data))
  }

  websocket.addEventListener('open', () => {
    console.log('[websocket]', '连接成功！')
  })

  websocket.addEventListener('error', () => {
    console.error('[websocket]', '连接错误！')
  })

  websocket.addEventListener('close', (ev) => {
    console.warn('[websocket]', '连接关闭', ev.code, ev.reason)

    if (ev.code === 1002) {
      console.error(
        '[websocket]',
        '远程服务器拒绝连接，不再尝试重新创建连接，请手动刷新页面！'
      )
      return
    }

    console.warn('[websocket]', '将于 5 秒后尝试重新创建连接...')

    if (
      websocket.readyState !== WebSocket.CONNECTING &&
      websocket.readyState !== WebSocket.OPEN
    ) {
      setTimeout(() => initWs(onWsMessageCallbackFn), 5000)
    }
  })

  websocket.addEventListener('message', (ev) => {
    const msg = decode(ev.data)

    ee.emit('message', msg)

    if (typeof onWsMessageCallbackFn !== 'undefined') onWsMessageCallbackFn(msg)
  })

  console.log('[websocket]', '初始化执行完毕！')

  return {
    send
  }
}

const { send } = initWs()

ctx.onconnect = (event: MessageEvent) => {
  const port = event.ports[0]

  ee.on('message', (msg: IBaseWsMessage<'UNKNOWN'>) => {
    port.postMessage({
      type: 'MESSAGE',
      data: msg
    })
  })

  port.onmessage = (e) => {
    const msg = e.data as IWorkerPortMessage

    switch (msg.type) {
      case 'INIT':
        send({
          type: 'PLUGIN_CONNECT',
          data: {
            uuid: msg.data.uuid as string
          }
        })
        break
      case 'PING':
        port.postMessage({
          type: 'PONG'
        })
        break
    }
  }
}

export type { IWorkerPortMessage }
