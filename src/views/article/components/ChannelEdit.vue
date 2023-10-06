<script setup>
import { ref } from 'vue'
import { AddListData, ChangeListData } from '@/api/article.js'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const formRfe = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '請輸入分類名稱', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '請輸入1到10的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '請輸入分類別名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '請輸入1到15的非空字符。',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])
const onSebmit = async () => {
  await formRfe.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await ChangeListData(formModel.value)
    ElMessage.success('編輯成功')
  } else {
    await AddListData(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :rules="rules"
    :title="formModel.id ? '編輯' : '新增'"
    width="30%"
  >
    <el-form :model="formModel" ref="formRfe">
      <el-form-item label="分類名稱" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="請輸入分類名稱"
        ></el-input>
      </el-form-item>
      <el-form-item label="分類別名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="請輸入分類別名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSebmit"> 確認 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style></style>
