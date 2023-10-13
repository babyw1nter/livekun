<template>
  <ChatMessageList ref="ChatMessageListRef"
    :chat-message-config="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig"
    :ticket-config="ticketPluginConfig.reactivityPluginConfig.pluginConfig"
    :paid-config="paidPluginConfig.reactivityPluginConfig.pluginConfig" />
</template>

<script lang="ts" setup>
import type ChatMessageList from '@/components/plugins/ChatMessage/components/ChatMessageList.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { useSocket } from '@/api/socket'
import { PluginNames, PluginActions } from '@/api/plugins'
import { usePluginConfig } from '@/api/config'

interface IPluginChatMessageData extends IPluginCommonMessage {
  message: string
  messageType: string
  type: string
}

const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

const useChatMessagePluginConfig = async () => {
  const chatMessagePluginConfig = await usePluginConfig<PluginNames.PLUGIN_CHAT_MESSAGE>(
    PluginNames.PLUGIN_CHAT_MESSAGE
  )
  const ticketPluginConfig = await usePluginConfig<PluginNames.PLUGIN_TICKET>(PluginNames.PLUGIN_TICKET)
  const paidPluginConfig = await usePluginConfig<PluginNames.PLUGIN_PAID>(PluginNames.PLUGIN_PAID)

  return { chatMessagePluginConfig, ticketPluginConfig, paidPluginConfig }
}

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

useSocket(PluginNames.PLUGIN_CHAT_MESSAGE, pluginActionCallback, pluginMessageCallback)

</script>
