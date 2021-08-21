<template>
  <div class="config">
    <a-tabs tab-position="top" v-model:activeKey="activeKey">
      <a-tab-pane :key="1" tab="礼物胶囊">
        <div class="options-panel">
          <p>控制中心</p>
          <a-space :size="10">
            <a-button type="primary" @click="sendMockGiftCapsule">发送模拟数据</a-button>
            <a-button danger @click="clearGiftCapsule">清空礼物胶囊</a-button>
          </a-space>
          <a-divider />
          <p>礼物胶囊的颜色风格会随着金额档位自动改变。从左到右依次对应三个档位的金额。</p>
          <a-space :size="10">
            <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.level[0]" />
            <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.level[1]" />
            <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.level[2]" />
          </a-space>
          <a-divider />
          <p>礼物胶囊的持续时间（分钟）。从左到右依次对应三个档位的金额的礼物胶囊的持续时间。</p>
          <a-space :size="10">
            <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.duration[0]" />
            <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.duration[1]" />
            <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.duration[2]" />
          </a-space>
          <a-divider />
          <p>礼物胶囊最低金额。低于此金额时不显示。</p>
          <a-input-number :min="0" v-model:value="store.state.config.giftCapsule.minMoney" />
          <a-divider />
          <p>礼物胶囊最多显示多少个。当达到数量上限时，将会移除金额较低的礼物胶囊，即使它没有到期。</p>
          <a-input-number :min="1" v-model:value="store.state.config.giftCapsule.maximum" />
        </div>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="礼物卡片">
        <div class="options-panel">
          <p>控制中心</p>
          <a-space :size="10">
            <a-button type="primary" @click="sendMockGiftCard">发送模拟数据</a-button>
            <a-button danger @click="clearGiftCard">清空礼物卡片</a-button>
          </a-space>
          <a-divider />
          <p>礼物卡片的颜色风格会随着金额档位自动改变。从左到右依次对应三个档位的金额。</p>
          <a-space :size="10">
            <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[0]" />
            <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[1]" />
            <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[2]" />
          </a-space>
          <a-divider />
          <p>礼物卡片最低金额。低于此金额时不显示。</p>
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
          <p style="margin-top: 1rem;">留言礼物金额。礼物价值大于此金额才可以留言。</p>
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
        </div>
      </a-tab-pane>
      <a-tab-pane :key="3" tab="聊天消息">
        <div class="options-panel">
          <!-- <p>普通用户昵称颜色</p>
          <p>主播昵称颜色</p>
          <p>月费守护用户昵称颜色</p>
          <p>年费守护用户昵称颜色</p>
          <p>贵族用户昵称颜色</p>
          <a-divider /> -->
          <p>控制中心</p>
          <a-space :size="10">
            <a-button type="primary" @click="sendMockChatMessage">发送模拟数据</a-button>
            <a-button danger @click="clearChatMessage">清空聊天消息</a-button>
          </a-space>
          <a-divider />
          <p>聊天消息的文字大小。</p>
          <a-slider
            :min="12"
            :max="32"
            v-model:value="store.state.config.chatMessage.style.fontSize"
            style="width: 280px"
            :marks="{ 12: '小', 32: '大' }"
          />
          <a-divider />
          <p>控制一些聊天消息的显示和隐藏。</p>
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.join">进入直播间</a-checkbox>
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.follow" disabled>用户关注</a-checkbox>
          <a-checkbox v-model:checked="store.state.config.chatMessage.show.gift" disabled>赠送礼物</a-checkbox>
        </div>
      </a-tab-pane>
    </a-tabs>
    <PageFooter></PageFooter>
    <div class="toolbar">
      <a-space :size="10">
        <a-button type="primary" @click="save">保存设置</a-button>
        <a-button danger @click="reset">恢复默认</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import PageFooter from '@/components/CommonComponents/PageFooter.vue'
import axios from 'axios'

const host = 'http://localhost:39074'

export default defineComponent({
  name: 'Config',
  components: { PageFooter },
  setup() {
    const activeKey = ref(1)
    const store = useStore(key)

    const save = () => {
      store.dispatch('saveRemoteConfig')
    }

    const reset = () => {
      store.commit('reset')
    }

    const sendMockGiftCapsule = () => {
      axios
        .post(host + '/control', { method: 'sendMockDataToGiftCapsule' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const sendMockChatMessage = () => {
      axios
        .post(host + '/control', { method: 'sendMockDataToChatMessage' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const sendMockGiftCard = () => {
      axios
        .post(host + '/control', { method: 'sendMockDataToGiftCard' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const clearGiftCapsule = () => {
      axios
        .post(host + '/control', { method: 'clearGiftCapsule' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const clearChatMessage = () => {
      axios
        .post(host + '/control', { method: 'clearChatMessage' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    const clearGiftCard = () => {
      axios
        .post(host + '/control', { method: 'clearGiftCard' })
        .then(res => {
          //
        })
        .catch((reason: Error) => {
          message.error(reason.toString())
        })
    }

    return {
      activeKey,
      store,
      save,
      reset,
      sendMockGiftCapsule,
      sendMockChatMessage,
      sendMockGiftCard,
      clearGiftCapsule,
      clearChatMessage,
      clearGiftCard
    }
  }
})
</script>

<style lang="less">
.config {
  position: relative;
  width: 100%;
  height: 100%;

  .toolbar {
    position: absolute;
    top: 6px;
    right: 10px;
  }

  .options-panel {
    padding: 1rem;
  }
}
</style>
