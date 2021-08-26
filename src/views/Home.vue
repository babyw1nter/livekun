<template>
  <div class="home">
    <a-alert message="谨以此作品献给我的好朋友——奶玲！" type="warning" showIcon>
      <template #icon><smile-outlined /></template>
    </a-alert>

    <div class="main">
      <a-alert
        :message="store.state.status.isJoinRoom ? `已连接 ${store.state.status.roomInfo.liveId}` : '未连接'"
        :description="
          store.state.status.isJoinRoom
            ? `已进入直播间「${store.state.status.roomInfo.title}」`
            : '请进入一个直播间以使用所有功能。'
        "
        :type="store.state.status.isJoinRoom ? 'success' : 'info'"
        style="margin-bottom: 5rem;"
      />
      <a-space :size="10" style="margin-top: 1rem">
        <a-typography-link @click="help">使用教程</a-typography-link>
        <a-typography-link href="./#/config" target="_blank">系统设置</a-typography-link>
        <a-typography-link href="./#/test" target="_blank">测试页面</a-typography-link>
        <a-typography-link>更新日志</a-typography-link>
        <a-typography-link @click="logout">退出登录</a-typography-link>
      </a-space>
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
    <div class="footer">
      <p>© 2021 hhui64. Powered By CCLinkJS.</p>
    </div>
    <a-modal v-model:visible="visible" title="使用教程" @ok="visible = false">
      <a-typography>
        <blockquote>
          <p>1.点击下方对应组件尾部的「复制」按钮，复制你想要的插件链接地址。</p>
          <p>2.在OBS内添加一个「浏览器」，右键选择「属性」然后在「URL」一栏内粘贴链接地址。</p>
          <p>3.调整合适的宽度与高度后，点击确定即可使用。</p>
        </blockquote>
      </a-typography>
      <a-typography-paragraph :copyable="{ text: url.giftCapsule }">礼物胶囊插件链接</a-typography-paragraph>
      <a-typography-paragraph :copyable="{ text: url.chatMessage }">聊天消息插件链接</a-typography-paragraph>
      <a-typography-paragraph :copyable="{ text: url.giftCard }">礼物卡片插件链接</a-typography-paragraph>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import http from '@/api/http'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    SmileOutlined
  },
  setup() {
    const store = useStore(key)
    const route = useRoute()
    const router = useRouter()

    const liveIdInputValue = ref<string>('')
    const isLoading = ref(false)
    const isReseting = ref(false)
    const visible = ref(false)

    const url = ref({
      giftCapsule: '',
      chatMessage: '',
      giftCard: ''
    })

    onBeforeMount(() => {
      store.dispatch('getRemoteConfig')
      store.dispatch('getRemoteStatus')

      watch(store.state.auth, () => updateUrl())
    })

    const updateUrl = () => {
      url.value.giftCapsule = `${window.location.origin}/#/gift-capsule?uuid=${store.state.auth.uuid}`
      url.value.chatMessage = `${window.location.origin}/#/chat-message?uuid=${store.state.auth.uuid}`
      url.value.giftCard = `${window.location.origin}/#/gift-card?uuid=${store.state.auth.uuid}`
    }

    const help = () => {
      updateUrl()
      console.log(url.value)
      visible.value = !visible.value
    }

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
            // message.error(reason.toString())
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

    const logout = () => {
      http
        .get('/user/logout')
        .then(res => {
          if (res.data.code === 200) {
            message.success('退出登录成功！')
            store.commit('setLoginStatus', false)
            store.commit('setUUID', '')

            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('UUID')

            router.push({
              path: '/user/login'
            })
          } else {
            message.warn(res.data.message)
          }
        })
        .catch(() => {
          message.error('退出登录失败，请稍后再试！')
        })
    }

    return {
      store,
      liveIdInputValue,
      joinRoom,
      isLoading,
      isReseting,
      reset,
      logout,
      visible,
      url,
      help
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  padding: 1rem;
  height: 100%;
  position: relative;

  .main {
    width: 500px;
    text-align: center;
    margin: 5rem auto;
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 48px 0 24px;
    padding: 0 16px;
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
