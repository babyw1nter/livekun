import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import TestPage from '../views/TestPage.vue'
import ConfigPage from '../views/ConfigPage.vue'
import ChatMessagePage from '../views/ChatMessagePage.vue'
import GiftCapsulePage from '../views/GiftCapsulePage.vue'
import GiftCardPage from '../views/GiftCardPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/config',
    name: 'Config',
    component: ConfigPage
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage
  },
  {
    path: '/chat-message',
    name: 'ChatMessage',
    component: ChatMessagePage
  },
  {
    path: '/gift-capsule',
    name: 'GiftCapsule',
    component: GiftCapsulePage
  },
  {
    path: '/gift-card',
    name: 'GiftCard',
    component: GiftCardPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
