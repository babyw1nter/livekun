import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import TestPage from '../views/TestPage.vue'
import ConfigPage from '../views/ConfigPage.vue'
import ChatMessagePage from '../views/ChatMessagePage.vue'
import GiftCapsulePage from '../views/GiftCapsulePage.vue'
import GiftCardPage from '../views/GiftCardPage.vue'
import Login from '../views/User/Login.vue'
import http from '@/api/http'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/config',
    name: 'Config',
    component: ConfigPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/chat-message',
    name: 'ChatMessage',
    component: ChatMessagePage,
    meta: { requiresAuth: false }
  },
  {
    path: '/gift-capsule',
    name: 'GiftCapsule',
    component: GiftCapsulePage,
    meta: { requiresAuth: false }
  },
  {
    path: '/gift-card',
    name: 'GiftCard',
    component: GiftCardPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    if (store.state.auth.isLoggedIn || localStorage.getItem('isLoggedIn') === '1') {
      http
        .post('/user/autologin', {})
        .then(res => {
          if (res.data.code === 200) {
            store.commit('setLoginStatus', true)
            store.commit('setUUID', res.data.data.uuid)

            localStorage.setItem('isLoggedIn', '1')
            localStorage.setItem('UUID', res.data.data.uuid)

            console.log('[auth] 自动登陆成功！')
          } else {
            store.commit('setLoginStatus', false)
            store.commit('setUUID', '')

            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('UUID')

            console.log('[auth] 自动登陆失败，已重置登录状态！')
            router.push({
              path: '/user/login'
            })
          }
        })
        .catch(reason => {
          router.push({
            path: '/user/login'
          })
        })
    } else {
      console.log('[auth] 尚未登录！')
      router.push({
        path: '/user/login'
      })
    }
  }
})

export default router
