<!--
 * @Author: qinghui
 * @Date: 2021-09-09 17:14:55
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 20:01:50
 * @Description:基础数据
-->
<template>
  <div>
    <table v-if="caseDatas">

      <tbody>
        <tr>
          <td>申请人</td>
          <td colspan="3">{{caseDatas.createUserName}}</td>
          <!-- <td>实名情况</td>
          <td>{{caseDatas.certificationStatus}}</td> -->
        </tr>
        <tr>
          <td>证件类型</td>
          <td>{{caseDatas.createUserPaperworkClass}}</td>
          <td>证件号码</td>
          <td>{{caseDatas.createUserPaperworkNum}}</td>
        </tr>
        <tr>
          <td>申请人类型</td>
          <td>{{caseDatas.createUserLeaglePosition}}</td>
          <td>手机号</td>
          <td>{{caseDatas.createUserTelephone}}</td>
        </tr>
        <tr>
          <td>案件类型</td>
          <td colspan="3">
            {{caseDatas.caseType}}
          </td>

        </tr>

        <tr>
          <td>案由</td>
          <td>{{caseDatas.legalCase}}</td>
          <td>诉讼标的额</td>
          <td>{{caseDatas.subjectMatter}}</td>
        </tr>
        <tr>
          <td>申请法院</td>
          <td>{{caseDatas.cognizanceGroupName}}</td>
          <td>状态</td>
          <td>{{caseDatas.auditStatus}}</td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script lang='ts'>
import { CaseAllData } from '@/api/addCase/addCaceType'
import { useStore } from 'vuex'
import { getCaseAllData } from '@/api/addCase/addCase'
import { defineComponent, PropType, ref } from 'vue'
import { useRoute } from 'vue-router'
import { StoreProps } from '@/store'
import VueEvent from '@/utils/event'
const caseDatas = ref()
export default defineComponent({
  name: '',

  setup() {
    const caseDatas = ref()
    const route = useRoute()
    const store = useStore<StoreProps>()
    getCaseAllData(route.query.uid as string).then((res) => {
      caseDatas.value = res.data
      VueEvent.emit('savaUserDat', res.data)
      store.dispatch('saveCaseData', res.data)
    })

    return { caseDatas }
  }
})
</script>
<style lang='less' scoped>
@import url('./style/table.less');
</style>
