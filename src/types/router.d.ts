import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    menuItemKey?: string
    menuItemName?: string
    showOnMenu?: boolean
    requiresAuth: boolean
  }
}
