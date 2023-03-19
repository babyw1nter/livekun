import { PluginNames } from '@/api/plugins'
import { addPluginRoute } from '@/router'
import { App } from 'vue'

const ConfigPage = () => import('./views/ConfigPage.vue')
const PluginPage = () => import('./views/PluginPage.vue')

export interface IOptions {
  pluginName: string
  pluginConfig: unknown
}

export default {
  install(app: App<Element>, options?: IOptions) {
    const _options: IOptions = {
      pluginName: options?.pluginName || PluginNames.PLUGIN_CHAT_MESSAGE,
      pluginConfig: options?.pluginConfig || {}
    }

    addPluginRoute(PluginNames.PLUGIN_CHAT_MESSAGE, '聊天消息', ConfigPage, PluginPage)
  }
}
