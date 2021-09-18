<!--
 * @Author: qinghui
 * @Date: 2021-09-09 15:08:53
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-16 13:15:03
 * @Description:搜索
-->
<template>
  <a-form layout="inline"
          :model="formState">
    <a-form-item>
      <a-input v-model:value="formState.plaintiff"
               placeholder="请输入原告">

      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.defendant"
               placeholder="请输入被告">

      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button @click="seachFrom"
                type="primary">
        查询
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button @click="cleaarFroam">
        重置
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang='ts'>
import VueEvent from '@/utils/event'

import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, reactive, UnwrapRef } from 'vue'
export interface FormState {
  plaintiff: string
  defendant: string
  statusType: number
}
export default defineComponent({
  name: '',
  components: {},
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      plaintiff: '',
      defendant: '',
      statusType: 0
    })
    const seachFrom = () => {
      VueEvent.emit('seachFormState', formState)
    }
    const cleaarFroam = () => {
      formState.plaintiff = ''
      formState.defendant = ''
      VueEvent.emit('seachFormState', formState)
    }

    return {
      cleaarFroam,
      seachFrom,
      formState
    }
  }
})
</script>
<style lang='less' scoped>
</style>
