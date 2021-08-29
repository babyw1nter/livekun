<template>
  <GiftCapsulePanel
    ref="GiftCapsulePanelRef"
    :maximum="store.state.config.giftCapsule.maximum"
    :level="store.state.config.giftCapsule.level"
    :duration="store.state.config.giftCapsule.duration"
    style="margin-bottom: 1rem;"
  ></GiftCapsulePanel>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import GiftCapsulePanel from '@/components/GiftCapsulePanel.vue'
import { IMessage, ISocketCustomData } from '@/types/socket'
import { createSocket } from '@/api/socket'

export default defineComponent({
  components: {
    GiftCapsulePanel
  },
  setup() {
    const store = useStore(key)
    const GiftCapsulePanelRef = ref<InstanceType<typeof GiftCapsulePanel>>()

    onMounted(() => {
      createSocket((ev, websocket, decodeData) => {
        interface ISocketGiftCapsule extends ISocketCustomData {
          method?: string
          money: number
          giftName: string
          giftCount: number
        }

        const socketMessage = decodeData as IMessage<ISocketGiftCapsule>

        console.info(`[${websocket.protocol}]`, '接收消息', socketMessage)

        const method = (m: string) => {
          switch (m) {
            case 'clear':
              GiftCapsulePanelRef.value?.clear()
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
            GiftCapsulePanelRef.value?.add({
              ...socketMessage.data
            })
            break
        }
      }, 'gift-capsule')
    })

    return { store, GiftCapsulePanelRef }
  }
})
</script>
