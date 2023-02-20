<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="top">
        <h1 style="font-size: 4em; margin-bottom: 0;">
          <span style="color: #0084ff;">LIVE</span>
          <span>KUN</span>
        </h1>
        <p>网易CC直播OBS互动插件</p>
      </div>
      <div class="main">
        <a-form name="login-form" ref="loginFormRef" :model="formState" :rules="rules" @finish="handleFinish">
          <a-form-item has-feedback name="username">
            <a-input v-model:value="formState.username" placeholder="请输入用户名" size="large" autocomplete="off">
              <template #prefix> <UserOutlined style="color: #0084ff;" /> </template>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback name="password">
            <a-input-password
              v-model:value="formState.password"
              placeholder="请输入密码"
              type="password"
              size="large"
              autocomplete="off"
            >
              <template #prefix> <LockOutlined style="color: #0084ff;" /> </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model:checked="formState.autologin">自动登陆</a-checkbox>
            <a-typography-link style="float: right;">申请使用权限</a-typography-link>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="width: 100%;" size="large" html-type="submit" :loading="isLoading">
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="footer">
        <p>{{ globalAppConfig.copyright }} {{ globalAppConfig.icp.beian }} {{ globalAppConfig.gongan.beian }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, reactive, UnwrapRef } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import http from '@/api/http'
import { globalAppConfig } from '@/api/common'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

interface FormState {
  username: string
  password: string
  autologin: boolean
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const store = useStore(key)
    const route = useRoute()
    const router = useRouter()

    const loginFormRef = ref()
    const formState: UnwrapRef<FormState> = reactive({
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
        return Promise.reject(new Error('密码不能为空！'))
      } else {
        return Promise.resolve()
      }
    }

    const handleFinish = (values: FormState) => {
      login(values.username, values.password, values.autologin)
    }

    const rules = {
      username: [{ required: true, validator: checkUsername, trigger: 'blur' }],
      password: [{ required: true, validator: checkPassword, trigger: 'blur' }]
    }

    onBeforeMount(() => {
      if (store.state.auth.isLoggedIn && localStorage.getItem('isLoggedIn') === '1') {
        router.push({
          path: '/'
        })
      }
    })

    const isLoading = ref<boolean>(false)

    const login = (username: string, password: string, autologin: boolean) => {
      isLoading.value = true
      http
        .post('/user/login', {
          username,
          password,
          autologin
        })
        .then(res => {
          if (res.data.code === 200) {
            message.success('登录成功！')

            store.commit('setLoginStatus', true)
            store.commit('setUUID', res.data.data.uuid)

            localStorage.setItem('isLoggedIn', '1')
            localStorage.setItem('UUID', res.data.data.uuid)

            router.push({
              path: '/'
            })
          } else {
            message.warn(res.data.message)
          }
        })
        .catch(reason => {
          message.error(reason)
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    return {
      globalAppConfig,
      login,
      loginFormRef,
      formState,
      checkUsername,
      checkPassword,
      rules,
      handleFinish,
      isLoading,
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  height: 100%;

  .login-wrapper {
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
        font-weight: bold;
      }
      p {
        color: rgba(0, 0, 0, 0.45);
      }
      text-align: center;
      min-height: 100px;
      margin-bottom: 2rem;
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
      padding: 0 16px;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
