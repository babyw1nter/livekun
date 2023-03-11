<script lang="ts" setup>
import { useStore } from 'vuex'
import { key } from '@/store'
import { PluginNames } from '@/api/plugins'
import { PropType } from 'vue'

const store = useStore(key)

const props = defineProps({
  pluginName: {
    type: String,
    default: ''
  },
  autoPreview: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark',
  }
})
const emit = defineEmits<{
  (event: 'update:autoPreview', checked: boolean): void
  (event: 'update:theme', style: 'dark' | 'light'): void
  (event: 'onAutoPreviewSwitchChange', checked: boolean): void
}>()

const url = computed(() => `${window.location.origin}/#/plugins/${props.pluginName}?uuid=${store.state.auth.uuid}`)

const onChange = (checked: unknown) => {
  emit('update:autoPreview', checked as boolean)
  emit('onAutoPreviewSwitchChange', checked as boolean)
}

const themeSwitch = (checked: unknown) => {
  emit('update:theme', checked as boolean ? 'dark' : 'light')
  console.log(props.theme)
}

const themeSwitchState = ref(true)
</script>

<template>
  <div class="plugin-preview-wrapper"
    :class="{ 'theme-dark': theme === 'dark' || themeSwitchState, 'theme-light': theme === 'light' || !themeSwitchState }">
    <div class="preview-main">
      <slot></slot>
    </div>

    <a-space :size="5">
      <a-switch :checked="autoPreview" checked-children="开" un-checked-children="关"
        @change="(checked) => onChange(checked)" style="vertical-align: bottom;">
      </a-switch>
      <a-typography-text>自动预览</a-typography-text>
    </a-space>
    <a-space :size="5">
      <a-switch v-model:checked="themeSwitchState" checked-children="暗" un-checked-children="亮"
        @change="(checked) => themeSwitch(checked)" style="vertical-align: bottom; margin-left: 10px; background-color: #1890ff;">
      </a-switch>
      <a-typography-text>背景</a-typography-text>
    </a-space>
    <a-typography-link :href="url" :copyable="{ text: url }" target="_blank" style="float: right;">
      插件链接
    </a-typography-link>
  </div>
</template>

<style lang="less" scoped>
.plugin-preview-wrapper {
  width: 100%;

  .preview-main {
    margin-bottom: 16px;
    width: 100%;
    height: calc(100% - 80px);
    background-position: 0 0, 16px 0, 16px -16px, 0 16px;
    background-size: 32px 32px;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  &.theme-dark {
    .preview-main {
      background-color: #444;
      background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, #333), color-stop(0.25, transparent)),
        -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #333), color-stop(0.25, transparent)),
        -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #333)),
        -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #333));
    }
  }

  &.theme-light {
    .preview-main {
      background-color: #ddd;
      background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(.25, #eee), color-stop(.25, transparent)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, #eee), color-stop(.25, transparent)), -webkit-gradient(linear, 0 100%, 100% 0, color-stop(.75, transparent), color-stop(.75, #eee)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.75, transparent), color-stop(.75, #eee));
    }
  }
}
</style>