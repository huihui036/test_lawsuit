<!--
 * @Author: qinghui
 * @Date: 2021-09-15 11:38:57
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 11:23:23
 * @Description:用户信息
-->
<template>
  <div>
    <userChaneg></userChaneg>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import userChaneg from '@/views/register/RegisterInformation.vue'
export default defineComponent({
  name: '',
  components: { userChaneg },
  setup() {
    return {}
  }
})
</script>
<style lang='less' scoped>
</style>
