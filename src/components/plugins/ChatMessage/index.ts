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
  pluginName: PluginNames.PLUGIN_CHAT_MESSAGE,
  pluginConfig: {
    maximum: 150,
    customStyle: {
      fontSize: 18,
      color: {
        normal: {
          nickname: '#ccc',
          message: '#fff'
        },
        guard: {
          lv1: {
            nickname: '#0F9D58',
            message: '#fff'
          },
          lv2: {
            nickname: '#0F9D58',
            message: '#fff'
          },
          lv3: {
            nickname: '#0F9D58',
            message: '#fff'
          }
        },
        admin: {
          nickname: '#5f84f1',
          message: '#fff'
        },
        anchor: {
          nickname: '#FFD600',
          message: '#fff'
        }
      }
    },
    type: {
      ticket: true,
      paid: true
    },
    event: {
      join: false,
      follow: false,
      gift: false
    },
    blacklist: []
  },
  isDefault: true
}

export default {
  install(app: App<Element>, options?: IOptions) {
    const _options: IOptions = {
      pluginName: options?.pluginName || PluginNames.PLUGIN_CHAT_MESSAGE,
      pluginConfig: options?.pluginConfig || {}
    }

    addDefaultPluginsConfig(defaultPluginConfig)
    addPluginRoute(PluginNames.PLUGIN_CHAT_MESSAGE, '聊天消息', ConfigPage, PluginPage)
  }
}
