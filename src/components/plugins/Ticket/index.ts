import { PluginNames } from '@/api/plugins'
import router from '@/router'
import { App } from 'vue'

const ConfigPage = () => import('./views/ConfigPage.vue')
const PluginPage = () => import('./views/PluginPage.vue')

export interface IOptions {
  pluginName: string
  pluginConfig: unknown
}

export default {
  install(app: App<Element>, options?: IOptions) {
    const _options: IOptions = {
      pluginName: options?.pluginName || PluginNames.PLUGIN_TICKET,
      pluginConfig: options?.pluginConfig || {}
    }

    router.addRoute('Home', {
      path: `/plugins/${_options.pluginName}`,
      component: ConfigPage,
      meta: {
        menuItemKey: `/plugins/${_options.pluginName}`,
        menuItemName: 'SC Ticket',
        showOnMenu: true,
        requiresAuth: true
      }
    })

    router.addRoute({
      path: `/plugins-obs/${_options.pluginName}`,
      component: PluginPage,
      meta: { requiresAuth: false }
    })
  }
}
