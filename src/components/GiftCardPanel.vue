<template>
  <ul class="gift-card-panel clearfix" style="padding: 0">
    <GiftCard
      v-for="(item, index) in list"
      :key="index"
      :type="item.type"
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

interface IListItem {
  type: string
  avatarUrl: string
  money: number
  nickname: string
  message?: string
  uid: number
  [propName: string]: unknown
}

export default defineComponent({
  name: 'GiftCardPanel',
  components: {
    GiftCard
  },
  props: {
    list: {
      type: Array as PropType<IListItem[]>
    }
  },
  setup(props) {
    const giftCardCache = ref<IListItem[]>([])

    const add = (item: IListItem) => {
      giftCardCache.value.push(item)
    }

    return { giftCardCache, add }
  }
})
</script>

<style lang="less">
.gift-card-panel {
  overflow-y: auto;
  scroll-behavior: smooth;
  list-style: none;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
