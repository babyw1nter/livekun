<template>
  <ul ref="ChatMessageListRef" class="chat-message-list clearfix" :class="{ 'smooth-scroll': !isFast }">
    <ChatMessage
      v-for="(item, index) in chatMessageCache"
      :key="index"
      :avatar-url="item.avatarUrl"
      :nickname="item.nickname"
      :message="item.message"
      :custom-style="item.customStyle"
    >
    </ChatMessage>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, nextTick } from 'vue'
import ChatMessage from '@/components/AtomicComponents/ChatMessage.vue'

interface IChatMessageItem {
  type: number
  avatarUrl: string
  nickname: string
  message: string
  uid: number
  customStyle?: {
    nicknameColor?: string
    messageColor?: string
  }
  [propName: string]: unknown
}

export default defineComponent({
  name: 'ChatMessageList',
  components: {
    ChatMessage
  },
  props: {
    list: {
      type: Array as PropType<IChatMessageItem[]>
    },
    smoothScrollInterval: {
      type: Number,
      default: 250
    }
  },
  setup(props) {
    const ChatMessageListRef = ref<HTMLElement>()
    const chatMessageCache = ref<IChatMessageItem[]>([])

    watch(chatMessageCache.value, () => {
      nextTick(() => {
        if (ChatMessageListRef.value) {
          ChatMessageListRef.value.scrollTop = ChatMessageListRef.value.scrollHeight
        }
      })
    })

    const isFast = ref<boolean>(false)
    let interval = 0

    const add = (chatMessageItem: IChatMessageItem) => {
      const nowTimestamp = new Date().getTime()
      isFast.value = nowTimestamp - interval < props.smoothScrollInterval
      interval = nowTimestamp

      chatMessageCache.value.push(chatMessageItem)
    }

    return { chatMessageCache, ChatMessageListRef, isFast, add }
  }
})
</script>

<style lang="less">
.chat-message-list {
  overflow-y: auto;
  list-style: none;
  padding-left: 10px;
  padding-right: 10px;

  &.smooth-scroll {
    scroll-behavior: smooth;
  }

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
