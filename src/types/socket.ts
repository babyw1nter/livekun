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
  key: string
  uid: number | string
  avatarUrl: string
  nickname: string
  userInfo?: unknown
}

export type { IMessage, ISocketMethodData, ISocketCustomData }
