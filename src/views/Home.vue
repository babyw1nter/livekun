<template>
  <a-layout class="home">
    <a-layout-content class="main">
      <a-alert message="谨以此作品献给我的好朋友——奶玲！" type="warning" showIcon style="margin: 1rem 0;">
        <template #icon><smile-outlined /></template>
      </a-alert>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="border-right: 1px solid #f0f0f0; background: #fff;">
          <a-menu mode="inline" :selectedKeys="selectedKeys" @click="menuClicked" style="border-right: none;">
            <a-menu-item key="/">
              <template #icon>
                <ApiOutlined />
              </template>
              连接控制
            </a-menu-item>
            <a-menu-item key="config">
              <template #icon>
                <SettingOutlined />
              </template>
              系统设置
            </a-menu-item>
            <a-menu-item key="account">
              <template #icon>
                <UserOutlined />
              </template>
              账号管理
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer class="footer">
      © 2021 hhui64. Powered By CCLinkJS.
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import { SmileOutlined, UserOutlined, ApiOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import http from '@/api/http'

export default defineComponent({
  components: {
    SmileOutlined,
    UserOutlined,
    ApiOutlined,
    SettingOutlined
  },
  setup() {
    const store = useStore(key)
    const route = useRoute()
    const router = useRouter()

    const selectedKeys = computed(() => [route.meta.menuItemKey])

    const menuClicked = (e: { key: string }) => {
      const key = e.key
      router.push({
        path: key
      })
    }

    return {
      store,
      selectedKeys,
      menuClicked
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  min-height: 100%;

  .main {
    margin: 0 auto;
    width: 888px;
  }

  .footer {
    text-align: center;
  }
}
</style>
