import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import http from '@/api/http'
import { routes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.auth.isLoggedIn || localStorage.getItem('isLoggedIn') === '1') {
      http
        .post('/user/autologin', {})
        .then((res) => {
          const responseData = res.data

          if (responseData.code === 200) {
            store.commit('setLoginStatus', true)
            store.commit('setUUID', responseData.data.user.uuid)
            localStorage.setItem('isLoggedIn', '1')
            localStorage.setItem('UUID', responseData.data.user.uuid)

            store.commit('updateStatus', responseData.data.status)
          } else {
            store.commit('setLoginStatus', false)
            store.commit('setUUID', '')
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('UUID')

            store.commit('resetStatus')

            console.warn('[auth] 自动登陆失败，已重置登录状态！', responseData)
            router.push({
              path: '/user/login'
            })
          }
        })
        .catch((reason) => {
          console.error(reason)
          // router.push({
          //   path: '/user/login'
          // })
        })
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
