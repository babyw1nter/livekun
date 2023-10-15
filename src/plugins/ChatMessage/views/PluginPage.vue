<template>
  <ChatMessageList ref="ChatMessageListRef"
    :chat-message-config="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig"
    :ticket-config="ticketPluginConfig.reactivityPluginConfig.pluginConfig"
    :paid-config="paidPluginConfig.reactivityPluginConfig.pluginConfig" />
</template>

<script lang="ts" setup>
import type ChatMessageList from '@/plugins/ChatMessage/components/ChatMessageList.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { useSocket } from '@/api/socket'
import { PluginNames, PluginActions } from '@/api/plugins'
import { usePluginConfig } from '@/api/pluginmanager'
import { TypePaidPluginConfig } from '../../Paid/config'
import { TypeTicketPluginConfig } from '../../Ticket/config'
import { TypeChatMessagePluginConfig } from '../config'

interface IPluginChatMessageData extends IPluginCommonMessage {
  message: string
  messageType: string
  type: string
}

const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

let [chatMessagePluginConfig, ticketPluginConfig, paidPluginConfig] = [await usePluginConfig<TypeChatMessagePluginConfig>(PluginNames.PLUGIN_CHAT_MESSAGE), await usePluginConfig<TypeTicketPluginConfig>(PluginNames.PLUGIN_TICKET), await usePluginConfig<TypePaidPluginConfig>(PluginNames.PLUGIN_PAID)]

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
