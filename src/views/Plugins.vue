<template>
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
