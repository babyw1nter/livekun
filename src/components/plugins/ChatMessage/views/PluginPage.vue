<template>
  <ChatMessageList ref="ChatMessageListRef"
    :chat-message-config="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig"
    :ticket-config="ticketPluginConfig.reactivityPluginConfig.pluginConfig"
    :paid-config="paidPluginConfig.reactivityPluginConfig.pluginConfig" />
</template>

<script lang="ts" setup>
import type ChatMessageList from '@/components/plugins/ChatMessage/components/ChatMessageList.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { createSocket } from '@/api/socket'
import { PluginNames, PluginActions } from '@/api/plugins'
import { useChatMessagePluginConfig } from '@/api/config'

interface IPluginChatMessageData extends IPluginCommonMessage {
  message: string
  messageType: string
  type: string
}

const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

let { chatMessagePluginConfig, ticketPluginConfig, paidPluginConfig } = await useChatMessagePluginConfig()

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

createSocket(PluginNames.PLUGIN_CHAT_MESSAGE, pluginActionCallback, pluginMessageCallback)

</script>
