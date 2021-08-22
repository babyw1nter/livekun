<template>
  <li class="chat-message" :class="type">
    <a-avatar class="chat-message-avatar" :src="avatarUrl" :size="fontSize + 8"></a-avatar>
    <div class="text-wrap" :style="{ paddingLeft: `${fontSize + 16}px` }">
      <span class="nickname h-font" :style="{ color: customStyle.nicknameColor, fontSize: fontSize + 'px' }">
        {{ nickname }}
      </span>
      <span class="message h-font" :style="{ color: customStyle.messageColor, fontSize: fontSize + 'px' }">
        {{ message }}
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
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
    customStyle: {
      default: () => {
        return {
          nicknameColor: null,
          messageColor: null,
          fontSize: 16
        }
      },
      type: Object as PropType<{ nicknameColor?: string; messageColor?: string; fontSize?: number }>
    },
    fontSize: {
      type: Number,
      default: 16
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.chat-message {
  display: block;
  margin-bottom: 4px;
  position: relative;

  span.chat-message-avatar {
    position: absolute;
    top: 1px;
    left: 0px;
  }

  .text-wrap {
    padding-left: 30px;
  }

  span.nickname,
  span.message {
    font-size: 1rem;
  }

  span.nickname {
    display: inline-block;
    margin-right: 6px;
    color: #ccc;
  }

  span.message {
    word-break: normal;
    word-wrap: break-word;
    text-align: justify;
    color: #fff;
  }

  &.normal {
    span.nickname {
      color: #ddf5a8;
    }
  }

  &.admin {
    span.nickname {
      color: rgb(111, 208, 255);
    }
  }

  &.anchor {
    span.nickname {
      color: #ff7575;
    }
  }

  &.guard-monthly {
    span.nickname {
      color: #9480b9;
    }
  }

  &.guard-annual {
    span.nickname {
      color: #ffbc6a;
    }
  }
}
</style>
