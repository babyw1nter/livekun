<template>
  <ul ref="ChatMessageListRef" class="chat-message-list clearfix" :class="{ 'smooth-scroll': !isFast }">
    <ChatMessage
      v-for="(item, index) in chatMessageCache"
      :key="index"
      :avatar-url="item.avatarUrl"
      :nickname="item.nickname"
      :message="item.message"
      :custom-style="item.customStyle"
      :font-size="fontSize"
      :type="item.type"
    >
    </ChatMessage>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, nextTick } from 'vue'
import ChatMessage from '@/components/AtomicComponents/ChatMessage.vue'

interface IChatMessageItem {
  avatarUrl: string
  nickname: string
  uid: number | string
  type?: 'normal' | 'admin' | 'anchor' | 'guard-monthly' | 'guard-annual' | string
  message: string
  customStyle?: {
    nicknameColor?: string
    messageColor?: string
    fontSize?: number
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
    maximum: {
      type: Number,
      default: 150
    },
    smoothScrollInterval: {
      type: Number,
      default: 250
    },
    fontSize: {
      type: Number,
      default: 16
    }
  },
  setup(props) {
    const ChatMessageListRef = ref<HTMLElement>()
    const chatMessageCache = ref<IChatMessageItem[]>([])

    watch(chatMessageCache.value, () => {
      if (chatMessageCache.value.length >= props.maximum) {
        chatMessageCache.value.splice(0, chatMessageCache.value.length - 50)
      }

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
