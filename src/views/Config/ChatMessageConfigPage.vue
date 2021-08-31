<template>
  <div class="config-chat-message options-panel">
    <a-space :size="10" style="margin-bottom: 1rem;">
      <a-button @click="sendMock">发送模拟数据</a-button>
      <a-button @click="clear">清空聊天消息</a-button>
    </a-space>

    <a-space direction="vertical" :size="24" style="width: 100%;">
      <a-typography-link :href="url" :copyable="{ text: url }" target="_blank">
        OBS 浏览器链接
      </a-typography-link>

      <a-space direction="vertical">
        <a-typography-text>文字大小</a-typography-text>
        <a-typography-text type="secondary">
          控制聊天消息的文字大小
        </a-typography-text>
        <a-slider
          :min="12"
          :max="32"
          v-model:value="store.state.config.chatMessage.style.fontSize"
          style="width: 280px; margin-bottom: 3rem;"
          :marks="{ 12: '小', 32: '大' }"
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
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import http from '@/api/http'

export default defineComponent({
  setup() {
    const store = useStore(key)

    const url = computed(() => `${window.location.origin}/#/chat-message?uuid=${store.state.auth.uuid}`)

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
  // padding: 1rem 0;
}
</style>
