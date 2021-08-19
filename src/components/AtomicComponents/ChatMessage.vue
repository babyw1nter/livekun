<template>
  <li class="chat-message" :class="type">
    <a-avatar class="chat-message-avatar" :src="avatarUrl" :size="fontSize + 8"> </a-avatar>
    <span class="nickname h-font" :style="{ color: customStyle.nicknameColor, fontSize: fontSize + 'px' }">
      {{ nickname }}
      <CustomerServiceFilled style="margin-left: -2px" v-if="type === 'anchor'" />
      <ToolFilled style="margin-left: -2px" v-if="type === 'admin'" />
    </span>
    <span class="message h-font" :style="{ color: customStyle.messageColor, fontSize: fontSize + 'px' }">{{
      messageX
    }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ToolFilled, StarFilled, CustomerServiceFilled } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'ChatMessage',
  components: {
    ToolFilled,
    CustomerServiceFilled
  },
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
  setup(props) {
    const messageX = computed(() =>
      props.message.replace(/(\[emts\]).*?(\[\/emts\])/g, '[表情]').replace(/(\[img\]).*?(\[\/img\])/g, '[图片]')
    )
    return { messageX }
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
    margin-left: 8px;
    margin-right: 6px;
    color: #ccc;
  }

  span.message {
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
