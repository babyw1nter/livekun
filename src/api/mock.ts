import { getRandomUUID, randomNum } from './common'
import http from './http'

interface IBasePluginData {
  uid: number
  nickname: string
  avatarUrl: string
}

interface ITicketMockData extends IBasePluginData {
  money: number
}

interface IChatMessageMockData extends IBasePluginData {
  message: string
  messageType: string
  rule: {
    admin: boolean
    anchor: boolean
  }
  guard: number
  badgeInfo: {
    badgename: string
    level: number
  }
}

interface IPaidMockData extends IBasePluginData {
  money: number
  giftName: string
  giftCount: number
  message: string
  messageType: string
  comment: string
}

let ticketMockData: Array<ITicketMockData> = []
let chatMessageMockData: Array<IChatMessageMockData> = []
let paidMockData: Array<IPaidMockData> = []

const getMockData = (): void => {
  http
    .get('/api/getMockdata')
    .then((res) => {
      const reponseData = res.data

      ticketMockData = reponseData.data.ticketMockData
      chatMessageMockData = reponseData.data.chatMessageMockData
      paidMockData = reponseData.data.paidMockData
    })
    .catch((reason) => {
      console.error('获取 mock 数据失败！')
    })
}

const getRandomTicket = () => {
  return {
    key: getRandomUUID(),
    ...ticketMockData[randomNum(0, ticketMockData.length - 1)],
    money: randomNum(5, 2500)
  }
}

const getRandomChatMessage = () => {
  return randomNum(0, 5)
    ? { key: getRandomUUID(), ...chatMessageMockData[randomNum(0, chatMessageMockData.length - 1)] }
    : getRandomPaid()
}

const getRandomPaid = () => {
  return { key: getRandomUUID(), ...paidMockData[randomNum(0, paidMockData.length - 1)] }
}

export { getMockData, getRandomTicket, getRandomChatMessage, getRandomPaid }
