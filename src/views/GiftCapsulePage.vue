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
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import GiftCapsulePanel from '@/components/GiftCapsulePanel.vue'

export default defineComponent({
  components: {
    GiftCapsulePanel
  },
  setup() {
    const store = useStore(key)
    const GiftCapsulePanelRef = ref<InstanceType<typeof GiftCapsulePanel>>()
    const giftCapsulePanelSocket = ref<WebSocket>()

    const createSocket = () => {
      giftCapsulePanelSocket.value = new WebSocket('ws://localhost:39073/', 'gift-capsule')

      giftCapsulePanelSocket.value?.addEventListener('open', () => {
        console.info('giftCapsulePanelSocket 连接成功!')
      })
      giftCapsulePanelSocket.value?.addEventListener('error', () => {
        console.error('giftCapsulePanelSocket 连接错误!')
      })
      giftCapsulePanelSocket.value?.addEventListener('close', () => {
        console.info('giftCapsulePanelSocket 连接关闭!')
      })
      giftCapsulePanelSocket.value?.addEventListener('message', ev => {
        interface ISocketGiftCapsule {
          avatarUrl: string
          nickname: string
          uid: number
          money: number
          giftName: string
          giftCount: number
        }

        const socketGiftCapsule: ISocketGiftCapsule = JSON.parse(ev.data)

        console.info('[gift-capsule]', socketGiftCapsule)

        GiftCapsulePanelRef.value?.add({
          ...socketGiftCapsule,
          duration: 1
        })
      })
    }

    onMounted(() => {
      createSocket()
    })

    return { store, GiftCapsulePanelRef }
  }
})
</script>
