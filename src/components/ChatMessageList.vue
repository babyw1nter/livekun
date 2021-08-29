<template>
  <ul ref="ChatMessageListRef" class="chat-message-list clearfix" :class="{ 'smooth-scroll': !isTooQuickly }">
    <ChatMessage
      v-for="(item, index) in chatMessageListItemCache"
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

interface IChatMessageListItem {
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
      type: Array as PropType<IChatMessageListItem[]>
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
    const chatMessageListItemCache = ref<IChatMessageListItem[]>([])

    watch(chatMessageListItemCache.value, () => {
      if (chatMessageListItemCache.value.length >= props.maximum) {
        chatMessageListItemCache.value.splice(0, chatMessageListItemCache.value.length - 50)
      }

      nextTick(() => {
        if (ChatMessageListRef.value) {
          ChatMessageListRef.value.scrollTop = ChatMessageListRef.value.scrollHeight
        }
      })
    })

    const isTooQuickly = ref<boolean>(false)
    let interval = 0

    const add = (chatMessageItem: IChatMessageListItem) => {
      const nowTimestamp = new Date().getTime()
      isTooQuickly.value = nowTimestamp - interval < props.smoothScrollInterval
      interval = nowTimestamp

      chatMessageListItemCache.value.push(chatMessageItem)
    }

    const del = () => {
      //
    }

    const clear = () => {
      chatMessageListItemCache.value.splice(0, chatMessageListItemCache.value.length)
    }

    return { ChatMessageListRef, chatMessageListItemCache, isTooQuickly, add, del, clear }
  }
})
</script>

<style lang="less" scoped>
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
