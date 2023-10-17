<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component"></component>
    </KeepAlive>
  </RouterView>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
