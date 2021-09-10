<!--
 * @Author: qinghui
 * @Date: 2021-09-09 15:08:53
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 15:18:40
 * @Description:搜索
-->
<template>
  <a-form layout="inline"
          :model="formState"
          @finish="handleFinish"
          @finishFailed="handleFinishFailed">
    <a-form-item>
      <a-input v-model:value="formState.user"
               placeholder="输入调解号/立案号">
        <template #prefix>
          <SearchOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary">
        查询
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button>
        重置
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang='ts'>
import { SearchOutlined } from '@ant-design/icons-vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, reactive, UnwrapRef } from 'vue'
interface FormState {
  user: string
  password: string
}
export default defineComponent({
  name: '',
  components: {
    SearchOutlined
  },
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user: '',
      password: ''
    })
    const handleFinish = (values: FormState) => {
      console.log(values, formState)
    }
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors)
    }
    return {
      formState,
      handleFinish,
      handleFinishFailed
    }
  }
})
</script>
<style lang='less' scoped>
</style>
