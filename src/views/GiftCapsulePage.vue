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
      createSocket((ev, websocket) => {
        interface ISocketGiftCapsule extends ISocketCustomData {
          money: number
          giftName: string
          giftCount: number
        }

        const socketMessage = JSON.parse(ev.data) as IMessage<ISocketGiftCapsule>

        console.info(`[${websocket.protocol}]`, '接收消息', socketMessage)

        switch (socketMessage.type) {
          case 'update-config':
            store.dispatch('getRemoteConfig')
            break
          case 'clear':
            GiftCapsulePanelRef.value?.clear()
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
