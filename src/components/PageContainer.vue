<script setup>
defineProps({
  title: {
    type: String
  }
})
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <slot name="extra"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped>
.card {
  min-height: 100%;
  box-sizing: border-box;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
