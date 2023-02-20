<template>
  <a-layout class="home">
    <a-layout-content class="main">
      <a-alert :message="banner" type="warning" showIcon style="margin: 1rem 0">
        <template #icon><smile-outlined /></template>
      </a-alert>
      <a-layout style="background: #fff; border-radius: 2px; overflow: hidden">
        <a-layout-sider width="200" style="border-right: 1px solid #f0f0f0; background: #fff">
          <div class="logo no-select">
            <span class="logo-text">
              <span style="color: #0084ff">LIVE</span>
              <span>KUN</span>
            </span>
          </div>
          <a-menu class="home-menu no-select" mode="inline" :selectedKeys="selectedKeys" @click="menuClicked"
            style="border-right: none">
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
        <a-layout-content style="min-height: 555px">
          <div class="right-title no-select">
            <span class="page-header">{{ route.meta.title }}</span>
            <a-tooltip>
              <template #title>{{ broadcastsToptips }}</template>
              <a-typography-text type="secondary" class="broadcast">{{ broadcast }}</a-typography-text>
            </a-tooltip>
          </div>
          <div class="right-main">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer class="footer">
      <a-typography-text type="secondary">
        {{ globalAppConfig.copyright }} {{ globalAppConfig.icp.beian }} {{ globalAppConfig.gongan.beian }}
      </a-typography-text>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch, computed } from 'vue'
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
import { globalAppConfig, randomNum } from '@/api/common'
import http from '@/api/http'
import { getMockData } from '@/api/mock'

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
  setup () {
    const store = useStore(key)
    const route = useRoute()
    const router = useRouter()

    const selectedKeys = computed(() => [route.meta.menuItemKey])

    const banner = ref('')
    const broadcastsToptips = ref('')
    const broadcasts = ref([''])
    const broadcast = ref('')

    onBeforeMount(() => {
      // 获取模拟数据
      getMockData()
      // 获取公告数据
      http
        .get('/api/get-broadcasts')
        .then((res) => {
          const responseData = res.data
          if (responseData.code === 200) {
            banner.value = responseData.data.banner as string
            broadcastsToptips.value = responseData.data.broadcastsToptips as string
            broadcasts.value = responseData.data.broadcasts as Array<string>
            updateBroadcast()
          }
        })
        .catch((reason) => {
          console.error(reason)
        })
    })

    watch(route, () => updateBroadcast())

    const updateBroadcast = () => {
      if (broadcasts.value.length > 0) {
        broadcast.value = broadcasts.value[randomNum(0, broadcasts.value.length - 1)]
      }
    }

    const menuClicked = (e: { key: string }) => {
      const key = e.key
      router.push({
        path: key
      })
    }

    return {
      globalAppConfig,
      store,
      route,
      router,
      selectedKeys,
      banner,
      broadcastsToptips,
      broadcast,
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
    width: 1024px;

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

      span.page-header {
        padding-left: 12px;
        line-height: 52px;
        border-left: 4px solid #1890ff;
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        font-size: 1rem;
      }

      span.broadcast {
        float: right;
        line-height: 52px;
        transition: all 0.5s;
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
