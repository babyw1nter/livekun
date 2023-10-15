import { createLivekunPluginManager } from '@/api/pluginmanager'
import ChatMessage from './ChatMessage'
import Paid from './Paid'
import Ticket from './Ticket'

const livekunPluginManager = createLivekunPluginManager()

livekunPluginManager.use(ChatMessage).use(Paid).use(Ticket)

export default livekunPluginManager
