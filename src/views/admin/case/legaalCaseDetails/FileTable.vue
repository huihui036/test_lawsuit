<!--
 * @Author: qinghui
 * @Date: 2021-09-09 18:10:51
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 09:21:16
 * @Description:文件表格
-->
<template>
  <div>

    <table>
      <thead>
        <tr>
          <td>材料名称</td>
          <!-- <td>归属方</td> -->
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item,index) in tableList'
            :key="index">
          <td>{{item.fileName}}</td>
          <!-- <td>{{item.ascription}}</td> -->
          <td class="watch"
              @click="watchImgae(item.path)">查看</td>
        </tr>
      </tbody>
    </table>
  </div>
  <a-modal :visible="previewVisible"
           :footer="null"
           @cancel="handleCancel">
    <img alt="example"
         style="width: 100%"
         :src="previewImage" />
  </a-modal>
</template>

<script lang='ts'>
import VueEvent from '@/utils/event'
import { defineComponent, PropType, ref } from 'vue'
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
    const previewVisible = ref<boolean>(false)
    const previewImage = ref<string | undefined>('')
    const imgeUrl = ref<string>('http://192.168.1.41/epan-cloud/dfs/')
    const url = window.location.href.split('/')[2]
    if (url === 'zlpg.yipan.com') {
      imgeUrl.value = 'http://zlpg.yipan.com/epan-cloud/dfs/'
    }
    const watchImgae = (filePath: string) => {
      previewVisible.value = true

      previewImage.value = imgeUrl.value + filePath
    }
    const handleCancel = () => {
      previewVisible.value = false
    }
    return {
      previewVisible,
      previewImage,
      handleCancel,
      watchImgae
    }
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
.watch {
  cursor: pointer;
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
