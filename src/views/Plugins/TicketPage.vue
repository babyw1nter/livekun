<template>
  <TicketPanel ref="TicketPanelRef" :maximum="reactivityPluginConfig.pluginConfig.maximum" :level="reactivityPluginConfig.pluginConfig.level"
    :duration="reactivityPluginConfig.pluginConfig.duration" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import type TicketPanel from '@/components/TicketPanel.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { createSocket } from '@/api/socket'
import { PluginNames, PluginActions, getDefaultPluginsConfig, IPluginConfig } from '@/api/plugins'
import { usePluginConfig } from '@/api/config'

interface IPluginTicketData extends IPluginCommonMessage {
  money: number
  giftName: string
  giftCount: number
}

const store = useStore(key)
const TicketPanelRef = ref<InstanceType<typeof TicketPanel>>()

let { reactivityPluginConfig, pull, reset, save } = usePluginConfig<PluginNames.PLUGIN_TICKET>(PluginNames.PLUGIN_TICKET)

const pluginActionCallback = (action: PluginActions) => {
  switch (action) {
    case PluginActions.CLEAR:
      TicketPanelRef.value?.clear()
      break
    case PluginActions.REFRESH_PAGE:
      break
    case PluginActions.REFRESH_CONFIG:
      pull()
      break
  }
}

const pluginMessageCallback = (message: IPluginCommonMessage) => {
  const msgData = message as IPluginTicketData
  TicketPanelRef.value?.add({
    ...msgData
  })
}

onMounted(() => {
  createSocket(PluginNames.PLUGIN_TICKET, pluginActionCallback, pluginMessageCallback)
})
</script>
