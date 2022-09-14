<template>
  <li class="chat-message" :class="type">
    <a-avatar class="chat-message-avatar no-select" :src="avatarUrl" :size="fontSize + 21"></a-avatar>
    <div class="text-wrap" :style="{ paddingLeft: `${fontSize + 28}px`, lineHeight: `${fontSize + 2}px` }">
      <p class="nickname h-font" :style="{ color: customStyle.nicknameColor, fontSize: `${fontSize}px` }">
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
        {{ nickname }}:
      </p>
      <p class="message h-font" :style="{ color: customStyle.messageColor, fontSize: `${fontSize}px` }">
        {{ message }}
      </p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import HBadge from '@/components/AtomicComponents/HBadge.vue'

export default defineComponent({
  components: {
    HBadge
  },
  name: 'ChatMessage',
  props: {
    type: {
      default: 'normal',
      type: String as PropType<'normal' | 'admin' | 'anchor' | 'guard-monthly' | 'guard-annual' | string>
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
    /**
     * 是否为房管
     */
    admin: {
      default: false,
      type: Boolean
    },
    /**
     * 守护等级 1月费守护 2年费守护
     */
    guard: {
      default: Number as PropType<0 | 1 | 2>,
      type: Number
    },
    /**
     * 是否为钻粉
     */
    diamond: {
      default: false,
      type: Boolean
    },
    /**
     * 粉丝牌等级
     */
    badgeInfo: {
      default: 0,
      type: Object as PropType<{ badgename: string; level: number }>
    },
    customStyle: {
      default: () => {
        return {
          nicknameColor: null,
          messageColor: null,
          fontSize: 17
        }
      },
      type: Object as PropType<{ nicknameColor?: string; messageColor?: string; fontSize?: number }>
    },
    fontSize: {
      type: Number,
      default: 17
    }
  },
  setup(props) {
    interface Badge {
      id: string
      icon: string
      w?: number
      h?: number
    }

    const badgeArray = ref<Badge[]>([])

    // badgeArray.value.push({
    //   id: 'diamond',
    //   icon: 'https://cc.fp.ps.netease.com/file/627dc9169de9f6046a4c5e3eNp41j6jw04',
    //   h: 17
    // })

    if (props.guard === 1 && !props.badgeInfo.level) {
      badgeArray.value.push({
        id: 'guard-monthly',
        icon: 'https://cc.res.netease.com/webcc/v2/static/images/room/guard/1_18.png',
        w: 18
      })
    }

    if (props.guard === 2 && !props.badgeInfo.level) {
      badgeArray.value.push({
        id: 'guard-annual',
        icon: 'https://cc.res.netease.com/webcc/v2/static/images/room/guard/2_18.png',
        w: 18
      })
    }

    return {
      badgeArray
    }
  }
})
</script>

<style lang="less" scoped>
.chat-message {
  display: block;
  margin-bottom: 8px;
  position: relative;
  &:first-child {
    margin-top: 4px;
  }

  span.chat-message-avatar {
    position: absolute;
    top: 0;
  }

  .text-wrap {
    padding-left: 30px;
  }

  p.nickname,
  p.message {
    font-size: 1rem;
  }

  p.nickname {
    display: inline-block;
    color: #ccc;
    margin: 0;

    .badge-icon {
      margin-top: -3px;
      margin-right: 2px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  p.message {
    word-break: normal;
    word-wrap: break-word;
    // text-align: justify;
    color: #fff;
    margin: 0;
  }

  &.normal {
    p.nickname {
      color: #fbf6bd;
    }
  }

  &.admin {
    p.nickname {
      color: #65c4ff;
    }
  }

  &.anchor {
    p.nickname {
      color: #f96767;
    }
  }

  &.guard-monthly {
    p.nickname {
      color: #b186ff;
    }
  }

  &.guard-annual {
    p.nickname {
      color: #ffbc6a;
    }
  }
}
</style>
