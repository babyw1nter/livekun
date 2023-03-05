<template>
  <div class="ticket no-select" :class="type">
    <span class="ticket-bg" :style="{ width: `${percentage.toFixed(1)}%` }"></span>
    <a-avatar class="capsule-avatar" :src="avatarUrl" :size="27"> </a-avatar>
    <span class="money">
      <h-font :text="message || `¥${moneyText}`"></h-font>
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    default: 'level-0',
    type: String
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  money: {
    type: Number,
    default: 0
  },
  message: {
    type: String,
    default: ''
  },
  percentage: {
    type: Number,
    default: 100
  }
})

const cardType = ref<string>(props.type)

const moneyText = computed(() => (Math.round(props.money * 100) / 100).toString())
const bgWidth = ref<number>(0)
</script>

<style lang="less" scoped>
.ticket {
  position: relative;
  display: block;
  width: 100%;
  min-width: 35px;
  height: 35px;
  padding: 4px;
  border-radius: 40px;
  float: left;
  overflow: hidden;
  transition: width 0.2s;

  .ticket-bg {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    transition: background 0.2s;
    z-index: 0;
    display: inline-block;
  }

  .money {
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

    background: #1565c0;


    .ticket-bg {
      display: none;
    }
  }

  &.level-1 {

    background: #00b8d4;


    .ticket-bg {
      background: #00e5ff;
    }
  }

  &.level-2 {

    background: #00bfa5;


    .ticket-bg {
      background: #1de9b6;
    }
  }

  &.level-3 {

    background: #ffb300;


    .ticket-bg {
      background: #ffca28;
    }
  }

  &.level-4 {

    background: #e65100;


    .ticket-bg {
      background: #f57c00;
    }
  }

  &.level-5 {

    background: #d43667;


    .ticket-bg {
      background: #f74170;
    }
  }

  &.level-6 {

    background: #ca000e;


    .ticket-bg {
      background: #e01f20;
    }
  }

  &.guard-monthly {
    background: #573594;

    .ticket-bg {
      background: #9480b9;
    }
  }

  &.guard-annual {
    background: #ff9800;

    .ticket-bg {
      background: #ffbc6a;
    }
  }

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
  0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
