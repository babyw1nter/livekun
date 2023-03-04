<template>
  <ChatMessageList ref="ChatMessageListRef" :font-size="store.state.config.chatMessage.style.fontSize"
    :level="store.state.config.giftCard.level" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import type ChatMessageList from '@/components/ChatMessageList.vue'
import type { IPluginCommonMessage } from '@/api/socket'
import { createSocket, PluginActions } from '@/api/socket'
import { PluginNames } from '@/api/plugins'

interface IPluginChatMessageData extends IPluginCommonMessage {
  message: string
  messageType: string
  type: string
}

const store = useStore(key)
const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

const pluginActionCallback = (action: PluginActions) => {
  switch (action) {
    case PluginActions.CLEAR:
      ChatMessageListRef.value?.clear()
      break
    case PluginActions.REFRESH_PAGE:
      break
    case PluginActions.REFRESH_CONFIG:
      store.dispatch('getRemoteConfig')
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
