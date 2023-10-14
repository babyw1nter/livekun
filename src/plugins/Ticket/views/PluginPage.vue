<template>
  <TicketPanel ref="TicketPanelRef" :maximum="reactivityPluginConfig.pluginConfig.maximum"
    :level="reactivityPluginConfig.pluginConfig.level" :duration="reactivityPluginConfig.pluginConfig.duration" />
</template>

<script lang="ts" setup>
import type TicketPanel from '@/plugins/Ticket/components/TicketPanel.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { useSocket } from '@/api/socket'
import { PluginNames, PluginActions } from '@/api/plugins'
import { usePluginConfig } from '@/api/config'
import { TypeTicketPluginConfig } from '../config'

interface IPluginTicketData extends IPluginCommonMessage {
  money: number
  giftName: string
  giftCount: number
}

const TicketPanelRef = ref<InstanceType<typeof TicketPanel>>()

let { reactivityPluginConfig, pull, reset, save } = await usePluginConfig<TypeTicketPluginConfig>(PluginNames.PLUGIN_TICKET)

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

useSocket(PluginNames.PLUGIN_TICKET, pluginActionCallback, pluginMessageCallback)

</script>
