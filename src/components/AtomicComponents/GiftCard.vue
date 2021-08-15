<template>
  <li class="gift-card no-select" :class="type">
    <div class="card-body">
      <a-avatar class="card-avatar" :src="avatarUrl"> </a-avatar>
      <div class="p-wrap">
        <p class="nickname h-font" style="margin-bottom: 1px;">{{ nickname }}</p>
        <p class="money h-font">{{ profile || `CNY￥${moneyText}` }}</p>
      </div>
    </div>
    <div class="card-footer">
      <p class="message h-font">{{ message }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'GiftCard',
  props: {
    type: {
      default: 'level-0',
      type: String
    },
    avatarUrl: {
      default: '',
      type: String
    },
    nickname: {
      default: '',
      type: String
    },
    money: {
      default: 0,
      type: Number
    },
    profile: {
      default: '',
      type: String
    },
    message: {
      default: '',
      type: String
    }
  },
  setup(props) {
    const cardType = ref<string>(props.type)
    const moneyText = computed(() => props.money.toFixed(2).toString())

    return {
      cardType,
      moneyText
    }
  }
})
</script>

<style lang="less" scoped>
.gift-card {
  position: relative;
  min-width: 200px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  display: block;
  margin-bottom: 10px;

  .card-avatar {
    position: absolute;
    top: 14px;
    left: 14px;
  }

  .card-body,
  .card-footer {
    padding: 4px;
    width: 100%;
    p {
      margin-bottom: 0;
      line-height: 1rem;
      color: #fff;
    }
  }
  .card-body {
    height: 60px;
    .p-wrap {
      margin-top: 10px;
    }
    p {
      margin-left: 50px;
    }
  }
  .card-footer {
    height: 40px;
    p {
      margin-top: 8px;
      margin-left: 12px;
    }
  }

  &.level-0 {
    .card-body {
      background: #1ebea5;
    }

    .card-footer {
      background: #32e8b7;
    }
  }

  &.level-1 {
    .card-body {
      background: #1db1db;
    }
    .card-footer {
      background: #25d5fd;
    }
  }

  &.level-2 {
    .card-body {
      background: #d43667;
    }
    .card-footer {
      background: #f74170;
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

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
