import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import http from '@/api/http'
import { routes } from './routes'
import { PluginNames } from '@/api/plugins'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export const addPluginRoute = (
  pluginName: PluginNames | string,
  displayName: string,
  componentConfigPage: () => Promise<unknown>,
  componentPluginPage: () => Promise<unknown>
) => {
  router.addRoute('Console', {
    path: `/console/plugins/${pluginName}`,
    component: componentConfigPage,
    meta: {
      menuItemKey: `/console/plugins/${pluginName}`,
      menuItemName: displayName,
      showOnMenu: true,
      requiresAuth: true
    }
  })

  router.addRoute({
    path: `/plugins-obs/${pluginName}`,
    component: componentPluginPage,
    meta: { requiresAuth: false }
  })
}

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth) {
    if (userStore.isLoggedIn || localStorage.getItem('isLoggedIn') === '1') {
      const authResult = await userStore.autologin()

      if (!authResult) {
        router.push({
          path: '/user/login'
        })
      }
    } else {
      console.warn('[auth] 尚未登录！')
      router.push({
        path: '/user/login'
      })
    }
  }

  next()
})

export default router
