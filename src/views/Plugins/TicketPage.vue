<template>
  <TicketPanel ref="TicketPanelRef" :maximum="store.state.config.ticket.maximum"
    :level="store.state.config.ticket.level" :duration="store.state.config.ticket.duration" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import type TicketPanel from '@/components/TicketPanel.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { createSocket } from '@/api/socket'
import { PluginNames, PluginActions } from '@/api/plugins'

interface IPluginTicketData extends IPluginCommonMessage {
  money: number
  giftName: string
  giftCount: number
}

const store = useStore(key)
const TicketPanelRef = ref<InstanceType<typeof TicketPanel>>()

const pluginActionCallback = (action: PluginActions) => {
  switch (action) {
    case PluginActions.CLEAR:
      TicketPanelRef.value?.clear()
      break
    case PluginActions.REFRESH_PAGE:
      break
    case PluginActions.REFRESH_CONFIG:
      store.dispatch('getRemoteConfig')
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
