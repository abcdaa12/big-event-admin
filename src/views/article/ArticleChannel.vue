<script setup>
import { artGetChannelsService, artDelChannelService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage } from 'element-plus'
// const loading = ref()
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  console.log('okokokok', res.data.data)

  channelList.value = res.data.data
  // console.log('channelList', channelList)
}
getChannelList()
const onEditChannel = (row) => {
  console.log(row)
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('确认删除？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
  // console.log(row, $index)
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const loading = ref(false)
// const dialogVisible = ref(false)
const dialog = ref()
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" width="150" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row是channelList的一项，$index是下标 -->
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row, $index)"
            :icon="Edit"
            circle
            plain
            type="primary"
          ></el-button>
          <el-button
            @click="onDelChannel(row, $index)"
            :icon="Delete"
            circle
            plain
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>
