<template>
  <div class="config-chat-message options-panel">
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :lg="14" :xl="16">
        <a-space direction="vertical" size="middle" style="width: 100%;">
          <a-card>
            <a-typography-text strong>自定义样式</a-typography-text>

            <a-form :label-align="'right'" :label-col="labelCol" style="max-width: none;">
              <a-row :gutter="24" style="margin: 0;">
                <a-divider orientation="left">文本样式</a-divider>

                <a-col :xs="24" :sm="24" :md="12" :lg="24" :xl="12">
                  <a-form-item label="文字大小">
                    <a-select ref="select"
                      v-model:value="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.fontSize">
                      <a-select-option :value="i + 17" v-for="i in 15" :key="i + 114514">{{ i + 17 }}px</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="24" :md="12" :lg="24" :xl="12">
                  <a-form-item label="文字字体">
                    <a-select ref="select" :value="'default'">
                      <a-select-option value="default">默认</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">普通用户</a-divider>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="昵称颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.normal.nickname">
                    </ColorPicker>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="消息颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.normal.message">
                    </ColorPicker>
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">守护、舰长</a-divider>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="月守、舰长昵称颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.guard.lv1.nickname">
                    </ColorPicker>
                  </a-form-item>

                  <a-form-item label="年守、提督昵称颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.guard.lv2.nickname">
                    </ColorPicker>
                  </a-form-item>

                  <a-form-item label="总督昵称颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.guard.lv3.nickname">
                    </ColorPicker>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="月守、舰长消息颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.guard.lv1.message">
                    </ColorPicker>
                  </a-form-item>

                  <a-form-item label="年守、提督消息颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.guard.lv2.message">
                    </ColorPicker>
                  </a-form-item>

                  <a-form-item label="总督消息颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.guard.lv3.message">
                    </ColorPicker>
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">房管</a-divider>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="昵称颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.admin.nickname">
                    </ColorPicker>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="消息颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.admin.message">
                    </ColorPicker>
                  </a-form-item>
                </a-col>

                <a-divider orientation="left">主播</a-divider>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="昵称颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.anchor.nickname">
                    </ColorPicker>
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="消息颜色">
                    <ColorPicker format="hex" disable-alpha disable-history
                      v-model:pure-color="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.customStyle.color.anchor.message">
                    </ColorPicker>
                  </a-form-item>
                </a-col>

              </a-row>
            </a-form>
          </a-card>

          <a-card>
            <a-typography-text strong>业务、身份图标显示</a-typography-text>
            <a-tag color="orange" style="margin-left: 4px; margin-top: -2px; vertical-align: bottom;">未完成</a-tag>

            <a-divider />

            <a-form :label-align="'right'" :label-col="labelCol" style="max-width: none;">
              <a-row :gutter="24" style="margin: 0;">
                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="粉丝徽章">
                    <a-switch :checked="false" checked-children="开" un-checked-children="关" disabled />
                  </a-form-item>

                  <a-form-item label="守护、舰长图标">
                    <a-switch :checked="false" checked-children="开" un-checked-children="关" disabled />
                  </a-form-item>

                  <a-form-item label="贵族图标">
                    <a-switch :checked="false" checked-children="开" un-checked-children="关" disabled />
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="房管图标">
                    <a-switch :checked="true" checked-children="开" un-checked-children="关" disabled />
                  </a-form-item>

                  <a-form-item label="主播图标">
                    <a-switch :checked="false" checked-children="开" un-checked-children="关" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-card>

          <a-card>
            <a-typography-text strong>额外内容显示</a-typography-text>

            <a-divider />

            <a-form :label-align="'right'" :label-col="labelCol" style="max-width: none;">
              <a-row :gutter="24" style="margin: 0;">
                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="Ticket 价签栏">
                    <a-switch v-model:checked="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.type.ticket"
                      checked-children="开" un-checked-children="关" />
                  </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="12" :lg="24" :xl="12">
                  <a-form-item label="Paid 礼物卡片">
                    <a-switch v-model:checked="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.type.paid"
                      checked-children="开" un-checked-children="关" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>

          </a-card>

          <a-card>
            <a-typography-text strong>事件消息显示</a-typography-text>
            <a-tag color="orange" style="margin-left: 4px; margin-top: -2px; vertical-align: bottom;">未完成</a-tag>

            <a-divider />

            <a-form :label-align="'right'" :label-col="labelCol" style="max-width: none;">
              <a-row :gutter="24" style="margin: 0;">
                <a-col :xs="24">
                  <a-form-item label="事件类型">
                    <a-checkbox-group>
                      <a-checkbox v-model:checked="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.event.join"
                        disabled>进入直播间</a-checkbox>
                      <a-checkbox
                        v-model:checked="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.event.follow"
                        disabled>用户关注</a-checkbox>
                      <a-checkbox v-model:checked="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig.event.gift"
                        disabled>赠送礼物</a-checkbox>
                    </a-checkbox-group>
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
              <a-button type="primary" @click="chatMessagePluginConfig.save">保存设置</a-button>
              <a-button danger @click="chatMessagePluginConfig.reset">恢复默认</a-button>
            </a-space>
          </a-card>
        </a-space>
      </a-col>

      <a-col :sm="24" :lg="10" :xl="8">
        <a-affix :offset-top="16" style="width: 100%;">
          <PluginPreviewWrapper class="plugin-chat-message-preview" :plugin-name="PluginNames.PLUGIN_CHAT_MESSAGE"
            v-model:auto-preview="autoPreview" @on-auto-preview-switch-change="autoPreviewSwitchChange">
            <ChatMessageList ref="ChatMessageListRef" class="preview-chat-message-list"
              :chat-message-config="chatMessagePluginConfig.reactivityPluginConfig.pluginConfig"
              :ticket-config="ticketPluginConfig.reactivityPluginConfig.pluginConfig"
              :paid-config="paidPluginConfig.reactivityPluginConfig.pluginConfig" />
          </PluginPreviewWrapper>
        </a-affix>
      </a-col>

    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import type ChatMessageList from '@/components/plugins/ChatMessage/components/ChatMessageList.vue'
import http from '@/api/http'
import { getRandomChatMessage } from '@/api/mock'
import { useChatMessagePluginConfig } from '@/api/config'
import { PluginNames } from '@/api/plugins'

const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

let { chatMessagePluginConfig, ticketPluginConfig, paidPluginConfig } = await useChatMessagePluginConfig()

const autoPreviewTimer = ref(0)
const autoPreview = ref(true)
const autoPreviewSwitchChange = (checked: boolean) => {
  if (checked) {
    ChatMessageListRef.value?.add({
      ...getRandomChatMessage()
    })

    autoPreviewTimer.value = window.setInterval(() => {
      ChatMessageListRef.value?.add({
        ...getRandomChatMessage()
      })
    }, 1000)
  } else {
    window.clearInterval(autoPreviewTimer.value)
  }
}

onMounted(() => autoPreviewSwitchChange(true))

const sendMock = () => {
  http
    .post('/api/control', { method: 'sendMockDataToChatMessage' })
    .then((res) => {
      //
    })
    .catch((reason: Error) => {
      message.error(reason.toString())
    })
}

const clear = () => {
  http
    .post('/api/control', { method: 'clearChatMessage' })
    .then((res) => {
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
.config-chat-message {
  .plugin-chat-message-preview {
    height: calc(100vh - 150px);
  }

  .preview-chat-message-list {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
