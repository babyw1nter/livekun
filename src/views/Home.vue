<template>
  <a-layout class="home">
    <a-layout-content class="main">
      <a-alert message="谨以此作品献给我的好朋友——奶玲！" type="warning" showIcon style="margin: 1rem 0;">
        <template #icon><smile-outlined /></template>
      </a-alert>
      <a-layout style="background: #fff; border-radius: 2px; overflow: hidden;">
        <a-layout-sider width="200" style="border-right: 1px solid #f0f0f0; background: #fff;">
          <div class="logo no-select">
            <span class="logo-text">
              <span style="color: #0084ff;">LIVE</span>
              <span>KUN</span>
            </span>
          </div>
          <a-menu
            class="home-menu no-select"
            mode="inline"
            :selectedKeys="selectedKeys"
            @click="menuClicked"
            style="border-right: none;"
          >
            <a-menu-item key="/">
              <template #icon>
                <ApiOutlined />
              </template>
              连接控制
            </a-menu-item>
            <a-sub-menu key="/config">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>系统设置</template>
              <a-menu-item key="/config/gift-capsule">
                <template #icon>
                  <GiftOutlined />
                </template>
                礼物胶囊
              </a-menu-item>
              <a-menu-item key="/config/gift-card">
                <template #icon>
                  <CreditCardOutlined />
                </template>
                礼物卡片
              </a-menu-item>
              <a-menu-item key="/config/chat-message">
                <template #icon>
                  <MessageOutlined />
                </template>
                聊天消息
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="/account">
              <template #icon>
                <UserOutlined />
              </template>
              账号管理
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content style="min-height: 555px;">
          <div class="right-title no-select">
            <span class="page-header">{{ route.meta.title }}</span>
            <!-- <a-page-header
              class="h-page-header"
              :title="route.meta.title"
              sub-title="This is a subtitle"
              :back-icon="false"
              @back="() => router.back()"
            /> -->
            <a-typography-text type="secondary" class="broadcast">{{ broadcast }}</a-typography-text>
          </div>
          <div class="right-main">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer class="footer">
      © 2021 hhui64. Powered By CCLinkJS.
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import {
  SmileOutlined,
  UserOutlined,
  ApiOutlined,
  SettingOutlined,
  GiftOutlined,
  CreditCardOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { randomNum } from '@/api/common'

const broadcastArray = [
  '“隐约雷鸣，阴霾天空，但盼风雨来，能留你在此。”——《万叶集 雷神短歌》',
  '“隐约雷鸣，阴霾天空，即使天无雨，我亦留此地。”——《万叶集 雷神短歌》',
  // '“你的爱会将我灌醉，我没有所谓，太过清醒怎么，陶醉。”——比莉《DEAR JOHN》',
  // '“你的爱，像是杯太浓的咖啡，让我失眠彻夜，好爱这种感觉。”——比莉《DEAR JOHN》',
  // '“印象中的爱情好像，顶不住那时间，所以你弃权。”——周杰伦《半岛铁盒》',
  '“铜镜映无邪，扎马尾，你若撒野，今生我把酒奉陪。”——周杰伦《发如雪》',
  '“我寻你千百度，又一岁荣枯，你不在灯火阑珊处。”——许嵩《千百度》',
  '论奶玲的白丝能有多嫩？我只能说，太嫩了。',
  '赚了500，你以为我要给你450，我留50？我会跟朋友借20，凑520给你。',
  'java.lang.NullPointerException',
  '没有对象怎么办？答：new 一个呗，要几个有几个！',
  '我和你荡秋千，荡到那天外天。',
  '再看我就把你吃掉！',
  '别看了，奶玲，你再看就没时间开播了。',
  '一天到晚整这些花里胡哨的，有用吗？',
  '扎不多的勒。',
  '炒饭要用隔夜饭来炒啊，炒王！',
  '你以为你匿系呢度，就搵你唔到咩？冇用嘅，好似你啲甘出色嘅男人。',
  '无论系边度，就好似漆黑中的萤火虫呢样，甘鲜明，甘出众。',
  '你忧郁嘅眼神，唏嘘的须根，神乎其技嘅刀法，同埋果杯 Drymartine，都彻底将你出卖佐。',
  '不过，你虽然系甘出色，始终，行有行规，无论点，你都要找埋琴晚果条过夜数。',
  '我仲蛊我哋嘅交往系建筑在感情之上，蛊唔到，原来都系一盘生意。'
]

export default defineComponent({
  components: {
    SmileOutlined,
    UserOutlined,
    ApiOutlined,
    SettingOutlined,
    GiftOutlined,
    CreditCardOutlined,
    MessageOutlined
  },
  setup() {
    const store = useStore(key)
    const route = useRoute()
    const router = useRouter()

    const selectedKeys = computed(() => [route.meta.menuItemKey])

    const broadcast = ref('')

    onBeforeMount(() => updateBroadcast())
    watch(route, () => updateBroadcast())

    const updateBroadcast = () => {
      broadcast.value = broadcastArray[randomNum(0, broadcastArray.length - 1)]
    }

    const menuClicked = (e: { key: string }) => {
      const key = e.key
      router.push({
        path: key
      })
    }

    return {
      store,
      route,
      router,
      selectedKeys,
      broadcast,
      menuClicked
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  min-height: 100%;

  .main {
    margin: 0 auto;
    padding: 0;
    width: 1024px;

    .logo {
      margin-bottom: 12px;
      text-align: center;
      font-weight: 800;
      height: 52px;
      border-bottom: 1px solid #f0f0f0;

      .logo-text {
        font-size: 1.5em;
        line-height: 52px;
      }
    }

    .right-title {
      padding: 0 1rem;
      height: 52px;
      border-bottom: 1px solid #f0f0f0;
      overflow: hidden;

      .h-page-header {
        margin: 6px 0;
        padding: 0;
      }

      span.page-header {
        padding-left: 12px;
        line-height: 52px;
        border-left: 4px solid #1890ff;
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        font-size: 1rem;
      }

      span.broadcast {
        float: right;
        line-height: 52px;
      }
    }

    .right-main {
      padding: 1rem 1rem 24px 1rem;
    }
  }

  .footer {
    text-align: center;
  }
}
</style>
