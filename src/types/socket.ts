interface IMessage<T> {
  code: number
  type: string
  data: T
  timestamp: number
}

interface ISocketMethodData {
  method: string
}

interface ISocketCustomData {
  avatarUrl: string
  nickname: string
  uid: number | string
  userInfo?: unknown
}

export { IMessage, ISocketMethodData, ISocketCustomData }
