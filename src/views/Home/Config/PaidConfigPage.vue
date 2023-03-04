<template>
  <div class="config-paid options-panel">
    <div class="preview-wrapper">
      <PaidPanel ref="PaidPanelRef" class="preview-paid-panel" :list="paidList"
        :level="store.state.config.paid.level" />
      <a-checkbox v-model:checked="autoPreview" @change="autoPreviewChange"
        style="margin: 1rem; float: right; color: #fff;">自动预览
      </a-checkbox>
    </div>
    <a-space :size="10">
      <a-button @click="sendMock">发送模拟数据至插件</a-button>
      <a-button @click="clear">清空插件数据</a-button>
    </a-space>
    <a-typography-link :href="url" :copyable="{ text: url }" target="_blank" style="float: right; line-height: 32px;">
      OBS 浏览器链接
    </a-typography-link>

    <a-divider />

    <a-space direction="vertical" :size="24" style="width: 100%;">
      <a-space direction="vertical">
        <a-typography-text>Paid 金额档位（元）</a-typography-text>
        <a-typography-text type="secondary">
          Paid 的颜色风格会随着金额档位自动改变，从左到右依次对应7个档位的金额
        </a-typography-text>
        <a-space :size="10">
          <a-input-number v-for="i in store.state.config.paid.level.length" :key="i" :min="0"
            v-model:value="store.state.config.paid.level[i - 1]" disabled />
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text> Paid 最低金额（元）</a-typography-text>
        <a-typography-text type="secondary">
          礼物价值低于此金额将不会显示在屏幕上
        </a-typography-text>
        <a-input-number :min="0" v-model:value="store.state.config.paid.minMoney" />
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>留言礼物</a-typography-text>
        <a-typography-text type="secondary">
          开启后，观众可以在 Paid 上留言
        </a-typography-text>
        <a-switch checked-children="开" un-checked-children="关"
          v-model:checked="store.state.config.paid.comment.use" />
      </a-space>

      <a-space direction="vertical" v-if="store.state.config.paid.comment.use">
        <a-typography-text>留言消息前缀格式</a-typography-text>
        <a-typography-text type="secondary">
          观众在送出礼物前发出以此前缀开头的消息，在送出礼物后就会将此消息作为该 Paid 的留言
        </a-typography-text>
        <a-input v-model:value="store.state.config.paid.comment.prefix"
          :disabled="!store.state.config.paid.comment.use" style="width: 90px;" />
      </a-space>

      <a-space direction="vertical" v-if="store.state.config.paid.comment.use">
        <a-typography-text>留言礼物金额（元）</a-typography-text>
        <a-typography-text type="secondary">
          当礼物价值大于或等于此金额时才可以留言
        </a-typography-text>
        <a-input-number :min="0" v-model:value="store.state.config.paid.comment.giftMinMoney"
          :disabled="!store.state.config.paid.comment.use" />
      </a-space>

      <a-space direction="vertical" v-if="store.state.config.paid.comment.use">
        <a-typography-text>指定留言礼物列表</a-typography-text>
        <a-typography-text type="secondary">
          在此列表内的礼物才可以留言，一行一个，留空表示不做限制
        </a-typography-text>
        <a-textarea v-model:value="store.state.config.paid.comment.giftWhitelist"
          :disabled="!store.state.config.paid.comment.use" :rows="4" style="width: 300px;" />
      </a-space>
    </a-space>

    <a-divider />

    <a-space :size="10">
      <a-button type="primary" @click="save">保存设置</a-button>
      <a-button danger @click="reset">恢复默认</a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import http from '@/api/http'
import PaidPanel from '@/components/PaidPanel.vue'
import { getRandomPaid } from '@/api/mock'

const store = useStore(key)
const PaidPanelRef = ref<InstanceType<typeof PaidPanel>>()

const autoPreviewTimer = ref(0)
const autoPreview = ref(true)
const autoPreviewChange = () => {
  PaidPanelRef.value?.add({
    ...getRandomPaid()
  })
  if (autoPreview.value) {
    autoPreviewTimer.value = window.setInterval(() => {
      PaidPanelRef.value?.add({
        ...getRandomPaid()
      })
    }, 3000)
  } else {
    window.clearInterval(autoPreviewTimer.value)
  }
}

onMounted(() => autoPreviewChange())

const url = computed(() => `${window.location.origin}/#/plugins/paid?uuid=${store.state.auth.uuid}`)

const sendMock = () => {
  http
    .post('/api/control', { method: 'sendMockDataToPaid' })
    .then(res => {
      //
    })
    .catch((reason: Error) => {
      message.error(reason.toString())
    })
}

const clear = () => {
  http
    .post('/api/control', { method: 'clearPaid' })
    .then(res => {
      //
    })
    .catch((reason: Error) => {
      message.error(reason.toString())
    })
}

const save = () => store.dispatch('saveRemoteConfig')

const reset = () => null

const paidList = ref([])
</script>

<style lang="less" scoped>
.config-paid {
  .preview-paid-panel {
    position: absolute;
    width: 350px;
    height: 370px;
    top: 70px;
    left: 20px;
  }
}
</style>
