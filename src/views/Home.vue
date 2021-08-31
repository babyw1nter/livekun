<template>
  <a-layout class="home">
    <a-layout-content class="main">
      <a-alert message="谨以此作品献给我的好朋友——奶玲！" type="warning" showIcon style="margin: 1rem 0;">
        <template #icon><smile-outlined /></template>
      </a-alert>
      <a-layout style="background: #fff; border-radius: 2px; overflow: hidden;">
        <a-layout-sider width="200" style="border-right: 1px solid #f0f0f0; background: #fff;">
          <div class="logo no-select">
            <span class="logo-text">
              <span style="color: #0084ff;">LIVE</span>
              <span>KUN</span>
            </span>
          </div>
          <a-menu
            class="home-menu no-select"
            mode="inline"
            :selectedKeys="selectedKeys"
            @click="menuClicked"
            style="border-right: none;"
          >
            <a-menu-item key="/">
              <template #icon>
                <ApiOutlined />
              </template>
              连接控制
            </a-menu-item>
            <a-sub-menu key="/config">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>系统设置</template>
              <a-menu-item key="/config/gift-capsule">
                <template #icon>
                  <GiftOutlined />
                </template>
                礼物胶囊
              </a-menu-item>
              <a-menu-item key="/config/gift-card">
                <template #icon>
                  <CreditCardOutlined />
                </template>
                礼物卡片
              </a-menu-item>
              <a-menu-item key="/config/chat-message">
                <template #icon>
                  <MessageOutlined />
                </template>
                聊天消息
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="/account">
              <template #icon>
                <UserOutlined />
              </template>
              账号管理
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content style="min-height: 555px;">
          <div class="right-title no-select">
            <span>{{ route.meta.title }}</span>
            <!-- <a-page-header
              class="h-page-header"
              :title="route.meta.title"
              sub-title="This is a subtitle"
              :back-icon="false"
              @back="() => router.back()"
            /> -->
          </div>
          <div class="right-main">
            <router-view></router-view>
          </div>
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
import {
  SmileOutlined,
  UserOutlined,
  ApiOutlined,
  SettingOutlined,
  GiftOutlined,
  CreditCardOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    SmileOutlined,
    UserOutlined,
    ApiOutlined,
    SettingOutlined,
    GiftOutlined,
    CreditCardOutlined,
    MessageOutlined
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
      route,
      router,
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
    padding: 0;
    width: 888px;

    .logo {
      margin-bottom: 12px;
      text-align: center;
      font-weight: 800;
      height: 52px;
      border-bottom: 1px solid #f0f0f0;

      .logo-text {
        font-size: 1.5em;
        line-height: 52px;
      }
    }

    .right-title {
      padding: 0 1rem;
      height: 52px;
      border-bottom: 1px solid #f0f0f0;
      overflow: hidden;

      .h-page-header {
        margin: 6px 0;
        padding: 0;
      }

      span {
        padding-left: 12px;
        line-height: 52px;
        border-left: 4px solid #1890ff;
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        font-size: 1rem;
      }
    }

    .right-main {
      padding: 1rem 1rem 24px 1rem;
    }
  }

  .footer {
    text-align: center;
  }
}
</style>
