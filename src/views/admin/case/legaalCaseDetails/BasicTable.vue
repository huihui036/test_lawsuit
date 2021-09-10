<!--
 * @Author: qinghui
 * @Date: 2021-09-09 17:14:55
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 18:05:16
 * @Description:基础数据
-->
<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>声请人</td>
          <td>王某某</td>
          <td>实名情况</td>
          <td>实名认证</td>
        </tr>
        <tr>
          <td>证件类型</td>
          <td>身份证</td>
          <td>证件号码</td>
          <td>123456456</td>
        </tr>
        <tr>
          <td>申请人类型</td>
          <td>原告</td>
          <td>手机号</td>
          <td>123456456</td>
        </tr>
        <tr>
          <td>案件类型</td>
          <td>行政案件</td>
          <td>案件类型子类</td>
          <td>行政一审案件</td>
        </tr>
        <tr>
          <td>证件类型</td>
          <td>身份证</td>
          <td>证件号码</td>
          <td>123456456</td>
        </tr>
        <tr>
          <td>案由</td>
          <td>商标申请驳回复审行政纠纷</td>
          <td>诉讼标的额</td>
          <td>145</td>
        </tr>
        <tr>
          <td>申请法院</td>
          <td>湖里法院</td>
          <td>状态</td>
          <td>待审核</td>
        </tr>
      </tbody>

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
