<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="top">
        <div class="logo" style="display: block; margin-bottom: 10px;">
          <a href="#" class="no-select">
            <img src="@/assets/images/logo_270x80.png" width="220" />
          </a>
        </div>
        <a-typography-text type="secondary">多直播平台 OBS 互动插件系统</a-typography-text>
      </div>

      <div class="main">
        <a-form name="login-form" ref="loginFormRef" :model="formState" :rules="rules" @finish="handleFinish">
          <a-form-item has-feedback name="username">
            <a-input v-model:value="formState.username" placeholder="请输入用户名" size="large" autocomplete="off">
              <template #prefix>
                <UserOutlined style="color: #0084ff;" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback name="password">
            <a-input-password v-model:value="formState.password" placeholder="请输入密码" type="password" size="large"
              autocomplete="off">
              <template #prefix>
                <LockOutlined style="color: #0084ff;" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="autologin">
            <a-checkbox v-model:checked="formState.autologin">自动登录</a-checkbox>
            <a-typography-link style="float: right;" @click.stop="open = !open">参与内测</a-typography-link>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="width: 100%;" size="large" html-type="submit" :loading="isLoading">
              立即登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>

      <div class="footer">
        <PageFooter class="ft" />
      </div>
    </div>

    <a-modal v-model:open="open" title="参与内测" :footer="null">
      <a-typography-text>
        这个项目目前还处于开发内测阶段，仅提供少数内测用户使用。<br />
        如果你感兴趣，可以扫一扫下方二维码与我联系！
      </a-typography-text>
      <br />
      <img src="@/assets/images/qrcode-wx.jpg" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { Rule, RuleObject } from 'ant-design-vue/es/form/interface'
import { useUserStore } from '@/stores/user'

interface FormState {
  username: string
  password: string
  autologin: boolean
}

const userStore = useUserStore()
const router = useRouter()

const isLoading = ref(false)
const open = ref(false)

// 检测登录状态，如果已登录，则跳转至主页
if (userStore.isLoggedIn && localStorage.getItem('isLoggedIn') === '1') {
  router.push({
    path: '/'
  })
}

const loginFormRef = ref()
const formState = reactive<FormState>({
  username: '',
  password: '',
  autologin: true
})

const checkUsername = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject(new Error('用户名不能为空'))
  } else {
    return Promise.resolve()
  }
}

const checkPassword = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject(new Error('密码不能为空'))
  } else {
    return Promise.resolve()
  }
}

const handleFinish = async (values: FormState) => {
  isLoading.value = true

  const authResult = await userStore.login(values.username, values.password, values.autologin)
  if (authResult) {
    router.push({
      path: '/'
    })
  }

  isLoading.value = false
}

const rules: Record<string, Rule[]> = {
  username: [{ required: true, validator: checkUsername, trigger: 'blur' }],
  password: [{ required: true, validator: checkPassword, trigger: 'blur' }]
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;

  .login-wrapper {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    min-height: 100%;
    padding: 110px 0 144px;
    background-image: url(https://store.antdv.com/pro/preview/img/background.5825f033.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;

    .top {
      h1 {
        margin: 0;
        font-size: 3em;
        font-weight: bold;
      }

      text-align: center;
      min-height: 100px;
      margin-bottom: 4rem;
    }

    .main {
      width: 368px;
      min-width: 260px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      margin: 48px 0 24px;

      :deep(.ft) {
        p {
          margin: 8px !important;
        }
      }
    }
  }
}
</style>
