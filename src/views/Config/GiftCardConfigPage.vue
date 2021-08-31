<template>
  <div class="config-gift-card options-panel">
    <a-space :size="10" style="margin-bottom: 1rem;">
      <a-button type="primary" @click="sendMock">发送模拟数据</a-button>
      <a-button danger @click="clear">清空礼物卡片</a-button>
    </a-space>
    <a-typography-paragraph :copyable="{ text: url }"> OBS浏览器链接：{{ url }} </a-typography-paragraph>
    <a-divider />
    <p>礼物卡片的颜色风格会随着金额档位自动改变。从左到右依次对应三个档位的金额（元）。</p>
    <a-space :size="10">
      <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[0]" />
      <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[1]" />
      <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[2]" />
    </a-space>
    <a-divider />
    <p>礼物卡片最低金额（元）。低于此金额时不显示。</p>
    <a-input-number :min="0" v-model:value="store.state.config.giftCard.minMoney" />
    <a-divider />
    <p>礼物卡片留言功能。</p>
    <a-switch
      checked-children="开"
      un-checked-children="关"
      v-model:checked="store.state.config.giftCard.comment.use"
    />
    <p style="margin-top: 1rem;">
      判断留言的前缀格式。当用户在送出礼物前发出“{{
        store.state.config.giftCard.comment.prefix
      }}这是一条礼物留言。”时，在送出礼物后就会将此消息作为该礼物卡片的留言。
    </p>
    <a-input
      v-model:value="store.state.config.giftCard.comment.prefix"
      :disabled="!store.state.config.giftCard.comment.use"
      style="width: 90px;"
    />
    <p style="margin-top: 1rem;">留言礼物金额（元）。礼物价值大于此金额才可以留言。</p>
    <a-input-number
      :min="0"
      v-model:value="store.state.config.giftCard.comment.giftMinMoney"
      :disabled="!store.state.config.giftCard.comment.use"
    />
    <p style="margin-top: 1rem;">留言礼物类型。指定礼物类型才可以留言，一行一个，留空表示不做限制。</p>
    <a-textarea
      v-model:value="store.state.config.giftCard.comment.giftWhitelist"
      :disabled="!store.state.config.giftCard.comment.use"
      :rows="4"
      style="width: 300px;"
    />
    <a-divider />
    <a-space :size="10">
      <a-button type="primary" @click="save">保存设置</a-button>
      <a-button danger @click="reset">恢复默认</a-button>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import http from '@/api/http'

export default defineComponent({
  setup() {
    const store = useStore(key)

    const url = computed(() => `${window.location.origin}/#/gift-card?uuid=${store.state.auth.uuid}`)

    const sendMock = () => {
      http
        .post('/api/control', { method: 'sendMockDataToGiftCard' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const clear = () => {
      http
        .post('/api/control', { method: 'clearGiftCard' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const save = () => store.dispatch('saveRemoteConfig')

    const reset = () => null

    return {
      store,
      url,
      sendMock,
      clear,
      save,
      reset
    }
  }
})
</script>

<style lang="less" scoped>
.config-gift-card {
  // padding: 1rem 0;
}
</style>
