import { defaultPluginConfig } from './config'
import { defineLivekunPlugin } from '@/api/pluginmanager'

export default defineLivekunPlugin(() => {
  return {
    pluginName: 'paid',
    displayName: '礼物卡片 Paid',
    description: '以卡片形式展示直播间的礼物信息',
    author: 'hhui64',
    pluginConfig: defaultPluginConfig,
    componentConfigPage: () => import('./views/ConfigPage.vue'),
    componentPluginPage: () => import('./views/PluginPage.vue')
  }
})
