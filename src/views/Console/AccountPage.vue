<template>
  <div class="account-page-wrapper">
    <a-card>
      <a-alert message="如果忘记密码，请联系管理员重置！" type="info" showIcon style="margin-bottom: 1rem;" />
      <a-typography-paragraph :copyable="{ text: userStore.uuid }">
        UUID：{{ userStore.uuid }}
      </a-typography-paragraph>
      <a-button @click="logout" danger>退出登录</a-button>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const logout = async () => {
  const result = await userStore.logout()

  if (result) {
    router.push({
      path: '/user/login'
    })
  }
}
</script>
