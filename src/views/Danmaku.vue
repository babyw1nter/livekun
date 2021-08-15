<template>
  <div class="danmaku">
    <GiftCapsulePanel ref="GiftCapsulePanelRef" :maximum="5" style="margin-bottom: 1rem;"></GiftCapsulePanel>

    <ChatMessageList ref="ChatMessageListRef" style="width: 300px; height: 502px;"> </ChatMessageList>

    <GiftCardPanel ref="GiftCardPanelRef" :list="giftCardList" style="width: 300px; height: 340px;"> </GiftCardPanel>

    <div class="toolbar clearfix">
      <a-button type="primary" @click="addGiftCapsule">addGiftCapsule</a-button>
      <a-button type="primary" @click="addChatMessage" style="margin-left: 8px;">addChatMessage</a-button>
      <a-button type="primary" style="margin-left: 8px;">addGiftCard</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import GiftCapsulePanel from '@/components/GiftCapsulePanel.vue'
import ChatMessageList from '@/components/ChatMessageList.vue'
import GiftCardPanel from '@/components/GiftCardPanel.vue'

const randomNum = (minNum: number, maxNum: number) => {
  return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10)
}

const giftCapsuleListArray = [
  {
    nickname: '91王先生',
    avatarUrl: 'https://img0.baidu.com/it/u=1536857165,2921056634&fm=26&fmt=auto&gp=0.jpg',
    money: 666,
    uid: 3312
  },
  {
    nickname: 'Pornhub大波妹',
    avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
    money: 99,
    uid: 444
  },
  {
    nickname: 'CC奶灵',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    money: 69,
    uid: 6900
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    money: 1,
    uid: 3333
  },
  {
    nickname: '^_^什么情况？',
    avatarUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fq_70%2Fimages03%2F20201204%2F94e9c0568b6b40d28b2111ea9b2f8062.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631209669&t=b071b5f523fe602514c220bf892c65cd',
    money: 1,
    uid: 6696
  }
]

const chatMessageListArray = [
  {
    nickname: '^_^什么情况？',
    avatarUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fq_70%2Fimages03%2F20201204%2F94e9c0568b6b40d28b2111ea9b2f8062.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631209669&t=b071b5f523fe602514c220bf892c65cd',
    message:
      '谁能告诉我现在是什么情况？谁能告诉我现在是什么情况？啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊我是谁我在哪？',
    uid: 6696,
    type: 0
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    message: '人生的意义就是为了奶铃的白丝(╯‵□′)╯︵┻━┻',
    uid: 3333,
    type: 3
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    message: '😝如果没有奶铃的白丝，世界就失去了色彩😿😿😿😿？？！',
    uid: 3333,
    type: 3
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    message: '所以我希望每天能看到奶铃穿白丝直播，这样我会非常满足！',
    uid: 3333,
    type: 3
  },
  {
    nickname: 'CC奶灵',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    message: '。。。滚！！~',
    uid: 66690,
    customStyle: {
      nicknameColor: 'rgb(255 132 132)'
    },
    type: 1
  },
  {
    nickname: 'CC奶灵',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    message: '😡😡😡',
    uid: 66690,
    customStyle: {
      nicknameColor: 'rgb(255 132 132)'
    },
    type: 1
  },
  {
    nickname: '91王先生',
    avatarUrl: 'https://img0.baidu.com/it/u=1536857165,2921056634&fm=26&fmt=auto&gp=0.jpg',
    message: '今晚奶铃在我怀里',
    uid: 3312,
    type: 0
  },
  {
    nickname: 'Pornhub大波妹',
    avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
    message: '哈哈',
    uid: 91330,
    type: 0
  },
  {
    nickname: 'Pornhub大波妹',
    avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
    message: '我爱奶铃一生一世',
    uid: 91330,
    type: 0
  }
]

const giftCardListArray = [
  {
    nickname: 'Pornhub大波妹',
    avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
    money: 30,
    message: '赠送了奶罩 × 1',
    uid: 91330,
    type: 'level-0'
  },
  {
    nickname: 'CC奶灵',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    money: 69,
    message: '赠送了火箭 × 1',
    uid: 66690,
    type: 'level-1'
  },
  {
    nickname: '91王先生',
    avatarUrl: 'https://img0.baidu.com/it/u=1536857165,2921056634&fm=26&fmt=auto&gp=0.jpg',
    money: 666,
    message: '赠送了圣旨降临 × 1',
    uid: 3312,
    type: 'level-2'
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    money: 99,
    message: '开通了月费守护',
    uid: 3333,
    type: 'guard-monthly'
  },
  {
    nickname: '^_^什么情况？',
    avatarUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fq_70%2Fimages03%2F20201204%2F94e9c0568b6b40d28b2111ea9b2f8062.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631209669&t=b071b5f523fe602514c220bf892c65cd',
    money: 588,
    message: '开通了年费守护',
    uid: 11001,
    type: 'guard-annual'
  }
]

export default defineComponent({
  components: { GiftCardPanel, GiftCapsulePanel, ChatMessageList },
  setup() {
    const giftCardList = ref(giftCardListArray)

    const GiftCapsulePanelRef = ref<InstanceType<typeof GiftCapsulePanel>>()
    const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()
    const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()

    const addGiftCapsule = () => {
      GiftCapsulePanelRef.value?.add({
        ...giftCapsuleListArray[randomNum(0, 4)],
        money: randomNum(1, 100),
        duration: 10000
      })
    }

    const addChatMessage = () => {
      ChatMessageListRef.value?.add(chatMessageListArray[randomNum(0, 7)])
    }

    const addGiftCard = () => {
      // GiftCardPanelRef.value?.add()
    }

    return {
      giftCardList,
      GiftCapsulePanelRef,
      ChatMessageListRef,
      GiftCardPanelRef,
      addGiftCapsule,
      addChatMessage,
      addGiftCard
    }
  }
})
</script>

<style lang="less">
.danmaku {
  .toolbar {
    position: absolute;
    top: 5rem;
    right: 1rem;
  }
}
</style>
