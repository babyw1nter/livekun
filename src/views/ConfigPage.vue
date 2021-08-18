<template>
  <div class="config">
    <a-tabs tab-position="top" v-model:activeKey="activeKey">
      <a-tab-pane :key="1" tab="礼物胶囊">
        <div class="options-panel">
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
          <p>礼物卡片的颜色风格会随着金额档位自动改变。从左到右依次对应三个档位的金额。</p>
          <a-space :size="10">
            <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[0]" />
            <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[1]" />
            <a-input-number :min="0" v-model:value="store.state.config.giftCard.level[2]" />
          </a-space>
          <a-divider />
          <p>礼物卡片最低金额。低于此金额时不显示。</p>
          <a-input-number :min="0" v-model:value="store.state.config.giftCard.minMoney" />
        </div>
      </a-tab-pane>
      <a-tab-pane :key="3" tab="聊天消息">
        <div class="options-panel">
          <p>聊天框文字大小。</p>
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

    return {
      activeKey,
      store,
      save,
      reset
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
