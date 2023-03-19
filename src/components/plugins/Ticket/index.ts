import { PluginNames, addDefaultPluginsConfig } from '@/api/plugins'
import { addPluginRoute } from '@/router'
import { App } from 'vue'

const ConfigPage = () => import('./views/ConfigPage.vue')
const PluginPage = () => import('./views/PluginPage.vue')

export interface IOptions {
  pluginName: string
  pluginConfig: unknown
}

export const defaultPluginConfig = {
  pluginName: PluginNames.PLUGIN_TICKET,
  pluginConfig: {
    level: [0, 9, 49, 99, 199, 249, 499],
    duration: [1, 5, 10, 15, 30, 45, 60],
    maximum: 100,
    minMoney: 5
  },
  isDefault: true
}

export default {
  install(app: App<Element>, options?: IOptions) {
    const _options: IOptions = {
      pluginName: options?.pluginName || PluginNames.PLUGIN_TICKET,
      pluginConfig: options?.pluginConfig || {}
    }

    addDefaultPluginsConfig(defaultPluginConfig)
    addPluginRoute(PluginNames.PLUGIN_TICKET, '价签栏 Ticket', ConfigPage, PluginPage)
  }
}
