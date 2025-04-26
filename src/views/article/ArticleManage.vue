<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'
// import { artGetListService } from '@/api/article'
// import { pa } from 'element-plus/es/locale'
const articleList = ref([]) //文章列表
const total = ref(0) //文章总条数
const loading = ref(false)

// 编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除逻辑
const onDeleteArticle = (row) => {
  console.log(row)
}
const articleEditRef = ref()
// 添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 定义请求参数对象
const params = ref({
  pagenum: 1, //当前页
  pagesize: 3, //每页条数
  cate_id: '',
  state: '',
})
// 基于params参数，获取文章列表
const getArticleList = async () => {
  loading.value = true

  const res = await artGetListService(params.value)
  // console.log('res:', res)

  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
// 处理分页逻辑
const onSizeChange = (size) => {
  console.log('当前每页条数', size)
  ;(params.value.pagenum = 1), (params.value.pagesize = size)
  getArticleList()
}
const onCurrentChange = (page) => {
  console.log('currentpage', page)
  params.value.pagenum = page
  getArticleList()
}
// 重置和搜索
const onSearch = () => {
  // 搜索
  params.value.pagenum = 1
  getArticleList()
}
// 重置
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
// 添加或者编辑成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
    // getArticleList()
  }
  // 如果是编辑，直接渲染当前页面就可以
  getArticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类" style="width: 300px">
        <!-- vue3中 v-model=:modelValue+@update:modelValue -->
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态" style="width: 300px">
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
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template></el-table-column
      >
      <el-table-column label="状态" prop="state"></el-table-column>
      <!-- 作用域插槽row可以获取当前行的数据 -->
      <el-table-column label="操作">
        <template #default="{ row }"
          ><el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button
        ></template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 添加编辑的抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>
