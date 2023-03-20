<template>
  <PaidPanel ref="PaidPanelRef" :level="reactivityPluginConfig.pluginConfig.level" />
</template>

<script lang="ts" setup>
import type PaidPanel from '@/components/plugins/Paid/components/PaidPanel.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { useSocket } from '@/api/socket'
import { PluginNames, PluginActions } from '@/api/plugins'
import { usePluginConfig } from '@/api/config'

interface IPluginPaidData extends IPluginCommonMessage {
  money: number
  giftName: string
  giftCount: number
  giftImage: string
  message: string
  comment: string
}

const PaidPanelRef = ref<InstanceType<typeof PaidPanel>>()

let { reactivityPluginConfig, pull, reset, save } = await usePluginConfig<PluginNames.PLUGIN_PAID>(PluginNames.PLUGIN_PAID)

const pluginActionCallback = (action: PluginActions) => {
  switch (action) {
    case PluginActions.CLEAR:
      PaidPanelRef.value?.clear()
      break
    case PluginActions.REFRESH_PAGE:
      break
    case PluginActions.REFRESH_CONFIG:
      pull()
      break
  }
}

const pluginMessageCallback = (message: IPluginCommonMessage) => {
  const msgData = message as IPluginPaidData
  PaidPanelRef.value?.add({
    ...msgData
  })
}

useSocket(PluginNames.PLUGIN_PAID, pluginActionCallback, pluginMessageCallback)

</script>
