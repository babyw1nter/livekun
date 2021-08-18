<template>
  <li class="gift-capsule no-select" :class="type">
    <span class="gift-capsule-bg" :style="{ width: `${percentage.toFixed(1)}%` }"></span>
    <a-avatar class="capsule-avatar" :src="avatarUrl" :size="27"> </a-avatar>
    <span class="money h-font">CNY￥{{ moneyText }}</span>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'GiftCapsule',
  props: {
    type: {
      default: 'level-0',
      type: String
    },
    avatarUrl: {
      default: '',
      type: String
    },
    money: {
      default: 0,
      type: Number
    },
    percentage: {
      default: 100,
      type: Number
    }
  },
  setup(props) {
    const cardType = ref<string>(props.type)
    const moneyText = computed(() => props.money.toFixed(2).toString())

    const bgWidth = ref<number>(0)

    return {
      cardType,
      moneyText,
      bgWidth
    }
  }
})
</script>

<style lang="less">
.gift-capsule {
  position: relative;
  display: block;
  height: 35px;
  padding: 4px;
  border-radius: 40px;
  float: left;
  margin-right: 10px;
  overflow: hidden;
  transition: all 0.1s;

  .gift-capsule-bg {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    transition: all 0.1s;
    z-index: 0;
    display: inline-block;
  }

  span.money {
    position: relative;
    margin-left: 4px;
    margin-bottom: 0;
    margin-right: 4px;
    line-height: 27px;
    font-size: 18px;
    color: #fff;
    vertical-align: middle;
    z-index: 1;
  }

  &.level-0 {
    background: #1ebea5;
    .gift-capsule-bg {
      background: #32e8b7;
    }
  }

  &.level-1 {
    background: #1db1db;
    .gift-capsule-bg {
      background: #25d5fd;
    }
  }

  &.level-2 {
    background: #d23968;
    .gift-capsule-bg {
      background: #f74170;
    }
  }

  &.level-3 {
    background: #573594;
    .gift-capsule-bg {
      background: #9480b9;
    }
  }

  &.level-4 {
    background: #ff9800;
    .gift-capsule-bg {
      background: #ffbc6a;
    }
  }

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // box-shadow: 0 2px 4px rgb(0, 0, 0, 50%), 0 0 6px rgb(0, 0, 0, 50%);
}
</style>
