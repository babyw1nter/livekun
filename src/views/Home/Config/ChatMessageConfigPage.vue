<template>
  <div class="config-chat-message options-panel">
    <div class="preview-wrapper">
      <ChatMessageList
        ref="ChatMessageListRef"
        class="preview-chat-message-list"
        :font-size="store.state.config.chatMessage.style.fontSize"
      />
      <a-checkbox v-model:checked="autoPreview" v-on:change="autoPreviewChange" style="margin: 1rem; float: right;"
        >自动预览
      </a-checkbox>
    </div>
    <a-space :size="10">
      <a-button @click="sendMock">发送 OBS 模拟数据</a-button>
      <a-button @click="clear">清空 OBS 聊天消息</a-button>
    </a-space>
    <a-typography-link :href="url" :copyable="{ text: url }" target="_blank" style="float: right; line-height: 32px;">
      OBS 浏览器链接
    </a-typography-link>

    <a-divider />

    <a-space direction="vertical" :size="24" style="width: 100%;">
      <a-space direction="vertical">
        <a-typography-text>文字大小</a-typography-text>
        <a-typography-text type="secondary">
          控制聊天消息的文字大小
        </a-typography-text>
        <a-slider
          :min="17"
          :max="32"
          v-model:value="store.state.config.chatMessage.style.fontSize"
          style="width: 280px; margin-bottom: 3rem;"
          :marks="{ 17: '小', 32: '大' }"
        />
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>显示控制</a-typography-text>
        <a-typography-text type="secondary">
          控制显示哪些聊天消息
        </a-typography-text>
        <a-space :size="10" style="margin-top: 1rem;">
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.join" disabled>进入直播间</a-checkbox>
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.follow" disabled>用户关注</a-checkbox>
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.gift" disabled>赠送礼物</a-checkbox>
        </a-space>
      </a-space>
    </a-space>
    <a-divider />
    <a-space :size="10">
      <a-button type="primary" @click="save">保存设置</a-button>
      <a-button danger @click="reset">恢复默认</a-button>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import ChatMessageList from '@/components/ChatMessageList.vue'
import http from '@/api/http'
import { getRandomChatMessage } from '@/api/mock'

export default defineComponent({
  components: {
    ChatMessageList
  },
  setup() {
    const store = useStore(key)
    const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

    const autoPreviewTimer = ref(0)
    const autoPreview = ref(true)
    const autoPreviewChange = () => {
      ChatMessageListRef.value?.add({
        ...getRandomChatMessage()
      })
      if (autoPreview.value) {
        autoPreviewTimer.value = window.setInterval(() => {
          ChatMessageListRef.value?.add({
            ...getRandomChatMessage()
          })
        }, 1000)
      } else {
        window.clearInterval(autoPreviewTimer.value)
      }
    }

    onMounted(() => autoPreviewChange())

    const url = computed(() => `${window.location.origin}/#/plugins/chat-message?uuid=${store.state.auth.uuid}`)

    const sendMock = () => {
      http
        .post('/api/control', { method: 'sendMockDataToChatMessage' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const clear = () => {
      http
        .post('/api/control', { method: 'clearChatMessage' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const save = () => store.dispatch('saveRemoteConfig')

    const reset = () => null

    return {
      store,
      ChatMessageListRef,
      autoPreview,
      autoPreviewChange,
      url,
      sendMock,
      clear,
      save,
      reset
    }
  }
})
</script>

<style lang="less" scoped>
.config-chat-message {
  .preview-chat-message-list {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 50px;
    left: 20px;
  }
}
</style>
