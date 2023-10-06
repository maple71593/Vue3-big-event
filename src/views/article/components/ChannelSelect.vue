<script setup>
// defineOptions({
//   name: 'LoginIndex'
// })
import { getListData } from '@/api/article.js'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const GetListData = async () => {
  const res = await getListData()
  channelList.value = res.data.data
  console.log(res.data.data)
}
GetListData()
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="(item, index) in channelList"
      :key="index"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
