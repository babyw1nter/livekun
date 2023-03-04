import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import http from '@/api/http'

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home/Home.vue')
const ConnectPage = () => import(/* webpackChunkName: "home" */ '../views/Home/ConnectPage.vue')
const TicketConfigPage = () =>
  import(/* webpackChunkName: "home" */ '../views/Home/Config/TicketConfigPage.vue')
const GiftCardConfigPage = () => import(/* webpackChunkName: "home" */ '../views/Home/Config/GiftCardConfigPage.vue')
const ChatMessageConfigPage = () =>
  import(/* webpackChunkName: "home" */ '../views/Home/Config/ChatMessageConfigPage.vue')
const AccountPage = () => import(/* webpackChunkName: "home" */ '../views/Home/AccountPage.vue')
const LoginPage = () => import(/* webpackChunkName: "user" */ '../views/User/Login.vue')
const TestPage = () => import(/* webpackChunkName: "test" */ '../views/TestPage.vue')
const TicketPage = () => import(/* webpackChunkName: "ticket" */ '../views/Plugins/TicketPage.vue')
const ChatMessagePage = () => import(/* webpackChunkName: "chat-message" */ '../views/Plugins/ChatMessagePage.vue')
const GiftCardPage = () => import(/* webpackChunkName: "gift-card" */ '../views/Plugins/GiftCardPage.vue')

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
          title: '连接控制',
          menuItemKey: '/',
          requiresAuth: true
        }
      },
      {
        path: 'config/chat-message',
        name: 'ChatMessageConfig',
        component: ChatMessageConfigPage,
        meta: {
          title: '插件设置 - 聊天消息',
          menuItemKey: '/config/chat-message',
          requiresAuth: true
        }
      },
      {
        path: 'config/ticket',
        name: 'TicketConfig',
        component: TicketConfigPage,
        meta: {
          title: '插件设置 - SC Ticket',
          menuItemKey: '/config/ticket',
          requiresAuth: true
        }
      },
      {
        path: 'config/gift-card',
        name: 'GiftCardConfig',
        component: GiftCardConfigPage,
        meta: {
          title: '插件设置 - SC卡片',
          menuItemKey: '/config/gift-card',
          requiresAuth: true
        }
      },
      {
        path: 'account',
        name: 'Account',
        component: AccountPage,
        meta: {
          title: '账号管理',
          menuItemKey: '/account',
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
    redirect: {
      name: 'ChatMessage'
    }
  },
  {
    path: '/plugins/chat-message',
    name: 'ChatMessage',
    component: ChatMessagePage,
    meta: { requiresAuth: false }
  },
  {
    path: '/ticket',
    redirect: {
      name: 'Ticket'
    }
  },
  {
    path: '/plugins/ticket',
    name: 'Ticket',
    component: TicketPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/gift-card',
    redirect: {
      name: 'GiftCard'
    }
  },
  {
    path: '/plugins/gift-card',
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
