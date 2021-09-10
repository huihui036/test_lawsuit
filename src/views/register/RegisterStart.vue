<!--
 * @Author: qinghui
 * @Date: 2021-09-06 21:06:37
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 16:04:04
 * @Description:开始注册
-->
<template>
  <div layout="horizontal"
       class="start-box">
    <div class="regeister-header">
      <p>账号注册</p>
      <p>验证码将会发送到您的手机</p>
    </div>

    <Mobile ref="mobile"></Mobile>
    <!-- <Password @getpasswordData='getpasswordData'
              ref="passwordCom"
              v-if="showPassword">
    </Password> -->
  </div>
</template>

<script lang='ts'>
import Mobile from './registerStart/Mobile.vue'
// import Password, { PasswordFormState } from './registerStart/Password.vue'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '',
  components: { Mobile },
  setup() {
    const mobile = ref()
    // function getmobileData(value: FormState) {
    return {
      mobile
    }
  }
})
</script>
<style lang='less' scoped>
.start-box {
  display: flex;
  width: 500px;
  padding: 30px 0 0 0;
  background-size: 100%;
  flex-direction: column;

  background-color: rgba(231, 231, 231, 0.239);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.regeister-header {
  width: 400px;
  margin: auto;
  p:nth-child(1) {
    font-size: 20px;
    font-weight: 600;
  }
  p:nth-child(2) {
    font-size: 16px;
    color: rgb(163, 163, 163);
  }
}
</style>
