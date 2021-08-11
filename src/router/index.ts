import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import DanmakuVue from '../views/Danmaku.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/danmaku',
    name: 'Danmaku',
    component: DanmakuVue
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
