<!--
 * @Author: qinghui
 * @Date: 2021-09-09 18:10:51
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 18:46:26
 * @Description:文件表格
-->
<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>材料名称</td>
          <td>归属方</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item,index) in tableList'
            :key="index">
          <td>{{item.fileName}}</td>
          <td>{{item.ascription}}</td>
          <td>查看</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
interface TableData {
  fileName: string
  ascription: string
}
export default defineComponent({
  name: '',
  props: {
    tableList: {
      type: Array as PropType<TableData[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang='less' scoped>
table {
  width: 70%;
}
thead {
  background-color: #f1f1f1;
  width: 100%;
  tr {
    border: 1px solid rgb(214, 214, 214);
    td {
      border: 1px solid rgb(214, 214, 214);
      padding: 5px 20px;
    }
  }
}
tbody {
  width: 100%;
  tr {
    border: 1px solid rgb(214, 214, 214);
    td {
      border: 1px solid rgb(214, 214, 214);
      padding: 5px 20px;
    }
    td:nth-child(1) {
      width: 40%;
    }
    td:nth-child(3) {
      width: 15%;
    }
    td:nth-child(2) {
      width: 15%;
    }
  }
}
</style>
