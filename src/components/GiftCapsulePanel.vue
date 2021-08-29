<template>
  <ul class="gift-capsule-panel clearfix">
    <TransitionGroup name="fade">
      <GiftCapsule
        v-for="item in giftCapsuleListItemCache"
        :key="item.uid"
        :type="item.type || `level-${getLevel(item.money, level)}`"
        :avatar-url="item.avatarUrl"
        :money="item.money"
        :message="item.message"
        :percentage="item.percentage"
      >
      </GiftCapsule>
    </TransitionGroup>
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
  type?: string
  message?: string
  duration?: number
  [propName: string]: unknown
}

interface IGiftCapsulegiftCapsuleListItemCache extends IGiftCapsulegiftCapsuleListItem {
  _customDuration: number
  duration: number
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
    const giftCapsuleListItemCache = ref<IGiftCapsulegiftCapsuleListItemCache[]>([])
    const timerCache: TimerCache[] = []

    const add = (item: IGiftCapsulegiftCapsuleListItem) => {
      if (!item.uid) return

      // 查找列表成员，如果已存在则累计金额并刷新持续时间
      const index = giftCapsuleListItemCache.value.findIndex(i => i.uid === item.uid)
      if (index > -1) {
        giftCapsuleListItemCache.value[index].money += item.money
        const giftCapsuleListItemCacheDuration =
          giftCapsuleListItemCache.value[index]._customDuration ||
          props.duration[getLevel(giftCapsuleListItemCache.value[index].money, props.level)] * 60 * 1000
        giftCapsuleListItemCache.value[index].duration = giftCapsuleListItemCacheDuration
        giftCapsuleListItemCache.value[index].timing = giftCapsuleListItemCacheDuration
        return
      }

      // 超过最大常驻礼物胶囊数量，且末尾的礼物胶囊的金额低于即将添加的礼物胶囊的金额，则删除末尾的礼物胶囊
      // 反之则不作任何操作
      if (giftCapsuleListItemCache.value.length >= props.maximum) {
        const lastItem = giftCapsuleListItemCache.value[giftCapsuleListItemCache.value.length - 1]
        if (lastItem.money < item.money) {
          del(lastItem.uid)
        } else {
          return
        }
      }

      // 通过指令添加的礼物胶囊如果没有 duration 属性，则默认给予一个 duration 初始值
      // 这个 duration 初始值是由即将添加的礼物胶囊自动计算金额等级得出的
      const itemDefaultDuration = props.duration[getLevel(item.money, props.level)] * 60 * 1000

      // 添加礼物胶囊进缓存数组
      giftCapsuleListItemCache.value.push({
        ...item,
        _customDuration: item.duration || 0,
        duration: item.duration || itemDefaultDuration,
        timing: item.duration || itemDefaultDuration,
        percentage: 100.0
      })

      const timer = {
        uid: item.uid,
        timer: window.setInterval(() => {
          const index = giftCapsuleListItemCache.value.findIndex(i => i.uid === item.uid)
          if (index > -1) {
            if (giftCapsuleListItemCache.value[index].timing <= 0) {
              const timerCacheIndex = timerCache.findIndex(i => i.uid === item.uid)
              if (timerCache[timerCacheIndex]) {
                clearInterval(timerCache[timerCacheIndex].timer)
                timerCache.splice(timerCacheIndex, 1)
              }

              nextTick(() => {
                giftCapsuleListItemCache.value.splice(index, 1)
              })

              return
            }

            giftCapsuleListItemCache.value[index].timing -= 100
            giftCapsuleListItemCache.value[index].percentage = Number(
              (
                (giftCapsuleListItemCache.value[index].timing / giftCapsuleListItemCache.value[index].duration) *
                100
              ).toFixed(1)
            )
          }
        }, 100)
      }

      timerCache.push(timer)
    }

    const del = (uid: number | string) => {
      const index = giftCapsuleListItemCache.value.findIndex(i => i.uid === uid)
      const timerCacheIndex = timerCache.findIndex(i => i.uid === uid)
      if (index > -1) {
        giftCapsuleListItemCache.value.splice(index, 1)
      }
      if (timerCacheIndex > -1) {
        clearInterval(timerCache[timerCacheIndex].timer)
        timerCache.splice(timerCacheIndex, 1)
      }
    }

    watch(giftCapsuleListItemCache.value, () => giftCapsuleListItemCache.value.sort((a, b) => b.money - a.money), {
      deep: true
    })

    const clear = () => {
      timerCache.forEach(item => window.clearInterval(item.timer))
      timerCache.splice(0, timerCache.length)
      giftCapsuleListItemCache.value.splice(0, giftCapsuleListItemCache.value.length)
    }

    return { giftCapsuleListItemCache, getLevel, add, del, clear }
  }
})
</script>

<style lang="less" scoped>
.gift-capsule-panel {
  padding: 10px;
  width: 100%;
  min-height: 55px;
  list-style: none;
  overflow-x: hidden;

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
