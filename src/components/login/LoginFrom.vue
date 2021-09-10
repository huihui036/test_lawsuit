<!--
 * @Author: qinghui
 * @Date: 2021-09-06 19:55:35
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 15:49:39
 * @Description:手机登入
-->

<template>
  <a-form layout="horizontal"
          :model="formState"
          ref="loginRef"
          :rules="rules">
    <a-form-item v-if="num==1"
                 name='mobile'
                 class="select-hpone">
      <a-input-group compact>
        <a-select size="large"
                  v-model:value="value3">
          <a-select-option class="line-none"
                           value="Zhejiang">中国+86</a-select-option>
        </a-select>
        <a-input class="line-none"
                 size="large"
                 placeholder="请输入手机"
                 style="width: 68%;margin: 0 0px 0 20px;"
                 v-model:value="formState.mobile" />
      </a-input-group>
    </a-form-item>
    <a-form-item v-if="num==0"
                 name="cardId">
      <a-input class="line-none"
               size="large"
               v-model:value="formState.cardId"
               placeholder="请输入身份证号码" />

    </a-form-item>
    <a-form-item name="password">
      <a-input class="line-none"
               v-model:value="formState.password"
               size="large"
               type="password"
               placeholder="请输入密码"
               autocomplete="new-password">

      </a-input>
    </a-form-item>

    <a-form-item>
      <a-button type="primary"
                html-type="submit"
                size="large"
                @click="handleSubmit"
                block>
        登录
      </a-button>
    </a-form-item>
  </a-form>
  <div class="login-container">
    <p class="login-container">
      <span>忘记密码</span>
      <span>|</span>
      <span @click="gotoRrgister">免费注册</span>

    </p>
  </div>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router'
import { defineComponent, reactive, UnwrapRef, ref } from 'vue'

import {
  isInput,
  validateMobile,
  validateCardId,
  interceptFrom
} from '@/hooks/UseFromRules'
interface FormState {
  mobile: string
  cardId: string
  password: string
}
export default defineComponent({
  name: '',
  props: {
    num: Number
  },
  setup() {
    const loginRef = ref()
    const router = useRouter()
    const value3 = ref<string>('Zhejiang')
    const rules = {
      mobile: [
        { required: true, validator: validateMobile(), trigger: 'change' }
      ],
      cardId: [
        { required: true, validator: validateCardId(), trigger: 'change' }
      ],
      password: isInput('密码')
    }
    const formState: UnwrapRef<FormState> = reactive({
      mobile: '',
      cardId: '',
      password: ''
    })

    const handleSubmit = async () => {
      const resultCheck = await interceptFrom(loginRef)

      if (!resultCheck) return
      router.push({ name: 'caseList' })
    }
    // 跳转到注册
    const gotoRrgister = async () => {
      router.push({ name: 'register' })
    }
    return {
      formState,
      loginRef,
      handleSubmit,
      gotoRrgister,
      rules,
      value3
    }
  }
})
</script>
<style lang='less' scoped>
.line-none {
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
:deep(.select-hpone) {
  .ant-select .ant-select-selector {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;

    &:focus-within {
      border: 0px solid rgb(241, 241, 241) !important;
      box-shadow: 0 0 0 0px rgba(255, 255, 255, 0) !important;
    }
  }
}
.login-container {
  text-align: right;
  margin: 10px;
  span:nth-child(1) {
    color: #1890ff;
    cursor: pointer;
  }
  span:nth-child(3) {
    color: #1890ff;
    cursor: pointer;
  }
  span {
    padding: 0 5px;
  }
}

.ant-input:focus {
  outline: 0;
  box-shadow: none;
}

:deep(.ant-form) {
  width: 400px;
  .ant-col {
    width: 100%;
  }
  .ant-form-item-label {
    padding-right: 6px;
  }
}
</style>
