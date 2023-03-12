import { RouteRecordRaw } from 'vue-router'

const Home = () => import('../views/Home/Home.vue')
const ConnectPage = () => import('../views/Home/ConnectPage.vue')

const AccountPage = () => import('../views/Home/AccountPage.vue')
const LoginPage = () => import('../views/User/Login.vue')
const TestPage = () => import('../views/TestPage.vue')

const ChatMessageConfigPage = () => import('../components/plugins/ChatMessage/views/ConfigPage.vue')
const ChatMessagePluginPage = () => import('../components/plugins/ChatMessage/views/PluginPage.vue')

const TicketConfigPage = () => import('../components/plugins/Ticket/views/ConfigPage.vue')
const TicketPluginPage = () => import('../components/plugins/Ticket/views/PluginPage.vue')

const PaidConfigPage = () => import('../components/plugins/Paid/views/ConfigPage.vue')
const PaidPluginPage = () => import('../components/plugins/Paid/views/PluginPage.vue')

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
        path: 'config/paid',
        name: 'PaidConfig',
        component: PaidConfigPage,
        meta: {
          title: '插件设置 - SC Paid',
          menuItemKey: '/config/paid',
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
    component: ChatMessagePluginPage,
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
    component: TicketPluginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/paid',
    redirect: {
      name: 'Paid'
    }
  },
  {
    path: '/plugins/paid',
    name: 'Paid',
    component: PaidPluginPage,
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