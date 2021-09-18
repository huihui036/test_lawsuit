<!--
 * @Author: qinghui
 * @Date: 2021-09-08 14:26:21
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-08 15:10:34
 * @Description:左侧菜单
-->
<template>

  <div class="logo" />
  <a-menu theme="dark"
          v-model:selectedKeys="selectedKeys"
          :style="{ height: '90vh', borderRight: 0 }"
          mode="inline">
    <a-menu-item key="1">
      <pie-chart-outlined />
      <span>案件中心</span>
    </a-menu-item>

    <a-sub-menu key="sub1">
      <template #title>
        <span>
          <user-outlined />
          <span>诉讼办理</span>
        </span>
      </template>
      <a-menu-item key="3">网上立案</a-menu-item>
      <a-menu-item key="4">诉讼缴费</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #title>
        <span>
          <team-outlined />
          <span>个人设置</span>
        </span>
      </template>
      <a-menu-item key="6"> 基本信息 </a-menu-item>
      <a-menu-item key="8">修改密码</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub3">
      <template #title>
        <span>
          <team-outlined />
          <span>系统设置</span>
        </span>
      </template>
      <a-menu-item key="6"> 组织管理 </a-menu-item>
      <a-menu-item key="8">权限管理</a-menu-item>
      <a-menu-item key="9">账号管理</a-menu-item>
      <a-menu-item key="10">角色管理</a-menu-item>
    </a-sub-menu>
  </a-menu>

</template>

<script lang='ts'>
import {
  PieChartOutlined,
  UserOutlined,
  TeamOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: '',
  components: {
    PieChartOutlined,
    UserOutlined,
    TeamOutlined
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(['1'])
    }
  }
})
</script>
<style lang='less' scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
}
</style>
