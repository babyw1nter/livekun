<template>
  <div class="danmaku">
    <GiftCapsulePanel ref="GiftCapsulePanelRef" :maximum="5" style="margin-bottom: 1rem;"></GiftCapsulePanel>

    <div style="margin-bottom: 1rem;">
      <a-button type="primary" @click="add">add</a-button>
    </div>

    <ChatMessageList :list="msgList" style="width: 300px; height: 502px;"> </ChatMessageList>

    <GiftCardPanel :list="list" style="width: 300px; height: 330px;"> </GiftCardPanel>
  </div>
</template>

<script lang="ts">
import { Component, defineComponent, onMounted, ref } from 'vue'
import GiftCapsulePanel from '@/components/GiftCapsulePanel.vue'
import ChatMessageList from '@/components/ChatMessageList.vue'
import GiftCardPanel from '@/components/GiftCardPanel.vue'

const randomNum = (minNum: number, maxNum: number) => {
  return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10)
}

const _l = [
  {
    nickname: '91王先生',
    avatarUrl: 'https://img0.baidu.com/it/u=1536857165,2921056634&fm=26&fmt=auto&gp=0.jpg',
    money: 666,
    uid: 3312,
    timeout: 100000,
    type: 2
  },
  {
    nickname: 'Pornhub大波妹',
    avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
    money: 99,
    uid: 444,
    timeout: 100000,
    type: 0
  },
  {
    nickname: 'CC奶灵',
    avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
    money: 69,
    uid: 6900,
    timeout: 100000,
    type: 1
  },
  {
    nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
    avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
    money: 1,
    uid: 3333,
    timeout: 100000,
    type: 1
  },
  {
    nickname: '^_^什么情况？',
    avatarUrl:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fq_70%2Fimages03%2F20201204%2F94e9c0568b6b40d28b2111ea9b2f8062.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631209669&t=b071b5f523fe602514c220bf892c65cd',
    money: 1,
    uid: 6696,
    timeout: 100000,
    type: 1
  }
]

export default defineComponent({
  components: { GiftCardPanel, GiftCapsulePanel, ChatMessageList },
  setup() {
    const list = ref([
      {
        nickname: 'Pornhub大波妹',
        avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
        money: 30,
        message: '赠送了奶罩 × 1',
        type: 0
      },
      {
        nickname: 'CC奶灵',
        avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
        money: 69,
        message: '赠送了火箭 × 1',
        type: 1
      },
      {
        nickname: '91王先生',
        avatarUrl: 'https://img0.baidu.com/it/u=1536857165,2921056634&fm=26&fmt=auto&gp=0.jpg',
        money: 666,
        message: '赠送了圣旨降临 × 1',
        type: 2
      },
      {
        nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
        avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
        money: 99,
        message: '开通了月费守护',
        type: 3
      },
      {
        nickname: '^_^什么情况？',
        avatarUrl:
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fq_70%2Fimages03%2F20201204%2F94e9c0568b6b40d28b2111ea9b2f8062.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631209669&t=b071b5f523fe602514c220bf892c65cd',
        money: 588,
        message: '开通了年费守护',
        type: 4
      }
    ])

    // 排序
    // list.value.sort((a, b) => b.money - a.money)

    const msgList = ref([
      {
        nickname: '^_^什么情况？',
        avatarUrl:
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fq_70%2Fimages03%2F20201204%2F94e9c0568b6b40d28b2111ea9b2f8062.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631209669&t=b071b5f523fe602514c220bf892c65cd',
        message:
          '谁能告诉我现在是什么情况？谁能告诉我现在是什么情况？啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊我是谁我在哪？',
        type: 0
      },
      {
        nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
        avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
        message: '人生的意义就是为了奶铃的白丝(╯‵□′)╯︵┻━┻',
        type: 3
      },
      {
        nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
        avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
        message: '😝如果没有奶铃的白丝，世界就失去了色彩😿😿😿😿？？！',
        type: 3
      },
      {
        nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
        avatarUrl: 'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
        message: '所以我希望每天能看到奶铃穿白丝直播，这样我会非常满足！',
        type: 3
      },
      {
        nickname: 'CC奶灵',
        avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
        message: '。。。滚！！~',
        type: 1
      },
      {
        nickname: 'CC奶灵',
        avatarUrl: 'https://z3.ax1x.com/2021/08/11/ftOL4K.png',
        message: '😡😡😡',
        type: 1
      },
      {
        nickname: 'Pornhub大波妹',
        avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
        message: '哈哈',
        type: 0
      },
      {
        nickname: 'Pornhub大波妹',
        avatarUrl: 'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
        message: '我爱奶铃一生一世',
        type: 0
      }
    ])

    let i = 0
    setInterval(() => {
      if (i >= 6) i = 0
      msgList.value.push(msgList.value[i])
      i++
    }, 3000)

    const GiftCapsulePanelRef = ref<InstanceType<typeof GiftCapsulePanel>>()

    const add = () => {
      GiftCapsulePanelRef.value?.add({
        ..._l[randomNum(0, 4)],
        money: randomNum(1, 100),
        duration: 10000
      })
    }

    return { list, msgList, GiftCapsulePanelRef, add }
  }
})
</script>

<style lang="less">
.danmaku {
  padding: 10px;
}
</style>
