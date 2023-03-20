import router from '@/router'
import { message } from 'ant-design-vue'
import { UnwrapRef } from 'vue'
import http, { IHttpResponse } from './http'
import { getDefaultPluginsConfig, IPluginConfig, IPluginConfigMap, PluginNames, PluginsConfig } from './plugins'
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

const useChatMessagePluginConfig = async () => {
  const chatMessagePluginConfig = await usePluginConfig<PluginNames.PLUGIN_CHAT_MESSAGE>(
    PluginNames.PLUGIN_CHAT_MESSAGE
  )
  const ticketPluginConfig = await usePluginConfig<PluginNames.PLUGIN_TICKET>(PluginNames.PLUGIN_TICKET)
  const paidPluginConfig = await usePluginConfig<PluginNames.PLUGIN_PAID>(PluginNames.PLUGIN_PAID)

  return { chatMessagePluginConfig, ticketPluginConfig, paidPluginConfig }
}

const usePluginConfig = async <K extends keyof IPluginConfigMap> (pluginName: PluginNames) => {
  const store = useUserStore()

  const getDefault = () => getDefaultPluginsConfig(pluginName)?.pluginConfig as IPluginConfigMap[K]
  const getUUID = () => router.currentRoute.value.query.uuid?.toString() || store.uuid || ''

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
    // reactivityPluginConfig.pluginConfig = JSON.parse(JSON.stringify(getDefault())) as UnwrapRef<IPluginConfigMap[K]>

    await resetRemotePluginConfig(getUUID(), pluginName)
    await pull()

    message.success('重置成功！')
  }

  /** 保存 */
  const save = async () => {
    await setRemotePluginConfig(getUUID(), pluginName, reactivityPluginConfig.pluginConfig)
    await pull()
    message.success('保存成功！')
  }

  // watch(reactivityPluginConfig.pluginConfig, () => save())

  await pull()

  return {
    reactivityPluginConfig,
    pull,
    reset,
    save
  }
}

export { pluginsConfig, getRemotePluginConfig }
export { useChatMessagePluginConfig, usePluginConfig }
