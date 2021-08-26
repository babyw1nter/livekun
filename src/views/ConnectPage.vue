<template>
  <div class="connect-page-wrapper">
    <a-alert
      :message="store.state.status.isJoinRoom ? `已连接 ${store.state.status.roomInfo.liveId}` : '未连接'"
      :description="
        store.state.status.isJoinRoom
          ? `已进入直播间「${store.state.status.roomInfo.title}」`
          : '请进入一个直播间以使用所有功能。'
      "
      :type="store.state.status.isJoinRoom ? 'success' : 'info'"
      style="margin-bottom: 1rem;"
      show-icon
    />
    <div class="join-input-wrap" style="margin-top: 1rem">
      <a-space :size="10">
        <a-input
          v-model:value="liveIdInputValue"
          placeholder="请输入直播间ID"
          :disabled="isLoading || isReseting"
          allowClear
        />
        <a-button @click="joinRoom" type="primary" :loading="isLoading" :disabled="isReseting">进入</a-button>
        <a-button @click="reset" danger :loading="isReseting">重置</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import http from '@/api/http'

export default defineComponent({
  setup() {
    const store = useStore(key)
    const route = useRoute()
    const router = useRouter()

    const liveIdInputValue = ref<string>('')
    const isLoading = ref(false)
    const isReseting = ref(false)

    const joinRoom = () => {
      if (liveIdInputValue.value !== '') {
        isLoading.value = true
        http
          .post('/api/join', {
            liveId: liveIdInputValue.value
          })
          .then(res => {
            console.log(res.data)

            if (res.data.code === 200) {
              message.success('进入直播间成功！')
            } else if (res.data.code === 10001) {
              message.error('进入直播间失败！')
            }

            store.dispatch('getRemoteStatus')
          })
          .catch((reason: Error) => {
            console.log(reason)
          })
          .finally(() => {
            isLoading.value = false
          })
      } else {
        message.warn('请输入直播间ID！')
      }
    }

    const reset = () => {
      isReseting.value = true
      http
        .post('/api/reset')
        .then(res => {
          if (res.data.code === 200) {
            message.success('重置成功！')
          } else {
            message.warn(res.data.message)
          }
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
        .finally(() => {
          store.commit('resetStatus')
          isReseting.value = false
        })
    }

    return { store, route, router, liveIdInputValue, isLoading, isReseting, joinRoom, reset }
  }
})
</script>
