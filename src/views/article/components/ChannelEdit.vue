<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article'
import { ElMessage } from 'element-plus'
// 添加分类，提供要处理的数据
const formModel = ref({
  cate_name: '',
  cate_alias: '',
})
const formRef = ref()
const rules = {
  cate_name: [
    {
      required: true,
      message: '请输入分类名称',
      trigger: 'blur',
    },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur',
    },
  ],
  cate_alias: [
    {
      required: true,
      message: '请输入分类别名',
      trigger: 'blur',
    },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母或数字',
      trigger: 'blur',
    },
  ],
}
const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row }
  // 添加》重置了表单内容，编辑》存储了需要回显的数据
}
// 向外暴露方法
defineExpose({
  open,
})
const emit = defineEmits(['success'])
// 校验，通过校验才往下走
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
const dialogVisible = ref(false)
</script>
<template>
  <el-dialog :title="formModel.id ? '编辑分类' : '添加分类'" v-model="dialogVisible" width="30%">
    <!-- 绑定数据 -->
    <el-form :model="formModel" label-width="100px" style="padding-right: 30px" :rules="rules">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input placeholder="请输入分类名称" v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input placeholder="请输入分类别名" v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="click = onSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
