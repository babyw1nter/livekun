<template>
  <div class="test-page">
    <GiftCapsulePanel ref="GiftCapsulePanelRef" :maximum="5" style="margin-bottom: 1rem"></GiftCapsulePanel>

    <ChatMessageList
      ref="ChatMessageListRef"
      :font-size="chatMessageListFontSize"
      :level="store.state.config.giftCard.level"
      style="margin-bottom: 1rem; width: 400px; height: 400px"
    >
    </ChatMessageList>

    <GiftCardPanel ref="GiftCardPanelRef" style="width: 300px; height: 340px"> </GiftCardPanel>

    <div class="toolbar clearfix">
      <a-space :size="10" style="">
        <a-button type="primary" @click="addGiftCapsule">addGiftCapsule</a-button>
        <a-button type="primary" @click="addChatMessage">addChatMessage</a-button>
        <a-button type="primary" @click="addGiftCard">addGiftCard</a-button>
      </a-space>
      <a-divider />
      <a-space :size="10">
        <a-button type="primary" @click="clearGiftCapsule">clearGiftCapsule</a-button>
        <a-button type="primary" @click="clearChatMessage">clearChatMessage</a-button>
        <a-button type="primary" @click="clearGiftCard">clearGiftCard</a-button>
      </a-space>
      <a-divider />
      <p>ChatMessageList Font Size: {{ chatMessageListFontSize }}px</p>
      <a-slider :min="12" :max="64" v-model:value="chatMessageListFontSize" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import GiftCapsulePanel from '@/components/GiftCapsulePanel.vue'
import ChatMessageList from '@/components/ChatMessageList.vue'
import GiftCardPanel from '@/components/GiftCardPanel.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { getRandomChatMessage, getRandomGiftCapsule, getRandomGiftCard } from '@/api/mock'

export default defineComponent({
  components: { GiftCardPanel, GiftCapsulePanel, ChatMessageList },
  setup() {
    const store = useStore(key)

    const GiftCapsulePanelRef = ref<InstanceType<typeof GiftCapsulePanel>>()
    const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()
    const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()

    const chatMessageListFontSize = ref(18)

    const addGiftCapsule = () => {
      GiftCapsulePanelRef.value?.add({
            ...getRandomGiftCapsule()
          })
    }

    const addChatMessage = () => {
      ChatMessageListRef.value?.add({
            ...getRandomChatMessage()
          })
    }

    const addGiftCard = () => {
      GiftCardPanelRef.value?.add({
            ...getRandomGiftCard()
          })
    }

    const clearGiftCapsule = () => GiftCapsulePanelRef.value?.clear()

    const clearChatMessage = () => ChatMessageListRef.value?.clear()

    const clearGiftCard = () => GiftCardPanelRef.value?.clear()

    return {
      store,
      GiftCapsulePanelRef,
      ChatMessageListRef,
      GiftCardPanelRef,
      addGiftCapsule,
      addChatMessage,
      addGiftCard,
      clearGiftCapsule,
      clearChatMessage,
      clearGiftCard,
      chatMessageListFontSize
    }
  }
})
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
