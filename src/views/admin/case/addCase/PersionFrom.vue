<!--
 * @Author: qinghui
 * @Date: 2021-09-10 10:38:31
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 14:56:59
 * @Description:用户表单
-->
<template>
  <a-form :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
    <a-form-item label="主体类别">
      <a-radio-group v-model:value="formState.paperworkClass">
        <a-radio value="自然人">自然人</a-radio>
        <a-radio value="法人">法人</a-radio>
        <a-radio value="非法人组织">非法人组织</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="证件类型">
      <a-radio-group v-model:value="formState.personType">
        <a-radio value="身份证">身份证</a-radio>
        <a-radio value="中国护照">中国护照</a-radio>
      </a-radio-group>
    </a-form-item>

    <div class="upload-row">
      <p>营业执照 :</p>
      <div class="image-box">
        <div class="clearfix">
          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    v-model:file-list="businessList"
                    @preview="handlePreview">
            <div v-if="businessList.length<3">
              <div class="ant-upload-text ant-upload-car3">
                <ArrowUpOutlined />
                <span>上传证件</span>
              </div>
            </div>
          </a-upload>
        </div>
      </div>
    </div>
    <div class="from-item-row">
      <p>
        <a-form-item label="姓名:"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-input v-model:value="formState.personName" />
        </a-form-item>
      </p>
      <p>
        <a-form-item label="身份证号"
                     :wrapper-col="{ span: 15, offset:3}">
          <a-input v-model:value="formState.paperworkNum" />
        </a-form-item>
      </p>
    </div>

    <div class="from-item-row">
      <p>
        <a-form-item label="性别"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-radio-group v-model:value="formState.sex">
            <a-radio :value="0">男</a-radio>
            <a-radio :value="1">女</a-radio>
          </a-radio-group>
        </a-form-item>
      </p>
      <p>
        <a-form-item label="出生日期"
                     :wrapper-col="{ span: 15,  offset:3 }">
          <a-input v-model:value="formState.birthday" />
        </a-form-item>
      </p>
    </div>

    <div class="from-item-row">
      <p>

        <a-form-item label="名族"
                     :wrapper-col="{ span: 15,  offset:1 }">
          <a-input v-model:value="formState.personName" />
        </a-form-item>
      </p>
      <p>
        <a-form-item label="联系方式"
                     :wrapper-col="{ span: 15,  offset:3 }">
          <a-input v-model:value="formState.telephone" />
        </a-form-item>
      </p>
    </div>

    <a-form-item label="户籍地址"
                 :wrapper-col="{ span: 10, offset:0 }">
      <a-input v-model:value="formState.address" />
    </a-form-item>

    <a-form-item label="居住地址"
                 :wrapper-col="{ span: 10, offset:0 }">
      <a-input v-model:value="formState.residenceAddress" />
    </a-form-item>

  </a-form>
</template>

<script lang='ts'>
import { ArrowUpOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, UnwrapRef, ref } from 'vue'
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
interface FormState {
  paperworkClass: string
  personType: string
  fileUids: string[]
  personName: string
  paperworkNum: string // 证件号码
  sex: 0 | 1 // 性别
  birthday: string // 出生日期
  nation: string // 名族
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
  setup() {
    const businessList = ref<FileItem[]>([]) // 英特执照
    const previewVisible = ref<boolean>(false)
    const previewImage = ref<string | undefined>('')
    const handlePreview = async (file: FileItem) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
    }
    const formState: UnwrapRef<FormState> = reactive({
      paperworkClass: '自然人', // 类别
      personType: '身份证', // 证件类型
      fileUids: [], // 文件
      personName: '', // 用户名称
      paperworkNum: '', // 证件号码
      sex: 0, // 性别
      birthday: '', // 出生日期
      nation: '', // 名族
      telephone: '', // 联系方式
      residenceAddress: '', // 居住地址
      address: '' // 户籍方式
    })
    return {
      businessList,
      labelCol: { span: 2 },
      wrapperCol: { span: 6 },
      formState,
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
.ant-upload-picture-card-wrapper {
  display: flex;
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
