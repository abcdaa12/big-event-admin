// pinia独立维护
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia();
// 创建唯一的 Pinia 实例
pinia.use(persist);
// 为这个实例添加持久化插件
export default pinia
