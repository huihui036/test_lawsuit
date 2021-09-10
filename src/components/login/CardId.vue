<!--
 * @Author: your name
 * @Date: 2021-09-06 19:55:16
 * @LastEditTime: 2021-09-06 20:52:50
 * @LastEditors: qinghui
 * @Description: In User Settings Edit 证件号登入
 * @FilePath: \source-mediarte-ts\src\components\login\CardId.vue
-->
<template>
  <div style="width: 60%;
    margin: auto;">
    <a-form :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <a-form-item>
        <a-input v-model:value="formState.casrId"
                 placeholder="请输入身份证号码" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.password"
                 placeholder="请输入密码" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset:0 }">
        <a-button type="primary" block>登入</a-button>
      </a-form-item>

    </a-form>
    <div class="title-row">
      <p>忘记密码</p>
      <p>无账号,请先注册</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, UnwrapRef } from 'vue'
interface FormState {
  casrId: string
  password: string
}
export default defineComponent({
  name: '',
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      casrId: '',
      password: ''
    })
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 25 },
      formState
    }
  }
})
</script>
<style lang='less' scoped>
.title-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    cursor: pointer;
  }
}
</style>
