import router from '@/router'
import { message } from 'ant-design-vue/es'
import { UnwrapRef } from 'vue'
import http, { IHttpResponse } from './http'
import { getDefaultPluginsConfig, IPluginConfigMap, PluginNames, PluginsConfig } from './plugins'
import { AxiosResponse } from 'axios'
import { useUserStore } from '@/stores/user'

const pluginsConfig = reactive([])

const getRemotePluginConfig = async (uuid: string, pluginName: string | string[]) => {
  let _n = pluginName
  if (Array.isArray(pluginName)) {
    _n = pluginName
      .map((i) => i.trim())
      .filter((i) => i !== '')
      .join(',')
  }

  const res: AxiosResponse<IHttpResponse<PluginsConfig>> = await http.get('/user/getPluginConfig', {
    params: {
      uuid,
      pluginName: _n
    }
  })

  return res.data.code === 200 ? res.data.data : []
}

const setRemotePluginConfig = async <K extends keyof IPluginConfigMap>(
  uuid: string,
  pluginName: string,
  pluginConfig: IPluginConfigMap[K]
) => {
  const res: AxiosResponse<IHttpResponse<PluginsConfig>> = await http.post('/user/setPluginConfig', {
    uuid,
    pluginName,
    pluginConfig
  })

  return res.data.code === 200 ? res.data.data : null
}

const resetRemotePluginConfig = async (uuid: string, pluginName: string) => {
  const res: AxiosResponse<IHttpResponse<PluginsConfig>> = await http.post('/user/resetPluginConfig', {
    uuid,
    pluginName
  })

  return res.data.code === 200 ? res.data.data : null
}

const usePluginConfig = async <K extends keyof IPluginConfigMap>(pluginName: PluginNames) => {
  const userStore = useUserStore()

  const getDefault = () => getDefaultPluginsConfig(pluginName)?.pluginConfig as IPluginConfigMap[K]
  const getUUID = () => router.currentRoute.value.query.uuid?.toString() || userStore.uuid || ''

  const reactivityPluginConfig = reactive({
    pluginConfig: getDefault()
  })

  /** 拉取配置文件 */
  const pull = async () => {
    const remotePluginsConfig = await getRemotePluginConfig(getUUID(), pluginName)

    const rcfg = remotePluginsConfig.find((i) => i.pluginName === pluginName)

    if (remotePluginsConfig.length > -1 && rcfg) {
      reactivityPluginConfig.pluginConfig = rcfg.pluginConfig as UnwrapRef<IPluginConfigMap[K]>
    }
  }

  /** 重置 */
  const reset = async () => {
    await resetRemotePluginConfig(getUUID(), pluginName)
    await pull()

    message.success('恢复默认选项完成！')
  }

  /** 保存 */
  const save = async () => {
    await setRemotePluginConfig(getUUID(), pluginName, reactivityPluginConfig.pluginConfig)
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

export { pluginsConfig, usePluginConfig, getRemotePluginConfig }
