<!--
 * @Author: qinghui
 * @Date: 2021-09-09 15:19:56
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 15:25:49
 * @Description:页面布局
-->
<template>
  <div class="page-box">
    <div class="page-heder">
      <slot name="header"></slot>
    </div>
    <div class="page-center">
      <slot name="center"></slot>
    </div>

    <div class="page-fotter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  setup() {
    return {}
  }
})
</script>
<style lang='less' scoped>
.page-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .page-heder {
    padding: 10px;
    background-color: #fff;
  }
  .page-center {
    padding: 10px;
    margin: 10px 0;
    background: #fff;
  }
  .page-fotter {
    width: 100%;
    background-color: #fff;
    padding: 15px;
  }
}
</style>
