<template>
  <li class="chat-message" :class="type">
    <a-avatar class="chat-message-avatar" :src="avatarUrl" :size="24"> </a-avatar>
    <span class="nickname h-font" :style="{ color: customStyle.nicknameColor }">{{ nickname }}</span>
    <span class="message h-font" :style="{ color: customStyle.messageColor }">{{ message }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ChatMessage',
  props: {
    type: {
      default: 'level-0',
      type: String
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
          nicknameColor: '#ccc',
          messageColor: '#fff'
        }
      },
      type: Object as PropType<{ nicknameColor?: string; messageColor?: string }>
    }
  },
  setup(props) {
    return {}
  }
})
</script>

<style lang="less" scoped>
.chat-message {
  display: block;
  margin-bottom: 4px;

  span.chat-message-avatar {
    vertical-align: bottom;
  }

  span.nickname,
  span.message {
    font-size: 1rem;
  }

  span.nickname {
    margin-left: 6px;
    margin-right: 6px;
    color: #ccc;
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

  span.message {
    color: #fff;
  }
}
</style>
