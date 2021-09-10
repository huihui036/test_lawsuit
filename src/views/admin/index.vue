<!--
 * @Author: qinghui
 * @Date: 2021-09-08 14:20:59
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 14:36:30
 * @Description:管理主页
-->
<template>
  <div>
    <a-layout>
      <a-layout-header :style="{ height: '10vh', borderRight: 0 ,}">
        <Header class="headerbox"></Header>
      </a-layout-header>
      <a-layout>
        <a-layout-sider>
          <LeftNave></LeftNave>
        </a-layout-sider>
        <a-layout-content class="right-box">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>

  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import LeftNave from './home/LeftNave.vue'
import Header from '@/components/Header.vue'
export default defineComponent({
  name: '',
  components: { LeftNave, Header },
  setup() {
    return { collapsed: ref<boolean>(false) }
  }
})
</script>
<style lang='less' scoped>
.ant-layout-header {
  color: #fff;
  background-color: rgba(69, 129, 238, 1);
}
.headerbox {
  color: #fff;
  background-color: #4581ee;
  position: relative;
  top: 50%;
  transform: translate(0%, -50%);
}
.right-box {
  padding: 15px;
  height: 90vh;
  overflow: auto;
  background-color: #f2f2f2;
}
</style>
