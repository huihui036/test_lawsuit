<!--
 * @Author: qinghui
 * @Date: 2021-09-10 10:38:31
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 23:41:05
 * @Description:原告
-->
<template>
  <div>
    {{createUserLeaglePosition}}
    <PersionFrom :fromdatalist='PersionFromData'
                 @handles="changeValue"></PersionFrom>
    <div class="add-row">
      <a-button @click="showAgentFrom"
                style="position: relative;
    left: 50%;
    transform: translate(-50%, 0);"
                type="link">新增代理人</a-button>

    </div>
    <!-- TODO代理人注释 -->
    <AgentFrom v-show="agentFromShow || createUserLeaglePosition=='代理人'"
               @handles="changeValue"></AgentFrom>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { StoreProps } from '@/store/index'
// 原告
import PersionFrom from './PersionFrom.vue'
import AgentFrom from './AgentFrom.vue'
import { BasePersonList, ProxyList } from '@/api/addCase/addCaceType'
import { getUserCase } from '@/api/addCase/addCase'
import VueEvent from '@/utils/event'
import { getStorageData } from '@/hooks/common'
import { UserData } from '@/api/login/loginTypes'
export default defineComponent({
  name: '',
  components: { PersionFrom, AgentFrom },
  setup() {
    const agentFromShow = ref<boolean>(false)
    const store = useStore<StoreProps>()
    const PersionFromDataProx = ref()
    const createUserLeaglePosition = ref<string>()
    const PersionFromData = ref<BasePersonList[]>([
      {
        legalPositionNum: 1,
        paperworkClass: '自然人', // 类别
        personType: '身份证', // 证件类型
        fileMaps: [], // 文件
        personName: '', // 用户名称
        paperworkNum: '', // 证件号码
        sex: 0, // 性别
        birthday: '', // 出生日期
        nation: '', // 名族
        telephone: '', // 联系方式
        residenceAddress: '', // 居住地址
        address: '', // 户籍方式
        proxyList: [] // 代理人
      }
    ])
    const showAgentFrom = () => {
      agentFromShow.value = true
    }
    const authUserDepartment = getStorageData<UserData>('userData')
    if (authUserDepartment) {
      getUserCase(authUserDepartment.userUid).then((res) => {
        PersionFromDataProx.value = res

        // PersionFromData.value[0].fileUids.push(res.data.authUserFileList1[0])
      })
    }

    VueEvent.on('dispute2', () => {
      createUserLeaglePosition.value =
        store.state.addCaseFrom.createUserLeaglePosition
      // setTimeout(() => {
      //   console.log('213133', store.state.addCaseFrom)
      // }, 300)
      if (createUserLeaglePosition.value === '代理人') {
        VueEvent.emit('getproxy', [PersionFromDataProx.value.data])
      } else {
        PersionFromData.value[0].personName =
          PersionFromDataProx.value.data.personName
        PersionFromData.value[0].paperworkNum =
          PersionFromDataProx.value.data.paperworkNum
        const sex = PersionFromDataProx.value.data.sex
        PersionFromData.value[0].sex = sex || 0
        const personTypeiam =
          PersionFromDataProx.value.data.authUserFileList1[0]
        PersionFromData.value[0].personType = personTypeiam
          ? personTypeiam.fileClassName
          : ''
        PersionFromDataProx.value.data.authUserFileList1.forEach(
          (item: any) => {
            PersionFromData.value[0].fileMaps.push(item)
          }
        )
      }
    })

    const changeValue = (data: ProxyList) => {
      if (agentFromShow.value || createUserLeaglePosition.value === '代理人') {
        // eslint-disable-next-line no-unused-expressions
        PersionFromData.value[0].proxyList?.push(data as ProxyList)
        store.commit('addCaseFromPlaintiff', PersionFromData.value)
        console.log(store.state.addCaseFrom)
      } else {
        store.commit('addCaseFromPlaintiff', PersionFromData.value)
        console.log(store.state.addCaseFrom)
      }
    }

    return {
      agentFromShow,
      PersionFromData,
      createUserLeaglePosition,
      changeValue,
      showAgentFrom
    }
  }
})
</script>
<style lang='less' scoped>
.add-row {
  width: 100%;
  border-radius: 4px;
  padding: 5px 0;
  border: 1px dashed #adadad;
}
</style>
