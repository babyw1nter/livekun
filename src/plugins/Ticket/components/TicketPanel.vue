<template>
  <TransitionGroup
    name="list"
    tag="ul"
    class="ticket-panel clearfix">
    <li
      v-for="ticket in ticketsList"
      :key="ticket.key">
      <a-dropdown>
        <Ticket
          :type="ticket.type || `level-${getLevel(ticket.money, level)}`"
          :avatar-url="ticket.avatarUrl"
          :money="ticket.money"
          :message="ticket.message"
          :percentage="ticket.percentage">
        </Ticket>

        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a
                href="javascript:;"
                @click="del(ticket.key)">
                移除
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </li>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import { getLevel, getRandomUUID, sleep } from '@/api/common'

interface Ticket {
  key: string
  uid: number | string
  avatarUrl: string
  nickname?: string
  money: number
  type?: string
  message?: string
  duration?: number
  [propName: string]: unknown
}

interface TicketsList extends Ticket {
  _customDuration: number
  duration: number
  timing: number
  percentage: number
}

interface Timer {
  key: string
  timer: number
}

const props = defineProps({
  maximum: {
    type: Number,
    default: 100
  },
  level: {
    type: Array as PropType<number[]>,
    default: () => [0, 9, 49, 99, 199, 249, 499]
  },
  duration: {
    type: Array as PropType<number[]>,
    default: () => [1, 5, 10, 15, 30, 45, 60]
  }
})

const ticketsList = reactive<TicketsList[]>([])
const timerCache: Timer[] = []

const add = async (ticket: Ticket) => {
  // 当超过最大数量时，删除末尾的 ticket
  if (ticketsList.length >= props.maximum) del(ticketsList[ticketsList.length - 1].key)

  // 通过指令添加的 ticket 如果没有 duration 属性，则默认给予一个 duration 初始值
  // 这个 duration 初始值是由即将添加的 ticket 自动计算金额等级得出的
  const ticketDefaultDuration = props.duration[getLevel(ticket.money, props.level)] * 60 * 1000

  // 添加 ticket 进缓存数组
  ticketsList.unshift({
    ...ticket,
    _customDuration: ticket.duration || 0,
    duration: ticket.duration || ticketDefaultDuration,
    timing: ticket.duration || ticketDefaultDuration,
    percentage: 100.0
  })

  const timer: Timer = {
    key: ticket.key,
    timer: window.setInterval(() => {
      const index = ticketsList.findIndex((i) => i.key === ticket.key)

      if (index > -1) {
        if (ticketsList[index].timing <= 0) {
          const timerCacheIndex = timerCache.findIndex((i) => i.key === ticket.key)
          if (timerCache[timerCacheIndex]) {
            clearInterval(timerCache[timerCacheIndex].timer)
            timerCache.splice(timerCacheIndex, 1)
          }

          nextTick(() => {
            ticketsList.splice(index, 1)
          })

          return
        }

        ticketsList[index].timing -= 100
        ticketsList[index].percentage = Number(
          ((ticketsList[index].timing / ticketsList[index].duration) * 100).toFixed(1)
        )
      }
    }, 100)
  }

  timerCache.push(timer)
}

const del = (key: string) => {
  const index = ticketsList.findIndex((i) => i.key === key)
  const timerCacheIndex = timerCache.findIndex((i) => i.key === key)
  if (index > -1) {
    ticketsList.splice(index, 1)
  }
  if (timerCacheIndex > -1) {
    clearInterval(timerCache[timerCacheIndex].timer)
    timerCache.splice(timerCacheIndex, 1)
  }
}

const clear = () => {
  timerCache.forEach((ticket) => window.clearInterval(ticket.timer))
  timerCache.splice(0, timerCache.length)
  ticketsList.splice(0, ticketsList.length)
}

defineExpose({
  add,
  del,
  clear
})
</script>

<style lang="less" scoped>
.ticket-panel {
  padding: 10px;
  width: 100%;
  height: 55px;
  list-style: none;
  overflow: hidden;
  white-space: nowrap;

  li {
    margin-right: 10px;
    display: inline-block;
  }

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from {
  opacity: 0;
}

.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
