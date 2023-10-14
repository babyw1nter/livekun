interface TypeTicketPluginConfig {
  level: Array<number>
  duration: Array<number>
  maximum: number
  minMoney: number
}

const defaultPluginConfig: TypeTicketPluginConfig = {
  level: [0, 9, 49, 99, 199, 249, 499],
  duration: [1, 5, 10, 15, 30, 45, 60],
  maximum: 100,
  minMoney: 5
}

export type { TypeTicketPluginConfig }
export { defaultPluginConfig }
