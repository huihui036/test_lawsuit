<!--
 * @Author: qinghui
 * @Date: 2021-09-09 18:10:51
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 17:33:33
 * @Description:证据
-->
<template>
  <div>
    <table>
      <thead>
        <tr>
          <td>序号</td>
          <td>材料名称</td>
          <!-- <td>归属方</td> -->
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item,index) in filetList'
            :key="index">
          <td>{{index}}</td>
          <td>{{item.fileName}}</td>
          <!-- <td>{{item.fileClassName}}</td> -->
          <!-- <td>证据清单</td> -->
          <td class="del-btn"
              @click="deletFile(index)">删除</td>
        </tr>
        <tr class="last-row">
          <td colspan="2"></td>
          <td colspan="2">
            <a-upload :showUploadList='false'
                      :customRequest='customRequest'>
              <a-button>
                文件上传
              </a-button>
            </a-upload>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang='ts'>
import { FileData } from '@/api/addCase/addCaceType'
import { uploadFile } from '@/api/addCase/addCase'
import { StoreProps } from '@/store'
import VueEvent from '@/utils/event'
import { useStore } from 'vuex'
import { defineComponent, PropType, ref } from 'vue'
const eviList = [
  {
    fileName: '身份证',
    ascription: '案件'
  }
]
interface TableData {
  fileName: string
  ascription: string
}
export default defineComponent({
  name: '',
  props: {
    // tableList: {
    //   type: Array as PropType<TableData[]>,
    //   required: true
    // }
  },
  setup() {
    const store = useStore<StoreProps>()
    const filetList = ref<FileData[]>([])
    const fileListString = ref<string[]>([])
    async function customRequest(datas: any) {
      const formData = new FormData()

      formData.append('fileClassName', '聊天记录')
      formData.append('sourceFile', datas.file)

      const imageData = await uploadFile(formData)
      if (imageData.status === 0) {
        filetList.value.push(imageData.data)
        fileListString.value.push(imageData.data.uid)
      }
    }
    VueEvent.on('defendant', () => {
      store.commit('addEvidenceFileUidList', fileListString.value)
    })
    const deletFile = (idnex: number) => {
      filetList.value.splice(idnex, 1)
    }
    return { eviList, customRequest, deletFile, filetList }
  }
})
</script>
<style lang='less' scoped>
table {
  width: 70%;
}
.del-btn {
  cursor: pointer;
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
    td:nth-child(1) {
      width: 12%;
    }
    td:nth-child(2) {
      width: 40%;
    }
    td:nth-child(3) {
      width: 40%;
    }
  }
}
.last-row {
  td {
    border: 0;
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
      width: 12%;
    }
    td:nth-child(2) {
      width: 40%;
    }
    td:nth-child(3) {
      width: 40%;
    }
  }
}
</style>
