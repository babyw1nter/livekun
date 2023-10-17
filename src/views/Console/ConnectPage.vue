<template>
  <div class="connect-page-wrapper">
    <a-card>
      <a-alert
        :message="store.isJoinedRoom ? `已连接 ${store.roomInfo.liveId}` : '未连接'"
        :description="
          store.isJoinedRoom ? `已进入直播间「${store.roomInfo.title}」` : '请进入一个直播间以使用所有功能。'
        "
        :type="store.isJoinedRoom ? 'success' : 'info'"
        style="margin-bottom: 1rem"
        show-icon />
      <div
        class="join-input-wrap"
        style="margin-top: 1rem">
        <a-space :size="10">
          <a-input
            v-model:value="liveId"
            placeholder="请输入直播间ID"
            :disabled="isLoading || isReseting"
            allowClear />
          <a-button
            @click="joinRoom"
            type="primary"
            :loading="isLoading"
            :disabled="isReseting">
            进入
          </a-button>
          <a-button
            @click="reset"
            danger
            :loading="isReseting">
            重置
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
  667
</template>

<script lang="ts" setup>
import { useConnentStore } from '@/stores/connent'
import { message } from 'ant-design-vue/es'

const store = useConnentStore()

await store.getStatus()

const liveId = ref<string>('')
const isLoading = ref(false)
const isReseting = ref(false)

const joinRoom = async () => {
  if (!liveId.value) {
    message.warn('请输入直播间ID或房间ID！')
  } else {
    isLoading.value = true
    await store.joinRoom(liveId.value)
    isLoading.value = false
  }
}

const reset = async () => {
  isReseting.value = true
  await store.reset()
  isReseting.value = false
}
</script>

<style lang="less">
.h-carousel {
  height: 160px;
}
</style>
