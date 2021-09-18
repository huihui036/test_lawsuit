<!--
 * @Author: qinghui
 * @Date: 2021-09-09 15:28:07
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 16:02:10
 * @Description:案件列表
-->
<template>

  <div class="table-box"
       style="height: 620px;">
    <ul class="item-head">
      <li v-for="(item,index) in seleItem"
          @click="selectItem(index)"
          :class="{select:item.select}"
          :key="item.id">{{item.selectName}}</li>

    </ul>
    <a-table row-key="uid"
             :columns="columns"
             :dataSource="dataSource"
             :pagination='false'
             :scroll="{ y: 510 }"
             bordered>
      <template #operation="{ record }">
        <div class="editable-row-operations">
          <span>
            <div v-if="record.auditStatusName=='待审核'">
              <p v-if="authUserDepartment.roleName !== '当事人'"> <a @click="legalCase(record.uid)">审核申请</a></p>

              <p v-if="authUserDepartment.roleName == '当事人'"> <a @click="showProxy(record.uid)">代理人管理</a></p>
              <p v-if="authUserDepartment.roleName == '当事人'"><a @click="withdrawShow(record.uid)">撤销申请</a></p>
              <p v-if="authUserDepartment.roleName == '当事人'"><a @click="ChangegetProxy(record.uid)">送达地址修改</a></p>
            </div>
            <div>
              <p>
                <a @click="legalCase(record.uid)">详情</a>
              </p>
              <p v-if="record.auditStatusName=='待审核' && authUserDepartment.roleName == '当事人'">

                <a-popconfirm title="确定删除?"
                              ok-text="Yes"
                              cancel-text="No"
                              @confirm="confirm(record.uid)">
                  <a href="#">删除</a>
                  <!-- <a @click="deletCaseList(record.uid,)">删除</a> -->
                </a-popconfirm>

              </p>
            </div>

          </span>
        </div>
      </template>
    </a-table>

  </div>
  <a-modal v-model:visible="visibleWithdraw"
           title="撤销申请"
           @ok="handleOk">

    <a-form :model="formStateWithdraw"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <a-form-item label="撤销类型">
        <a-select v-model:value="formStateWithdraw.withdrawType"
                  placeholder="请选择类型">
          <a-select-option value="0">主动撤诉</a-select-option>
          <a-select-option value="1">和解撤诉</a-select-option>
          <a-select-option value="2">调解撤诉</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="理由">
        <a-textarea v-model:value="formStateWithdraw.withdrawExplain"
                    :rows="4" />
      </a-form-item>
    </a-form>

  </a-modal>
  <a-modal v-model:visible="visiblepeson"
           title="地址修改"
           @ok="handleOkPesonAddres">

    <a-form :model="BaseUserFrom"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <a-form-item label="选择修改人">
        <a-select v-model:value="BaseUserFrom.uid"
                  placeholder="请选择类型">
          <a-select-option v-for="item in getPersonList"
                           :key="item.uid"
                           :value="item.uid">{{item.personName}}</a-select-option>

        </a-select>
      </a-form-item>
      <a-form-item label="地址">
        <a-textarea v-model:value="BaseUserFrom.deliveryAddress"
                    :rows="4" />
      </a-form-item>
    </a-form>

  </a-modal>
  <a-modal v-model:visible="proxyShow"
           title="代理人修改"
           width="1000px"
           @ok="handleOkProxy">

    <AgenFrom></AgenFrom>

  </a-modal>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, UnwrapRef } from 'vue'
