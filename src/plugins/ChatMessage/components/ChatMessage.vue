<template>
  <div class="chat-message">
    <a-avatar
      class="chat-message-avatar no-select"
      :src="avatarUrl"
      :size="(customStyle.fontSize || 18) + 6"></a-avatar>
    <div
      class="text-wrap"
      :style="{
        paddingLeft: `${(customStyle.fontSize || 18) + 13}px`,
        lineHeight: `${(customStyle.fontSize || 18) + 2}px`
      }">
      <!-- TODO: 身份标识这部分样式没设计好，暂时隐藏掉，想好再说 -->
      <!-- 
      <p class="badge-wrap">
        <h-badge v-if="type === 'anchor'" text="主播" color="#ff4545"></h-badge>
        <h-badge v-if="admin" text="房管" color="#17A6FF"></h-badge>
        <h-badge
          v-if="badgeInfo.level > 0 && badgeInfo.level <= 100"
          :text="badgeInfo.badgename"
          :level="badgeInfo.level"
          :guard="guard"
        ></h-badge>

        <img
          v-for="(badge, index) in badgeArray"
          :key="index"
          class="badge-icon"
          :src="badge.icon" 
          :width="badge.w"
          :height="badge.h"
          title="一些小的业务图标"
        />
      </p>
      -->
      <p class="nickname">
        <h-font :color="color.nickname" :font-size="customStyle.fontSize">
          {{ `${nickname}:` }}
        </h-font>

        <i class="yt-icon" v-if="rule.admin" :style="{ color: '#5f84f1' }">
          <svg
            viewBox="0 0 16 16"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            style="
              pointer-events: none;
              display: block;
              width: 100%;
              height: 100%;
            ">
            <g>
              <path
                fill="currentColor"
                d="M9.64589146,7.05569719 C9.83346524,6.562372 9.93617022,6.02722257 9.93617022,5.46808511 C9.93617022,3.00042984 7.93574038,1 5.46808511,1 C4.90894765,1 4.37379823,1.10270499 3.88047304,1.29027875 L6.95744681,4.36725249 L4.36725255,6.95744681 L1.29027875,3.88047305 C1.10270498,4.37379824 1,4.90894766 1,5.46808511 C1,7.93574038 3.00042984,9.93617022 5.46808511,9.93617022 C6.02722256,9.93617022 6.56237198,9.83346524 7.05569716,9.64589147 L12.4098057,15 L15,12.4098057 L9.64589146,7.05569719 Z"></path>
            </g>
          </svg>
        </i>
      </p>

      <span class="message">
        <h-font :color="color.message" :font-size="customStyle.fontSize">{{
          message
        }}</h-font>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TypeChatMessagePluginConfig } from '../config'

const props = defineProps({
  /** @deprecated */
  type: {
    default: 'normal',
    type: String as PropType<
      'normal' | 'admin' | 'anchor' | 'guard-monthly' | 'guard-annual' | string
    >
  },
  avatarUrl: {
    default: '',
    type: String
  },
  nickname: {
    default: '',
    type: String
  },
  message: {
    default: '',
    type: String
  },
  /** 用户特殊身份 */
  rule: {
    default: () => ({
      admin: false,
      anchor: false
    }),
    type: Object as PropType<{
      /** 房管 */
      admin: boolean
      /** 主播 */
      anchor: boolean
    }>
  },
  /** 守护等级 */
  guard: {
    default: Number as PropType<0 | 1 | 2 | 3>,
    type: Number
  },
  /** 钻粉 */
  diamond: {
    default: false,
    type: Boolean
  },
  /** 粉丝徽章 */
  badgeInfo: {
    default: () => {
      return {
        badgename: '粉丝牌',
        level: 0
      }
    },
    type: Object as PropType<{ badgename: string; level: number }>
  },
  /** 自定义样式 */
  customStyle: {
    default: () => ({}),
    type: Object as PropType<TypeChatMessagePluginConfig['customStyle']>
  }
})

interface Badge {
  id: string
  icon: string
  w?: number
  h?: number
}

const badgeArray = ref<Badge[]>([])

const color = computed(() => {
  if (props.rule.anchor) return props.customStyle.color.anchor
  if (props.guard > 0)
    return props.customStyle.color.guard[
      `lv${props.guard}` as 'lv1' | 'lv2' | 'lv3'
    ]
  if (props.rule.admin) return props.customStyle.color.admin
  return props.customStyle.color.normal
})

// badgeArray.value.push({
//   id: 'diamond',
//   icon: 'https://cc.fp.ps.netease.com/file/627dc9169de9f6046a4c5e3eNp41j6jw04',
//   h: 17
// })

// if (props.guard === 1 && !props.badgeInfo.level) {
//   badgeArray.value.push({
//     id: 'guard-monthly',
//     icon: 'https://cc.res.netease.com/webcc/v2/static/images/room/guard/1_18.png',
//     w: 18
//   })
// }

// if (props.guard === 2 && !props.badgeInfo.level) {
//   badgeArray.value.push({
//     id: 'guard-annual',
//     icon: 'https://cc.res.netease.com/webcc/v2/static/images/room/guard/2_18.png',
//     w: 18
//   })
// }
</script>

<style lang="less" scoped>
.chat-message {
  display: block;
  padding: 4px 0;
  position: relative;

  &:first-child {
    margin-top: 4px;
  }

  span.chat-message-avatar {
    position: absolute;
    top: 4px;
  }

  .text-wrap {
    padding-left: 30px;
    padding-top: 2px;
  }

  .nickname,
  .message {
    font-size: 1rem;
  }

  .nickname {
    display: inline-block;
    color: #ccc;
    margin: 0 4px 0 0;

    .badge-icon {
      margin-top: -3px;
      margin-right: 2px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .message {
    word-break: normal;
    word-wrap: break-word;
    color: #fff;
    margin: 0;
    display: inline;
  }

  &.normal {
    .nickname {
      color: #cccccc;
    }
  }

  &.admin {
    .nickname {
      color: #65c4ff;
    }
  }

  &.anchor {
    .nickname {
      color: #f96767;
    }
  }

  &.guard-monthly {
    .nickname {
      color: #b186ff;
    }
  }

  &.guard-annual {
    .nickname {
      color: #ffbc6a;
    }
  }
}
</style>
