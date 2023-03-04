<template>
  <GiftCardPanel ref="GiftCardPanelRef" :level="store.state.config.giftCard.level" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import type GiftCardPanel from '@/components/GiftCardPanel.vue'
import type { IMessage, ISocketCustomData } from '@/types/socket'
import { createSocket } from '@/api/socket'

const store = useStore(key)
const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()

onMounted(() => {
  createSocket((ev, websocket, decodeData) => {
    interface ISocketGiftCard extends ISocketCustomData {
      method?: string
      money: number
      giftName: string
      giftCount: number
      giftImage: string
      message: string
      comment: string
    }

    const socketMessage = decodeData as IMessage<ISocketGiftCard>

    

    const method = (m: string) => {
      switch (m) {
        case 'clear':
          GiftCardPanelRef.value?.clear()
          break
        case 'refresh':
          // 刷新页面
          break
        case 'get-config':
          store.dispatch('getRemoteConfig')
          break
      }
    }

    switch (socketMessage.type) {
      case 'method':
        method(socketMessage.data.method || '')
        break
      case 'data':
        GiftCardPanelRef.value?.add({
          ...socketMessage.data
        })
        break
    }
  }, 'gift-card')
})
</script>
