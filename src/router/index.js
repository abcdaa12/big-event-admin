import { createRouter, createWebHistory } from 'vue-router'
// createRouter创建路由实例
// 配置history模式
// history模式： createWebHistory 地址栏不带#
// hash模式： createWebHashHistory 地址栏带#
const router = createRouter({
  // 括号里面的内容就是所有页面的地址前缀
  // history: createWebHistory('/xaiver'),一般不写死，这个环境变量可以在vite.config.js中配置

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页面
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      // 重定向二级路由
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue'),
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue'),
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue'),
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue'),
        },
      ],
    },
  ],
})

export default router
