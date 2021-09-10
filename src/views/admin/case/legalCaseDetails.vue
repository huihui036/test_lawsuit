<!--
 * @Author: qinghui
 * @Date: 2021-09-09 17:00:34
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 19:08:05
 * @Description:
-->
<template>
  <div class="legalCaseDetails">
    <div class="center-box">
      <div class="title">
        <p>起诉状：王某某诉肖某某商标申请驳回复审行政纠纷</p>
        <p>编号：001234</p>
      </div>
      <div class="table">
        <BasicTable></BasicTable>
        <br />
        <UserTable></UserTable>
        <br />
        <FileTable :tableList='prosecutionList'></FileTable>
        <br />
        <FileTable :tableList='awardList'></FileTable>
        <br />
        <FileTable :tableList='serviceList'></FileTable>

        <br />
        <FileTable :tableList='cardIDList'></FileTable>
      </div>
      <div class="booter">
        <a-button>返回</a-button>
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import BasicTable from './legaalCaseDetails/BasicTable.vue'
import UserTable from './legaalCaseDetails/UserTable.vue'
import FileTable from './legaalCaseDetails/FileTable.vue'
export default defineComponent({
  name: '',
  components: { BasicTable, UserTable, FileTable },
  setup() {
    const prosecutionList = [
      {
        fileName: '起诉状',
        ascription: '案件'
      }
    ]
    const awardList = [
      {
        fileName: '裁决书',
        ascription: '案件'
      }
    ]
    const serviceList = [
      {
        fileName: '送达',
        ascription: '案件'
      }
    ]
    const cardIDList = [
      {
        fileName: '身份证',
        ascription: '案件'
      }
    ]
    return {
      prosecutionList,
      awardList,
      serviceList,
      cardIDList
    }
  }
})
</script>
<style lang='less' scoped>
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
</style>
