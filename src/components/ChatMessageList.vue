<template>
  <ul ref="dom" class="chat-message-list clearfix" :class="{ 'smooth-scroll': !isTooQuickly }">
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
        :type="item.type || `level-${getLevel(item?.money || 0, store.state.config.giftCard.level)}`"
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

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
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

const props = defineProps({
  list: {
    type: Array as PropType<IChatMessageListItem[]>,
    default: () => []
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
})

const store = useStore(key)

const dom = ref<HTMLElement>()
const chatMessageListItemCache = reactive<IChatMessageListItem[]>([])

watch(chatMessageListItemCache, () => {
  if (chatMessageListItemCache.length >= props.maximum) {
    chatMessageListItemCache.splice(0, chatMessageListItemCache.length - 50)
  }

  nextTick(() => {
    if (dom.value) {
      dom.value.scrollTop = dom.value.scrollHeight
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

  chatMessageListItemCache.push(chatMessageItem)
}

const del = () => {
  //
}

const clear = () => {
  chatMessageListItemCache.splice(0, chatMessageListItemCache.length)
}

defineExpose({
  add,
  del,
  clear
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
    margin: 8px 1rem;
  }
}
</style>