<!--
 * @Author: qinghui
 * @Date: 2021-09-09 16:51:40
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 11:20:43
 * @Description:原告被告信息
-->
<template>
  <div class="user-table"
       v-if="caseDatas">
    <!-- <p>
      {{caseDatas.plaintiffPersonList}}
    </p> -->

    <table v-for="(item,index) in caseDatas.defendantPersonList "
           :key="index"
           style="  width: 70%;">
      <tr>
        <td>姓名</td>
        <td>{{item.personName}}</td>
        <td>类型</td>
        <td>{{item.personType}}</td>
      </tr>
      <tr>
        <td>年龄</td>
        <td>{{item.age}}</td>
        <td>民族</td>
        <td>{{item.nation}}</td>
      </tr>
      <tr>
        <td>证件类型</td>
        <td>{{item.paperworkClass}}</td>
        <td>工作单位</td>
        <td></td>
      </tr>
      <tr>
        <td>证件号码</td>
        <td>{{item.paperworkNum}}</td>
        <td>手机号码</td>
        <td>{{item.telephone}}</td>
      </tr>
      <tr>
        <td>其他联系方式</td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <td>常住地址</td>
        <td colspan="4">{{item.residenceAddress}}</td>

      </tr>
      <tr>
        <td>送达地址</td>
        <td colspan="4">{{item.deliveryAddress}}</td>

      </tr>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { StoreProps } from '@/store'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: '',

  setup() {
    const caseDatas = ref()
    const store = useStore<StoreProps>()
    // caseDatas.value = store.state.caseData

    VueEvent.on('savaUserDat', (data: any) => {
      caseDatas.value = data
    })
    return {
      caseDatas
    }
  }
})
</script>
<style lang='less' scoped>
// @import url('./style/table.less');
.user-table {
  table {
    width: 70%;
    margin: 0 0 10px;
  }

  width: 100%;
  tr {
    border: 1px solid rgb(214, 214, 214);
    td {
      border: 1px solid rgb(214, 214, 214);
      padding: 5px 20px;
    }
    td:nth-child(1) {
      background-color: #f1f1f1;
      width: 15%;
    }
    td:nth-child(3) {
      background-color: #f1f1f1;
      width: 15%;
    }
    td:nth-child(2) {
      width: 30%;
    }
    td:nth-child(4) {
      width: 40%;
    }
  }
}
</style>
