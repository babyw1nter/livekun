<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore(key)
    onBeforeMount(() => {
      store.dispatch('getRemoteConfig')
      store.dispatch('getRemoteStatus')
    })
  }
})
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
