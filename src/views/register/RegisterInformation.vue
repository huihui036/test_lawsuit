<!--
 * @Author: qinghui
 * @Date: 2021-09-06 21:08:01
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 12:03:47
 * @Description:注册信息填写
-->
<template>
  <div>
    <a-form :model="formState"
            ref='Information'
            :rules='rules'
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <a-form-item label="主体类型"
                   name="resource">
        <a-radio-group v-model:value="formState.resource"
                       button-style="solid">
          <a-radio-button value="1">我是自然人</a-radio-button>
          <a-radio-button value="2">我是法人</a-radio-button>
          <a-radio-button value="3">我是非法人组织</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="formState.resource=='1'"
                   name='certificates'
                   label="证件类型">
        <a-select v-model:value="formState.certificates"
                  placeholder="请选择证件">
          <a-select-option value="shanghai">身份证</a-select-option>
          <a-select-option value="beijing">护照</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="证件上传">
        <div class="clearfix">
          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    v-model:file-list="carPositive"
                    @preview="handlePreview">
            <div v-if="carPositive.length < 1">
              <div class="ant-upload-text ant-upload-car1">

                <span>上传身份证正面</span>

              </div>
            </div>
          </a-upload>

          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    @preview="handlePreview"
                    v-model:file-list="carBack">
            <div v-if="carBack.length < 1">
              <div class="ant-upload-text ant-upload-car2">

                <span>上传身份证国徽</span>

              </div>
            </div>
          </a-upload>

        </div>
      </a-form-item>

      <a-form-item name="userName"
                   v-if="formState.resource=='1'"
                   label="用户姓名">
        <a-input v-model:value="formState.userName" />
      </a-form-item>

      <a-form-item name="carNumber"
                   v-if="formState.resource=='1'"
                   label="身份证号码">
        <a-input v-model:value="formState.carNumber" />
      </a-form-item>

      <a-form-item v-if="formState.resource !=='1'"
                   name="corporateName"
                   label="公司名称">
        <a-input v-model:value="formState.corporateName" />
      </a-form-item>
      <a-form-item v-if="formState.resource !=='1'"
                   name="corporateCode"
                   label=" 统一社会信用代码">
        <a-input v-model:value="formState.corporateCode" />
      </a-form-item>
      <a-form-item v-if="formState.resource=='1'"
                   label="手持证件">
        <div class="clearfix">
          <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    v-model:file-list="fileList2"
                    @preview="handlePreview">
            <div v-if="fileList2.length < 1">
              <div class="ant-upload-text">
                <span>上传手持身份照片</span>
              </div>
            </div>
          </a-upload>
        </div>
      </a-form-item>
      <!-- 营业执照 -->
      <div v-if="formState.resource !== '1'"
           class="upload-row">
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
                  <span>上传营业执照</span>
                </div>
              </div>
            </a-upload>
          </div>
        </div>
      </div>
      <a-modal :visible="previewVisible"
               :footer="null"
               @cancel="handleCancel">
        <img alt="example"
             style="width: 100%"
             :src="previewImage" />
      </a-modal>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button style="margin-left: 10px"
                  @click="sumeitInfomation"
                  type="primary">提交资料</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, UnwrapRef, reactive, ref } from 'vue'
import { ArrowUpOutlined } from '@ant-design/icons-vue'
import { isInput, validateCardId, interceptFrom } from '@/hooks/UseFromRules'
interface FormState {
  resource: string
  certificates: string
  userName: string
  carNumber: string
  corporateName: string
  corporateCode: string
}
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
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
export default defineComponent({
  name: '',
  components: { ArrowUpOutlined },
  setup() {
    const Information = ref()
    const previewVisible = ref<boolean>(false)
    const previewImage = ref<string | undefined>('')
    const fileList = ref<FileItem[]>([])
    const carPositive = ref<FileItem[]>([])
    const carBack = ref<FileItem[]>([])
    const businessList = ref<FileItem[]>([]) // 英特执照

    const fileList2 = ref<FileItem[]>([])
    const handleCancel = () => {
      previewVisible.value = false
    }

    const handlePreview = async (file: FileItem) => {
      console.log('1')
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
    }
    const sumeitInfomation = async () => {
      const resultCheck = await interceptFrom(Information)
      console.log(resultCheck)
    }
    const rules = {
      userName: isInput('用戶名'),
      resource: isInput('主题类型'),
      certificates: isInput('证件类型'),
      corporateCode: isInput('社会统一代码'),
      corporateName: isInput('公司名称'),
      carNumber: [
        {
          required: true,
          validator: validateCardId(),
          trigger: 'change'
        }
      ]
    }
    const handleChange = ({ fileList: newFileList }: FileInfo) => {
      carBack.value = newFileList
      carPositive.value = newFileList
    }

    const handleChange2 = ({ fileList: newFileList }: FileInfo) => {
      fileList2.value = newFileList
    }
    const formState: UnwrapRef<FormState> = reactive({
      resource: '2',
      certificates: '',
      userName: '',
      carNumber: '',
      corporateName: '',
      corporateCode: ''
    })
    return {
      formState,
      previewVisible,
      previewImage,
      fileList,
      fileList2,
      carPositive,
      businessList,
      Information,
      carBack,
      rules,
      handleChange2,
      handleCancel,
      handlePreview,
      handleChange,
      sumeitInfomation,
      labelCol: { span: 6 },
      wrapperCol: { span: 20 }
    }
  }
})
</script>
<style lang='less' scoped>
/* tile uploaded pictures */
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
  p {
    width: 125px;
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
.ant-upload-car1 {
  background-image: url('../../assets/images/car1.png');
}
.ant-upload-car2 {
  background-image: url('../../assets/images/car2.png');
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

:deep(.ant-form) {
  width: 500px;
}
</style>
