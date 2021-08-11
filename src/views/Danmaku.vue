<template>
  <div class="danmaku">
    <ul class="capsule-list clearfix" style="padding: 0">
      <li v-for="(item, index) in list" :key="index">
        <GiftCapsule
          :type="`level-${item.type}`"
          :avatar-url="item.avatarUrl"
          :money="item.money"
        >
        </GiftCapsule>
      </li>
    </ul>
    <h1>Danmaku</h1>
    <GiftCard
      v-for="(item, index) in list"
      :key="index"
      :type="`level-${item.type}`"
      :avatar-url="item.avatarUrl"
      :nickname="item.nickname"
      :money="item.money"
      :message="item.message"
    >
    </GiftCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GiftCard from '@/components/Danmaku/GiftCard.vue'
import GiftCapsule from '@/components/Danmaku/GiftCapsule.vue'

export default defineComponent({
  components: { GiftCard, GiftCapsule },
  setup() {
    const list = ref(
      [
        {
          nickname: 'Pornhub大波妹',
          avatarUrl:
            'https://img2.baidu.com/it/u=222120700,1745793916&fm=26&fmt=auto&gp=0.jpg',
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
          avatarUrl:
            'https://img0.baidu.com/it/u=1536857165,2921056634&fm=26&fmt=auto&gp=0.jpg',
          money: 666,
          message: '赠送了圣旨降临 × 1',
          type: 2
        },
        {
          nickname: '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
          avatarUrl:
            'https://img0.baidu.com/it/u=1355519613,4273607392&fm=26&fmt=auto&gp=0.jpg',
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
      ].sort((a, b) => b.money - a.money)
    )

    return { list }
  }
})
</script>

<style lang="less">
.danmaku {
  padding: 10px;
  .capsule-list {
    list-style: none;
    li {
      float: left;
      margin-right: 10px;
    }
  }
}
</style>
