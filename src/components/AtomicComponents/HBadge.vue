<template>
  <span class="h-badge no-select">
    <img v-if="Number(level) && guard > 0"
      :src="`https://cc.res.netease.com/webcc/v2/static/images/room/guard/${Number(guard).toString()}_32.png`" height="26"
      class="guard-icon" :style="{
        top: guard === 2 ? '-5px' : '-4px'
      }" title="守护图标" />
    <a-tag :color="computedColor" class="badge-text" :class="badgeTextClass" :style="badgeTextStyle">{{ text }}</a-tag>
    <a-tag v-if="Number(level)" class="badge-level" :class="{ light, expire }"
      :style="{ borderColor: computedColor, color: computedColor }">
      {{ level }}
    </a-tag>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    default: '粉丝团',
    type: String
  },
  level: {
    default: 0,
    type: Number
  },
  color: {
    default: '',
    type: String
  },
  light: {
    default: false,
    type: Boolean
  },
  expire: {
    default: false,
    type: Boolean
  },
  guard: {
    default: Number as PropType<0 | 1 | 2>,
    type: Number
  },
  levelStyle: {
    type: Array as PropType<Array<{ level: number; color: string }>>,
    default: () => [
      { level: 10, color: '#33a22e' },
      { level: 20, color: '#3766ff' },
      { level: 30, color: '#ff51e8' },
      { level: 40, color: '#ca19f2' },
      { level: 50, color: '#ff8103' },
      { level: 60, color: '#ff5000' },
      { level: 70, color: '#ff5000' },
      { level: 80, color: '#ff4545' },
      { level: 90, color: '#ff4545' },
      { level: 100, color: '#ff4545' }
    ]
  }
})

const getLevelStyle = (level: number, levelStyleArray: Array<{ level: number; color: string }>) => {
  for (let i = 0; i < levelStyleArray.length; i++) {
    if (level >= levelStyleArray[levelStyleArray.length - 1].level)
      return levelStyleArray[levelStyleArray.length - 1]
    if (level < levelStyleArray[i].level) return i <= 0 ? levelStyleArray[0] : levelStyleArray[i - 1]
  }
  return levelStyleArray[0]
}

const autoColor = computed(() => !props.expire ? getLevelStyle(props.level, props.levelStyle).color : '#b9b9b9')
const computedColor = computed(() => props.color || (Number(props.level) ? autoColor.value : props.color))

const badgeTextClass = reactive({
  'no-level': !Number(props.level),
  light: props.light,
  guard: props.guard > 0
})
const badgeTextStyle = reactive({
  color: props.light ? computedColor.value : null,
  borderColor: props.light ? computedColor.value : null
})
</script>

<style lang="less" scoped>
.h-badge {
  position: relative;
  display: inline-block;
  margin-right: 4px;
  line-height: 19px;

  &:last-child {
    margin-right: 0;
  }

  .guard-icon {
    position: absolute;
    top: -4px;
    left: -1px;
  }

  .ant-tag {
    text-shadow: 0 0 transparent;
    line-height: 16px;
    font-size: 14px;
    margin-top: 0px;
    vertical-align: bottom;
    border-width: 1px;
    box-sizing: border-box;
    margin-right: 0px;
    border-radius: 4px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol, 'Noto Color Emoji';

    &.light {
      background-color: transparent !important;
    }

    &.guard {
      margin-left: 16px;
      padding-left: 12px;
    }
  }

  .badge-text {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-width: 1px;
    padding: 0 4px;

    &.no-level {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      padding: 0 2px;
    }
  }

  .badge-level {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 0;
    margin-left: 0;
    border-left: 0;
    background-color: #fff;
    padding: 0 3px;
    font-weight: 600;
  }
}
</style>
