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
import { IMessage, ISocketCustomData } from '@/types/socket'

export default defineComponent({
  components: {
    GiftCardPanel
  },
  setup() {
    const store = useStore(key)
    const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()

    const createSocket = (cb: (ev: MessageEvent) => void) => {
      const websocket = new WebSocket('ws://localhost:39073/', 'gift-card')

      websocket.addEventListener('open', () => {
        console.info('GiftCardPanelSocket 连接成功!')
        store.dispatch('getRemoteConfig')
      })
      websocket.addEventListener('error', () => {
        console.error('GiftCardPanelSocket 连接错误!')
      })
      websocket.addEventListener('close', () => {
        console.info('GiftCardPanelSocket 连接关闭!')
        console.log('giftCapsulePanelSocket 将于 5 秒后尝试重新创建连接...')
        if (websocket.readyState !== WebSocket.OPEN || websocket.readyState !== WebSocket.CONNECTING) {
          window.setTimeout(() => createSocket(cb), 5000)
        }
      })
      websocket.addEventListener('message', ev => cb(ev))
    }

    onMounted(() => {
      createSocket(ev => {
        interface ISocketGiftCard extends ISocketCustomData {
          money: number
          giftName: string
          giftCount: number
          message: string
        }

        const socketMessage = JSON.parse(ev.data) as IMessage<ISocketGiftCard>

        console.info('[gift-card]', socketMessage)

        switch (socketMessage.type) {
          case 'update-config':
            store.dispatch('getRemoteConfig')
            break
          case 'data':
            GiftCardPanelRef.value?.add({
              ...socketMessage.data
            })
            break
        }
      })
    })

    return { store, GiftCardPanelRef }
  }
})
</script>
