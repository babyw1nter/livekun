import { usePluginConfig } from "@/api/config"
import { PluginNames } from "@/api/plugins"

const useChatMessagePluginConfig = async () => {
  const chatMessagePluginConfig = await usePluginConfig<PluginNames.PLUGIN_CHAT_MESSAGE>(
    PluginNames.PLUGIN_CHAT_MESSAGE
  )
  const ticketPluginConfig = await usePluginConfig<PluginNames.PLUGIN_TICKET>(PluginNames.PLUGIN_TICKET)
  const paidPluginConfig = await usePluginConfig<PluginNames.PLUGIN_PAID>(PluginNames.PLUGIN_PAID)

  return { chatMessagePluginConfig, ticketPluginConfig, paidPluginConfig }
}

export { useChatMessagePluginConfig }