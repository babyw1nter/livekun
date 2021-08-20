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
import { IMessage, ISocketCustomData } from '@/types/socket'

export default defineComponent({
  components: {
    GiftCapsulePanel
  },
  setup() {
    const store = useStore(key)
    const GiftCapsulePanelRef = ref<InstanceType<typeof GiftCapsulePanel>>()

    const createSocket = (cb: (ev: MessageEvent) => void) => {
      console.log('chatMessageSocket 正在创建连接...')
      const websocket = new WebSocket('ws://localhost:39073/', 'gift-capsule')

      websocket.addEventListener('open', () => {
        console.info('giftCapsulePanelSocket 连接成功!')
        store.dispatch('getRemoteConfig')
      })
      websocket.addEventListener('error', () => {
        console.error('giftCapsulePanelSocket 连接错误!')
      })
      websocket.addEventListener('close', () => {
        console.info('giftCapsulePanelSocket 连接关闭!')
        console.log('giftCapsulePanelSocket 将于 5 秒后尝试重新创建连接...')
        if (websocket.readyState !== WebSocket.OPEN || websocket.readyState !== WebSocket.CONNECTING) {
          window.setTimeout(() => createSocket(cb), 5000)
        }
      })
      websocket.addEventListener('message', ev => cb(ev))
    }

    onMounted(() => {
      createSocket(ev => {
        interface ISocketGiftCapsule extends ISocketCustomData {
          money: number
          giftName: string
          giftCount: number
        }

        const socketMessage = JSON.parse(ev.data) as IMessage<ISocketGiftCapsule>

        console.info('[gift-capsule]', socketMessage)

        switch (socketMessage.type) {
          case 'update-config':
            store.dispatch('getRemoteConfig')
            break
          case 'data':
            GiftCapsulePanelRef.value?.add({
              ...socketMessage.data,
              duration: 1
            })
            break
        }
      })
    })

    return { store, GiftCapsulePanelRef }
  }
})
</script>
