<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { getArticleList, DelArticleInfo } from '@/api/article.js'
import { dayjs } from 'element-plus'
import ArticleEdit from './components/ArticleEdit.vue'
const loading = ref(false)
const articleList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: ''
})
const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')
const useArticleList = async () => {
  loading.value = true
  const res = await getArticleList(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
useArticleList()
const ArticleRef = ref()
// 處理新增文章邏輯
const onAddArticle = () => {
  ArticleRef.value.open({})
}
//編輯
const onEditArticle = (row) => {
  ArticleRef.value.open(row)
}
//刪除
const onDeleteArticle = async (row) => {
  await DelArticleInfo(row.id)
  useArticleList()
}
//處理分頁邏輯
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  useArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  useArticleList()
}
//處理搜尋邏輯
const onSearch = () => {
  params.value.pagenum = 1
  useArticleList()
}
//處理重製邏輯
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  useArticleList()
}
// 新增或者編輯 成功的回調
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  useArticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">新增文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分類：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="發佈狀態：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column label="文章標題" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分類" prop="cate_name"></el-table-column>
      <el-table-column label="發表時間" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="狀態" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="沒有資料" />
      </template>
    </el-table>
    <el-pagination
      :page-sizes="[2, 4, 6, 8, 10]"
      layout="total,sizes, prev, pager, next,jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
    <Article-Edit ref="ArticleRef" @success="onSuccess"></Article-Edit>
  </page-container>
</template>

<style scoped></style>
