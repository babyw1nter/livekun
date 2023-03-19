import { PluginNames } from '@/api/plugins'
import router, { addPluginRoute } from '@/router'
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
      pluginName: options?.pluginName || PluginNames.PLUGIN_TICKET,
      pluginConfig: options?.pluginConfig || {}
    }

    addPluginRoute(PluginNames.PLUGIN_TICKET, '价签栏 Ticket', ConfigPage, PluginPage)
  }
}
