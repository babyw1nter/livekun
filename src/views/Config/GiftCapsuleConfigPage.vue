<template>
  <div class="config-gift-capsule options-panel">
    <a-space :size="10" style="margin-bottom: 1rem;">
      <a-button @click="sendMock">发送模拟数据</a-button>
      <a-button @click="clear">清空礼物胶囊</a-button>
    </a-space>
    <a-space direction="vertical" :size="24" style="width: 100%;">
      <a-typography-link :href="url" :copyable="{ text: url }" target="_blank">
        OBS 浏览器链接
      </a-typography-link>

      <a-space direction="vertical">
        <a-typography-text>礼物胶囊金额档位（元）</a-typography-text>
        <a-typography-text type="secondary">
          礼物胶囊的颜色风格会随着金额档位自动改变，从左到右依次对应三个档位的金额
        </a-typography-text>
        <a-space :size="10">
          <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.level[0]" />
          <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.level[1]" />
          <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.level[2]" />
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>礼物胶囊持续时间（分钟）</a-typography-text>
        <a-typography-text type="secondary">
          从左到右依次对应三个档位的金额的礼物胶囊的持续时间
        </a-typography-text>
        <a-space :size="10">
          <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.duration[0]" />
          <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.duration[1]" />
          <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.duration[2]" />
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>礼物胶囊最低金额（元）</a-typography-text>
        <a-typography-text type="secondary">
          礼物价值低于此金额将不会显示在屏幕上
        </a-typography-text>
        <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.minMoney" />
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>礼物胶囊最大数量（个）</a-typography-text>
        <a-typography-text type="secondary">
          当礼物胶囊数量达到上限时，将会移除礼物价值较低的礼物胶囊，即使它没有过期
        </a-typography-text>
        <a-input-number :min="1" v-model:value="store.state.config.giftCapsule.maximum" />
      </a-space>
    </a-space>
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

    const url = computed(() => `${window.location.origin}/#/gift-capsule?uuid=${store.state.auth.uuid}`)

    const sendMock = () => {
      http
        .post('/api/control', { method: 'sendMockDataToGiftCapsule' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const clear = () => {
      http
        .post('/api/control', { method: 'clearGiftCapsule' })
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
.config-gift-capsule {
  //
}
</style>
