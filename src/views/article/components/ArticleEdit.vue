<script setup>
import ChannelSelect from './ChannelSelect.vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  PostArticleAdd,
  GetArticleInfo,
  PutSrticleInfo
} from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request.js'
const defaultForm = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
const formModel = ref({
  ...defaultForm
})
// 儲存圖片
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

//處理抽屜表單隱藏 open就是當打開抽屜的時候 要獲取的數據
const visibleDrawer = ref(false)
const editorRef = ref()
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    const res = await GetArticleInfo(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
  } else {
    formModel.value = { ...defaultForm }
    console.log('新增')
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}

// 提交
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    await PutSrticleInfo(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await PostArticleAdd(fd)
    ElMessage.success('增加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '編輯文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 發表文章表單 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章標題" prop="title">
        <el-input v-model="formModel.title" placeholder="請輸入標題"></el-input>
      </el-form-item>
      <el-form-item label="文章分類" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章內容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">發佈</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
