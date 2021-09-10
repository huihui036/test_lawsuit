<!--
 * @Author: qinghui
 * @Date: 2021-09-10 14:43:21
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 15:22:55
 * @Description:代理人
-->
<template>
  <a-form :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
    <a-form-item label="代理人">
      <a-radio-group v-model:value="formState.paperworkClass">
        <a-radio value="自然人">亲属</a-radio>
        <a-radio value="法人">律所</a-radio>
        <a-radio value="非法人组织">法工</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="代理人姓名"
                 :wrapper-col="{ span: 5}">
      <a-input v-model:value="formState.personName" />
    </a-form-item>

    <div class="from-item-row">
      <p>
        <a-form-item label="关系"
                     :wrapper-col="{ span: 15, offset:1}">
          <a-input v-model:value="formState.relate" />
        </a-form-item>
      </p>
      <p>
        <a-form-item label="证件号码"
                     :wrapper-col="{ span: 15, offset:3}">
          <a-input v-model:value="formState.paperworkNum" />
        </a-form-item>
      </p>
    </div>

    <div class="from-item-row">
      <p>
        <a-form-item label="性别"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-radio-group v-model:value="formState.sex">
            <a-radio :value="0">男</a-radio>
            <a-radio :value="1">女</a-radio>
          </a-radio-group>
        </a-form-item>
      </p>
      <p>
        <a-form-item label="出生日期"
                     :wrapper-col="{ span: 15,  offset:3 }">
          <a-input v-model:value="formState.birthday" />
        </a-form-item>
      </p>
    </div>

    <div class="from-item-row">
      <p>

        <a-form-item label="名族"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-input v-model:value="formState.personName" />
        </a-form-item>
      </p>
      <p>

        <a-form-item label="联系方式"
                     :wrapper-col="{ span: 15,  offset:3 }">
          <a-input v-model:value="formState.telephone" />
        </a-form-item>
      </p>
    </div>

    <a-form-item label="授权方式">
      <a-radio-group v-model:value="formState.authorize">
        <a-radio value="0">特别授权</a-radio>
        <a-radio value="1">一般授权</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="律所名称">
      <a-input v-model:value="formState.telephone" />
    </a-form-item>
    <div class="from-item-row">
      <p>

        <a-form-item label="简称"
                     :wrapper-col="{ span: 15, offset:1 }">
          <a-input v-model:value="formState.forShort" />
        </a-form-item>
      </p>
      <p>
        <a-form-item label="住所地"
                     :wrapper-col="{ span: 15, offset:2 }">
          <a-input v-model:value="formState.residenceAddress" />
        </a-form-item>

      </p>
    </div>
    <a-form-item label="到庭方式"
                 :wrapper-col="{ span: 15, offset:0 }">
      <a-radio-group v-model:value="formState.appearWay">
        <a-radio value="身份证">未到庭</a-radio>
        <a-radio value="中国护照">到庭</a-radio>
        <a-radio value="中国护照">人民法院调解平台在线</a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script lang='ts'>
import { defineComponent, UnwrapRef, reactive } from 'vue'
interface FormState {
  representType: string // 代理人身份

  personName: string
  paperworkNum: string // 证件号码
  sex: 0 | 1 // 性别
  birthday: string // 出生日期
  nation: string // 名族
  telephone: string // 联系方式
  residenceAddress: string // 居住地址
  forShort: string // 简称
  appearWay: string // 到庭方式

  authorize: string // 授权方式
}
export default defineComponent({
  name: '',
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      representType: '自然人', // 类别

      personName: '', // 用户名称
      paperworkNum: '', // 证件号码
      sex: 0, // 性别
      birthday: '', // 出生日期
      nation: '', // 名族
      telephone: '', // 联系方式
      residenceAddress: '', // 居住地址
      forShort: '',
      appearWay: '',
      authorize: ''
    })
    return {
      formState,
      labelCol: { span: 2 },
      wrapperCol: { span: 6 }
    }
  }
})
</script>
<style lang='less' scoped>
.from-item-row {
  display: flex;
  margin: 0 50px;
  width: 80%;
  p {
    width: 40%;
  }
  :deep(.ant-form-item-label) {
    width: 200px;
    overflow: inherit;
  }
}
</style>
