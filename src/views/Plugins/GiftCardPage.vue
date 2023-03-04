<template>
  <GiftCardPanel ref="GiftCardPanelRef" :level="store.state.config.giftCard.level" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import type GiftCardPanel from '@/components/GiftCardPanel.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { createSocket } from '@/api/socket'
import { PluginNames, PluginActions } from '@/api/plugins'

interface IPluginPaidData extends IPluginCommonMessage {
  money: number
  giftName: string
  giftCount: number
  giftImage: string
  message: string
  comment: string
}

const store = useStore(key)
const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()

const pluginActionCallback = (action: PluginActions) => {
  switch (action) {
    case PluginActions.CLEAR:
      GiftCardPanelRef.value?.clear()
      break
    case PluginActions.REFRESH_PAGE:
      break
    case PluginActions.REFRESH_CONFIG:
      store.dispatch('getRemoteConfig')
      break
  }
}

const pluginMessageCallback = (message: IPluginCommonMessage) => {
  const msgData = message as IPluginPaidData
  GiftCardPanelRef.value?.add({
    ...msgData
  })
}


onMounted(() => {
  createSocket(PluginNames.PLUGIN_PAID, pluginActionCallback, pluginMessageCallback)
})
</script>
