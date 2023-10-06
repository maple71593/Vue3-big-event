<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { ChnageMyUserInfo } from '@/api/user.js'
const loading = ref(false)
const {
  userData: { username, nickname, email, id },
  getUserDataApi
} = useUserStore()
const formRef = ref()
const userInfo = ref({ id, username, nickname, email })

const rules = {
  nickname: [
    { required: true, message: '請輸入用戶昵稱', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵稱必須是2-10位元的非空字串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '請輸入用戶郵箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      type: 'email',
      message: '郵箱格式不正確',
      trigger: 'blur'
    }
  ]
}
const ChangeUser = async () => {
  loading.value = true
  await formRef.value.validate()
  await ChnageMyUserInfo(userInfo.value)
  ElMessage.success('修改成功')
  getUserDataApi()
  loading.value = false
}
</script>

<template>
  <page-container title="基本資料">
    <el-row>
      <el-col :span="12">
        <el-form
          v-loading="loading"
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登錄名稱">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用戶昵稱" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用戶郵箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="ChangeUser" type="primary">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
