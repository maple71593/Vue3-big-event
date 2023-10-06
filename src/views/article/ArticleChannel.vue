<script setup>
import { ref } from 'vue'
import { getListData, delList } from '@/api/article.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
const loading = ref(false)
// 一進頁面渲染資料
const List = ref([])
const getList = async () => {
  loading.value = true
  const res = await getListData()
  loading.value = false
  List.value = res.data.data
}
getList()
// 新增分類
const dialog = ref()
const onAddChannel = () => {
  dialog.value.open({})
}
// 編輯紐
const EditData = (row) => {
  dialog.value.open(row)
}
//刪除紐
const DeleteList = async (item) => {
  await delList(item.id)
  getList()
}
const onSuccess = () => {
  getList()
}
</script>

<template>
  <page-container title="文章分類">
    <template #extra>
      <el-button @click="onAddChannel">添加分類</el-button>
    </template>
    <el-table v-loading="loading" :data="List" style="width: 100%">
      <el-table-column fixed type="index" label="序號" width="150" />
      <el-table-column prop="cate_name" label="分類名稱" />
      <el-table-column prop="cate_alias" label="分類別名" />
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            size="small"
            @click="EditData(row, $index)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            size="small"
            @click="DeleteList(row, $index)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="無數據" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>

<style scoped></style>
