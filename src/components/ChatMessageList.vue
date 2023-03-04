<template>
  <ul ref="dom" class="chat-message-list clearfix" :class="{ 'smooth-scroll': !isTooQuickly }">
    <template v-for="item in chatMessageList" :key="item.key">
      <li class="chat-list-message">
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
      </li>
      <li class="chat-list-gift" v-if="item.messageType === 'gift'">
        <GiftCard
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
        >
        </GiftCard>
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import { getLevel } from '@/api/common'

interface ChatMessage {
  key: string
  uid: number | string
  avatarUrl: string
  nickname: string
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
    type: Array as PropType<ChatMessage[]>,
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
const chatMessageList = reactive<ChatMessage[]>([])

watch(chatMessageList, () => {
  nextTick(() => {
    if (dom.value) {
      dom.value.scrollTop = dom.value.scrollHeight
    }
  })
})

const isTooQuickly = ref<boolean>(false)
let interval = 0

const add = (chatMessage: ChatMessage) => {
  if (!chatMessage.nickname || !chatMessage.message) return

  if (chatMessageList.length >= props.maximum) {
    del(chatMessageList[0].key)
  }

  const nowTimestamp = new Date().getTime()
  isTooQuickly.value = nowTimestamp - interval < props.smoothScrollInterval
  interval = nowTimestamp

  chatMessageList.push(chatMessage)
}

const del = (key: string) => {
  const index = chatMessageList.findIndex(i => i.key === key)
    if (index > -1) {
    chatMessageList.splice(index, 1)
  }
}

const clear = () => {
  chatMessageList.splice(0, chatMessageList.length)
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

  li.chat-list-message {
    list-style: none;
  }

  li.chat-list-gift {
    margin: 8px 1rem;
  }
}
</style>