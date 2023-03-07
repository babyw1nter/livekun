<template>
  <a-layout class="home">
    <a-layout-sider breakpoint="lg" @collapse="onCollapse" :collapsedWidth="60" :trigger="null" collapsible>

      <div class="logo no-select" :style="{ display: isCollapsed ? 'none' : 'block' }">
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
          <template #title>插件设置</template>
          <a-menu-item key="/config/chat-message">
            <template #icon>
              <MessageOutlined />
            </template>
            聊天消息
          </a-menu-item>
          <a-menu-item key="/config/ticket">
            <template #icon>
              <GiftOutlined />
            </template>
            SC Ticket
            <a-tag color="green">新版</a-tag>
          </a-menu-item>
          <a-menu-item key="/config/paid">
            <template #icon>
              <CreditCardOutlined />
            </template>
            SC Paid
            <a-tag color="green">新版</a-tag>
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
    <a-layout class="right-wrapper" :class="{ collapsed: isCollapsed }">
      <!-- <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header> -->
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer class="footer">
        <a-typography-text type="secondary">
          {{ globalAppConfig.copyright }} {{ globalAppConfig.icp.beian }} {{ globalAppConfig.gongan.beian }}
        </a-typography-text>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { globalAppConfig, randomNum } from '@/api/common'
import http from '@/api/http'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'

const route = useRoute()
const router = useRouter()

const isCollapsed = ref(false)
const selectedKeys = computed(() => [route.meta.menuItemKey || ''])

const banner = ref('')
const broadcastsToptips = ref('')
const broadcasts = ref([''])
const broadcast = ref('')

onBeforeMount(() => {
  // 获取公告数据
  http
    .get('/api/getBroadcasts')
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

const menuClicked = (e: MenuInfo) => {
  const key = e.key
  router.push({
    path: key.toString()
  })
}

const onBreakpoint = (broken: boolean) => {
  //
}

const onCollapse = (collapsed: boolean, type: string) => {
  isCollapsed.value = collapsed
}
</script>

<style lang="less" scoped>
// .trigger {
//   font-size: 18px;
//   line-height: 64px;
//   padding: 0 24px;
//   cursor: pointer;
//   transition: color 0.3s;

//   &:hover {
//     color: #1890ff;
//   }
// }


.home {
  min-height: 100%;

  .logo {
    margin-bottom: 12px;
    text-align: center;
    font-weight: 800;
    border-bottom: 1px solid #f0f0f0;

    .logo-text {
      font-size: 2em;
      line-height: 3em;
    }
  }

  .ant-layout-sider {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    background: #fff;
  }

  .right-wrapper {
    overflow: hidden;
    margin-left: 200px;

    &.collapsed {
      margin-left: 60px
    }
  }

  .footer {
    text-align: center;
  }
}
</style>
