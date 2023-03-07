<template>
  <div class="config-ticket options-panel">
    <div class="preview-wrapper">
      <TicketPanel ref="TicketPanelRef" class="preview-ticket-panel" :level="reactivityPluginConfig.pluginConfig.level"
        :duration="reactivityPluginConfig.pluginConfig.duration" />
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
        <a-typography-text><a-tag color="orange">开发中</a-tag>Ticket 金额档位（元）</a-typography-text>
        <a-typography-text type="secondary">
          Ticket 的颜色风格会随着金额档位自动改变，从左到右依次对应7个档位的金额
        </a-typography-text>
        <a-space :size="10">
          <a-input-number v-for="i in reactivityPluginConfig.pluginConfig.level.length" :key="i + 888" :min="0"
            v-model:value="reactivityPluginConfig.pluginConfig.level[i - 1]" disabled />
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text><a-tag color="orange">开发中</a-tag>Ticket 持续时间（分钟）</a-typography-text>
        <a-typography-text type="secondary">
          从左到右依次对应7个档位的金额的 Ticket 的持续时间
        </a-typography-text>
        <a-space :size="10">
          <a-input-number v-for="i in reactivityPluginConfig.pluginConfig.duration.length" :key="i + 999" :min="0"
            v-model:value="reactivityPluginConfig.pluginConfig.duration[i - 1]" disabled />
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text><a-tag color="orange">开发中</a-tag>Ticket 最低金额（元）</a-typography-text>
        <a-typography-text type="secondary">
          礼物价值低于此金额将不会显示在屏幕上
        </a-typography-text>
        <a-input-number :min="0" v-model:value="reactivityPluginConfig.pluginConfig.minMoney" disabled />
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>Ticket 最大数量（个）</a-typography-text>
        <a-typography-text type="secondary">
          当 Ticket 数量达到上限时，将会移除末尾的 Ticket，即使它没有过期
        </a-typography-text>
        <a-input-number :min="1" v-model:value="reactivityPluginConfig.pluginConfig.maximum" />
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
import type TicketPanel from '@/components/TicketPanel.vue'
import http from '@/api/http'
import { getRandomTicket } from '@/api/mock'
import { PluginNames } from '@/api/plugins'
import { usePluginConfig } from '@/api/config'

const store = useStore(key)
const TicketPanelRef = ref<InstanceType<typeof TicketPanel>>()

let { reactivityPluginConfig, pull, reset, save } = usePluginConfig<PluginNames.PLUGIN_TICKET>(PluginNames.PLUGIN_TICKET)

const autoPreviewTimer = ref(0)
const autoPreview = ref(true)
const autoPreviewChange = () => {
  TicketPanelRef.value?.add({
    ...getRandomTicket()
  })
  if (autoPreview.value) {
    autoPreviewTimer.value = window.setInterval(() => {
      TicketPanelRef.value?.add({
        ...getRandomTicket()
      })
    }, 5000)
  } else {
    window.clearInterval(autoPreviewTimer.value)
  }
}

onMounted(() => autoPreviewChange())

const url = computed(() => `${window.location.origin}/#/plugins/ticket?uuid=${store.state.auth.uuid}`)

const sendMock = () => {
  http
    .post('/api/control', { method: 'sendMockDataToTicket' })
    .then(res => {
      //
    })
    .catch((reason: Error) => {
      message.error(reason.toString())
    })
}

const clear = () => {
  http
    .post('/api/control', { method: 'clearTicket' })
    .then(res => {
      //
    })
    .catch((reason: Error) => {
      message.error(reason.toString())
    })
}
</script>

<style lang="less" scoped>
.config-ticket {
  .preview-ticket-panel {
    position: absolute;
    width: 100%;
    top: 50px;
  }
}
</style>
