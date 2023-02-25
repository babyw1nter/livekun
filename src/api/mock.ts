import { getRandomUUID, randomNum } from './common'
import http from './http'

interface IBasePluginData {
  uid: number
  nickname: string
  avatarUrl: string
}

interface IGiftCapsuleMockData extends IBasePluginData {
  money: number
}

interface IChatMessageMockData extends IBasePluginData {
  message: string
  messageType: string
  admin: boolean
  guard: number
  badgeInfo: {
    badgename: string
    level: number
  }
}

interface IGiftCardMockData extends IBasePluginData {
  money: number
  giftName: string
  giftCount: number
  message: string
  messageType: string
  comment: string
}

let giftCapsuleMockData: Array<IGiftCapsuleMockData> = []
let chatMessageMockData: Array<IChatMessageMockData> = []
let giftCardMockData: Array<IGiftCardMockData> = []

const getMockData = (): void => {
  http
    .get('/api/get-mockdata')
    .then((res) => {
      const reponseData = res.data

      giftCapsuleMockData = reponseData.data.giftCapsuleMockData
      chatMessageMockData = reponseData.data.chatMessageMockData
      giftCardMockData = reponseData.data.giftCardMockData
    })
    .catch((reason) => {
      console.error('获取 mock 数据失败！')
    })
}

const getRandomGiftCapsule = () => {
  return {
    key: getRandomUUID(),
    ...giftCapsuleMockData[randomNum(0, giftCapsuleMockData.length - 1)],
    money: randomNum(5, 2500)
  }
}

const getRandomChatMessage = () => {
  return randomNum(0, 5)
    ? { key: getRandomUUID(), ...chatMessageMockData[randomNum(0, chatMessageMockData.length - 1)] }
    : getRandomGiftCard()
}

const getRandomGiftCard = () => {
  return { key: getRandomUUID(), ...giftCardMockData[randomNum(0, giftCardMockData.length - 1)] }
}

export { getMockData, getRandomGiftCapsule, getRandomChatMessage, getRandomGiftCard }
