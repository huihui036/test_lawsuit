<!--
 * @Author: qinghui
 * @Date: 2021-09-10 10:38:31
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 10:02:16
 * @Description:用户表单
-->
<template>

  <a-form v-for="(item,index) in fromdatalist"
          :key="index"
          :model="item"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">

    <a-form-item label="主体类别">

      <a-radio-group v-model:value="item.paperworkClass">
        <a-radio value="自然人">自然人</a-radio>
        <a-radio value="法人">法人</a-radio>
        <a-radio value="非法人组织">非法人组织</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="证件类型">
      <a-radio-group v-model:value="item.personType">
        <a-radio value="身份证">身份证</a-radio>
        <a-radio value="中国护照">中国护照</a-radio>
      </a-radio-group>
    </a-form-item>

    <div class="upload-row">
      <p>照片 :</p>
      <div class="image-box">
        <div class="clearfix">
          <!-- v-model:file-list="businessList" -->
          <a-upload action=""
                    list-type="picture-card"
                    :showUploadList='false'
                    :customRequest='(value) =>customRequest(value,index)'
                    @change="(value) => handleChange(value, 1)"
                    @preview="handlePreview">
            <div v-if="businessList.length<3">
              <div class="ant-upload-text ant-upload-car3">
                <ArrowUpOutlined />
                <span>上传证件</span>
              </div>
            </div>
          </a-upload>
          <ul class="imgae-row">
            <li v-for="(e,i) in fromdatalist[index].fileMaps"
                :key="i"
                class="item-list-image"
                :style="
                      'background-image:url('+
                   imgeUrl+ e.path  +
                      ')'
                    "></li>

          </ul>
        </div>
      </div>
    </div>
    <div class="from-item-row">
      <p>
        <a-form-item label="姓名"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-input v-model:value="item.personName" />
        </a-form-item>
      </p>
      <p>
        <a-form-item label="身份证号"
                     :wrapper-col="{ span: 15, offset:3}">
          <a-input v-model:value="item.paperworkNum" />
        </a-form-item>
      </p>
    </div>

    <div class="from-item-row">
      <p>
        <a-form-item label="性别"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-radio-group v-model:value="item.sex">
            <a-radio :value="0">男</a-radio>
            <a-radio :value="1">女</a-radio>
          </a-radio-group>
        </a-form-item>
      </p>
      <p>
        <a-form-item label="出生日期"
                     :wrapper-col="{ span: 15,  offset:3 }">
          <!-- <a-input v-model:value="item.birthday" /> -->
          <a-date-picker v-model:value="item.birthday"
                         type="date"
                         placeholder="日期"
                         style="width: 100%" />
        </a-form-item>

      </p>
    </div>

    <div class="from-item-row">
      <p>

        <a-form-item label="民族"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-input v-model:value="item.nation" />
        </a-form-item>
      </p>
      <p>
        <a-form-item label="联系方式"
                     :wrapper-col="{ span: 15,  offset:3 }">
          <a-input v-model:value="item.telephone" />
        </a-form-item>
      </p>
    </div>

    <a-form-item label="户籍地址"
                 :wrapper-col="{ span: 10, offset:0 }">
      <a-input v-model:value="item.address" />
    </a-form-item>

    <a-form-item label="居住地址"
                 :wrapper-col="{ span: 10, offset:0 }">
      <a-input v-model:value="item.residenceAddress" />
    </a-form-item>
    <a-divider />
  </a-form>

</template>

<script lang='ts'>
import { ArrowUpOutlined } from '@ant-design/icons-vue'
import { BasePersonList, FileData } from '@/api/addCase/addCaceType'
import { useRoute } from 'vue-router'
import { uploadFile } from '@/api/addCase/addCase'

