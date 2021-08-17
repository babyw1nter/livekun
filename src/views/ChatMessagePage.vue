<template>
  <ChatMessageList ref="ChatMessageListRef" style="width: 100%; height: 100%"> </ChatMessageList>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import ChatMessageList from '@/components/ChatMessageList.vue'

export default defineComponent({
  components: {
    ChatMessageList
  },
  setup() {
    const store = useStore(key)
    const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()
    const chatMessageSocket = ref<WebSocket>()

    const createSocket = () => {
      chatMessageSocket.value = new WebSocket('ws://localhost:39073/', 'chat-message')

      chatMessageSocket.value?.addEventListener('open', () => {
        console.info('chatMessageSocket 连接成功!')
      })
      chatMessageSocket.value?.addEventListener('error', () => {
        console.error('chatMessageSocket 连接错误!')
      })
      chatMessageSocket.value?.addEventListener('close', () => {
        console.info('chatMessageSocket 连接关闭!')
      })
      chatMessageSocket.value?.addEventListener('message', ev => {
        interface ISocketChatMsg {
          avatarUrl: string
          nickname: string
          message: string
          uid: number
        }

        const socketChatMsg = JSON.parse(ev.data) as ISocketChatMsg

        console.info('[chat-message]', socketChatMsg)

        ChatMessageListRef.value?.add({
          ...socketChatMsg
        })
      })
    }

    onMounted(() => {
      createSocket()
    })

    return { store, ChatMessageListRef }
  }
})
</script>
