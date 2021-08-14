<template>
  <ul ref="chatMessage" class="chat-message-list clearfix" style="padding: 0">
    <ChatMessage
      v-for="(item, index) in list"
      :key="index"
      :avatar-url="item.avatarUrl"
      :nickname="item.nickname"
      :message="item.message"
    >
    </ChatMessage>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, nextTick } from 'vue'
import ChatMessage from '@/components/AtomicComponents/ChatMessage.vue'

interface IListItem {
  type: number
  avatarUrl: string
  nickname?: string
  message?: string
  uid?: number
  [propName: string]: unknown
}

export default defineComponent({
  name: 'ChatMessageList',
  components: {
    ChatMessage
  },
  props: {
    list: {
      type: Array as PropType<IListItem[]>,
      required: true
    }
  },
  setup(props) {
    const chatMessage = ref<HTMLElement>()

    watch(props.list, () => {
      nextTick(() => {
        if (chatMessage.value) {
          chatMessage.value.scrollTop = chatMessage.value.scrollHeight
        }
      })
    })

    return { chatMessage }
  }
})
</script>

<style lang="less">
.chat-message-list {
  overflow-y: auto;
  scroll-behavior: smooth;
  list-style: none;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
