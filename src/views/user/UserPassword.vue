<script setup>
import { ref } from 'vue'
import { ChangeMyUpdatepwd } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const formRef = ref()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const checkOldSame = (rule, value, cb) => {
  if (value === pwdForm.value.old_pwd) {
    cb(new Error('原密碼和新密碼不能一樣!'))
  } else {
    cb()
  }
}

const checkNewSame = (rule, value, cb) => {
  if (value !== pwdForm.value.new_pwd) {
    cb(new Error('新密碼和確認再次輸入的新密碼不一樣!'))
  } else {
    cb()
  }
}
const rules = {
  // 原密碼
  old_pwd: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼長度必須是6-15位元的非空字串',
      trigger: 'blur'
    }
  ],
  // 新密碼
  new_pwd: [
    { required: true, message: '請輸入新密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼長度必須是6-15位元的非空字串',
      trigger: 'blur'
    },
    { validator: checkOldSame, trigger: 'blur' }
  ],
  // 確認新密碼
  re_pwd: [
    { required: true, message: '請再次確認新密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼長度必須是6-15位元的非空字串',
      trigger: 'blur'
    },
    { validator: checkNewSame, trigger: 'blur' }
  ]
}
// 提交修改密碼
const router = useRouter()
const UserDataApi = useUserStore()
const onSubmit = async () => {
  await formRef.value.validate()
  await ChangeMyUpdatepwd(pwdForm.value)
  UserDataApi.removeToken()
  UserDataApi.removeUserData()
  router.push('/login')
  ElMessage.success('修改成功，請重新登入')
}
// 重置表單
const onReset = () => {
  formRef.value.resetFields()
}
</script>
<template>
  <page-container title="重置密碼">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密碼" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密碼" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="確認新密碼" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">修改密碼</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
