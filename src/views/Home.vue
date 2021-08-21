<template>
  <div class="home">
    <a-alert message="谨以此作品献给我的好朋友——奶玲！" type="warning" showIcon>
      <template #icon><smile-outlined /></template>
    </a-alert>
    <a-alert
      :message="store.state.status.isJoinRoom ? `已连接 ${store.state.status.roomInfo.liveId}` : '未连接'"
      :description="
        store.state.status.isJoinRoom
          ? `已进入直播间「${store.state.status.roomInfo.title}」`
          : '请进入一个直播间以使用所有功能。'
      "
      :type="store.state.status.isJoinRoom ? 'success' : 'info'"
      show-icon
      style="margin-top: 1rem"
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
    <a-space :size="10" style="margin-top: 1rem">
      <a-typography-link href="./#/config" target="_blank">系统设置</a-typography-link>
      <a-typography-link href="./#/test" target="_blank">测试页面</a-typography-link>
    </a-space>
    <PageFooter></PageFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import PageFooter from '@/components/CommonComponents/PageFooter.vue'
import axios from 'axios'

const host = 'http://localhost:39074'

export default defineComponent({
  components: {
    SmileOutlined,
    PageFooter
  },
  setup() {
    const store = useStore(key)
    const liveIdInputValue = ref(348449290)
    const isLoading = ref(false)
    const isReseting = ref(false)

    const joinRoom = () => {
      if (liveIdInputValue.value) {
        isLoading.value = true
        axios
          .post(host + '/join', {
            liveId: liveIdInputValue.value
          })
          .then(res => {
            console.log(res.data)
            if (res.data.code === 10500) {
              message.error('错误: ' + res.data.code)
            }
            if (res.data.code !== 10000) {
              message.warn(`${res.data.code}: ${res.data.msg}`)
            }
            store.dispatch('getRemoteStatus')
          })
          .catch((reason: Error) => {
            console.log(reason)
            message.error(reason.toString())
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
      axios
        .post(host + '/leave')
        .then(res => {
          message.success('重置成功！')
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
        .finally(() => {
          store.commit('resetStatus')
          isReseting.value = false
        })
    }

    return {
      store,
      liveIdInputValue,
      joinRoom,
      isLoading,
      isReseting,
      reset,
      host
    }
  }
})
</script>

<style lang="less">
.home {
  padding: 1rem;
}
</style>
