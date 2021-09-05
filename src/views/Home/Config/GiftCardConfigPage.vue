<template>
  <div class="config-gift-card options-panel">
    <div class="preview-wrapper">
      <GiftCardPanel
        ref="GiftCardPanelRef"
        class="preview-gift-card-panel"
        :list="giftCardList"
        :level="store.state.config.giftCard.level"
      />
      <a-checkbox v-model:checked="autoPreview" v-on:change="autoPreviewChange" style="margin: 1rem; float: right;"
        >自动预览
      </a-checkbox>
    </div>
    <a-space :size="10">
      <a-button @click="sendMock">发送 OBS 模拟数据</a-button>
      <a-button @click="clear">清空 OBS 礼物卡片</a-button>
    </a-space>
    <a-typography-link :href="url" :copyable="{ text: url }" target="_blank" style="float: right; line-height: 32px;">
      OBS 浏览器链接
    </a-typography-link>

    <a-divider />

    <a-space direction="vertical" :size="24" style="width: 100%;">
      <a-space direction="vertical">
        <a-typography-text>礼物卡片金额档位（元）</a-typography-text>
        <a-typography-text type="secondary">
          礼物卡片的颜色风格会随着金额档位自动改变，从左到右依次对应三个档位的金额
        </a-typography-text>
        <a-space :size="10">
          <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[0]" />
          <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[1]" />
          <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[2]" />
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>礼物卡片最低金额（元）</a-typography-text>
        <a-typography-text type="secondary">
          礼物价值低于此金额将不会显示在屏幕上
        </a-typography-text>
        <a-input-number :min="0" v-model:value="store.state.config.giftCard.minMoney" />
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>留言礼物</a-typography-text>
        <a-typography-text type="secondary">
          开启后，观众可以在礼物卡片上留言
        </a-typography-text>
        <a-switch
          checked-children="开"
          un-checked-children="关"
          v-model:checked="store.state.config.giftCard.comment.use"
        />
      </a-space>

      <a-space direction="vertical" v-if="store.state.config.giftCard.comment.use">
        <a-typography-text>留言消息前缀格式</a-typography-text>
        <a-typography-text type="secondary">
          观众在送出礼物前发出以此前缀开头的消息，在送出礼物后就会将此消息作为该礼物卡片的留言
        </a-typography-text>
        <a-input
          v-model:value="store.state.config.giftCard.comment.prefix"
          :disabled="!store.state.config.giftCard.comment.use"
          style="width: 90px;"
        />
      </a-space>

      <a-space direction="vertical" v-if="store.state.config.giftCard.comment.use">
        <a-typography-text>留言礼物金额（元）</a-typography-text>
        <a-typography-text type="secondary">
          当礼物价值大于或等于此金额时才可以留言
        </a-typography-text>
        <a-input-number
          :min="0"
          v-model:value="store.state.config.giftCard.comment.giftMinMoney"
          :disabled="!store.state.config.giftCard.comment.use"
        />
      </a-space>

      <a-space direction="vertical" v-if="store.state.config.giftCard.comment.use">
        <a-typography-text>指定留言礼物列表</a-typography-text>
        <a-typography-text type="secondary">
          在此列表内的礼物才可以留言，一行一个，留空表示不做限制
        </a-typography-text>
        <a-textarea
          v-model:value="store.state.config.giftCard.comment.giftWhitelist"
          :disabled="!store.state.config.giftCard.comment.use"
          :rows="4"
          style="width: 300px;"
        />
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
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import http from '@/api/http'
import GiftCardPanel from '@/components/GiftCardPanel.vue'
import { getRandomGiftCard } from '@/api/mock'

export default defineComponent({
  components: {
    GiftCardPanel
  },
  setup() {
    const store = useStore(key)
    const GiftCardPanelRef = ref<InstanceType<typeof GiftCardPanel>>()

    const autoPreviewTimer = ref(0)
    const autoPreview = ref(true)
    const autoPreviewChange = () => {
      GiftCardPanelRef.value?.add({
        ...getRandomGiftCard()
      })
      if (autoPreview.value) {
        autoPreviewTimer.value = window.setInterval(() => {
          GiftCardPanelRef.value?.add({
            ...getRandomGiftCard()
          })
        }, 3000)
      } else {
        window.clearInterval(autoPreviewTimer.value)
      }
    }

    onMounted(() => autoPreviewChange())

    const url = computed(() => `${window.location.origin}/#/plugins/gift-card?uuid=${store.state.auth.uuid}`)

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

    const giftCardList = ref([])

    return {
      store,
      GiftCardPanelRef,
      autoPreview,
      autoPreviewChange,
      url,
      sendMock,
      clear,
      save,
      reset,
      giftCardList
    }
  }
})
</script>

<style lang="less" scoped>
.config-gift-card {
  .preview-gift-card-panel {
    position: absolute;
    width: 300px;
    height: 340px;
    top: 90px;
    left: 20px;
  }
}
</style>
