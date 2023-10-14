interface TypeChatMessagePluginConfig {
  maximum: number
  customStyle: {
    /** 字体大小 */
    fontSize: number
    /** 消息颜色样式 */
    color: {
      /** 普通用户 */
      normal: {
        nickname: string
        message: string
      }
      /** cc守护/虎牙守护/bilibili大航海 */
      guard: {
        /** cc守护/虎牙守护（月守），bilibili（舰长） */
        lv1: {
          nickname: string
          message: string
        }
        /** cc守护/虎牙守护（年守），bilibili（提督） */
        lv2: {
          nickname: string
          message: string
        }
        /** bilibili（总督） */
        lv3: {
          nickname: string
          message: string
        }
      }
      /** 房管 */
      admin: {
        nickname: string
        message: string
      }
      /** 主播 */
      anchor: {
        nickname: string
        message: string
      }
    }
  }
  type: {
    ticket: boolean
    paid: boolean
  }
  event: {
    join: boolean
    follow: boolean
    gift: boolean
  }
  blacklist: Array<{
    ccid: number | string
    note: string
  }>
}

const defaultPluginConfig: TypeChatMessagePluginConfig = {
  maximum: 150,
  customStyle: {
    fontSize: 18,
    color: {
      normal: {
        nickname: '#ccc',
        message: '#fff'
      },
      guard: {
        lv1: {
          nickname: '#0F9D58',
          message: '#fff'
        },
        lv2: {
          nickname: '#0F9D58',
          message: '#fff'
        },
        lv3: {
          nickname: '#0F9D58',
          message: '#fff'
        }
      },
      admin: {
        nickname: '#5f84f1',
        message: '#fff'
      },
      anchor: {
        nickname: '#FFD600',
        message: '#fff'
      }
    }
  },
  type: {
    ticket: true,
    paid: true
  },
  event: {
    join: false,
    follow: false,
    gift: false
  },
  blacklist: []
}

export type { TypeChatMessagePluginConfig }
export { defaultPluginConfig }