import { defineComponent, reactive, UnwrapRef, ref, PropType } from 'vue'
interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  percent?: number
  url?: string
  preview?: string
  originFileObj?: any
}
interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}
interface FormState {
  paperworkClass: string
  personType: string
  fileMaps: any[] // 文件列表
  personName: string
  paperworkNum: string // 证件号码
  sex: 0 | 1 // 性别
  birthday: string // 出生日期
  nation: string // 名族
  legalPositionNum: number
  telephone: string // 联系方式
  residenceAddress: string // 居住地址
  address: string // 户籍方式
}
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default defineComponent({
  name: '',
  components: { ArrowUpOutlined },
  props: {
    fromdatalist: {
      type: Array as PropType<BasePersonList[]>,
      required: true
    }
  },
  setup(props, context) {
    const businessList = ref<FileData[]>([]) // 英特执照
    const previewVisible = ref<boolean>(false)
    const previewImage = ref<string | undefined>('')
    const route = useRoute()
    const imgeUrl = ref<string>('http://192.168.1.41/epan-cloud/dfs/')

    //  console.log(fromdatalist)
    const formState: UnwrapRef<FormState> = reactive({
      paperworkClass: '身份证', // 类别
      personType: '自然人', // 证件类型
      fileMaps: [], // 文件
      personName: '', // 用户名称
      paperworkNum: '', // 证件号码
      sex: 0, // 性别
      legalPositionNum: 0,
      birthday: '', // 出生日期
      nation: '', // 名族
      telephone: '', // 联系方式
      residenceAddress: '', // 居住地址
      address: '' // 户籍方式
    })
    const handleChange = (value: FileInfo, id: number) => {
      console.log(value, id)
    }

    async function customRequest(datas: any, index: number) {
      console.log(index)
      const formData = new FormData()

      formData.append('fileClassName', '身份证')
      formData.append('sort', '0')
      formData.append('sourceFile', datas.file)

      const imageData = await uploadFile(formData)
      if (imageData.status === 0) {
        businessList.value.push(imageData.data)
        // eslint-disable-next-line vue/no-mutating-props
        props.fromdatalist[index].fileMaps.push(imageData.data)
        //   formState.fileUids.push(imageData.data.uid)
      }
    }

    const handlePreview = async (file: FileItem) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
    }

    const url = window.location.href.split('/')[2]
    if (url === 'zlpg.yipan.com') {
      imgeUrl.value = 'http://zlpg.yipan.com/epan-cloud/dfs/'
    }

    return {
      businessList,
      labelCol: { span: 2 },
      wrapperCol: { span: 6 },
      formState,
      imgeUrl,
      customRequest,
      handleChange,

      handlePreview
    }
  }
})
</script>
<style lang='less' scoped>
.from-item-row {
  display: flex;
  margin: 0 50px;
  width: 80%;
  p {
    width: 40%;
  }
  :deep(.ant-form-item-label) {
    width: 200px;
    overflow: inherit;
  }
}

:deep(.ant-upload-list-picture-card-container) {
  width: 170px;
}
:deep(.ant-upload-list-item) {
  float: left;
  width: 170px;
  height: 120px;
  margin: 0 8px 8px 0;
}
.imgae-row {
  display: flex;
}
.ant-upload-picture-card-wrapper {
  display: flex;
  width: 180px;
}
.item-list-image {
  background-size: 90% 90%;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  width: 217px;
  height: 117px;
  margin: 0 5px;
  border: 1px solid #e2e2e2;
  cursor: pointer;
}
.upload-row {
  display: flex;
  width: 1200px;
  margin: 0 0 20px 0;
  p {
    width: 100px;
    text-align: right;
    padding: 10px;
  }
  .image-box {
    width: 800px;
  }
}
:deep(.ant-upload-select) {
  order: 1;
}
:deep(.ant-upload-list-picture-card) {
  order: 2;
}
.clearfix {
  display: flex;
}

.ant-upload-text {
  width: 150px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  span {
    line-height: 100px;
    font-size: 16px;
    color: #285986;
  }
}
</style>
