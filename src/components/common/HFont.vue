<script lang="ts" setup>
import { replaceEmoji } from '@/api/common'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  fontSize: {
    type: Number,
    default: 18
  }
})

const slots = useSlots()

const t = computed(() => {
  if (slots && typeof slots.default === 'function') {
    const text = slots.default()[0].children?.toString() || props.text || ''
    return replaceEmoji(text)
  }
})
</script>

<template>
  <span class="h-font" :style="{ color, fontSize: `${fontSize}px` }" v-html="t">
  </span>
</template>