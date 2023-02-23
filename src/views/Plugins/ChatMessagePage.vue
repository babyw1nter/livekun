<template>
  <ChatMessageList
    ref="ChatMessageListRef"
    :font-size="store.state.config.chatMessage.style.fontSize"
    :level="store.state.config.giftCard.level"
  />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import type ChatMessageList from '@/components/ChatMessageList.vue'
import { IMessage, ISocketCustomData } from '@/types/socket'
import { createSocket } from '@/api/socket'

const store = useStore(key)
const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

onMounted(() => {
  createSocket((ev, websocket, decodeData) => {
    interface ISocketChatMsg extends ISocketCustomData {
      method?: string
      message: string
      messageType: string
      type: string
    }

    const socketMessage = decodeData as IMessage<ISocketChatMsg>

    console.info(`[${websocket.protocol}]`, '接收消息', socketMessage)

    const method = (m: string) => {
      switch (m) {
        case 'clear':
          ChatMessageListRef.value?.clear()
          break
        case 'refresh':
          // 刷新页面
          break
        case 'get-config':
          store.dispatch('getRemoteConfig')
          break
      }
    }

    switch (socketMessage.type) {
      case 'method':
        method(socketMessage.data.method || '')
        break
      case 'data':
        ChatMessageListRef.value?.add({
          ...socketMessage.data
        })
        break
    }
  }, 'chat-message')
})
</script>
