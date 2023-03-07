import router from '@/router'
import store from '@/store'
import { message } from 'ant-design-vue'
import { UnwrapRef } from 'vue'
import http, { IHttpResponse } from './http'
import { getDefaultPluginsConfig, IPluginConfig, IPluginConfigMap, PluginNames, PluginsConfig } from './plugins'

const pluginsConfig = reactive([])

const getRemotePluginConfig = async (uuid: string, pluginName: string | string[]) => {
  let _n = pluginName
  if (Array.isArray(pluginName)) {
    _n = pluginName
      .map((i) => i.trim())
      .filter((i) => i !== '')
      .join(',')
  }

  const res = (
    await http.get('/user/getPluginConfig', {
      params: {
        uuid,
        pluginName: _n
      }
    })
  ).data as IHttpResponse<PluginsConfig>

  return res.code === 200 ? res.data : []
}

const setRemotePluginConfig = async <K extends keyof IPluginConfigMap>(
  uuid: string,
  pluginName: string,
  pluginConfig: IPluginConfigMap[K]
) => {
  const res = (
    await http.post('/user/setPluginConfig', {
      uuid,
      pluginName,
      pluginConfig
    })
  ).data as IHttpResponse<PluginsConfig>

  return res.code === 200 ? res.data : null
}

const resetRemotePluginConfig = async (uuid: string, pluginName: string) => {
  const res = (
    await http.post('/user/resetPluginConfig', {
      uuid,
      pluginName
    })
  ).data as IHttpResponse<PluginsConfig>

  return res.code === 200 ? res.data : null
}

const useChatMessagePluginConfig = () => {
  const chatMessagePluginConfig = usePluginConfig<PluginNames.PLUGIN_CHAT_MESSAGE>(PluginNames.PLUGIN_CHAT_MESSAGE)
  const ticketPluginConfig = usePluginConfig<PluginNames.PLUGIN_TICKET>(PluginNames.PLUGIN_TICKET)
  const paidPluginConfig = usePluginConfig<PluginNames.PLUGIN_PAID>(PluginNames.PLUGIN_PAID)

  return { chatMessagePluginConfig, ticketPluginConfig, paidPluginConfig }
}

const usePluginConfig = <K extends keyof IPluginConfigMap>(pluginName: PluginNames) => {
  const getDefault = () => getDefaultPluginsConfig(pluginName)?.pluginConfig as IPluginConfigMap[K]
  const getUUID = () => router.currentRoute.value.query.uuid?.toString() || store.state.auth.uuid || ''

  const reactivityPluginConfig = reactive({
    pluginConfig: getDefault()
  })

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

  onBeforeMount(async () => await pull())

  return {
    reactivityPluginConfig,
    pull,
    reset,
    save
  }
}

export { pluginsConfig, getRemotePluginConfig }
export { useChatMessagePluginConfig, usePluginConfig }
