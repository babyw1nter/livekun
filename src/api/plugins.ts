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

interface IPluginConfig<T = unknown> {
  pluginName: string
  pluginConfig: T
  isDefault?: boolean
}

type PluginsConfig = Array<IPluginConfig>

const defaultPluginsConfig: PluginsConfig = []

const addDefaultPluginsConfig = <T>(pluginName: string, pluginConfig: T) => {
  defaultPluginsConfig.push({
    pluginName,
    pluginConfig,
    isDefault: true
  })
}

const getDefaultPluginsConfig = <T>(pluginName: string) => {
  const defaultPluginConfig = defaultPluginsConfig.find((i) => i.pluginName === pluginName)

  return defaultPluginConfig ? (cloneDeep(defaultPluginConfig) as IPluginConfig<T>) : undefined
}

export {
  PluginNames,
  PluginActions,
  IPluginConfig,
  PluginsConfig,
  defaultPluginsConfig,
  getDefaultPluginsConfig,
  addDefaultPluginsConfig
}
