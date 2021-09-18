<!--
 * @Author: qinghui
 * @Date: 2021-09-10 14:43:21
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 22:14:24
 * @Description:代理人
-->
<template>

  <a-form :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
    <a-form-item label="代理人">
      <a-radio-group v-model:value="formState.representType">
        <a-radio value="3">亲属</a-radio>
        <a-radio value="5">律师</a-radio>
        <a-radio value="7">法工</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="代理人姓名"
                 :wrapper-col="{ span: 5}">
      <a-input v-model:value="formState.personName" />
    </a-form-item>

    <div v-if="formState.representType=='3'"
         class="from-item-row">
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

    <div v-if="formState.representType=='3'"
         class="from-item-row">
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
          <!-- <a-input v-model:value="formState.birthday" /> -->
          <a-date-picker v-model:value="formState.birthday"
                         type="date"
                         placeholder="日期"
                         style="width: 100%" />
        </a-form-item>
      </p>
    </div>

    <div class="from-item-row"
         v-if="formState.representType=='3'">
      <p>

        <a-form-item label="名族"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-input v-model:value="formState.nation" />
        </a-form-item>
      </p>
      <p>
        <a-form-item label="住所地"
                     :wrapper-col="{ span: 15, offset:2 }">
          <a-input v-model:value="formState.residenceAddress" />
        </a-form-item>

      </p>

    </div>

    <a-form-item label="授权方式">
      <a-radio-group v-model:value="formState.authorize">
        <a-radio value="特别授权">特别授权</a-radio>
        <a-radio value="一般授权">一般授权</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="律所名称"
                 v-if="formState.representType!=='3'"
                 :wrapper-col="{ span: 5, offset:0 }">
      <a-input v-model:value="formState.firmName" />
    </a-form-item>
    <div class="from-item-row">
      <p>
        <a-form-item label="简称"
                     :wrapper-col="{ span: 15, offset:1 }">
          <a-input v-model:value="formState.forShort" />
        </a-form-item>
      </p>
      <p>

        <a-form-item label="联系方式"
                     :wrapper-col="{ span: 15,  offset:3 }">
          <a-input v-model:value="formState.telephone" />
        </a-form-item>
      </p>
    </div>
    <a-form-item label="到庭方式"
                 :wrapper-col="{ span: 15, offset:0 }">
      <a-radio-group v-model:value="formState.appearWay">
        <a-radio value="身份证">未到庭</a-radio>
        <a-radio value="中国护照">到庭</a-radio>
        <a-radio value="人民法院调解平台在线">人民法院调解平台在线</a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script lang='ts'>
import { defineComponent, UnwrapRef, reactive } from 'vue'
import { useStore } from 'vuex'
import { StoreProps } from '@/store/index'
import VueEvent from '@/utils/event'
import { putBasePerson } from '@/api/addCase/addCase'
interface FormState {
  representType: string // 代理人身份
  firmName: string // 律师事务所
  personName: string
  paperworkNum: string // 证件号码
  sex: 0 | 1 // 性别
  relate: string
  birthday: string // 出生日期
  nation: string // 名族
  telephone: string // 联系方式
  residenceAddress: string // 居住地址
  forShort: string // 简称
  appearWay: string // 到庭方式
  legalPositionNum: number
  authorize: string // 授权方式
  uid: string
  caseUid: string
}
export default defineComponent({
  name: '',
  emits: ['handles'],
  setup(props, ctx) {
    const store = useStore<StoreProps>()
    const formState: UnwrapRef<FormState> = reactive({
      representType: '3', // 类别代理人
      legalPositionNum: 1,
      personName: '', // 用户名称
      paperworkNum: '', // 证件号码
      sex: 0, // 性别
      relate: '',
      birthday: '', // 出生日期
      nation: '', // 名族
      telephone: '', // 联系方式
      residenceAddress: '', // 居住地址
      forShort: '',
      appearWay: '',
      firmName: '',
      authorize: '特别授权',
      uid: '',
      caseUid: ''
    })

    VueEvent.on('getproxyCaseUid', (uid) => {
      formState.caseUid = uid as string
    })

    VueEvent.on('getproxy', (data: any) => {
      if (data) {
        formState.representType = data[0].representType || '3'
        formState.legalPositionNum = data[0].legalPositionNum
        formState.personName = data[0].personName
        formState.paperworkNum = data[0].paperworkNum
        formState.sex = data[0].sex || 0
        formState.birthday = data[0].birthday
        formState.nation = data[0].nation
        formState.relate = data[0].relate
        formState.telephone = data[0].telephone
        formState.residenceAddress = data[0].residenceAddress
        formState.forShort = data[0].forShort
        formState.appearWay = data[0].appearWay
        formState.firmName = data[0].firmName
        formState.authorize = data[0].authorize || '特别授权'
        formState.uid = data[0].uid
        console.log(formState)
      } else {
        formState.representType = '3'
        formState.legalPositionNum = 1
        formState.personName = ''
        formState.paperworkNum = ''
        formState.sex = 0
        formState.birthday = ''
        formState.relate = ''
        formState.nation = ''
        formState.telephone = ''
        formState.residenceAddress = ''
        formState.forShort = ''
        formState.appearWay = ''
        formState.firmName = ''
        formState.authorize = '特别授权'
      }
    })
    VueEvent.on('proxyComit', () => {
      putBasePerson(formState)
    })

    VueEvent.on('plaintiffForm', () => {
      ctx.emit('handles', formState)
      // VueEvent.emit('agent', formState)
      // store.commit('addCaseFromBasePersonList', [formState])
      console.log(store.state.addCaseFrom)
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
