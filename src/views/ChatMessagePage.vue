<template>
  <ChatMessageList
    ref="ChatMessageListRef"
    :font-size="store.state.config.chatMessage.style.fontSize"
    style="width: 100%; height: 100%"
  >
  </ChatMessageList>
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

    const createSocket = (cb: (ev: MessageEvent) => void) => {
      console.log('chatMessageSocket 正在创建连接...')
      const websocket = new WebSocket('ws://localhost:39073/', 'chat-message')

      websocket.addEventListener('open', () => {
        console.log('chatMessageSocket 连接成功!')
        store.dispatch('getRemoteConfig')
      })
      websocket.addEventListener('error', () => {
        console.error('chatMessageSocket 连接错误!')
      })
      websocket.addEventListener('close', () => {
        console.warn('chatMessageSocket 连接关闭!')
        console.log('chatMessageSocket 将于 5 秒后尝试重新创建连接...')
        if (websocket.readyState !== WebSocket.OPEN || websocket.readyState !== WebSocket.CONNECTING) {
          window.setTimeout(() => createSocket(cb), 5000)
        }
      })
      websocket.addEventListener('message', ev => cb(ev))
    }

    onMounted(() => {
      createSocket(ev => {
        interface IMessage<T> {
          code: number
          type: string
          data: T
        }

        interface ISocketChatMsg {
          avatarUrl: string
          nickname: string
          message: string
          uid: number
        }

        const socketMessage = JSON.parse(ev.data) as IMessage<ISocketChatMsg>

        console.info('[chat-message]', socketMessage)

        switch (socketMessage.type) {
          case 'update-config':
            store.dispatch('getRemoteConfig')
            break
          case 'data':
            ChatMessageListRef.value?.add({
              ...socketMessage.data
            })
            break
        }
      })
    })

    return { store, ChatMessageListRef }
  }
})
</script>
