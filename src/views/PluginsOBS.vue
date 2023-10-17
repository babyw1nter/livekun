<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useWs } from '@/api/wslib/ws'

useWs()
</script>

<style lang="less" scoped></style>
