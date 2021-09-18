<!--
 * @Author: qinghui
 * @Date: 2021-09-09 17:00:34
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 20:00:49
 * @Description:
-->
<template>
  <div class="legalCaseDetails">
    <div class="center-box">
      <div class="title">
        <p>起诉状： <span v-if="caseDatas">{{caseDatas.caseName}}</span></p>
        <p v-if="caseDatas">编号：<span>{{caseDatas.serialNumber}}</span></p>
      </div>
      <div class="table">
        <h5>基本信息</h5>
        <BasicTable>
        </BasicTable>

        <br />
        <h5>原告信息</h5>
        <UserTable></UserTable>
        <br />
        <h5>被告信息</h5>
        <DefendantPersonList></DefendantPersonList>
        <!-- {{caseDatas}} -->
        <br />
        <h5>起诉状</h5>
        <div>
          <FileTable :tableList='prosecutionList'>
          </FileTable>
          <br />
          <h5>证据清单</h5>
          <FileTable :tableList='evidence'></FileTable>
          <br />
          <h5>身份证</h5>
          <FileTable :tableList='certification'></FileTable>

          <br />
          <!-- <FileTable :tableList='cardIDList'></FileTable> -->
        </div>

      </div>
      <div class="booter"
           v-if="pesron !='当事人'">

        <a-button danger
                  @click="passBatchCase(0)">审核不通过</a-button>
        <a-radio-button @click="passBatchCase(1)">转诉讼</a-radio-button>
        <a-radio-button @click="passBatchCase(2)">转调解</a-radio-button>
      </div>

    </div>

  </div>
  <a-modal v-model:visible="visible"
           title="审核意见"
           :afterClose='afterClose'
           @ok="handleOk">
    <a-textarea v-model:value="passBatchCaseList.auditOpinion"
                placeholder="审核意见"
                :rows="4" />
  </a-modal>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import BasicTable from './legaalCaseDetails/BasicTable.vue'
import UserTable from './legaalCaseDetails/UserTable.vue'
import FileTable from './legaalCaseDetails/FileTable.vue'
import DefendantPersonList from './legaalCaseDetails/DefendantPersonList.vue'
import {
  getCaseAllData,
  getCaseData,
  passBatch,
  toLitigation,
  toMediate,
  unpassBatch
} from '@/api/addCase/addCase'
import {
  CaseAllData,
  FileMapItem,
  PassBatchType
} from '@/api/addCase/addCaceType'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import VueEvent from '@/utils/event'
import { StoreProps } from '@/store'
import { getStorageData } from '@/hooks/common'
import { UserData } from '@/api/login/loginTypes'

export default defineComponent({
  name: '',
  components: { BasicTable, UserTable, FileTable, DefendantPersonList },
  setup() {
    const visible = ref<boolean>(false)
    const store = useStore<StoreProps>()
    const route = useRoute()
    const passFlag = ref<number>(0)
    const caseDatas = ref()
    const pesron = ref<string>()
    const passBatchCaseList: PassBatchType = reactive({
      uidList: [],
      uid: '',
      auditOpinion: ''
    })
    const prosecutionList = ref()
    const evidence = ref()
    const certification = ref()

    const serviceList = [
      {
        fileName: '送达',
        ascription: '案件'
      }
    ]

    const showModal = () => {
      visible.value = true
    }
    const authUserDepartment = getStorageData<UserData>('userData')
    if (authUserDepartment) {
      pesron.value = authUserDepartment.roleName
    }

    const handleOk = (e: MouseEvent) => {
      const uid = route.query.uid
      if (passFlag.value === 0) {
        passBatchCaseList.uidList = [uid as string]
        passBatch(passBatchCaseList)
      } else if (passFlag.value === 1) {
        passBatchCaseList.uid = uid as string
        toLitigation(passBatchCaseList)
      } else if (passFlag.value === 2) {
        passBatchCaseList.uid = uid as string
        toMediate(passBatchCaseList)
      }
      visible.value = false
    }
    const passBatchCase = (type: number) => {
      passFlag.value = type
      visible.value = true
    }
    const afterClose = () => {
      passBatchCaseList.auditOpinion = ''
    }
    setTimeout(() => {
      caseDatas.value = store.state.caseData
      prosecutionList.value = store.state.caseData.fileMap.pleadings
      evidence.value = store.state.caseData.fileMap.evidence
      certification.value = store.state.caseData.fileMap.certification
      debugger
    }, 500)

    const cardIDList = [
      {
        fileName: '身份证',
        ascription: '案件'
      }
    ]
    return {
      prosecutionList,
      evidence,
      serviceList,
      cardIDList,
      certification,
      visible,
      caseDatas,
      passBatchCaseList,
      pesron,
      passBatchCase,
      afterClose,
      handleOk,
      showModal
    }
  }
})
</script>
<style lang='less' scoped>
.booter {
  margin: 20px 15%;
  button,
  label {
    margin: 0 10px;
  }
}
.legalCaseDetails {
  background: #fff;
  height: 86vh;
  overflow: auto;
  padding: 10px;
  .center-box {
    width: 80%;
    margin: auto;
    .title {
      p:nth-child(1) {
        font-size: 20px;
        margin: 0;
        font-weight: 600;
      }
      p:nth-child(2) {
        font-size: 16px;
        margin: 10px 0;
        color: rgb(139, 139, 139);
      }
    }
  }
}
h5 {
  font-size: 17px;
  font-weight: 600;
  margin: 10px;
}
</style>
