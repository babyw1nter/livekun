import { defineLivekunPlugin } from '@/api/pluginmanager'
import { defaultPluginConfig } from './config'

export default defineLivekunPlugin(() => {
  return {
    pluginName: 'chat-message',
    displayName: '聊天消息',
    description: '在OBS浏览器源中显示直播间的聊天消息',
    author: 'hhui64',
    pluginConfig: defaultPluginConfig,
    componentConfigPage: () => import('./views/ConfigPage.vue'),
    componentPluginPage: () => import('./views/PluginPage.vue')
  }
})
