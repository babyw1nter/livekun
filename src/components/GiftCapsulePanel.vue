<template>
  <ul class="gift-capsule-panel clearfix">
    <GiftCapsule
      v-for="item in giftCapsuleListItem"
      :key="item.uid"
      :type="`level-${getLevel(item.money, level)}`"
      :avatar-url="item.avatarUrl"
      :money="item.money"
      :percentage="item.percentage"
    >
    </GiftCapsule>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, nextTick } from 'vue'
import GiftCapsule from '@/components/AtomicComponents/GiftCapsule.vue'
import { getLevel } from '@/api/common'

interface IGiftCapsulegiftCapsuleListItem {
  avatarUrl: string
  nickname?: string
  uid: number | string
  money: number
  message?: string
  duration: number
  [propName: string]: unknown
}

interface IGiftCapsulegiftCapsuleListItemCache extends IGiftCapsulegiftCapsuleListItem {
  timing: number
  percentage: number
}

interface TimerCache {
  uid: number | string
  timer: number
}

export default defineComponent({
  name: 'GiftCapsulePanel',
  components: {
    GiftCapsule
  },
  props: {
    maximum: {
      type: Number,
      default: 5
    },
    level: {
      type: Array as PropType<number[]>,
      default: () => [1, 200, 500]
    },
    duration: {
      type: Array as PropType<number[]>,
      default: () => [5, 15, 30]
    }
  },
  setup(props) {
    const giftCapsuleListItem = ref<IGiftCapsulegiftCapsuleListItemCache[]>([])
    const timerCache: TimerCache[] = []

    const add = (item: IGiftCapsulegiftCapsuleListItem) => {
      if (!item.uid) return

      const index = giftCapsuleListItem.value.findIndex(i => i.uid === item.uid)
      item.duration = props.duration[getLevel(item.money, props.level)] * 60 * 1000

      // 已存在则累计金额并刷新持续时间
      if (index > -1) {
        giftCapsuleListItem.value[index].money += item.money
        giftCapsuleListItem.value[index].duration =
          props.duration[getLevel(giftCapsuleListItem.value[index].money, props.level)] * 60 * 1000
        giftCapsuleListItem.value[index].timing =
          props.duration[getLevel(giftCapsuleListItem.value[index].money, props.level)] * 60 * 1000
        return
      }

      // 超过最大常驻礼物胶囊数量，删除末尾金额低的礼物胶囊
      if (giftCapsuleListItem.value.length >= props.maximum) {
        const lastItem = giftCapsuleListItem.value[giftCapsuleListItem.value.length - 1]
        if (lastItem.money < item.money) {
          del(lastItem.uid)
        } else {
          return
        }
      }

      giftCapsuleListItem.value.push({
        ...item,
        percentage: 100.0,
        timing: props.duration[getLevel(item.money, props.level)] * 60 * 1000
      })

      const timer = {
        uid: item.uid,
        timer: window.setInterval(() => {
          const index = giftCapsuleListItem.value.findIndex(i => i.uid === item.uid)
          if (index > -1) {
            if (giftCapsuleListItem.value[index].timing <= 0) {
              const timerCacheIndex = timerCache.findIndex(i => i.uid === item.uid)
              if (timerCache[timerCacheIndex]) {
                clearInterval(timerCache[timerCacheIndex].timer)
                timerCache.splice(timerCacheIndex, 1)
              }

              nextTick(() => {
                giftCapsuleListItem.value.splice(index, 1)
              })

              return
            }

            giftCapsuleListItem.value[index].timing -= 100
            giftCapsuleListItem.value[index].percentage = Number(
              ((giftCapsuleListItem.value[index].timing / giftCapsuleListItem.value[index].duration) * 100).toFixed(1)
            )
          }
        }, 100)
      }

      timerCache.push(timer)
    }

    const del = (uid: number | string) => {
      const index = giftCapsuleListItem.value.findIndex(i => i.uid === uid)
      const timerCacheIndex = timerCache.findIndex(i => i.uid === uid)
      if (index > -1) {
        giftCapsuleListItem.value.splice(index, 1)
      }
      if (timerCacheIndex > -1) {
        clearInterval(timerCache[timerCacheIndex].timer)
        timerCache.splice(timerCacheIndex, 1)
      }
    }

    watch(giftCapsuleListItem.value, () => giftCapsuleListItem.value.sort((a, b) => b.money - a.money), { deep: true })

    return { giftCapsuleListItem, getLevel, add, del }
  }
})
</script>

<style lang="less">
.gift-capsule-panel {
  min-height: 55px;
  padding: 10px;
  list-style: none;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
