<template>
  <div class="login-wrap">
    <div class="login-main">
      <div class="login-box login-header">
        <div class="tips">
          <h2>登陆</h2>
        </div>
      </div>
      <div class="login-box login-from">
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          size="medium"
        >
          <el-form-item prop="username">
            <el-input
              ref="usernameInputRef"
              v-model="loginForm.username"
              placeholder="用户名"
              prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
        </el-form>
        <el-button size="medium" class="login-submit" :loading="loading" @click="onLogin">
          登    陆
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, unref, nextTick } from 'vue'
export default defineComponent({
  name: 'Login',
  setup () {
    const loginFormRef = ref()
    const usernameInputRef = ref()
    const loading = ref(false)

    const loginForm = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ]
    }

    // 登陆方法
    const onLogin = async () => {
      const from = unref(loginFormRef)

      await from?.validate((valid: boolean) => {
        if (valid) {
          loading.value = true
          // 向后端发起认证请求
        }
      })
    }

    onMounted(() => {
      nextTick(() => {
        const inputRef = unref(usernameInputRef)

        inputRef?.focus()
      })
    })

    return {
      loginFormRef,
      usernameInputRef,
      loading,
      loginForm,
      rules,
      onLogin
    }
  }
})
</script>
<style lang="scss" scoped>
.login-wrap {
  position: relative;
  left: 0;
  top: 0;
  padding: 110px 0;
  min-height: 100%;
  box-sizing: border-box;

  .login-main {
    width: 375px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .login-box {
    padding: 20px;
  }

  .login-header {
    h2 {
      margin-bottom: 10px;
      font-weight: 300;
      font-size: 30px;
      color: #000;
    }
  }

  .login-submit {
    width: 100%;
    height: 38px;
    line-height: 38px;
    border: 1px solid transparent;
    padding: 0 18px;
    background-color: $--color-primary;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: $--color-primary-light-2;
    }
  }
  :deep(.el-input__inner) {
    height: 38px;
    line-height: 1.3;
    line-height: 38px;
    border-width: 1px;
    border-style: solid;
    background-color: #fff;
    border-radius: 6px;
  }
}
</style>
