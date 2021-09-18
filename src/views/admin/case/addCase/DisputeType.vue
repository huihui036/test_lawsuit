<!--
 * @Author: qinghui
 * @Date: 2021-09-10 09:54:31
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 15:48:19
 * @Description:纠纷类型
-->
<template>
  <a-form :model="disputeType"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
    <a-form-item label="法院">

      <a-select v-model:value="disputeType.cognizanceGroupUid"
                @select='selectTag'
                @dropdownVisibleChange="getSelectAllByMeDiate"
                placeholder="请选择法院">
        <a-select-option v-for="item in selectAllByMeDiateList"
                         :key="item.uid"
                         :value="item.uid">{{item.companyName}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="身份">

      <a-select v-model:value="disputeType.createUserLeaglePosition"
                placeholder="请选择身份">
        <a-select-option value="原告">原告</a-select-option>
        <a-select-option value="代理人">代理人</a-select-option>

      </a-select>
    </a-form-item>
    <a-form-item label="案件类型">

      <a-radio-group v-model:value="disputeType.caseType"
                     button-style="solid">
        <a-radio-button value="民事一审">民事一审</a-radio-button>
        <a-radio-button value="首次执行">首次执行</a-radio-button>

      </a-radio-group>
    </a-form-item>
    <a-form-item label="案由">

      <a-input-group compact>
        <a-select v-model:value="disputeType.legalCase"
                  show-search
                  placeholder="请选案由大类"
                  @dropdownVisibleChange='dropdownVisibleChange'
                  @select='selectLegalCaseList'
                  style="width: 30%">
          <a-select-option v-for="item in LegalCaseList"
                           :key="item.id"
                           :value="item.legalCase">{{item.legalCase}}</a-select-option>
          <!-- <a-select-option value="Company">民事信贷纠纷</a-select-option> -->
        </a-select>
        <a-select v-model:value="disputeType.legalCaseClass"
                  placeholder="请选案由子类"
                  show-search
                  @dropdownVisibleChange='dropdownLegalCaseItemList'
                  style="width: 70%">
          <a-select-option v-for="item in LegalCaseItemList"
                           :key="item.id"
                           :value="item.legalCase">{{item.legalCase}}</a-select-option>

        </a-select>
      </a-input-group>
    </a-form-item>
  </a-form>
</template>

<script lang='ts'>
import { defineComponent, reactive, UnwrapRef, ref } from 'vue'
import { useStore } from 'vuex'
import { StoreProps } from '@/store/index'
import VueEvent from '@/utils/event'
import {
  LegalCase,
  LegalCaseItem,
  SelectAllByMeDiate
} from '@/api/addCase/addCaceType'
import {
  getLegalCase,
  getLegalCaseItemList,
  getSelectAllByMeDiateList,
  getUserCase
} from '@/api/addCase/addCase'
import { UserData } from '@/api/login/loginTypes'
import { getStorageData } from '@/hooks/common'
enum LegalPositionNum {
  plaintiff,
  defendant,
  thirdPeson
}
interface FormState {
  cognizanceGroupUid?: string | null
  createUserLeaglePosition: string // 身份
  caseType: string
  legalCaseClass: string | null // 案由大类
  legalCase: string | null // 案由
  createUserName: string
  createUserPaperworkNum: string
  createUserPaperworkClass: string
  createUserTelephone: string
}

export default defineComponent({
  name: '',
  setup() {
    const store = useStore<StoreProps>()
    const LegalCaseList = ref<LegalCase[]>([])
    const LegalCaseItemList = ref<LegalCase[]>([])
    const selectAllByMeDiateList = ref<SelectAllByMeDiate[]>([])

    const legalCaseItemData: LegalCaseItem = reactive({
      parentUid: ''
    })
    const disputeType: UnwrapRef<FormState> = reactive({
      cognizanceGroupUid: '',
      createUserLeaglePosition: '原告',
      caseType: '民事一审',
      legalCaseClass: null,
      legalCase: null,
      createUserName: '',
      createUserPaperworkNum: '',
      createUserPaperworkClass: '',
      createUserTelephone: ''
    })

    const selectTag = (value: any) => {
      disputeType.cognizanceGroupUid = value
    }
    // 获取法院
    const getSelectAllByMeDiate = async () => {
      if (selectAllByMeDiateList.value.length <= 0) {
        const { data } = await getSelectAllByMeDiateList(0)
        selectAllByMeDiateList.value = data
      }
    }
    // 大类
    const dropdownVisibleChange = async () => {
      if (LegalCaseList.value.length <= 0) {
        const { data } = await getLegalCase()
        LegalCaseList.value = data
      }
    }
    // 子类
    const dropdownLegalCaseItemList = async () => {
      const { data } = await getLegalCaseItemList(legalCaseItemData)
      LegalCaseItemList.value = data
    }
    // 选择大类
    const selectLegalCaseList = (value: string) => {
      console.log(LegalCaseList)
      const selectData = LegalCaseList.value.find((item) => {
        console.log(item.legalCase, value)
        return item.legalCase === value
      })
      disputeType.legalCaseClass = ''
      legalCaseItemData.parentUid = selectData ? selectData.caseUid : ''
    }
    const authUserDepartment = getStorageData<UserData>('userData')
    if (authUserDepartment) {
      getUserCase(authUserDepartment.userUid).then((res) => {
        if (res.data) {
          disputeType.createUserName = res.data.personName
          disputeType.createUserPaperworkNum = res.data.paperworkNum
          disputeType.createUserPaperworkClass = res.data.paperworkClass
          disputeType.createUserTelephone = res.data.telephone
        }
      })
    }
    VueEvent.on('dispute', () => {
      store.commit('addCaseBaseData', disputeType)
      console.log(store.state.addCaseFrom)
    })
    return {
      disputeType,
      LegalCaseList,
      LegalCaseItemList,
      selectAllByMeDiateList,
      dropdownVisibleChange,
      dropdownLegalCaseItemList,
      selectLegalCaseList,
      getSelectAllByMeDiate,
      selectTag,
      labelCol: { span: 2 },
      wrapperCol: { span: 10 }
    }
  }
})
</script>
<style lang='less' scoped>
</style>
