<template>
  <div class="config-paid options-panel">
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :lg="14" :xl="16" style="width: 100%;">
        <a-space direction="vertical" size="middle" style="width: 100%;">
          <a-card>
            <a-typography-text strong>通用设置</a-typography-text>
            <a-tag color="orange" style="margin-left: 4px; margin-top: -2px; vertical-align: bottom;">未完成</a-tag>

            <a-divider />

            <a-form :label-align="'right'" :label-col="labelCol" style="max-width: none;">
              <a-row :gutter="24" style="margin: 0;">
                <a-col :xs="24" :sm="24" :md="12" :lg="24" :xl="12">
                  <a-form-item label="最大数量">
                    <a-input-number :min="1" :value="100" disabled />
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
              <!-- <a-typography-text type="secondary"> 控制在 OBS 中添加的插件 </a-typography-text> -->
              <a-space :size="10" style="margin-top: 1rem">
                <a-button @click="sendMock">发送模拟数据至插件</a-button>
                <a-button @click="clear">清空插件数据</a-button>
              </a-space>
            </a-space>
          </a-card>

          <a-card>
            <a-space :size="10">
              <a-button type="primary" @click="save">保存设置</a-button>
              <a-button danger @click="reset">恢复默认</a-button>
            </a-space>
          </a-card>
        </a-space>
      </a-col>

      <a-col :sm="24" :lg="10" :xl="8" style="width: 100%;">
        <a-affix :offset-top="16" style="width: 100%;">
          <PluginPreviewWrapper class="plugin-paid-preview" :plugin-name="PluginNames.PLUGIN_PAID"
            v-model:auto-preview="autoPreview" @on-auto-preview-switch-change="autoPreviewSwitchChange">
            <PaidPanel ref="PaidPanelRef" class="preview-paid-panel" :list="paidList"
              :level="reactivityPluginConfig.pluginConfig.level" />
          </PluginPreviewWrapper>
        </a-affix>
      </a-col>
    </a-row>
    <!-- <div class="preview-wrapper">
      <PaidPanel ref="PaidPanelRef" class="preview-paid-panel" :list="paidList" :level="reactivityPluginConfig.pluginConfig.level" />
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
        <a-typography-text><a-tag color="orange">开发中</a-tag>Paid 金额档位（元）</a-typography-text>
        <a-typography-text type="secondary">
          Paid 的颜色风格会随着金额档位自动改变，从左到右依次对应7个档位的金额
        </a-typography-text>
        <a-space :size="10">
          <a-input-number v-for="i in reactivityPluginConfig.pluginConfig.level.length" :key="i" :min="0"
            v-model:value="reactivityPluginConfig.pluginConfig.level[i - 1]" disabled />
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text><a-tag color="orange">开发中</a-tag>Paid 最低金额（元）</a-typography-text>
        <a-typography-text type="secondary">
          礼物价值低于此金额将不会显示在屏幕上
        </a-typography-text>
        <a-input-number :min="0" v-model:value="reactivityPluginConfig.pluginConfig.minMoney" disabled />
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>留言礼物</a-typography-text>
        <a-typography-text type="secondary">
          开启后，观众可以在 Paid 上留言
        </a-typography-text>
        <a-switch checked-children="开" un-checked-children="关" v-model:checked="reactivityPluginConfig.pluginConfig.comment.use" />
      </a-space>

      <a-space direction="vertical" v-if="reactivityPluginConfig.pluginConfig.comment.use">
        <a-typography-text>留言消息前缀格式</a-typography-text>
        <a-typography-text type="secondary">
          观众在送出礼物前发出以此前缀开头的消息，在送出礼物后就会将此消息作为该 Paid 的留言
        </a-typography-text>
        <a-input v-model:value="reactivityPluginConfig.pluginConfig.comment.prefix" :disabled="!reactivityPluginConfig.pluginConfig.comment.use" style="width: 90px;" />
      </a-space>

      <a-space direction="vertical" v-if="reactivityPluginConfig.pluginConfig.comment.use">
        <a-typography-text><a-tag color="orange">开发中</a-tag>留言礼物金额（元）</a-typography-text>
        <a-typography-text type="secondary">
          当礼物价值大于或等于此金额时才可以留言
        </a-typography-text>
        <a-input-number :min="0" v-model:value="reactivityPluginConfig.pluginConfig.comment.giftMinMoney" disabled />
      </a-space>

      <a-space direction="vertical" v-if="reactivityPluginConfig.pluginConfig.comment.use">
        <a-typography-text>指定留言礼物列表</a-typography-text>
        <a-typography-text type="secondary">
          在此列表内的礼物才可以留言，一行一个，留空表示不做限制
        </a-typography-text>
        <a-textarea v-model:value="reactivityPluginConfig.pluginConfig.comment.giftWhitelist" :disabled="!reactivityPluginConfig.pluginConfig.comment.use" :rows="4"
          style="width: 300px;" />
      </a-space>
    </a-space>

    <a-divider />

    <a-space :size="10">
      <a-button type="primary" @click="save">保存设置</a-button>
      <a-button danger @click="reset">恢复默认</a-button>
    </a-space> -->
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import http from '@/api/http'
import PaidPanel from '@/components/PaidPanel.vue'
import { getRandomPaid } from '@/api/mock'
import { PluginNames } from '@/api/plugins'
import { usePluginConfig } from '@/api/config'

const PaidPanelRef = ref<InstanceType<typeof PaidPanel>>()

let { reactivityPluginConfig, pull, reset, save } = usePluginConfig<PluginNames.PLUGIN_PAID>(PluginNames.PLUGIN_PAID)

const autoPreviewTimer = ref(0)
const autoPreview = ref(true)
const autoPreviewSwitchChange = (checked: boolean) => {
  if (checked) {
    PaidPanelRef.value?.add({
      ...getRandomPaid()
    })

    autoPreviewTimer.value = window.setInterval(() => {
      PaidPanelRef.value?.add({
        ...getRandomPaid()
      })
    }, 3000)
  } else {
    window.clearInterval(autoPreviewTimer.value)
  }
}

onMounted(() => autoPreviewSwitchChange(true))

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

const paidList = ref([])

const labelCol = {
  style: {
    width: '150px'
  }
}
</script>

<style lang="less" scoped>
.config-paid {
  .plugin-paid-preview {
    height: calc(100vh - 150px);
    width: 100%;
  }
}
</style>
