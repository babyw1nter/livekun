<template>
  <a-config-provider
    :locale="locale"
    :autoInsertSpaceInButton="false">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            <a-spin style="margin: 1rem" />
          </template>
        </Suspense>
      </template>
    </router-view>
  </a-config-provider>
</template>

<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { getMockData } from '@/api/mock'

getMockData()

const locale = zhCN
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
