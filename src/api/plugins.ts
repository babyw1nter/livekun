import { cloneDeep } from 'lodash-es'

/**
 * 插件注册名称
 */
enum PluginNames {
  PLUGIN_CHAT_MESSAGE = 'chat-message',
  PLUGIN_TICKET = 'ticket',
  PLUGIN_PAID = 'paid'
}

/**
 * 插件动作 actions
 *
 * 用户在插件配置页面向 obs 插件操作的 action 常量值
 */
enum PluginActions {
  /** 刷新页面 */
  REFRESH_PAGE = 'refresh',
  /** 刷新插件配置 */
  REFRESH_CONFIG = 'get-config',
  /** 清除插件内容 */
  CLEAR = 'clear'
}

interface IPluginConfig<K extends keyof IPluginConfigMap> {
  pluginName: PluginNames | string
  pluginConfig: IPluginConfigMap[K]
  isDefault?: boolean
}

type PluginsConfig = Array<IPluginConfig<PluginNames>>
interface IPluginConfigMap {
  [PluginNames.PLUGIN_TICKET]: {
    level: Array<number>
    duration: Array<number>
    maximum: number
    minMoney: number
  }
  [PluginNames.PLUGIN_CHAT_MESSAGE]: {
    maximum: number
    customStyle: {
      /** 字体大小 */
      fontSize: number
      /** 消息颜色样式 */
      color: {
        /** 普通用户 */
        normal: {
          nickname: string
          message: string
        }
        /** cc守护/虎牙守护/bilibili大航海 */
        guard: {
          /** cc守护/虎牙守护（月守），bilibili（舰长） */
          lv1: {
            nickname: string
            message: string
          }
          /** cc守护/虎牙守护（年守），bilibili（提督） */
          lv2: {
            nickname: string
            message: string
          }
          /** bilibili（总督） */
          lv3: {
            nickname: string
            message: string
          }
        }
        /** 房管 */
        admin: {
          nickname: string
          message: string
        }
        /** 主播 */
        anchor: {
          nickname: string
          message: string
        }
      }
    }
    type: {
      ticket: boolean
      paid: boolean
    }
    event: {
      join: boolean
      follow: boolean
      gift: boolean
    }
    blacklist: Array<{
      ccid: number | string
      note: string
    }>
  }
  [PluginNames.PLUGIN_PAID]: {
    level: Array<number>
    minMoney: number
    comment: {
      use: boolean
      prefix: string
      giftMinMoney: number
      giftWhitelist: string
    }
  }
}

const defaultPluginsConfig: PluginsConfig = []

const addDefaultPluginsConfig = (cfg: IPluginConfig<PluginNames>) => {
  return defaultPluginsConfig.push(cfg)
}

const getDefaultPluginsConfig = <K extends keyof IPluginConfigMap>(pluginName: K | PluginNames) => {
  return cloneDeep(defaultPluginsConfig.find((i) => i.pluginName === pluginName))
}

export {
  PluginNames,
  PluginActions,
  IPluginConfigMap,
  IPluginConfig,
  PluginsConfig,
  defaultPluginsConfig,
  getDefaultPluginsConfig,
  addDefaultPluginsConfig
}
