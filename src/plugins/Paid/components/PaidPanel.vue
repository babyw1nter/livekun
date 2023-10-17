<template>
  <ul
    class="paid-panel clearfix"
    ref="PaidPanelRef">
    <TransitionGroup name="fade">
      <li
        v-for="paid in paidList"
        :key="paid.key">
        <Paid
          :type="paid.type || `level-${getLevel(paid.money, level)}`"
          :avatar-url="paid.avatarUrl"
          :nickname="paid.nickname"
          :money="paid.money"
          :gift-name="paid.giftName"
          :gift-count="paid.giftCount"
          :gift-image="paid.giftImage"
          :gift-icon="paid.giftIcon"
          :message="paid.message"
          :comment="paid.comment">
        </Paid>
      </li>
    </TransitionGroup>
  </ul>
</template>

<script lang="ts" setup>
import { getLevel } from '@/api/common'

interface Paid {
  key: string
  uid: number | string
  avatarUrl: string
  nickname: string
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

const props = defineProps({
  list: {
    type: Array as PropType<Paid[]>,
    default: () => []
  },
  level: {
    type: Array as PropType<number[]>,
    default: () => [0, 9, 49, 99, 199, 249, 499]
  },
  maximum: {
    type: Number,
    default: 150
  }
})

const paidList = reactive<Paid[]>([])
const PaidPanelRef = ref<HTMLElement>()

watch(paidList, () => {
  nextTick(() => {
    if (PaidPanelRef.value) {
      PaidPanelRef.value.scrollTop = PaidPanelRef.value.scrollHeight
    }
  })
})

const add = (paid: Paid) => {
  if (!paid.uid) return

  if (paidList.length >= props.maximum) {
    del(paidList[0].key)
  }

  paidList.push(paid)
}

const del = (key: string) => {
  const index = paidList.findIndex((i) => i.key === key)
  if (index > -1) {
    paidList.splice(index, 1)
  }
}

const clear = () => {
  paidList.splice(0, paidList.length)
}

defineExpose({
  add,
  del,
  clear
})
</script>

<style lang="less" scoped>
.paid-panel {
  overflow-y: auto;
  scroll-behavior: smooth;
  list-style: none;
  padding: 10px;
  width: 100%;
  height: 100%;

  li {
    display: block;
    margin-bottom: 10px;
  }

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
