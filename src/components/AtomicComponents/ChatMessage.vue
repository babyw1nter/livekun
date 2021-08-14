<template>
  <li class="chat-message" :class="type">
    <a-avatar class="chat-message-avatar" :src="avatarUrl" :size="24"> </a-avatar>
    <span class="nickname">{{ nickname }}</span>
    <span class="message">{{ message }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    font-family: 'Arial Black', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-weight: bold;
    text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
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