import { message } from 'ant-design-vue'
import AgenFrom from '@/views/admin/case/addCase/AgentFrom.vue'
import {
  getCaseList,
  deletCase,
  withdraw,
  getPerson,
  updateDeliveryAdress,
  getProxy
} from '@/api/addCase/addCase'
import {
  PageData,
  CaseListData,
  withdrawType,
  GetProxy
} from '@/api/addCase/addCaceType'
import { useRouter } from 'vue-router'
import VueEvent from '@/utils/event'
import { FormState } from './SerachHeader.vue'
import { getStorageData } from '@/hooks/common'
import { UserData } from '@/api/login/loginTypes'
const columns = [
  {
    title: '案件编号',
    dataIndex: 'serialNumber',
    width: '10%',
    slots: { customRender: 'serialNumber' }
  },
  {
    title: '案件名称',
    dataIndex: 'caseName',
    width: '15%',
    slots: { customRender: 'caseName' }
  },
  {
    title: '申请法院',
    dataIndex: 'cognizanceGroupName',
    width: '20%'
    // slots: { customRender: 'cognizanceGroupName' }
  },
  {
    title: '原告',
    dataIndex: 'plaintiff',
    slots: { customRender: 'plaintiff' }
  },
  {
    title: '被告',
    dataIndex: 'defendant'
  },
  {
    title: '标的金额',
    dataIndex: 'subjectMatter',
    slots: { customRender: 'subjectMatter' }
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    slots: { customRender: 'createTime' }
  },
  {
    title: '状态',
    dataIndex: 'auditStatusName',
    slots: { customRender: 'auditStatusName' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]
interface Item {
  id: number
  selectName: string
  select: boolean
}

export default defineComponent({
  name: '',
  components: { AgenFrom },
  setup() {
    const router = useRouter()
    const visibleWithdraw = ref<boolean>(false)
    const visiblepeson = ref<boolean>(false)
    const proxyShow = ref<boolean>(false)
    // const dataSource = ref()
    const seleItem = ref<Item[]>([
      {
        id: 0,
        selectName: '申请立案',
        select: true
      },
      {
        id: 1,
        selectName: '调解',
        select: false
      },
      {
        id: 2,
        selectName: '立案',
        select: false
      },

      {
        id: 3,
        selectName: '诉讼',
        select: false
      }
    ])
    const dataSource = ref<CaseListData[]>()
    const authUserDepartment = ref<UserData | null>()
    let SeachformState: FormState = {
      plaintiff: '',
      defendant: '',
      statusType: 0
    }
    const getPersonList = ref()
    const confirm = async (uid: string) => {
      console.log(uid)
      const uidList = [uid]
      const { status } = await deletCase({ uidList })
      // seleItem.value.splice()
      getCaseList(pageData, SeachformState).then((res) => {
        dataSource.value = res.data.records
        VueEvent.emit('caseList', res.data)
        if (res.status === 0) {
          message.success(res.msg)
        }
      })
    }

    const editableData: UnwrapRef<Record<string, CaseListData>> = reactive({})
    const pageData: PageData = reactive({
      size: 20,
      current: 1
    })
    const BaseUserFrom: GetProxy = reactive({
      deliveryAddress: '',
      uid: ''
    })

    const formStateWithdraw: UnwrapRef<withdrawType> = reactive({
      uid: '', // uid
      withdrawExplain: '',
      withdrawType: '0'
    })
    authUserDepartment.value = getStorageData<UserData>('userData')
    const legalCase = (uid: string) => {
      VueEvent.emit('getCase')
      router.push({
        name: 'legalCaseDetails',
        query: { uid }
      })
    }
    const save = (key: string) => {
      // delete editableData[key]
    }
    // 显示撤销
    const withdrawShow = (uid: string) => {
      formStateWithdraw.uid = uid
      visibleWithdraw.value = true
      console.log('显示')
    }
    const handleOk = (e: MouseEvent) => {
      console.log(e)
      withdraw(formStateWithdraw)
      visibleWithdraw.value = false
      formStateWithdraw.withdrawExplain = ''
    }
    getCaseList(pageData, { statusType: 0 }).then((res) => {
      dataSource.value = res.data.records
      VueEvent.emit('caseList', res.data)
    })

    const handleOkProxy = (e: MouseEvent) => {
      VueEvent.emit('proxyComit')
      proxyShow.value = false
    }
    const handleOkPesonAddres = (e: MouseEvent) => {
      visiblepeson.value = false
      updateDeliveryAdress(BaseUserFrom)
    }
    const showProxy = async (uid: string) => {
      proxyShow.value = true
      const { data } = await getProxy(uid)

      VueEvent.emit('getproxy', data)
      VueEvent.emit('getproxyCaseUid', uid)
    }

    const ChangegetProxy = async (uid: string) => {
      const { data } = await getPerson(uid)
      getPersonList.value = data
      visiblepeson.value = true
    }

    // 删除案件
    const deletCaseList = async (uid: string, record: any) => {
      const uidList = [uid]
      const { status } = await deletCase({ uidList })
      // seleItem.value.splice()
      getCaseList(pageData, SeachformState).then((res) => {
        dataSource.value = res.data.records
        VueEvent.emit('caseList', res.data)
      })
    }

    // 选择标签
    const selectItem = (index: number) => {
      seleItem.value.forEach((item) => {
        item.select = false
      })
      seleItem.value[index].select = true
      SeachformState.statusType = index
      getCaseList(pageData, SeachformState).then((res) => {
        dataSource.value = res.data.records
        VueEvent.emit('caseList', res.data)
      })
    }

    VueEvent.on('seachFormState', (formState) => {
      SeachformState = formState as FormState
      getCaseList(pageData, SeachformState).then((res) => {
        dataSource.value = res.data.records
        VueEvent.emit('caseList', res.data)
      })
    })

    VueEvent.on('cahngePageSize', (size) => {
      pageData.size = size as number
      getCaseList(pageData, SeachformState).then((res) => {
        dataSource.value = res.data.records
        VueEvent.emit('caseList', res.data)
      })
    })
    VueEvent.on('cahngecurrent', (current) => {
      pageData.current = current as number
      getCaseList(pageData, SeachformState).then((res) => {
        dataSource.value = res.data.records
        VueEvent.emit('caseList', res.data)
      })
    })

    const edit = (key: string) => {
      console.log(key)
    }
    const cancel = (key: string) => {
      // delete editableData[key]
    }

    return {
      dataSource,
      columns,
      editingKey: '',
      editableData,
      seleItem,
      visibleWithdraw,
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      formStateWithdraw,
      authUserDepartment,
      visiblepeson,
      BaseUserFrom,
      getPersonList,
      proxyShow,
      confirm,
      showProxy,
      handleOkProxy,
      handleOkPesonAddres,
      selectItem,
      ChangegetProxy,
      deletCaseList,
      withdrawShow,
      handleOk,
      edit,
      save,
      legalCase,
      cancel
    }
  }
})
</script>
<style lang='less' scoped>
.item-head {
  display: flex;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-bottom: 1px solid #9a9a9a75;
  margin: 0 0 10px 0;
  .select {
    border-bottom: 2px solid #1890ff;
  }
  .table-box {
    height: 620px;
  }
  li {
    cursor: pointer;
    margin: 0 10px;
    padding: 0 20px;
  }
}
</style>
