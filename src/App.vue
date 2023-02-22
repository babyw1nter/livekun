<template>
  <a-config-provider :locale="locale" :autoInsertSpaceInButton="false">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { getMockData } from '@/api/mock'

export default defineComponent({
  setup () {
    onBeforeMount(() => {
      getMockData()
    })

    return {
      locale: zhCN
    }
  }
})
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
