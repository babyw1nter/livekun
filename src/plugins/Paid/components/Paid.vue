<template>
  <div class="paid no-select" :class="type">
    <div class="card-body">
      <a-avatar class="card-avatar" :src="avatarUrl" :size="24"> </a-avatar>
      <div class="p-wrap">
        <p class="nickname">
          <h-font>{{ nickname }}</h-font>
        </p>
        <p class="money">
          <h-font>{{ profile || `¥${moneyText}` }}</h-font>
        </p>
      </div>
    </div>
    <div class="card-footer" v-if="comment !== ''">
      <p class="message">
        <h-font>{{ comment }}</h-font>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { moneyFormat } from '@/api/common'

const props = defineProps({
  type: {
    type: String,
    default: 'level-0'
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  nickname: {
    type: String,
    default: ''
  },
  money: {
    type: Number,
    default: 0
  },
  giftName: {
    type: String,
    default: ''
  },
  giftCount: {
    type: Number,
    default: 0
  },
  giftImage: {
    type: String,
    default: ''
  },
  giftIcon: {
    type: String,
    default: ''
  },
  profile: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  comment: {
    type: String,
    default: ''
  }
})

const cardType = ref<string>(props.type)
const moneyText = computed(() => moneyFormat(Number(props.money.toFixed(2)), 2))
</script>

<style lang="less" scoped>
@fontSize: 18px;

.paid {
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  .card-avatar {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  .card-body,
  .card-footer {
    width: 100%;

    p {
      margin-bottom: 0;
      line-height: @fontSize;
      color: #fff;
    }
  }

  .card-body {
    padding: 8px;
    min-height: 48px;

    .p-wrap {
      margin-left: 45px;
    }

    p {
      font-size: @fontSize;
    }
  }

  .card-footer {
    p.message {
      font-size: @fontSize;
      padding: 8px 14px;
      overflow: hidden;
      word-break: break-all;
    }
  }

  &.level-0 {
    .card-body {
      background: #1565c0;
    }

    .card-footer {
      display: none;
    }
  }

  &.level-1 {
    .card-body {
      background: #00b8d4;
    }

    .card-footer {
      background: #00e5ff;
    }
  }

  &.level-2 {
    .card-body {
      background: #00bfa5;
    }

    .card-footer {
      background: #1de9b6;
    }
  }

  &.level-3 {
    .card-body {
      background: #ffb300;
    }

    .card-footer {
      background: #ffca28;
    }
  }

  &.level-4 {
    .card-body {
      background: #e65100;
    }

    .card-footer {
      background: #f57c00;
    }
  }

  &.level-5 {
    .card-body {
      background: #d43667;
    }

    .card-footer {
      background: #f74170;
    }
  }

  &.level-6 {
    .card-body {
      background: #ca000e;
    }

    .card-footer {
      background: #e01f20;
    }
  }

  &.guard-monthly {
    .card-body {
      background: #573594;
    }

    .card-footer {
      background: #9480b9;
    }
  }

  &.guard-annual {
    .card-body {
      background: #ff9800;
    }

    .card-footer {
      background: #ffbc6a;
    }
  }

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
  0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
