<template>
  <ChatMessageList ref="ChatMessageListRef"
    :font-size="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.style.fontSize"
    :ticket-config="ticketPluginConfig.reactivityPluginConfig.pluginConfig"
    :paid-config="paidPluginConfig.reactivityPluginConfig.pluginConfig" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import type ChatMessageList from '@/components/ChatMessageList.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { createSocket } from '@/api/socket'
import { PluginNames, PluginActions, getDefaultPluginsConfig, IPluginConfig } from '@/api/plugins'
import { useChatMessagePluginConfig } from '@/api/config'

interface IPluginChatMessageData extends IPluginCommonMessage {
  message: string
  messageType: string
  type: string
}

const store = useStore(key)
const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

let { chatMessagePluginConfig, ticketPluginConfig, paidPluginConfig } = useChatMessagePluginConfig()

const pluginActionCallback = (action: PluginActions) => {
  switch (action) {
    case PluginActions.CLEAR:
      ChatMessageListRef.value?.clear()
      break
    case PluginActions.REFRESH_PAGE:
      break
    case PluginActions.REFRESH_CONFIG:
      chatMessagePluginConfig.pull()
      break
  }
}

const pluginMessageCallback = (message: IPluginCommonMessage) => {
  const msgData = message as IPluginChatMessageData
  ChatMessageListRef.value?.add({
    ...msgData
  })
}

onMounted(() => {
  createSocket(PluginNames.PLUGIN_CHAT_MESSAGE, pluginActionCallback, pluginMessageCallback)
})
</script>
