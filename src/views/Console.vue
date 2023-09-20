<template>
  <a-layout class="console">
    <a-layout-sider class="left-wrapper" breakpoint="lg" @collapse="onCollapse" :collapsedWidth="60"
      v-model:collapsed="isCollapsed" :trigger="null" collapsible :width="240">

      <div class="menu-header no-select" :style="{ padding: isCollapsed ? '10px' : '10px 22px' }">
        <div class="user-info">
          <div class="avatar-wrap">
            <a-avatar size="large">
              {{ userStore.username }}
            </a-avatar>
          </div>

          <div class="basic-info-wrap">
            <a-space-compact direction="vertical" :gap="0">
              <a-typography-text strong ellipsis>{{ userStore.username }}</a-typography-text>
              <a-typography-text type="secondary" ellipsis>没有个性签名~</a-typography-text>
            </a-space-compact>
          </div>
        </div>
      </div>

      <a-menu class="console-menu no-select" mode="inline" :selectedKeys="selectedKeys" @click="menuClicked"
        style="border-right: none">
        <a-menu-item key="/console/connect">
          <template #icon>
            <HomeOutlined />
          </template>
          首页
        </a-menu-item>

        <a-sub-menu key="/console/plugins">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>插件设置</template>

          <a-menu-item v-for="item in pluginRoutes" :key="item.path">
            {{ item.meta.menuItemName }}
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/console/account">
          <template #icon>
            <UserOutlined />
          </template>
          个人中心
        </a-menu-item>

        <a-menu-item key="https://github.com/hhui64/livekun-web?help">
          <template #icon>
            <question-circle-outlined />
          </template>
          使用帮助
        </a-menu-item>

        <a-menu-item key="https://github.com/hhui64/livekun-web">
          <template #icon>
            <github-outlined />
          </template>
          项目地址
        </a-menu-item>

        <a-menu-item key="https://github.com/hhui64/livekun-web?about">
          <template #icon>
            <info-circle-outlined />
          </template>
          关于
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
import http, { IHttpResponse } from '@/api/http'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { AxiosResponse } from 'axios'
import { useUserStore } from '@/stores/user'

interface IBroadcastData {
  banner: string
  broadcastsToptips: string
  broadcasts: string[]
}

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const pluginRoutes = computed(() => router.getRoutes().filter(i => i.path.startsWith('/console/plugins/')))

const isCollapsed = ref(false)
const selectedKeys = computed(() => [route.meta.menuItemKey || ''])

const broadcast = ref('')

const broadcastsData = reactive<IBroadcastData>({
  banner: '',
  broadcastsToptips: '',
  broadcasts: []
})

const updateBroadcast = () => {
  if (broadcastsData?.broadcasts?.length > 0) {
    broadcast.value = broadcastsData.broadcasts[randomNum(0, broadcastsData.broadcasts.length - 1)]
  }
}

const res: AxiosResponse<IHttpResponse<IBroadcastData>> = await http.get('/api/getBroadcasts')

if (res.status === 200) {
  broadcastsData.banner = res.data.data.banner as string
  broadcastsData.broadcastsToptips = res.data.data.broadcastsToptips as string
  broadcastsData.broadcasts = res.data.data.broadcasts as Array<string>

  updateBroadcast()
}

watch(route, () => updateBroadcast())

const menuClicked = (e: MenuInfo) => {
  const key = e.key.toString()

  if (key.startsWith('http')) {
    window.open(key)
  } else {
    router.push({
      path: key
    })
  }

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
  display: inline-block;
  font-size: 18px;
  line-height: 50px;
  width: 100%;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}

.menu-header {
  padding: 10px;

  .user-info {
    display: flex;

    .avatar-wrap {
      padding-top: 2px;
      width: 40px;
    }

    .basic-info-wrap {
      flex: 1;
      margin-left: 10px;
      width: 100%;
      height: 44px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }
  }
}

.menu-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fafafa;
  text-align: center;
}


.console {
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
    margin-left: 240px;
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
