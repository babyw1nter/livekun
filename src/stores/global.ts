import { App } from 'ant-design-vue'
import { defineStore } from 'pinia'

export const useGloablStore = defineStore('global', () => {
  const staticFunction = App.useApp()

  const message = ref(staticFunction.message)
  const modal = ref(staticFunction.modal)
  const notification = ref(staticFunction.notification)

  return { message, notification, modal }
})
