<template>
  <a-card>
    <a-result
      status="404"
      title="404"
      sub-title="抱歉，你好像访问了一个不存在的页面...">
      <template #extra>
        <a-button type="primary" @click="goHome"> 返回首页 </a-button>
      </template>
    </a-result>
  </a-card>
</template>

<script lang="ts" setup>
const router = useRouter()

const goHome = () => {
  router.push({
    path: '/'
  })
}
</script>
