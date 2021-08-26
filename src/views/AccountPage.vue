<template>
  <div class="account-page-wrapper">
    <a-alert message="如果忘记密码，请联系管理员重置！" type="info" showIcon style="margin-bottom: 1rem;" />
    <a-typography-paragraph :copyable="{ text: store.state.auth.uuid }">
      UUID：{{ store.state.auth.uuid }}
    </a-typography-paragraph>
    <a-button @click="logout" danger>退出登录</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch, computed } from 'vue'
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
      logout
    }
  }
})
</script>
