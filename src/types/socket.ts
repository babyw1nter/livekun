interface IMessage<T> {
  type: string
  data: T
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
