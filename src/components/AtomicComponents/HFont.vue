<script lang="ts" setup>
import { computed } from 'vue'
import { replaceEmoji } from '@/api/common'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  color: String,
  fontSize: {
    type: Number,
    default: 18
  }
})

const t = computed(() => replaceEmoji(props.text))
</script>

<template>
  <span class="h-font" :style="{ color, fontSize: `${fontSize}px` }" v-html="t">
  </span>
</template>