/**
 * 插件注册名称
 *
 * @deprecated 不够优雅，重构重构重构
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

export { PluginNames, PluginActions }
