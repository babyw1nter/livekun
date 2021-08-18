<template>
  <ul class="gift-capsule-panel clearfix">
    <GiftCapsule
      v-for="item in listItem"
      :key="item.uid"
      :type="`level-${getLevel(item.money)}`"
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

interface IListItem {
  avatarUrl: string
  money: number
  nickname?: string
  message?: string
  uid: number
  duration: number
  [propName: string]: unknown
}

interface IListItemCache extends IListItem {
  timing: number
  percentage: number
}

interface TimerCache {
  uid: number
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
    const listItem = ref<IListItemCache[]>([])
    const timerCache: TimerCache[] = []

    const add = (item: IListItem) => {
      const index = listItem.value.findIndex(i => i.uid === item.uid)
      item.duration = props.duration[getLevel(item.money)]

      // 已存在则累计金额并刷新持续时间
      if (index > -1) {
        listItem.value[index].money += item.money
        listItem.value[index].duration = props.duration[getLevel(listItem.value[index].money)] * 60 * 1000
        listItem.value[index].timing = props.duration[getLevel(listItem.value[index].money)] * 60 * 1000
        return
      }

      if (listItem.value.length >= props.maximum) {
        const lastItem = listItem.value[listItem.value.length - 1]
        if (lastItem.money < item.money) {
          del(lastItem.uid)
        } else {
          return
        }
      }

      listItem.value.push({
        ...item,
        percentage: 100.0,
        timing: props.duration[getLevel(item.money)] * 60 * 1000
      })

      const timer = {
        uid: item.uid,
        timer: window.setInterval(() => {
          const index = listItem.value.findIndex(i => i.uid === item.uid)
          if (index > -1) {
            if (listItem.value[index].timing <= 0) {
              const timerCacheIndex = timerCache.findIndex(i => i.uid === item.uid)
              if (timerCache[timerCacheIndex]) {
                clearInterval(timerCache[timerCacheIndex].timer)
                timerCache.splice(timerCacheIndex, 1)
              }

              nextTick(() => {
                listItem.value.splice(index, 1)
              })

              return
            }
            listItem.value[index].timing -= 100
            listItem.value[index].percentage = (listItem.value[index].timing / listItem.value[index].duration) * 100
          }
        }, 100)
      }

      timerCache.push(timer)
    }

    const del = (uid: number) => {
      const index = listItem.value.findIndex(i => i.uid === uid)
      const timerCacheIndex = timerCache.findIndex(i => i.uid === uid)
      if (index > -1) {
        listItem.value.splice(index, 1)
      }
      if (timerCacheIndex > -1) {
        clearInterval(timerCache[timerCacheIndex].timer)
        timerCache.splice(timerCacheIndex, 1)
      }
    }

    watch(
      listItem.value,
      () => {
        listItem.value.sort((a, b) => b.money - a.money)
      },
      { deep: true }
    )

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

    return { listItem, getLevel, add, del }
  }
})
</script>

<style lang="less">
.gift-capsule-panel {
  min-height: 51px;
  padding: 10px;
  list-style: none;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
