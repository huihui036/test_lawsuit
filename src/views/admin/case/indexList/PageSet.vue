<!--
 * @Author: qinghui
 * @Date: 2021-09-09 15:29:28
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 15:47:58
 * @Description:分页
-->
<template>
  <div class="page-set">
    <a-pagination show-size-changer
                  v-model:current="current1"
                  v-model:pageSize="pageSize"
                  :total="500"
                  @showSizeChange="onShowSizeChange" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: '',
  setup() {
    const current1 = ref(1)
    const pageSize = ref(20)
    const onShowSizeChange = (current: number, pageSize: number) => {
      console.log(current, pageSize)
    }
    watch(pageSize, () => {
      console.log('pageSize', pageSize.value)
    })
    watch(current1, () => {
      console.log('current', current1.value)
    })
    return {
      current1,
      pageSize,
      onShowSizeChange
    }
  }
})
</script>
<style lang='less' scoped>
</style>
