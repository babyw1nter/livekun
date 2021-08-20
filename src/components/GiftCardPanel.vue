<template>
  <ul class="gift-card-panel clearfix" ref="GiftCardPanelRef">
    <GiftCard
      v-for="(item, index) in giftCardCache"
      :key="index"
      :type="item.type || `level-${getLevel(item.money)}`"
      :avatar-url="item.avatarUrl"
      :nickname="item.nickname"
      :money="item.money"
      :message="item.message"
    ></GiftCard>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, nextTick } from 'vue'
import GiftCard from '@/components/AtomicComponents/GiftCard.vue'

interface IGiftCardListItem {
  avatarUrl: string
  nickname: string
  uid: number | string
  type?: string
  money: number
  message?: string
  giftName?: string
  giftCount?: number
  [propName: string]: unknown
}

export default defineComponent({
  name: 'GiftCardPanel',
  components: {
    GiftCard
  },
  props: {
    list: {
      type: Array as PropType<IGiftCardListItem[]>
    },
    level: {
      type: Array as PropType<number[]>,
      default: () => [1, 200, 500]
    },
    maximum: {
      type: Number,
      default: 150
    }
  },
  setup(props) {
    const giftCardCache = ref<IGiftCardListItem[]>([])
    const GiftCardPanelRef = ref<HTMLElement>()

    watch(giftCardCache.value, () => {
      if (giftCardCache.value.length >= props.maximum) {
        giftCardCache.value.splice(0, giftCardCache.value.length - 50)
      }

      nextTick(() => {
        if (GiftCardPanelRef.value) {
          GiftCardPanelRef.value.scrollTop = GiftCardPanelRef.value.scrollHeight
        }
      })
    })

    const add = (item: IGiftCardListItem) => {
      giftCardCache.value.push(item)
    }

    const getLevel = (money: number) => {
      if (money > props.level[0] - 1 && money < props.level[1]) {
        return 0
      } else if (money > props.level[1] - 1 && money < props.level[2]) {
        return 1
      } else if (money > props.level[2] - 1) {
        return 2
      } else {
        return 0
      }
    }

    return { GiftCardPanelRef, giftCardCache, add, getLevel }
  }
})
</script>

<style lang="less">
.gift-card-panel {
  overflow-y: auto;
  scroll-behavior: smooth;
  list-style: none;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
