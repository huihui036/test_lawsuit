<!--
 * @Author: qinghui
 * @Date: 2021-09-09 15:29:28
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-15 20:32:05
 * @Description:分页
-->
<template>
  <div class="page-set">

    <a-pagination show-size-changer
                  v-model:current="current1"
                  v-model:pageSize="pageSize"
                  :total="total"
                  @showSizeChange="onShowSizeChange" />
  </div>
</template>

<script lang='ts'>
import { CaseList, CaseListData } from '@/api/addCase/addCaceType'
import VueEvent from '@/utils/event'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: '',
  setup() {
    const current1 = ref(1)
    const pageSize = ref(20)
    const total = ref(1)
    const onShowSizeChange = (current: number, pageSize: number) => {
      console.log(current, pageSize)
    }

    VueEvent.on('caseList', (data: any) => {
      total.value = data.total
    })
    watch(pageSize, () => {
      VueEvent.emit('cahngePageSize', pageSize.value)
    })
    watch(current1, () => {
      VueEvent.emit('cahngecurrent', current1.value)
    })
    return {
      current1,
      pageSize,
      total,
      onShowSizeChange
    }
  }
})
</script>
<style lang='less' scoped>
</style>
