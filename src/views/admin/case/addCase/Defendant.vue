<!--
 * @Author: qinghui
 * @Date: 2021-09-13 09:13:37
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 14:02:09
 * @Description:被告信息
-->
<template>
  <div>
    <PersionFrom :fromdatalist='defendantData'></PersionFrom>
    <div class="add-row">
      <a-button @click="addDefendant"
                style="position: relative;
    left: 50%;
    transform: translate(-50%, 0);"
                type="link">新增被告</a-button>

    </div>
    <div class="request">
      <h5 class="row-title">诉讼请求</h5>
      <a-form :model="formState"
              :label-col="labelCol"
              :wrapper-col="wrapperCol">

        <a-form-item label="请求类型">

          <a-select v-model:value="formState.claimType"
                    placeholder="请选择证件">
            <a-select-option value="停止伤害">停止伤害</a-select-option>
            <a-select-option value="消除影响">消除影响</a-select-option>
            <a-select-option value="赔礼道歉">赔礼道歉</a-select-option>
            <a-select-option value="赔偿损失">赔偿损失</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="赔偿金额">
          <a-input v-model:value="formState.subjectMatter" />
        </a-form-item>
        <a-form-item label="诉讼请求"
                     :wrapper-col="{ span: 20,  offset:0 }">
          <a-textarea v-model:value="formState.claims"
                      :rows="4" />
        </a-form-item>

        <h5 class="row-title">诉讼事实与理由</h5>
        <a-form-item :wrapper-col="{ span: 22,  offset:0 }">
          <a-textarea v-model:value="formState.factsAndReasons"
                      placeholder="诉讼事实与理由"
                      :rows="4" />
        </a-form-item>
      </a-form>
    </div>
    <div class="uploadFile">
      <h5 class="row-title">诉讼材料</h5>
      <p class="upload-file">
        <span>起诉状</span>
        <a-upload :showUploadList='false'
                  :customRequest='customRequest'>
          <a-button>
            文件上传
          </a-button>
        </a-upload>
        <span>支持图片及Pdf格式</span>
      </p>
    </div>
    <div class="iamge">
      <ul>
        <li v-for="(item,index) in filetList"
            :key="index">
          <p> {{item.fileName}}</p>
          <p @click="deletfiel(index)">X</p>
        </li>

      </ul>

    </div>
    <div class="evi">
      <h5 class="row-title">证据</h5>
      <EvidenceFrom></EvidenceFrom>

    </div>
  </div>

</template>

<script lang='ts'>
import { defineComponent, UnwrapRef, reactive, ref } from 'vue'
import { BasePersonList, FileData } from '@/api/addCase/addCaceType'
import PersionFrom from './PersionFrom.vue'
import EvidenceFrom from './EvidenceFrom.vue'
import { useStore } from 'vuex'
import { StoreProps } from '@/store/index'
import VueEvent from '@/utils/event'
import { uploadFile } from '@/api/addCase/addCase'
const cardIDList = [
  {
    fileName: '0',
    ascription: '案件'
  },
  {
    fileName: '0',
    ascription: '案件'
  }
]
interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
}
interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}
interface FormState {
  claimType: string // 请求类型
  subjectMatter: number // 金额
  claims: string // 请求类型
  factsAndReasons: string // 理由
}
export default defineComponent({
  name: '',
  components: { PersionFrom, EvidenceFrom },
  setup() {
    const filetList = ref<FileData[]>([])
    const store = useStore<StoreProps>()
    const defenData: BasePersonList = {
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
    const defendantData = ref<BasePersonList[]>([
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
    const fileList = ref<FileItem[]>([])
    const fileListString = ref<string[]>([])
    const formState: UnwrapRef<FormState> = reactive({
      claimType: '', // 请求类型
      subjectMatter: 100, // 金额
      claims: '',
      factsAndReasons: ''
    })
    const handleChange = ({ file, fileList }: FileInfo) => {
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    }

    const deletfiel = (index: number) => {
      filetList.value.splice(index, 1)
    }
    async function customRequest(datas: any) {
      const formData = new FormData()

      formData.append('fileClassName', '起诉状')

      formData.append('sourceFile', datas.file)

      const imageData = await uploadFile(formData)
      if (imageData.status === 0) {
        filetList.value.push(imageData.data)
        fileListString.value.push(imageData.data.uid)
        // eslint-disable-next-line vue/no-mutating-props
        // props.fromdatalist[index].fileUids.push(imageData.data)
        // formState.fileUids.push(imageData.data.uid)
      }
    }
    const addDefendant = () => {
      defendantData.value.push(defenData)
    }
    VueEvent.on('defendant', () => {
      store.commit('addCaseFromDefendant', defendantData.value)
      store.commit('addCaseFromBaseLitigation', formState)
      store.commit('addBaseLitigationFileUidList', fileListString.value)
    })
    return {
      formState,
      fileList,
      cardIDList,
      defendantData,
      filetList,
      handleChange,
      customRequest,
      addDefendant,
      deletfiel,
      labelCol: { span: 2 },
      wrapperCol: { span: 6 }
    }
  }
})
</script>
<style lang='less' scoped>
.uploadFile {
  .upload-file {
    display: flex;
    align-content: center;
    height: 40px;
    line-height: 40px;
    span {
      padding: 0 5px;
    }
  }
}
.add-row {
  width: 100%;
  border-radius: 4px;
  padding: 5px 0;
  border: 1px dashed #adadad;
}
.row-title {
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0;
}
.iamge {
  ul {
    li {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      height: 42px;
      border: 1px solid #9a9a9a61;
      padding: 10px 20px;
    }
  }
}
</style>
