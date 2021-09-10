<!--
 * @Author: qinghui
 * @Date: 2021-09-10 09:54:31
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 15:19:41
 * @Description:纠纷类型
-->
<template>
  <a-form :model="disputeType"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
    <a-form-item label="法院">

      <a-select v-model:value="disputeType.cognizanceGroupUid"
                placeholder="请选择法院">
        <a-select-option value="fuzhou">福州鼓楼法院</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="身份">

      <a-select v-model:value="disputeType.legalPositionNum"
                placeholder="请选择身份">
        <a-select-option :value="0">原告</a-select-option>
        <a-select-option :value="1">被告</a-select-option>
        <a-select-option :value="2">第三人</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="案件类型">

      <a-radio-group v-model:value="disputeType.caseType"
                     button-style="solid">
        <a-radio-button value="1">民事一审</a-radio-button>
        <a-radio-button value="2">首次执行</a-radio-button>

      </a-radio-group>
    </a-form-item>
    <a-form-item label="案由">

      <a-input-group compact>
        <a-select v-model:value="disputeType.legalCase"
                  style="width: 30%">
          <a-select-option value="Home">民间借贷纠纷</a-select-option>
          <a-select-option value="Company">民事信贷纠纷</a-select-option>
        </a-select>
        <a-select v-model:value="disputeType.legalCaseClass"
                  style="width: 70%">
          <a-select-option value="Home">民间借贷纠纷</a-select-option>
          <a-select-option value="Company">民事信贷纠纷</a-select-option>
        </a-select>
      </a-input-group>
    </a-form-item>
  </a-form>
</template>

<script lang='ts'>
import { defineComponent, reactive, UnwrapRef } from 'vue'

enum LegalPositionNum {
  plaintiff,
  defendant,
  thirdPeson
}
interface FormState {
  cognizanceGroupUid: string
  legalPositionNum: LegalPositionNum // 身份
  caseType: string
  legalCaseClass: string // 案由大类
  legalCase: string // 案由
}

export default defineComponent({
  name: '',
  setup() {
    const disputeType: UnwrapRef<FormState> = reactive({
      cognizanceGroupUid: 'fuzhou',
      legalPositionNum: 3,
      caseType: '1',
      legalCaseClass: 'Home',
      legalCase: 'Home'
    })
    return {
      disputeType,

      labelCol: { span: 2 },
      wrapperCol: { span: 10 }
    }
  }
})
</script>
<style lang='less' scoped>
</style>
