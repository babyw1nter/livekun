<template>
  <div class="config-ticket options-panel">
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :lg="14" :xl="16" style="width: 100%;">
        <a-space direction="vertical" size="middle" style="width: 100%;">
          <a-card>
            <a-typography-text strong>通用设置</a-typography-text>

            <a-divider />

            <a-form :label-align="'right'" :label-col="labelCol" style="max-width: none;">
              <a-row :gutter="24" style="margin: 0;">
                <a-col :xs="24" :sm="24" :md="12" :lg="24" :xl="12">
                  <a-form-item label="最大数量">
                    <a-input-number :min="1" v-model:value="reactivityPluginConfig.pluginConfig.maximum" />
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="24" :md="12" :lg="24" :xl="12">
                  <a-form-item label="最低金额">
                    <a-input-number :min="0" v-model:value="reactivityPluginConfig.pluginConfig.minMoney" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-card>

          <a-card>
            <a-space direction="vertical">
              <a-typography-text strong>插件控制</a-typography-text>
              <a-space :size="10" style="margin-top: 1rem">
                <a-button @click="sendMock">发送模拟数据至插件</a-button>
                <a-button @click="clear">清空插件数据</a-button>
              </a-space>
            </a-space>
          </a-card>

          <a-card>
            <a-space :size="10">
              <a-button type="primary" @click="save">保存设置</a-button>
              <a-popconfirm title="确定要恢复默认吗？" ok-text="确定" cancel-text="取消" @confirm="reset">
                <a-button danger>恢复默认</a-button>
              </a-popconfirm>
            </a-space>
          </a-card>
        </a-space>
      </a-col>

      <a-col :sm="24" :lg="10" :xl="8" style="width: 100%;">
        <a-affix :offset-top="16" style="width: 100%;">
          <PluginPreviewWrapper class="plugin-ticket-preview" :plugin-name="PluginNames.PLUGIN_TICKET"
            v-model:auto-preview="autoPreview" @on-auto-preview-switch-change="autoPreviewSwitchChange">
            <TicketPanel ref="TicketPanelRef" class="preview-ticket-panel"
              :level="reactivityPluginConfig.pluginConfig.level"
              :duration="reactivityPluginConfig.pluginConfig.duration" />
          </PluginPreviewWrapper>
        </a-affix>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue/es'
import type TicketPanel from '@/plugins/Ticket/components/TicketPanel.vue'
import http from '@/api/http'
import { getRandomTicket } from '@/api/mock'
import { PluginNames } from '@/api/plugins'
import { usePluginConfig } from '@/api/pluginmanager'
import { TypeTicketPluginConfig } from '../config'

const TicketPanelRef = ref<InstanceType<typeof TicketPanel>>()

let { reactivityPluginConfig, pull, reset, save } = await usePluginConfig<TypeTicketPluginConfig>(PluginNames.PLUGIN_TICKET)

const autoPreviewTimer = ref(0)
const autoPreview = ref(true)
const autoPreviewSwitchChange = (checked: boolean) => {
  if (checked) {
    TicketPanelRef.value?.add({
      ...getRandomTicket()
    })
    autoPreviewTimer.value = window.setInterval(() => {
      TicketPanelRef.value?.add({
        ...getRandomTicket()
      })
    }, 5000)
  } else {
    window.clearInterval(autoPreviewTimer.value)
  }
}

onMounted(() => autoPreviewSwitchChange(true))

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

const labelCol = {
  style: {
    width: '150px'
  }
}
</script>

<style lang="less" scoped>
.config-ticket {
  .plugin-ticket-preview {
    height: calc(100vh - 150px);
    width: 100%;
  }
}
</style>
