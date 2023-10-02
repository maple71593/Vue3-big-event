<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(true)
const form = ref()
const RuleForm = ref({
  username: '',
  password: '',
  repassword: ''
})
const reset = () => {
  RuleForm.value.username = ''
  RuleForm.value.password = ''
  RuleForm.value.repassword = ''
  isRegister.value = !isRegister.value
}
const rules = {
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 5, max: 10, message: '請輸入5到10個英文數字混合', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{6,12}$/,
      min: 5,
      max: 10,
      message: '要有1個大寫英文字母與1個特殊符號。',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{6,12}$/,
      min: 5,
      max: 10,
      message: '要有1個大寫英文字母與1個特殊符號。',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== RuleForm.value.password) {
          callback(new Error('再次輸入的密碼不符'))
        } else {
          callback()
        }
      }
    }
  ]
}
const register = async () => {
  await form.value.validate()
  await userRegisterService(RuleForm.value)
  ElMessage.success('註冊成功')
  reset()
}
const router = useRouter()
const userStore = useUserStore()
const loginGo = async () => {
  await form.value.validate()
  const res = await userLoginService(RuleForm.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登入成功')
  reset()
  router.push('/')
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        :model="RuleForm"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>註冊</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="RuleForm.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="RuleForm.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="RuleForm.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入再次密碼"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            註冊
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="reset">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        :model="RuleForm"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登錄</h1>
        </el-form-item>
        <el-form-item porp="username">
          <el-input
            v-model="RuleForm.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="RuleForm.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>記住我</el-checkbox>
            <el-link type="primary" :underline="false">忘記密碼？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="loginGo"
            class="button"
            type="primary"
            auto-insert-space
            >登錄</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link @click="reset" type="info" :underline="false">
            註冊 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
