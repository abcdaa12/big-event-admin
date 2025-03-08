<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const route = useRoute()
const goList = () => {
  console.log(router, route)
  // this.router.push('/list')
  router.push('/list')
}
const userStore = useUserStore()
</script>
<template>
  <router-view></router-view>
  <hr />
  <hr />
  <div>我是apphhhhhh</div>
  <el-button @click="$router.push('/home')" type="success">home</el-button>
  <el-button @click="goList" type="primary">跳转列表页</el-button>
  <hr />
  <div>{{ userStore.token }}</div>
  <el-button @click="userStore.setToken('asgag')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>
</template>

<style scoped></style>
