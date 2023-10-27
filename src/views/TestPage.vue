<template>
  <div class="test-page">
    <TicketPanel
      ref="TicketPanelRef"
      :maximum="5"
      style="margin-bottom: 1rem"></TicketPanel>

    <ChatMessageList
      ref="ChatMessageListRef"
      style="margin-bottom: 1rem; width: 400px; height: 400px">
    </ChatMessageList>

    <PaidPanel ref="PaidPanelRef" style="width: 300px; height: 340px">
    </PaidPanel>

    <div
      class="badge-test"
      style="margin: 1rem; padding: 1rem; line-height: 19px">
      <a-space direction="vertical">
        <a-space>
          <a-typography-text>特殊身份：</a-typography-text>
          <HBadge color="#ff4545">主播</HBadge>
          <HBadge color="#17A6FF">房管</HBadge>
          <HBadge :level="40" :guard="1"> 月守牌 </HBadge>
          <HBadge :level="69" :guard="2"> 年守牌 </HBadge>
          <HBadge :level="88" expired> 已过期 </HBadge>
        </a-space>

        <a-space>
          <a-typography-text>默认样式：</a-typography-text>
          <HBadge v-for="(item, index) in 10" :key="index" :level="item * 10">
            粉丝牌
          </HBadge>
        </a-space>

        <a-space>
          <a-typography-text>透明背景：</a-typography-text>
          <HBadge
            v-for="(item, index) in 10"
            :key="index"
            :level="item * 10"
            light>
            粉丝牌
          </HBadge>
        </a-space>
      </a-space>
    </div>

    <div class="toolbar clearfix">
      <a-space>
        <a-button type="primary" @click="addTicket"> addTicket </a-button>
        <a-button type="primary" @click="addChatMessage">
          addChatMessage
        </a-button>
        <a-button type="primary" @click="addPaid"> addPaid </a-button>
      </a-space>

      <a-divider />

      <a-space>
        <a-button type="primary" @click="clearTicket"> clearTicket </a-button>
        <a-button type="primary" @click="clearChatMessage">
          clearChatMessage
        </a-button>
        <a-button type="primary" @click="clearPaid"> clearPaid </a-button>
      </a-space>
      <a-divider />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type TicketPanel from '@/plugins/Ticket/components/TicketPanel.vue'
import type ChatMessageList from '@/plugins/ChatMessage/components/ChatMessageList.vue'
import type PaidPanel from '@/plugins/Paid/components/PaidPanel.vue'
import {
  getRandomChatMessage,
  getRandomTicket,
  getRandomPaid
} from '@/api/mock'

const TicketPanelRef = ref<InstanceType<typeof TicketPanel>>()
const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()
const PaidPanelRef = ref<InstanceType<typeof PaidPanel>>()

const addTicket = () => {
  TicketPanelRef.value?.add({
    ...getRandomTicket()
  })
}

const addChatMessage = () => {
  ChatMessageListRef.value?.add({
    ...getRandomChatMessage()
  })
}

const addPaid = () => {
  PaidPanelRef.value?.add({
    ...getRandomPaid()
  })
}

const clearTicket = () => TicketPanelRef.value?.clear()

const clearChatMessage = () => ChatMessageListRef.value?.clear()

const clearPaid = () => PaidPanelRef.value?.clear()
</script>

<style lang="less">
.test-page {
  .toolbar {
    position: absolute;
    top: 5rem;
    right: 1rem;
  }
}
</style>
