import { App, UnwrapRef } from 'vue'
import router from '@/router'
import { cloneDeep } from 'lodash-es'
import { AxiosResponse } from 'axios'
import http, { IHttpResponse } from '../http'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue/es'

console.log('[LPM]', '插件管理器正在初始化...')

const _plugin: Array<LivekunPlugin> = []

interface LivekunPluginManager {
  install: (app: App) => void
  use(plugin: LivekunPlugin): LivekunPluginManager
}

interface LivekunPlugin {
  pluginName: string
  displayName: string
  description?: string
  author?: string
  defaultPluginConfig: unknown
  events?: Array<string>
  componentConfigPage: () => Promise<unknown>
  componentPluginPage: () => Promise<unknown>
}

interface IPluginConfig<T = unknown> {
  pluginName: string
  pluginConfig: T
  isDefault?: boolean
}

const _getRemotePluginConfig = async (uuid: string, pluginName: string | string[]) => {
  let _n = pluginName
  if (Array.isArray(pluginName)) {
    _n = pluginName
      .map((i) => i.trim())
      .filter((i) => i !== '')
      .join(',')
  }

  const res: AxiosResponse<IHttpResponse<Array<IPluginConfig>>> = await http.get('/user/getPluginConfig', {
    params: {
      uuid,
      pluginName: _n
    }
  })

  return res.data.code === 200 ? res.data.data : []
}

const _setRemotePluginConfig = async <T>(uuid: string, pluginName: string, pluginConfig: T) => {
  const res: AxiosResponse<IHttpResponse<Array<IPluginConfig>>> = await http.post('/user/setPluginConfig', {
    uuid,
    pluginName,
    pluginConfig
  })

  return res.data.code === 200 ? res.data.data : null
}

const _resetRemotePluginConfig = async (uuid: string, pluginName: string) => {
  const res: AxiosResponse<IHttpResponse<Array<IPluginConfig>>> = await http.post('/user/resetPluginConfig', {
    uuid,
    pluginName
  })

  return res.data.code === 200 ? res.data.data : null
}

const defineLivekunPlugin = (plugin: LivekunPlugin) => plugin

const getPluginConfig = <T>(pluginName: string) => {
  const plugin = _plugin.find((plugin) => plugin.pluginName === pluginName)

  if (!plugin)
    throw new Error(
      '未找到插件，是否已在插件管理器中注册插件？如果一个插件依赖了另一个插件，而被依赖的插件没有被注册，则会看到此错误！'
    )

  return plugin ? (cloneDeep(plugin.defaultPluginConfig) as T) : undefined
}

const usePluginConfig = async <T>(pluginName: string) => {
  if (!pluginName) throw new ReferenceError('插件名称未定义！')

  const userStore = useUserStore()

  const getUUID = () => router.currentRoute.value.query.uuid?.toString() || userStore.uuid || ''

  const pluginConfig = getPluginConfig<T>(pluginName)

  const reactivityPluginConfig = reactive({
    pluginConfig: pluginConfig as T
  })

  /** 拉取配置文件 */
  const pull = async () => {
    const remotePluginConfigs = await _getRemotePluginConfig(getUUID(), pluginName)

    const rcfg = remotePluginConfigs.find((i) => i.pluginName === pluginName)

    if (remotePluginConfigs.length > -1 && rcfg) {
      reactivityPluginConfig.pluginConfig = rcfg.pluginConfig as UnwrapRef<T>
    }
  }

  /** 重置 */
  const reset = async () => {
    await _resetRemotePluginConfig(getUUID(), pluginName)
    await pull()

    message.success('恢复默认选项完成！')
  }

  /** 保存 */
  const save = async () => {
    await _setRemotePluginConfig(getUUID(), pluginName, reactivityPluginConfig.pluginConfig)
    await pull()

    message.success('选项保存完成，已即时生效！')
  }

  await pull()

  return {
    reactivityPluginConfig,
    pull,
    reset,
    save
  }
}

const createLivekunPluginManager = () => {
  const _addPluginRoute = (
    pluginName: string,
    displayName: string,
    componentConfigPage: () => Promise<unknown>,
    componentPluginPage: () => Promise<unknown>
  ) => {
    router.addRoute('Console', {
      path: `/console/plugins/${pluginName}`,
      component: componentConfigPage,
      meta: {
        menuItemKey: `/console/plugins/${pluginName}`,
        menuItemName: displayName,
        showOnMenu: true,
        requiresAuth: true
      }
    })

    router.addRoute('PluginsOBS', {
      path: `/plugins-obs/${pluginName}`,
      component: componentPluginPage,
      meta: { requiresAuth: false }
    })
  }

  const livekunPluginManager: LivekunPluginManager = {
    install: (app: App) => {
      console.log('[LPM]', `初始化成功！（检测到${_plugin.length}个插件）`)
      console.log('[LPM]', '正在加载插件...')

      _plugin.forEach((plugin) => {
        _addPluginRoute(plugin.pluginName, plugin.displayName, plugin.componentConfigPage, plugin.componentPluginPage)
      })

      console.log('[LPM]', '加载插件成功！', _plugin)
    },
    use(plugin: LivekunPlugin) {
      _plugin.push(plugin)

      return livekunPluginManager
    }
  }

  return livekunPluginManager
}

export type { LivekunPluginManager, LivekunPlugin }
export { createLivekunPluginManager, defineLivekunPlugin, usePluginConfig, getPluginConfig }
