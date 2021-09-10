<!--
 * @Author: qinghui
 * @Date: 2021-09-09 16:51:40
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 18:05:54
 * @Description:原告被告信息
-->
<template>
  <div>
    <table>
      <tr>
        <td>姓名</td>
        <td>王某某</td>
        <td>类型</td>
        <td>实名认证</td>
      </tr>
      <tr>
        <td>年龄</td>
        <td>身份证</td>
        <td>民族</td>
        <td>123456456</td>
      </tr>
      <tr>
        <td>证件类型</td>
        <td>原告</td>
        <td>工作单位</td>
        <td>123456456</td>
      </tr>
      <tr>
        <td>证件号码</td>
        <td>原告---</td>
        <td>手机号码</td>
        <td>123456456</td>
      </tr>
      <tr>
        <td>其他联系方式</td>
        <td colspan="4">原告</td>
      </tr>
      <tr>
        <td>常住地址</td>
        <td colspan="4">原告</td>

      </tr>
      <tr>
        <td>送达地址</td>
        <td colspan="4">原告</td>

      </tr>
    </table>
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
@import url('./style/table.less');
</style>
