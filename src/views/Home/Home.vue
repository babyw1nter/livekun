<template>
  <a-layout class="home">
    <a-layout-sider class="left-wrapper" breakpoint="lg" @collapse="onCollapse" :collapsedWidth="60"
      v-model:collapsed="isCollapsed" :trigger="null" collapsible :width="260">

      <div class="logo no-select" :style="{ height: isCollapsed ? 0 : 'auto' }">
        <span class="logo-text">
          <span style="color: #0084ff">LIVE</span>
          <span>KUN</span>
        </span>
      </div>

      <a-menu class="home-menu no-select" mode="inline" :selectedKeys="selectedKeys" @click="menuClicked"
        style="border-right: none">
        <a-menu-item key="/">
          <template #icon>
            <HomeOutlined />
          </template>
          首页
        </a-menu-item>
        <a-sub-menu key="/config">
          <template #icon>
            <AppstoreOutlined />
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

      <div class="menu-footer">
        <menu-unfold-outlined v-if="isCollapsed" class="trigger" @click="() => (isCollapsed = !isCollapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (isCollapsed = !isCollapsed)" />
      </div>
    </a-layout-sider>
    <a-layout class="right-wrapper" :class="{ collapsed: isCollapsed }">
      <a-layout-content :style="{ margin: '16px', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer class="footer" style="font-size: 13px;">
        <a-divider />
        <PageFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { randomNum } from '@/api/common'
import http from '@/api/http'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'

const route = useRoute()
const router = useRouter()

const isCollapsed = ref(false)
const selectedKeys = computed(() => [route.meta.menuItemKey || ''])

const broadcast = ref('')

const broadcastsData = reactive({
  banner: '',
  broadcastsToptips: '',
  broadcasts: [] as Array<string>
})

const updateBroadcast = () => {
  if (broadcastsData?.broadcasts?.length > 0) {
    broadcast.value = broadcastsData.broadcasts[randomNum(0, broadcastsData.broadcasts.length - 1)]
  }
}

const responseData = await http.get('/api/getBroadcasts')

if (responseData.status === 200) {
  broadcastsData.banner = responseData.data.banner as string
  broadcastsData.broadcastsToptips = responseData.data.broadcastsToptips as string
  broadcastsData.broadcasts = responseData.data.broadcasts as Array<string>

  updateBroadcast()
}

watch(route, () => updateBroadcast())

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
.trigger {
  font-size: 18px;
  line-height: 50px;
  width: 100%;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}

.menu-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fafafa;
  text-align: center;
}


.home {
  min-height: 100%;

  .logo {
    text-align: center;
    font-weight: 800;
    transition: all .2s;
    overflow: hidden;

    .logo-text {
      font-size: 2em;
      line-height: 3em;
    }
  }

  .left-wrapper {
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
    margin-left: 260px;
    transition: all .2s;

    &.collapsed {
      margin-left: 60px
    }
  }

  .footer {
    padding: 24px 16px;
    text-align: center;
  }
}
</style>
