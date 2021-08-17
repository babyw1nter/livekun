<template>
  <GiftCardPanel
    ref="GiftCardPanelRef"
    :level="store.state.config.giftCard.level"
    style="width: 100%; height: 100%"
  ></GiftCardPanel>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import GiftCardPanel from '@/components/GiftCardPanel.vue'

export default defineComponent({
  components: {
    GiftCardPanel
  },
  setup() {
    const store = useStore(key)
    const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()
    const GiftCardPanelSocket = ref<WebSocket>()

    const createSocket = () => {
      GiftCardPanelSocket.value = new WebSocket('ws://localhost:39073/', 'gift-card')

      GiftCardPanelSocket.value?.addEventListener('open', () => {
        console.info('GiftCardPanelSocket 连接成功!')
      })
      GiftCardPanelSocket.value?.addEventListener('error', () => {
        console.error('GiftCardPanelSocket 连接错误!')
      })
      GiftCardPanelSocket.value?.addEventListener('close', () => {
        console.info('GiftCardPanelSocket 连接关闭!')
      })
      GiftCardPanelSocket.value?.addEventListener('message', ev => {
        interface ISocketGiftCard {
          avatarUrl: string
          nickname: string
          uid: number
          money: number
          giftName: string
          giftCount: number
        }

        const socketGiftCard = JSON.parse(ev.data) as ISocketGiftCard

        console.info('[gift-card]', socketGiftCard)

        GiftCardPanelRef.value?.add({
          ...socketGiftCard,
          message: `赠送了${socketGiftCard.giftName} × ${socketGiftCard.giftCount}`
        })
      })
    }

    onMounted(() => {
      createSocket()
    })

    return { store, GiftCardPanelRef }
  }
})
</script>
