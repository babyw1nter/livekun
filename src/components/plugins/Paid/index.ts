import { addDefaultPluginsConfig } from '@/api/plugins'
import { addPluginRoute } from '@/router'
import { App } from 'vue'
import { TypePaidPluginConfig, defaultPluginConfig } from './config'

const ConfigPage = () => import('./views/ConfigPage.vue')
const PluginPage = () => import('./views/PluginPage.vue')

export interface IOptions {
  pluginName: string
  pluginConfig: TypePaidPluginConfig
}

export default {
  metaInfo: {
    pluginName: 'paid',
    displayName: '礼物卡片 Paid',
    description: '以卡片形式展示直播间的礼物信息',
    author: 'hhui64'
  },
  install(app: App<Element>, options?: IOptions) {
    const _options: IOptions = {
      pluginName: options?.pluginName || this.metaInfo.pluginName,
      pluginConfig: options?.pluginConfig || defaultPluginConfig
    }

    addDefaultPluginsConfig(_options.pluginName, _options.pluginConfig)
    addPluginRoute(_options.pluginName, this.metaInfo.displayName, ConfigPage, PluginPage)
  }
}
