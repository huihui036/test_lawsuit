<!--
 * @Author: qinghui
 * @Date: 2021-09-08 10:38:17
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 16:32:19
 * @Description:
-->
<template>
  <div>
    <a-form :model="formState"
            :label-col="labelCol"
            :rules="rules"
            ref='mobile'
            :wrapper-col="wrapperCol">

      <a-form-item name='mobile'>
        <a-input-group compact>
          <a-select size="large"
                    v-model:value="mobileType">
            <a-select-option value="zh-cn">+86</a-select-option>
          </a-select>
          <a-input size="large"
                   style="width: 82.5%"
                   placeholder="输入手机号"
                   v-model:value="formState.mobile" />
        </a-input-group>
      </a-form-item>

      <a-form-item name='verifyCode'>
        <a-input class="line-figt-none"
                 size="large"
                 name='verifyCode'
                 placeholder="验证码"
                 v-model:value="formState.verifyCode">
          <template #suffix>
            <span v-if="countTime<60">{{countTime}}</span>
            <a-tooltip v-else
                       title="获取验证码">
              <span @click="getValiCode"
                    class="code">获取验证码</span>
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-group compact>
          <a-input-password placeholder="输入密码"
                            size="large"
                            v-model:value="formState.password" />
        </a-input-group>
      </a-form-item>
      <a-form-item name="password2">
        <a-input-password placeholder="再次输入密码"
                          size="large"
                          v-model:value="formState.password2" />
      </a-form-item>

      <!-- <a-col :span="6">
          <div class="validata-btn">获取验证码</div>
        </a-col> -->

      <a-form-item :wrapper-col="{ offset:0 }">
        <a-button @click="netAwait"
                  type="primary"
                  size="large"
                  block>
          立即提交
        </a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, UnwrapRef, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  validateMobile,
  isInput,
  interceptFrom,
  passwordCheck
} from '@/hooks/UseFromRules'
import VueEvent from '@/utils/event'
import { getVerifyCode } from '@/api/login/login'
export interface FormState {
  mobile: string
  verifyCode: string
  password: string
  password2: string
}
export default defineComponent({
  name: '',
  components: {},
  setup(props, context) {
    const mobile = ref()
    const countTime = ref<number>(60)
    const formState: UnwrapRef<FormState> = reactive({
      mobile: '',
      verifyCode: '',
      password: '',
      password2: ''
    })
    const rules = {
      mobile: [
        { required: true, validator: validateMobile(), trigger: 'change' }
      ],
      verifyCode: isInput('验证码', 'blur', 6, 6),
      password: isInput('密码', 'change', 6, 18),
      password2: [
        {
          required: true,
          validator: passwordCheck(formState),
          trigger: 'change'
        }
      ]
    }
    // 获取验证码
    const getValiCode = async () => {
      const begin = setInterval(() => {
        if (countTime.value > 0) {
          countTime.value--
        }
        if (countTime.value === 0) {
          clearInterval(begin)
          countTime.value = 60
        }
      }, 1000)

      const result = await getVerifyCode(formState.mobile)

      message.success(result.msg)
    }
    const netAwait = async () => {
      // 验证表单
      const resultCheck = await interceptFrom(mobile)
      if (!resultCheck) return
      // 验证通过将值传递给父组件
      context.emit('getmobileData', formState)
      // 执行到第二部
      VueEvent.emit('nextway')
    }

    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 25 },
      formState,
      rules,
      mobile,
      countTime,
      netAwait,
      getValiCode,
      mobileType: 'zh-cn'
    }
  }
})
</script>
<style lang='less' scoped>
.line-figt-none {
  // border-right: 0px;
  // border-bottom-right-radius: 0;
  // border-top-right-radius: 0;
}
.code {
  cursor: pointer;
  color: #1890ff;
}
// .validata-btn {
//   border: 1px solid #d9d9d9;
//   padding: 8px 0px;
//   text-align: center;
//   border-left: 0px;
//   background-color: #fff;
//   border-bottom-right-radius: 2px;
//   border-top-right-radius: 2px;
//   color: #1890ff;
// }
:deep(.ant-form) {
  width: 400px;
  margin: auto;
  .ant-col {
    width: 100%;
  }
  .ant-form-item-label {
    padding-right: 6px;
  }
}
</style>
