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
  pluginName: PluginNames.PLUGIN_PAID,
  pluginConfig: {
    level: [0, 9, 49, 99, 199, 249, 499],
    minMoney: 5,
    comment: {
      use: false,
      prefix: '留言：',
      giftMinMoney: 10,
      giftWhitelist: ''
    }
  },
  isDefault: true
}

export default {
  install(app: App<Element>, options?: IOptions) {
    const _options: IOptions = {
      pluginName: options?.pluginName || PluginNames.PLUGIN_PAID,
      pluginConfig: options?.pluginConfig || {}
    }

    addDefaultPluginsConfig(defaultPluginConfig)
    addPluginRoute(PluginNames.PLUGIN_PAID, '礼物卡片 Paid', ConfigPage, PluginPage)
  }
}
