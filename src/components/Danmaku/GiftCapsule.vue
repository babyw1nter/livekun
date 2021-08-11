<template>
  <div class="gift-capsule no-select" :class="type">
    <a-avatar class="capsule-avatar" :src="avatarUrl" size="small"> </a-avatar>
    <span class="money">CNY￥{{ moneyText }}</span>
  </div>
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
    }
  },
  setup(props) {
    const cardType = ref<string>(props.type)
    const moneyText = computed(() => props.money.toFixed(2).toString())

    return {
      cardType,
      moneyText
    }
  }
})
</script>

<style lang="less">
.gift-capsule {
  height: 31px;
  // width: 120px;
  padding: 4px;
  border-radius: 40px;

  span.money {
    margin-left: 4px;
    margin-bottom: 0;
    margin-right: 4px;
    font-family: 'Arial Black', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    font-weight: bold;
    font-size: 1rem;
    line-height: 1rem;
    color: #fff;
    text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
    vertical-align: text-bottom;
  }

  &.level-0 {
    background: #32e8b7;
  }

  &.level-1 {
    background: #25d5fd;
  }

  &.level-2 {
    background: #f74170;
  }

  &.level-3 {
    background: #9480b9;
  }

  &.level-4 {
    background: #ffbc6a;
  }

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
