<template>
  <div class="account-page-wrapper">
    <a-card>
      <a-alert message="如果忘记密码，请联系管理员重置！" type="info" showIcon style="margin-bottom: 1rem;" />
      <a-typography-paragraph :copyable="{ text: store.uuid }">
        UUID：{{ store.uuid }}
      </a-typography-paragraph>
      <a-button @click="logout" danger>退出登录</a-button>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const router = useRouter()

const logout = async () => {
  const result = await store.logout()

  if (result) {
    router.push({
      path: '/user/login'
    })
  }
}
</script>
