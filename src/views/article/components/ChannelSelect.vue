<script setup>
import { artGetChannelsService } from '@/api/article.js'
import { ref } from 'vue'
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  // console.log(channelList.value)
}
getChannelList()
defineProps({
  modelValue: {
    type: [Number, String],
  },
  width: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
    <!-- <el-option label="体育" value="137"></el-option> -->
  </el-select>
</template>
