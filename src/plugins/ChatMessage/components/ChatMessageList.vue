<template>
  <div class="chat-message-panel" :class="{ 'show-ticket-panel': chatMessageConfig.type.ticket }">
    <TicketPanel ref="TicketPanelRef" :maximum="ticketConfig.maximum" :level="ticketConfig.level"
      :duration="ticketConfig.duration" class="chat-message-ticket-panel mb-0" />

    <ul ref="dom" class="chat-message-list clearfix mb-0" :class="{ 'smooth-scroll': !isTooQuickly }">
      <template v-for="item in chatMessageList" :key="item.key">
        <!-- 聊天消息 start -->
        <li class="chat-list-message" v-if="item.messageType === 'chat'">
          <ChatMessage :avatar-url="item.avatarUrl" :nickname="item.nickname" :message="item.message" :rule="item.rule"
            :guard="item.guard" :badgeInfo="item.badgeInfo" :custom-style="chatMessageConfig.customStyle"
            :type="item.type">
          </ChatMessage>
        </li>
        <!-- 聊天消息 end -->

        <!-- paid start -->
        <li class="chat-list-gift" v-if="item.messageType === 'gift' && chatMessageConfig.type.paid">
          <Paid :type="item.type || `level-${getLevel(item?.money || 0, paidConfig.level)}`" :avatar-url="item.avatarUrl"
            :nickname="item.nickname" :money="item.money" :gift-name="item.giftName" :gift-count="item.giftCount"
            :gift-image="item.giftImage" :gift-icon="item.giftIcon" :message="item.message" :comment="item.comment">
          </Paid>
        </li>
        <!-- paid end -->
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getLevel } from '@/api/common'
import type TicketPanel from '@/plugins/Ticket/components/TicketPanel.vue'
import { getDefaultPluginsConfig, PluginNames } from '@/api/plugins'
import { PropType } from 'vue'
import { TypePaidPluginConfig } from '../../Paid/config'
import { TypeTicketPluginConfig } from '../../Ticket/config'
import { TypeChatMessagePluginConfig } from '../config'

interface ChatMessage {
  key: string
  uid: number | string
  avatarUrl: string
  nickname: string
  message: string
  messageType: 'chat' | 'gift' | string
  /** @deprecated */
  type?: 'normal' | 'admin' | 'anchor' | 'guard-monthly' | 'guard-annual' | string
  rule?: {
    admin: boolean
    anchor: boolean
  }
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
  [propName: string]: unknown
}

const props = defineProps({
  list: {
    type: Array as PropType<ChatMessage[]>,
    default: () => []
  },
  smoothScrollInterval: {
    type: Number,
    default: 250
  },
  chatMessageConfig: {
    type: Object as PropType<TypeChatMessagePluginConfig>,
    default: () => getDefaultPluginsConfig(PluginNames.PLUGIN_CHAT_MESSAGE)?.pluginConfig
  },
  ticketConfig: {
    type: Object as PropType<TypeTicketPluginConfig>,
    default: () => getDefaultPluginsConfig(PluginNames.PLUGIN_TICKET)?.pluginConfig
  },
  paidConfig: {
    type: Object as PropType<TypePaidPluginConfig>,
    default: () => getDefaultPluginsConfig(PluginNames.PLUGIN_PAID)?.pluginConfig
  },
})

const dom = ref<HTMLElement>()
const chatMessageList = reactive<ChatMessage[]>([])
const TicketPanelRef = ref<InstanceType<typeof TicketPanel>>()

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

  if (chatMessageList.length >= props.chatMessageConfig.maximum) {
    del(chatMessageList[0].key)
  }

  const nowTimestamp = new Date().getTime()
  isTooQuickly.value = nowTimestamp - interval < props.smoothScrollInterval
  interval = nowTimestamp

  chatMessageList.push(chatMessage)

  if (chatMessage.messageType === 'gift') {
    const msg = chatMessage as Required<ChatMessage>
    msg.type = ''
    msg.message = ''
    TicketPanelRef.value?.add({
      ...msg,
    })
  }
}

const del = (key: string) => {
  const index = chatMessageList.findIndex(i => i.key === key)
  if (index > -1) {
    chatMessageList.splice(index, 1)
  }
}

const clear = () => {
  chatMessageList.splice(0, chatMessageList.length)
  TicketPanelRef.value?.clear()
}

defineExpose({
  add,
  del,
  clear
})
</script>

<style lang="less" scoped>
.chat-message-panel {
  background-color: transparent;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 100%;

  .chat-message-ticket-panel {
    display: none;
    padding-left: 0;
    padding-right: 0;
  }

  &.show-ticket-panel {
    .chat-message-ticket-panel {
      display: block;
    }

    .chat-message-list {
      height: calc(100% - 55px);
    }
  }

  .chat-message-list {
    padding-bottom: 10px;
    overflow-y: auto;
    list-style: none;
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
}
</style>