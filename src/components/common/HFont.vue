<template>
  <span
    class="h-font"
    :style="{ color, fontSize: `${fontSize}px` }"
    v-html="t">
  </span>
</template>

<script lang="ts" setup>
import { replaceEmoji } from '@/api/common'
import { useSlotsText } from '@/api/uses'

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

const slotsText = useSlotsText()

const t = computed(() => replaceEmoji(slotsText.text.value || props.text))
</script>
