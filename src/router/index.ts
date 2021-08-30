import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import http from '@/api/http'

const Home = () => import(/* webpackChunkName: "group-home" */ '../views/Home.vue')
const ConnectPage = () => import(/* webpackChunkName: "group-home" */ '../views/ConnectPage.vue')
const ConfigPage = () => import(/* webpackChunkName: "group-home" */ '../views/ConfigPage.vue')
const AccountPage = () => import(/* webpackChunkName: "group-home" */ '../views/AccountPage.vue')
const LoginPage = () => import(/* webpackChunkName: "group-user" */ '../views/User/Login.vue')
const TestPage = () => import(/* webpackChunkName: "group-test" */ '../views/TestPage.vue')
const GiftCapsulePage = () => import(/* webpackChunkName: "group-gift-capsule" */ '../views/GiftCapsulePage.vue')
const ChatMessagePage = () => import(/* webpackChunkName: "group-chat-message" */ '../views/ChatMessagePage.vue')
const GiftCardPage = () => import(/* webpackChunkName: "group-gift-card" */ '../views/GiftCardPage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Connect',
        component: ConnectPage,
        meta: {
          menuItemKey: '/',
          requiresAuth: true
        }
      },
      {
        path: 'config',
        name: 'Config',
        component: ConfigPage,
        meta: {
          menuItemKey: 'config',
          requiresAuth: true
        }
      },
      {
        path: 'account',
        name: 'Account',
        component: AccountPage,
        meta: {
          menuItemKey: 'account',
          requiresAuth: true
        }
      }
    ]
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
    component: LoginPage,
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
          const responseData = res.data

          if (responseData.code === 200) {
            store.commit('setLoginStatus', true)
            store.commit('setUUID', responseData.data.user.uuid)
            localStorage.setItem('isLoggedIn', '1')
            localStorage.setItem('UUID', responseData.data.user.uuid)

            store.commit('updateStatus', responseData.data.status)
            store.commit('updateConfig', responseData.data.config)

            console.log('[auth] 自动登陆成功！', responseData)
          } else {
            store.commit('setLoginStatus', false)
            store.commit('setUUID', '')
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('UUID')

            store.commit('resetStatus')
            store.commit('resetConfig')

            console.warn('[auth] 自动登陆失败，已重置登录状态！', responseData)
            router.push({
              path: '/user/login'
            })
          }
        })
        .catch(reason => {
          console.error(reason)
          // router.push({
          //   path: '/user/login'
          // })
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
