import { addDefaultPluginsConfig } from '@/api/plugins'
import { addPluginRoute } from '@/router'
import { App } from 'vue'
import { TypeChatMessagePluginConfig, defaultPluginConfig } from './config'

const ConfigPage = () => import('./views/ConfigPage.vue')
const PluginPage = () => import('./views/PluginPage.vue')

export interface IOptions {
  pluginName: string
  pluginConfig: TypeChatMessagePluginConfig
}

export default {
  metaInfo: {
    pluginName: 'chat-message',
    displayName: '聊天消息',
    description: '在OBS浏览器源中显示直播间的聊天消息',
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
