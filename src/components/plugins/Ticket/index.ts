import { addDefaultPluginsConfig } from '@/api/plugins'
import { addPluginRoute } from '@/router'
import { App } from 'vue'
import { TypeTicketPluginConfig, defaultPluginConfig } from './config'

const ConfigPage = () => import('./views/ConfigPage.vue')
const PluginPage = () => import('./views/PluginPage.vue')

export interface IOptions {
  pluginName: string
  pluginConfig: TypeTicketPluginConfig
}

export default {
  metaInfo: {
    pluginName: 'ticket',
    displayName: '价签栏 Ticket',
    description: '以标签形式展示直播间的礼物价值',
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
