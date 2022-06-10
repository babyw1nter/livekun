<template>
  <ul ref="ChatMessageListRef" class="chat-message-list clearfix" :class="{ 'smooth-scroll': !isTooQuickly }">
    <template v-for="(item, index) in chatMessageListItemCache" :key="index">
      <ChatMessage
        v-if="item.messageType === 'chat'"
        :avatar-url="item.avatarUrl"
        :nickname="item.nickname"
        :message="item.message"
        :admin="item.admin"
        :guard="item.guard"
        :badgeInfo="item.badgeInfo"
        :custom-style="item.customStyle"
        :font-size="fontSize"
        :type="item.type"
      >
      </ChatMessage>
      <GiftCard
        v-if="item.messageType === 'gift'"
        :type="item.type || `level-${getLevel(item?.money || 0, level)}`"
        :avatar-url="item.avatarUrl"
        :nickname="item.nickname"
        :money="item.money"
        :gift-name="item.giftName"
        :gift-count="item.giftCount"
        :gift-image="item.giftImage"
        :gift-icon="item.giftIcon"
        :message="item.message"
        :comment="item.comment"
        class="chat-list-gift"
      >
      </GiftCard>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, nextTick } from 'vue'
import ChatMessage from '@/components/AtomicComponents/ChatMessage.vue'
import GiftCard from '@/components/AtomicComponents/GiftCard.vue'
import { getLevel } from '@/api/common'

interface IChatMessageListItem {
  avatarUrl: string
  nickname: string
  uid: number | string
  message: string
  messageType: 'chat' | 'gift' | string
  type?: 'normal' | 'admin' | 'anchor' | 'guard-monthly' | 'guard-annual' | string
  admin?: boolean
  guard?: number
  badgeInfo?: {
    badgename: string
    level: number
  }
  money?: number
  giftName?: string
  giftCount?: number
  giftImage?: string
  giftIcon?: string
  comment?: string
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
    ChatMessage,
    GiftCard
  },
  props: {
    list: {
      type: Array as PropType<IChatMessageListItem[]>
    },
    level: {
      type: Array as PropType<number[]>,
      default: () => [1, 200, 500]
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
      if (!chatMessageItem.nickname || !chatMessageItem.message) return

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

    return { ChatMessageListRef, chatMessageListItemCache, isTooQuickly, add, del, clear, getLevel }
  }
})
</script>

<style lang="less" scoped>
.chat-message-list {
  overflow-y: auto;
  list-style: none;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 100%;

  &.smooth-scroll {
    scroll-behavior: smooth;
  }

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  .chat-list-gift {
    margin-top: 10px;
  }
}
</style>
