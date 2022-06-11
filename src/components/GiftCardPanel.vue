<template>
  <ul class="gift-card-panel clearfix" ref="GiftCardPanelRef">
    <TransitionGroup name="fade">
      <GiftCard
        v-for="(item, index) in giftCardListItemCache"
        :key="index"
        :type="item.type || `level-${getLevel(item.money, level)}`"
        :avatar-url="item.avatarUrl"
        :nickname="item.nickname"
        :money="item.money"
        :gift-name="item.giftName"
        :gift-count="item.giftCount"
        :gift-image="item.giftImage"
        :gift-icon="item.giftIcon"
        :message="item.message"
        :comment="item.comment"
      >
      </GiftCard>
    </TransitionGroup>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, nextTick } from 'vue'
import GiftCard from '@/components/AtomicComponents/GiftCard.vue'
import { getLevel } from '@/api/common'

interface IGiftCardListItem {
  avatarUrl: string
  nickname: string
  uid: number | string
  type?: string
  money: number
  message?: string
  comment?: string
  giftName?: string
  giftCount?: number
  giftImage?: string
  giftIcon?: string
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
      default: () => [0, 49, 99]
    },
    maximum: {
      type: Number,
      default: 150
    }
  },
  setup(props) {
    const giftCardListItemCache = ref<IGiftCardListItem[]>([])
    const GiftCardPanelRef = ref<HTMLElement>()

    watch(giftCardListItemCache.value, () => {
      if (giftCardListItemCache.value.length >= props.maximum) {
        giftCardListItemCache.value.splice(0, giftCardListItemCache.value.length - 50)
      }

      nextTick(() => {
        if (GiftCardPanelRef.value) {
          GiftCardPanelRef.value.scrollTop = GiftCardPanelRef.value.scrollHeight
        }
      })
    })

    const add = (item: IGiftCardListItem) => {
      if (!item.uid) return

      giftCardListItemCache.value.push(item)
    }

    const del = () => {
      //
    }

    const clear = () => {
      giftCardListItemCache.value.splice(0, giftCardListItemCache.value.length)
    }

    return { GiftCardPanelRef, giftCardListItemCache, add, del, clear, getLevel }
  }
})
</script>

<style lang="less" scoped>
.gift-card-panel {
  overflow-y: auto;
  scroll-behavior: smooth;
  list-style: none;
  padding: 10px;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
