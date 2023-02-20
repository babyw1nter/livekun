<template>
  <div class="config-chat-message options-panel">
    <div class="preview-wrapper">
      <ChatMessageList
        ref="ChatMessageListRef"
        class="preview-chat-message-list"
        :font-size="store.state.config.chatMessage.style.fontSize"
      />
      <a-checkbox v-model:checked="autoPreview" v-on:change="autoPreviewChange" style="margin: 1rem; float: right; color: #fff;"
        >自动预览
      </a-checkbox>
    </div>
    <a-space :size="10">
      <a-button @click="sendMock">发送 OBS 模拟数据</a-button>
      <a-button @click="clear">清空 OBS 聊天消息</a-button>
    </a-space>
    <a-typography-link :href="url" :copyable="{ text: url }" target="_blank" style="float: right; line-height: 32px">
      OBS 浏览器链接
    </a-typography-link>

    <a-divider />

    <a-space direction="vertical" :size="24" style="width: 100%">
      <a-space direction="vertical">
        <a-typography-text>文字大小</a-typography-text>
        <a-typography-text type="secondary"> 控制聊天消息的文字大小 </a-typography-text>
        <a-slider
          :min="18"
          :max="32"
          v-model:value="store.state.config.chatMessage.style.fontSize"
          style="width: 280px; margin-bottom: 3rem"
          :marks="{ 18: '小', 32: '大' }"
        />
      </a-space>

      <a-space direction="vertical">
        <a-typography-text><a-tag color="orange">开发中</a-tag>消息样式控制</a-typography-text>
        <a-typography-text type="secondary"> 自定义消息的样式 </a-typography-text>
        <a-space :size="10" style="margin-top: 1rem">
          <a-checkbox :checked="false" disabled>粉丝牌</a-checkbox>
          <a-checkbox :checked="false" disabled>守护图标</a-checkbox>
          <a-checkbox :checked="false" disabled>房管图标</a-checkbox>
          <a-checkbox :checked="false" disabled>主播图标</a-checkbox>
          <a-checkbox :checked="false" disabled>贵族图标</a-checkbox>
          <a-checkbox :checked="true" disabled>昵称特殊颜色</a-checkbox>
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text><a-tag color="orange">开发中</a-tag>消息显示控制</a-typography-text>
        <a-typography-text type="secondary"> 控制显示哪些聊天消息 </a-typography-text>
        <a-space :size="10" style="margin-top: 1rem">
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.join" disabled>进入直播间</a-checkbox>
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.follow" disabled>用户关注</a-checkbox>
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.gift" disabled>赠送礼物</a-checkbox>
        </a-space>
      </a-space>

      <a-space direction="vertical">
        <a-typography-text>黑名单用户设置</a-typography-text>
        <a-typography-text type="secondary"> 过滤指定用户的聊天消息 </a-typography-text>
        <a-space :size="10" style="margin-top: 1rem">
          <a-button type="primary" @click="showBlacklistModel" ghost>编辑黑名单</a-button>
          <span>黑名单用户数: {{ store.state.config.chatMessage.blacklist.length }}</span>
        </a-space>
      </a-space>
    </a-space>

    <a-divider />

    <a-modal v-model:visible="showBlacklistModelStatus" title="编辑黑名单" @ok="showBlacklistModel">
      <template #footer>
        <a-button key="submit" type="primary" @click="showBlacklistModel">完成</a-button>
      </template>

      <a-alert message="添加或移除用户后别忘了保存设置哦~" type="info" show-icon />

      <a-space :size="10" style="margin-top: 20px">
        <a-input v-model:value="blacklistUserCCID" placeholder="请输入用户CCID" />
        <a-input v-model:value="blacklistUserNote" placeholder="备注信息..." />
        <a-button type="primary" @click="addBlacklistUser" ghost>添加用户</a-button>
      </a-space>

      <a-table
        style="margin-top: 10px"
        size="middle"
        :columns="blacklistColumns"
        :data-source="store.state.config.chatMessage.blacklist"
        :pagination="{ hideOnSinglePage: true }"
        :locale="{ emptyText: '暂时还没有用户捏~' }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-button danger size="small" @click="delBlacklistUser(record.ccid)">移除</a-button>
          </template>
        </template>
      </a-table>
    </a-modal>

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
import ChatMessageList from '@/components/ChatMessageList.vue'
import http from '@/api/http'
import { getRandomChatMessage } from '@/api/mock'

export default defineComponent({
  components: {
    ChatMessageList
  },
  setup() {
    const store = useStore(key)
    const ChatMessageListRef = ref<InstanceType<typeof ChatMessageList>>()

    const autoPreviewTimer = ref(0)
    const autoPreview = ref(true)
    const autoPreviewChange = () => {
      ChatMessageListRef.value?.add({
        ...getRandomChatMessage()
      })
      if (autoPreview.value) {
        autoPreviewTimer.value = window.setInterval(() => {
          ChatMessageListRef.value?.add({
            ...getRandomChatMessage()
          })
        }, 1000)
      } else {
        window.clearInterval(autoPreviewTimer.value)
      }
    }

    const blacklistColumns = [
      { title: 'CCID', dataIndex: 'ccid' },
      { title: '备注信息', dataIndex: 'note' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100
      }
    ]

    const blacklistUserCCID = ref(''),
      blacklistUserNote = ref('')
    const showBlacklistModelStatus = ref(false)
    const showBlacklistModel = () => {
      showBlacklistModelStatus.value = !showBlacklistModelStatus.value
    }
    const blacklistModelhandleOk = () => {
      //
    }
    const addBlacklistUser = () => {
      const index = store.state.config.chatMessage.blacklist.findIndex((i) => i.ccid === blacklistUserCCID.value)
      if (blacklistUserCCID.value) {
        if (index < 0) {
          store.state.config.chatMessage.blacklist.push({
            ccid: blacklistUserCCID.value.trim(),
            note: blacklistUserNote.value
          })
          blacklistUserCCID.value = ''
          blacklistUserNote.value = ''
          message.success('添加成功')
        } else {
          message.error('用户已存在')
        }
      } else {
        message.error('请输入用户CCID')
      }
    }
    const delBlacklistUser = (ccid: number | string) => {
      const index = store.state.config.chatMessage.blacklist.findIndex((i) => i.ccid === ccid)
      if (index > -1) {
        store.state.config.chatMessage.blacklist.splice(index, 1)
      }
    }

    onMounted(() => autoPreviewChange())

    const url = computed(() => `${window.location.origin}/#/plugins/chat-message?uuid=${store.state.auth.uuid}`)

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

    const save = () => store.dispatch('saveRemoteConfig')

    const reset = () => null

    return {
      store,
      ChatMessageListRef,
      autoPreview,
      autoPreviewChange,
      url,
      sendMock,
      clear,
      save,
      reset,
      showBlacklistModelStatus,
      showBlacklistModel,
      blacklistModelhandleOk,
      blacklistColumns,
      addBlacklistUser,
      blacklistUserCCID,
      blacklistUserNote,
      delBlacklistUser
    }
  }
})
</script>

<style lang="less" scoped>
.config-chat-message {
  .preview-chat-message-list {
    position: absolute;
    width: 400px;
    height: 456px;
    max-width: 600px;
    max-height: 456px;
    top: 20px;
    left: 20px;
    border: 1px dashed #ccc;
    resize: both;
    overflow: hidden;
  }
}
</style>
