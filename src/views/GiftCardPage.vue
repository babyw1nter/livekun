<template>
  <GiftCardPanel
    ref="GiftCardPanelRef"
    :level="store.state.config.giftCard.level"
    style="width: 100%; height: 100%"
  ></GiftCardPanel>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import GiftCardPanel from '@/components/GiftCardPanel.vue'
import { IMessage, ISocketCustomData } from '@/types/socket'
import { createSocket } from '@/api/socket'

export default defineComponent({
  components: {
    GiftCardPanel
  },
  setup() {
    const store = useStore(key)
    const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()

    onMounted(() => {
      createSocket((ev, websocket) => {
        interface ISocketGiftCard extends ISocketCustomData {
          money: number
          giftName: string
          giftCount: number
          message: string
          comment: string
        }

        const socketMessage = JSON.parse(ev.data) as IMessage<ISocketGiftCard>

        console.info(`[${websocket.protocol}]`, '接收消息', socketMessage)

        switch (socketMessage.type) {
          case 'update-config':
            store.dispatch('getRemoteConfig')
            break
          case 'clear':
            GiftCardPanelRef.value?.clear()
            break
          case 'data':
            GiftCardPanelRef.value?.add({
              ...socketMessage.data
            })
            break
        }
      }, 'gift-card')
    })

    return { store, GiftCardPanelRef }
  }
})
</script>
