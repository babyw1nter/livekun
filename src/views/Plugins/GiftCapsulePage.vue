<template>
  <GiftCapsulePanel ref="GiftCapsulePanelRef" :maximum="store.state.config.giftCapsule.maximum"
    :level="store.state.config.giftCapsule.level" :duration="store.state.config.giftCapsule.duration" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import type GiftCapsulePanel from '@/components/GiftCapsulePanel.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { createSocket, PluginActions } from '@/api/socket'
import { PluginNames } from '@/api/plugins'

interface IPluginTicketData extends IPluginCommonMessage {
  money: number
  giftName: string
  giftCount: number
}

const store = useStore(key)
const GiftCapsulePanelRef = ref<InstanceType<typeof GiftCapsulePanel>>()

const pluginActionCallback = (action: PluginActions) => {
  switch (action) {
    case PluginActions.CLEAR:
      GiftCapsulePanelRef.value?.clear()
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
  GiftCapsulePanelRef.value?.add({
    ...msgData
  })
}

onMounted(() => {
  createSocket(PluginNames.PLUGIN_TICKET, pluginActionCallback, pluginMessageCallback)
})
</script>
