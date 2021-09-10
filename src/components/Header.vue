<!--
 * @Author: qingHui
 * @Date: 2021-09-06 16:00:07
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 09:27:38
 * @Description: 未登入头部
-->
<template>
  <div class="header">
    <ul class="logo-title">
      <li>
        <div class="logo">logo</div>
      </li>
      <li class="court-name">
        <slot>
          <h3>福州鼓楼法院</h3>
        </slot>
      </li>
      <li class="line-title">
        <h4>|</h4>
      </li>
      <li class="name-title">
        <h5>溯源治理多元化调解平台</h5>
      </li>
    </ul>
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
.header {
  // height: 98px;
  padding: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(158, 158, 158, 0.52);
}
.logo-title {
  width: 80%;
  line-height: 48px;
  margin: auto;
  display: flex;
  .logo {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    text-align: center;
    line-height: 48px;
    color: #fff;
    background-color: rgb(223, 26, 26);
  }
  .court-name {
    margin: 0 10px 0 20px;
  }
  .line-title,
  .name-title {
    margin: 0 5px 0 0;
  }
}
</style>
