<!--
 * @Author: qinghui
 * @Date: 2021-09-08 10:38:28
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 11:28:21
 * @Description:
-->
<!--
 * @Author: qinghui
 * @Date: 2021-09-08 10:38:17
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-08 10:45:30
 * @Description:
-->
<template>
  <div>
    <a-form :model="formState"
            ref="passwordRef"
            :rules='rules'
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
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
      <a-form-item :wrapper-col="{ offset:0 }">
        <a-button @click="summitPassword"
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
import VueEvent from '@/utils/event'
import { passwordCheck, isInput, interceptFrom } from '@/hooks/UseFromRules'
export interface PasswordFormState {
  password: string
  password2: string
}

export default defineComponent({
  name: '',
  setup(props, context) {
    const passwordRef = ref()
    const formState: UnwrapRef<PasswordFormState> = reactive({
      password: '',
      password2: ''
    })

    const rules = {
      password: isInput('密码', 'change', 6, 18),
      password2: [
        {
          required: true,
          validator: passwordCheck(formState),
          trigger: 'change'
        }
      ]
    }

    const summitPassword = async () => {
      const resultCheck = await interceptFrom(passwordRef)
      if (!resultCheck) return
      // 验证通过将值传递给父组件
      context.emit('getpasswordData', formState)
      // 执行到第二部
      VueEvent.emit('nextway')
    }
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 25 },
      summitPassword,
      rules,
      passwordRef,
      formState
    }
  }
})
</script>
<style lang='less' scoped>
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
