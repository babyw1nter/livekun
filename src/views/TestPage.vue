<template>
  <div class="test-page">
    <GiftCapsulePanel
      ref="GiftCapsulePanelRef"
      :maximum="5"
      style="margin-bottom: 1rem;"
      :duration="store.state.config.giftCapsule.duration"
    ></GiftCapsulePanel>

    <ChatMessageList ref="ChatMessageListRef" :font-size="chatMessageListFontSize" style="width: 400px; height: 400px;">
    </ChatMessageList>

    <GiftCardPanel ref="GiftCardPanelRef" :list="giftCardList" style="width: 300px; height: 340px;"> </GiftCardPanel>

    <div class="toolbar clearfix">
      <a-space :size="10" style="">
        <a-button type="primary" @click="addGiftCapsule">addGiftCapsule</a-button>
        <a-button type="primary" @click="addChatMessage">addChatMessage</a-button>
        <a-button type="primary" @click="addGiftCard">addGiftCard</a-button>
      </a-space>
      <a-divider />
      <a-space :size="10">
        <a-button type="primary" @click="clearGiftCapsule">clearGiftCapsule</a-button>
        <a-button type="primary" @click="clearChatMessage">clearChatMessage</a-button>
        <a-button type="primary" @click="clearGiftCard">clearGiftCard</a-button>
      </a-space>
      <a-divider />
      <p>ChatMessageList Font Size: {{ chatMessageListFontSize }}px</p>
      <a-slider :min="12" :max="64" v-model:value="chatMessageListFontSize" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import GiftCapsulePanel from '@/components/GiftCapsulePanel.vue'
import ChatMessageList from '@/components/ChatMessageList.vue'
import GiftCardPanel from '@/components/GiftCardPanel.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { randomNum } from '@/api/common'

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
    nickname: 'CC奶玲',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    money: 69,
    uid: 6900
    // type: 'guard-annual',
    // message: '开通年费守护',
    // duration: 60000
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
    uid: 6696
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    message: '人生的意义就是为了奶玲的白丝(╯‵□′)╯︵┻━┻',
    uid: 3333
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    message: '😝如果没有奶玲的白丝，世界就失去了色彩😿😿😿😿？？！',
    uid: 3333
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    message: '所以我希望每天能看到奶玲穿白丝直播，这样我会非常满足！',
    uid: 3333
  },
  {
    nickname: 'CC奶玲',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    message: '。。。滚！！~',
    uid: 66690,
    // customStyle: {
    //   nicknameColor: 'rgb(255 132 132)'
    // },
    type: 'anchor'
  },
  {
    nickname: 'CC奶玲',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    message: '😡😡😡',
    uid: 66690,
    // customStyle: {
    //   nicknameColor: 'rgb(255 132 132)'
    // },
    type: 'anchor'
  },
  {
    nickname: '91王先生',
    avatarUrl: 'https://img0.baidu.com/it/u=1536857165,2921056634&fm=26&fmt=auto&gp=0.jpg',
    message: '今晚奶玲在我怀里',
    uid: 3312,
    type: 'admin'
  },
  {
    nickname: 'Pornhub大波妹',
    avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
    message: '哈哈',
    uid: 91330
  },
  {
    nickname: 'Pornhub大波妹',
    avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
    message: '我爱奶玲一生一世',
    uid: 91330
  }
]

const giftCardListArray = [
  {
    nickname: 'Pornhub大波妹',
    avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
    money: 30,
    message: '赠送了奶罩 × 1',
    uid: 91330
  },
  {
    nickname: 'CC奶玲',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    money: 69,
    message: '赠送了火箭 × 1',
    uid: 66690
  },
  {
    nickname: '91王先生',
    avatarUrl: 'https://img0.baidu.com/it/u=1536857165,2921056634&fm=26&fmt=auto&gp=0.jpg',
    money: 666,
    message: '赠送了圣旨降临 × 1',
    uid: 3312
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
    const store = useStore(key)
    const giftCardList = ref(giftCardListArray)

    const GiftCapsulePanelRef = ref<InstanceType<typeof GiftCapsulePanel>>()
    const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()
    const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()

    const chatMessageListFontSize = ref(18)

    const addGiftCapsule = () => {
      GiftCapsulePanelRef.value?.add({
        ...giftCapsuleListArray[randomNum(0, 4)],
        money: randomNum(1, 100)
        // duration: 10000
      })
    }

    const addChatMessage = () => {
      ChatMessageListRef.value?.add(chatMessageListArray[randomNum(0, chatMessageListArray.length - 1)])
    }

    const addGiftCard = () => {
      GiftCardPanelRef.value?.add(giftCardListArray[randomNum(0, giftCardListArray.length - 1)])
    }

    const clearGiftCapsule = () => GiftCapsulePanelRef.value?.clear()

    const clearChatMessage = () => ChatMessageListRef.value?.clear()

    const clearGiftCard = () => GiftCardPanelRef.value?.clear()

    return {
      store,
      giftCardList,
      GiftCapsulePanelRef,
      ChatMessageListRef,
      GiftCardPanelRef,
      addGiftCapsule,
      addChatMessage,
      addGiftCard,
      clearGiftCapsule,
      clearChatMessage,
      clearGiftCard,
      chatMessageListFontSize
    }
  }
})
</script>

<style lang="less">
.test-page {
  .toolbar {
    position: absolute;
    top: 5rem;
    right: 1rem;
  }
}
</style>
