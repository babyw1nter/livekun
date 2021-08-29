<template>
  <ChatMessageList ref="ChatMessageListRef" :font-size="store.state.config.chatMessage.style.fontSize" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import ChatMessageList from '@/components/ChatMessageList.vue'
import { IMessage, ISocketCustomData } from '@/types/socket'
import { createSocket } from '@/api/socket'

export default defineComponent({
  components: {
    ChatMessageList
  },
  setup() {
    const store = useStore(key)
    const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

    onMounted(() => {
      createSocket((ev, websocket, decodeData) => {
        interface ISocketChatMsg extends ISocketCustomData {
          method?: string
          message: string
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

    return { store, ChatMessageListRef }
  }
})
</script>
