<template>
  <div class="test-page">
    <TicketPanel ref="TicketPanelRef" :maximum="5" style="margin-bottom: 1rem"></TicketPanel>

    <ChatMessageList ref="ChatMessageListRef" style="margin-bottom: 1rem; width: 400px; height: 400px">
    </ChatMessageList>

    <PaidPanel ref="PaidPanelRef" style="width: 300px; height: 340px"> </PaidPanel>

    <div class="badge-test" style="margin: 1rem; padding: 1rem; line-height: 19px">
      <p style="margin-bottom: 1rem">
        <h-badge text="主播" color="#ff4545"></h-badge>
        <h-badge text="房管" color="#17A6FF"></h-badge>
        <h-badge text="月守牌" :level="40" :guard="1"></h-badge>
        <h-badge text="年守牌" :level="69" :guard="2"></h-badge>
        <h-badge text="已过期" :level="88" expire></h-badge>
      </p>
      <p style="margin-bottom: 1rem">
        <h-badge v-for="(item, index) in 10" :key="index" text="粉丝牌" :level="item * 10"></h-badge>
      </p>
      <p style="margin-bottom: 1rem">
        <h-badge v-for="(item, index) in 10" :key="index" text="粉丝牌" :level="item * 10" light></h-badge>
      </p>
    </div>

    <div class="toolbar clearfix">
      <a-space :size="10" style="">
        <a-button type="primary" @click="addTicket">addTicket</a-button>
        <a-button type="primary" @click="addChatMessage">addChatMessage</a-button>
        <a-button type="primary" @click="addPaid">addPaid</a-button>
      </a-space>
      <a-divider />
      <a-space :size="10">
        <a-button type="primary" @click="clearTicket">clearTicket</a-button>
        <a-button type="primary" @click="clearChatMessage">clearChatMessage</a-button>
        <a-button type="primary" @click="clearPaid">clearPaid</a-button>
      </a-space>
      <a-divider />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type TicketPanel from '@/components/plugins/Ticket/components/TicketPanel.vue'
import type ChatMessageList from '@/components/plugins/ChatMessage/components/ChatMessageList.vue'
import type PaidPanel from '@/components/plugins/Paid/components/PaidPanel.vue'
import { getRandomChatMessage, getRandomTicket, getRandomPaid } from '@/api/mock'

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
