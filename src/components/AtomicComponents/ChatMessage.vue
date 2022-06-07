<template>
  <li class="chat-message" :class="type">
    <a-avatar class="chat-message-avatar" :src="avatarUrl" :size="fontSize + 21"></a-avatar>
    <div class="text-wrap" :style="{ paddingLeft: `${fontSize + 28}px`, lineHeight: `${fontSize + 2}px` }">
      <p class="nickname h-font" :style="{ color: customStyle.nicknameColor, fontSize: `${fontSize - 2}px` }">
        {{ nickname }}:
      </p>
      <p class="message h-font" :style="{ color: customStyle.messageColor, fontSize: `${fontSize}px` }">
        {{ message }}
      </p>
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
  margin-bottom: 8px;
  position: relative;

  span.chat-message-avatar {
    position: absolute;
    top: 1px;
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
  }

  p.message {
    word-break: normal;
    word-wrap: break-word;
    text-align: justify;
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
      color: #96b6ff;
    }
  }

  &.anchor {
    p.nickname {
      color: #ff8b8b;
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
