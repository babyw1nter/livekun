<template>
  <div>
    <a-card style="width: 400px; margin: 1rem">
      <a-space direction="vertical">
        <a-alert message="奶灵牌亡妻回忆录音机" type="info" show-icon>
          <template #icon><smile-outlined /></template>
        </a-alert>

        <audio id="audioPlayer" controls></audio>

        <AInputSearch
          v-model:value="text"
          placeholder="请输入要转为语音的文本"
          enter-button="朗读"
          @search="a"
          allow-clear>
        </AInputSearch>

        <a-space>
          <span>朗读速度：</span>
          <a-slider
            v-model:value="spd"
            :min="0"
            :max="1"
            :step="0.01"
            style="width: 100px" />
          <a-input-number
            v-model:value="spd"
            :min="0"
            :max="1"
            :step="0.01"
            style="margin-left: 16px" />
        </a-space>

        <a-divider>进场试听</a-divider>

        <a-space>
          <span>昵称：</span>
          <AInputSearch
            v-model:value="nickname"
            placeholder="请输入你的昵称"
            enter-button="随机试听"
            @search="a1"
            allow-clear>
          </AInputSearch>
        </a-space>

        <a-textarea
          v-model:value="welecomText"
          placeholder="输入欢迎文本，一行一个"
          :auto-size="{ minRows: 2, maxRows: 5 }" />
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { randomNum } from '@/api/common'
import http from '@/api/http'
import { message } from 'ant-design-vue'

const textList = [
  {
    title: '欢迎入场',
    text: '欢迎'
  }
]

const text = ref('')
const spd = ref(0.83)

const isLoading = ref(false)

const nickname = ref('奶灵')
const welecomText = ref(
  '欢迎@进场人\n欢迎光临直播间，笔芯♥️\n哇～@进场人来啦，欢迎欢迎\n欢迎@进场人，请坐沙发\n@进场人来了，给大佬看茶\n欢迎@进场人，么么哒\n@进场人， 欢迎入座·看到日落☾\n@进场人，阿尼哈撒哟~\n欢迎小可爱@进场人\n欢迎@进场人，请喝茶\n欢迎大佬@进场人进入直播间\n哈罗，欢迎@进场人'
)

const a = async () => {
  isLoading.value = true

  const p = {
    // id: '1',
    // name: Date.now(),
    vcn: 'qianranf',
    spd: spd.value,
    text: text.value
  }

  try {
    const req = await http.get('/voice', {
      params: p,
      responseType: 'arraybuffer'
    })

    // 获取 DOM 元素
    const audioPlayer: HTMLAudioElement | null = document.getElementById(
      'audioPlayer'
    ) as HTMLAudioElement

    if (audioPlayer) {
      // 将获取到的音频数据转换为 Blob
      const blob = new Blob([req.data], { type: 'audio/mpeg' })
      // 创建 URL 对象
      const audioUrl = URL.createObjectURL(blob)
      // 设置 <audio> 元素的 src
      audioPlayer.src = audioUrl
      // 播放音频
      audioPlayer.play()
    }
  } catch (error) {
    message.error('转换失败' + error)
  } finally {
    isLoading.value = false
  }
}

const a1 = async () => {
  const arr = welecomText.value
    .split('\n')
    .map((i) => i.replaceAll('@进场人', nickname.value))

  const randomText = arr[randomNum(0, arr.length - 1)]
  text.value = randomText
  await a()
}
</script>

<style scoped lang="less"></style>
