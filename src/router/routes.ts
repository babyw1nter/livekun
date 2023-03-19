import { RouteRecordRaw } from 'vue-router'

const WebMain = () => import('../views/WebMain.vue')
const ConnectPage = () => import('../views/Home/ConnectPage.vue')

const AccountPage = () => import('../views/Home/AccountPage.vue')
const LoginPage = () => import('../views/User/Login.vue')
const TestPage = () => import('../views/TestPage.vue')

const childrenRoutes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Connect',
    component: ConnectPage,
    meta: {
      title: '连接控制',
      menuItemKey: '/',
      showOnMenu: true,
      requiresAuth: true
    }
  },
  {
    path: 'account',
    name: 'Account',
    component: AccountPage,
    meta: {
      title: '个人中心',
      menuItemKey: '/account',
      showOnMenu: true,
      requiresAuth: true
    }
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'WebMain',
    component: WebMain,
    meta: { requiresAuth: true },
    children: [...childrenRoutes]
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  }
]

export { routes }
