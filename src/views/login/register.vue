<template>
  <div class="register-wrap">
    <div class="register-main">
      <div class="login-box register-header">
        <div class="tips">
          <h2>注册</h2>
        </div>
      </div>
      <div class="login-box register-form">
        <el-form
          ref="registerFormRef"
          :model="registerForm"
          :rules="rules"
          size="medium"
        >
          <el-form-item prop="name">
            <el-input
              ref="nameInputRef"
              v-model="registerForm.name"
              placeholder="用户名"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="mail">
            <el-input
              type="email"
              v-model="registerForm.mail"
              placeholder="邮箱"
              prefix-icon="el-icon-message"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="repass">
            <el-input
              type="password"
              v-model="registerForm.repass"
              placeholder="确认密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              class="code"
              type="text"
              v-model="registerForm.code"
              placeholder="验证码"
              prefix-icon="el-icon-key"
            >
              <template #append>
                <span ref="codeSpanRef" class="register-code" @click="onGetCode">{{ codeText }}</span>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button size="medium" class="register-submit" :loading="loading" @click="onRegister">
          注   册
        </el-button>
      </div>
      <div class="register-footer">
        已有账号
        <router-link class="link" to="/login">点击登陆</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, unref, onMounted, nextTick } from 'vue'
import { Register, GetCode } from '@/apis/login'
import { ElMessage } from 'element-plus'
import router from '@/router'
import md5 from 'blueimp-md5'
export default defineComponent({
  name: 'Register',
  setup () {
    const loading = ref(false)

    const registerFormRef = ref()
    const nameInputRef = ref()
    const codeSpanRef = ref()

    const codeText = ref('获取验证码')

    const registerForm = reactive({
      name: '',
      mail: '',
      password: '',
      repass: '',
      code: ''
    })

    // const validateRePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== registerForm.password) {
    //     callback(new Error('两次输入密码不一致!'))
    //   } else {
    //     callback()
    //   }
    // }

    const rules = {
      name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      mail: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change'}
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
      repass: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
      ],
      code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
      ]
    }

    // 注册
    const onRegister = async () => {
      const from = unref(registerFormRef)
      await from?.validate((valid: boolean) => {
        if (valid) {
          loading.value = true
          registerForm.password = md5(registerForm.password)
          Register(registerForm).then(res => {
            if (res.data.success) {
              ElMessage({
                type: 'success',
                message: '注册成功'
              })
              router.push('/login')
            } else {
              ElMessage({
                type: 'error',
                message: res.data.errorMsg
              })
            }
          }).finally(() => {
            loading.value = false
          })
        }
      })
    }
    
    // 获取验证码
    const onGetCode = async () => {
      if (registerForm.name && registerForm.mail) {
        const codeRef = unref(codeSpanRef)
        let time = 60
        // 获取验证码
        GetCode({
          name: registerForm.name,
          mail: registerForm.mail
        }).then(res => {
          console.log(res)
          if (res && res.data.success) {
            // 成功发送验证码
            ElMessage({
              type: 'success',
              message: '验证码发送成功, 请前往邮箱中验收'
            })

            const codeTimeInterval = setInterval(() => {
              codeText.value = `重新获取(${time}s)`
              codeRef.disabled = true
              time--

              if (time === 0) {
                codeText.value = '获取验证码'
                codeRef.disabled = false
                clearInterval(codeTimeInterval)
              }
            }, 1000)
          } else {
            ElMessage({
              type: 'error',
              message: res.data.errorMsg
            })
          }
        })
      } else {
        ElMessage({
          type: 'error',
          message: '用户名或邮箱不可为空！'
        })
      }
    }

    onMounted(() => {
      nextTick(() => {
        const inputRef = unref(nameInputRef)

        inputRef?.focus()
      })
    })

    return {
      loading,
      rules,
      codeText,
      registerForm,
      registerFormRef,
      nameInputRef,
      codeSpanRef,
      onRegister,
      onGetCode
    }
  }
})
</script>
<style lang="scss" scoped>
.register-wrap {
  position: relative;
  left: 0;
  top: 0;
  padding: 110px 0;
  min-height: 100%;
  box-sizing: border-box;

  .register-main {
    width: 375px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .login-box {
    padding: 20px;
  }

  .register-header {
    h2 {
      margin-bottom: 10px;
      font-weight: 300;
      font-size: 30px;
      color: #000;
    }
  }

  .register-submit {
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

  .register-footer {
    font-size: 14px;
    line-height: 38px;
    padding: 0 20px;
    text-align: right;
    color: $--color-text-secondary;

    .link {
      text-decoration: none;
      color: $--link-color;

      &:hover {
        color: $--link-hover-color;
      }
    }
  }

  :deep(.el-input.code > .el-input__inner) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :deep(.el-input-group__append) {
    background-color: $--color-primary;
    color: #fff;

    &:hover {
      cursor: pointer;
    }
  }
  // .register-code {
  //   height: 38px;
  //   line-height: 38px;
  //   border: 1px solid transparent;
  //   padding: 0 18px;
  //   background-color: $--color-primary;
  //   color: #fff;
  //   white-space: nowrap;
  //   text-align: center;
  //   font-size: 14px;
  //   border-radius: 2px;
  //   cursor: pointer;
  // }

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
