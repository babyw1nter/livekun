import router from '@/router'
import { PluginNames, PluginActions } from '../plugins'
import { IWorkerPortMessage } from './worker'

// export const useWs: UseWsFn = async (
//   pluginName,
//   onPluginActionEventCallbackFn,
//   onPluginMessageEventCallbackFn,
//   onWebSocketMessageCallbackFn
// ) => {
//   return Promise.resolve(null)
// }

let worker: SharedWorker | null = null

const initWorker = (uuid: string) => {
  if (!worker) {
    worker = new SharedWorker(new URL('./worker.ts', import.meta.url), {
      type: 'module',
      name: 'Livekun Plugins WebSocket Shared Worker'
    })

    worker.port.postMessage({
      type: 'INIT',
      data: {
        uuid: uuid
      }
    })

    worker.port.onmessage = (ev) => {
      const msg = ev.data as IWorkerPortMessage

      switch (msg.type) {
        case 'MESSAGE':
          console.log('[收到消息]', msg.data)
      }
    }
  }
}

export const useWs = () => {
  const uuid = router.currentRoute.value.query.uuid?.toString() || ''

  if (!uuid) {
    console.warn('[WS]', '没有 UUID 参数，不连接 socket 服务器！')
    return
  }

  initWorker(uuid)
}
