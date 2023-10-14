interface TypePaidPluginConfig {
  level: Array<number>
  minMoney: number
  comment: {
    use: boolean
    prefix: string
    giftMinMoney: number
    giftWhitelist: string
  }
}

const defaultPluginConfig: TypePaidPluginConfig = {
  level: [0, 9, 49, 99, 199, 249, 499],
  minMoney: 5,
  comment: {
    use: false,
    prefix: '留言：',
    giftMinMoney: 10,
    giftWhitelist: ''
  }
}

export type { TypePaidPluginConfig }
export { defaultPluginConfig }
