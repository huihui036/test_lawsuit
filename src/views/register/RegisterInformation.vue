<!--
 * @Author: qinghui
 * @Date: 2021-09-06 21:08:01
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 14:41:02
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
        <a-radio-group v-model:value="formState.personType"
                       button-style="solid">
          <a-radio-button value="自然人"
                          :disabled="UrlPath == '/admin/userData' || UrlPath =='/admin/examine' ">我是自然人</a-radio-button>
          <a-radio-button value="法人"
                          :disabled="UrlPath == '/admin/userData' || UrlPath =='/admin/examine' ">我是法人</a-radio-button>
          <a-radio-button value="非法人组织"
                          :disabled="UrlPath == '/admin/userData' || UrlPath =='/admin/examine' ">我是非法人组织</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="formState.resource=='1'"
                   name='certificates'
                   label="证件类型">
        <a-select v-model:value="formState.paperworkClass"
                  placeholder="请选择证件">
          <a-select-option value="shanghai">身份证</a-select-option>
          <a-select-option value="beijing">护照</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="证件上传">
        <div class="clearfix">
          <!-- v-model:file-list="carPositive" -->
          <a-upload action=""
                    list-type="picture-card"
                    :showUploadList='false'
                    :customRequest='customRequest'
                    @preview="handlePreview">
            <div v-if="carPositive.length < 1">
              <div class="ant-upload-text ant-upload-car1">

                <span>上传身份证正面</span>

              </div>
            </div>
            <ul class="imgae-row">

              <li v-for="(item,index) in carPositive"
                  :key="index"
                  class="item-list-image"
                  :style="
                      'background-image:url('+
                    imgeUrl+ item.path +
                      ')'
                    ">
                <div class="delet-row"
                     v-if="UrlPath !=='/admin/userData' && UrlPath !=='/admin/examine' ">
                  <p></p>
                  <p @click.stop="deletCarPositive(item.fileName,1)">
                    <DeleteOutlined />
                  </p>
                </div>

              </li>

            </ul>
          </a-upload>

          <a-upload list-type="picture-card"
                    :showUploadList='false'
                    :customRequest='carBackground'
                    @preview="handlePreview">
            <div v-if="carBack.length < 1">
              <div class="ant-upload-text ant-upload-car2">
                <span>上传身份证国徽</span>

              </div>
            </div>
            <ul class="imgae-row">

              <li v-for="(item,index) in carBack"
                  :key="index"
                  class="item-list-image"
                  :style="
                      'background-image:url('+
                   imgeUrl+ item.path +
                      ')'
                    ">
                <div class="delet-row"
                     v-if="UrlPath !=='/admin/userData' && UrlPath !=='/admin/examine'">
                  <p></p>
                  <p @click.stop="deletCarPositive(item.fileName,0)">
                    <DeleteOutlined />
                  </p>
                </div>
              </li>

            </ul>
          </a-upload>

        </div>
      </a-form-item>

      <a-form-item name="personName"
                   v-if="formState.personType=='自然人'"
                   label="用户姓名">
        <a-input v-model:value="formState.personName" />
      </a-form-item>

      <a-form-item name="paperworkNum"
                   v-if="formState.personType=='自然人'"
                   label="身份证号码">
        <a-input v-model:value="formState.paperworkNum" />
      </a-form-item>

      <a-form-item v-if="formState.personType !=='自然人'"
                   name="companyName"
                   label="公司名称">
        <a-input v-model:value="formState.companyName" />
      </a-form-item>
      <a-form-item v-if="formState.personType !=='自然人'"
                   name="organCode"
                   label=" 统一社会信用代码">
        <a-input v-model:value="formState.organCode" />
      </a-form-item>
      <a-form-item v-if="formState.personType=='自然人'"
                   label="手持证件">
        <div class="clearfix">
          <a-upload list-type="picture-card"
                    :showUploadList='false'
                    :customRequest='fileListCard'
                    @preview="handlePreview">
            <div v-if="fileList2.length < 1">
              <div class="ant-upload-text">
                <span>上传手持身份照片</span>
              </div>
            </div>
            <ul class="imgae-row">

              <!-- <li v-for="(item,index) in fileList2"
                  :key="index"
                  class="item-list-image"
                  :style="
                      'background-image:url('+
                    'http://192.168.1.41/epan-cloud/dfs/'+ item.path +
                      ')'
                    ">
                <div class="delet-row">
                  <p></p>
                  <p @click.stop="deletBusinessList(item.fileClassName,0)">
                    <DeleteOutlined />
                  </p>
                </div>
              </li> -->
              <li v-if="fileList2.length>0"
                  class="item-list-image"
                  :style="
                      'background-image:url('+
                   imgeUrl+ fileList2[0].path +
                      ')'
                    ">
                <div class="delet-row"
                     v-if="UrlPath !=='/admin/userData' && UrlPath !=='/admin/examine'">
                  <p></p>
                  <p @click.stop="deletBusinessList(fileList2[0].fileName,0)">
                    <DeleteOutlined />
                  </p>
                </div>
              </li>

            </ul>
          </a-upload>
        </div>
      </a-form-item>
      <!-- 营业执照 -->
      <div v-if="formState.personType !== '自然人'"
           class="upload-row">
        <p>营业执照 :</p>
        <div class="image-box">
          <div class="clearfix">
            <a-upload list-type="picture-card"
                      :showUploadList='false'
                      :customRequest='busine'
                      @preview="handlePreview">
              <div v-if="businessList.length<3">
                <div class="ant-upload-text ant-upload-car3">
                  <ArrowUpOutlined />
                  <span>上传营业执照</span>
                </div>
              </div>
            </a-upload>
            <ul class="imgae-row">
              <li v-for="(item,index) in businessList"
                  :key="index"
                  class="item-list-images"
                  :style="
                      'background-image:url('+
                    imgeUrl+ item.path +
                      ')'
                    ">
                <div class="delet-row"
                     v-if="UrlPath !=='/admin/userData' && UrlPath !=='/admin/examine' ">
                  <p></p>
                  <p @click.stop="deletBusinessList(item.fileName,1)">
                    <DeleteOutlined />
                  </p>
                </div>
              </li>

            </ul>
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
      <a-form-item v-if="UrlPath !=='/admin/userData' && UrlPath !=='/admin/examine'"
                   :wrapper-col="{ span: 14, offset: 4 }">
        <a-button style="margin-left: 10px"
                  @click="sumeitInfomation"
                  type="primary">提交资料</a-button>
      </a-form-item>
      <a-form-item v-if=" UrlPath =='/admin/examine'"
                   :wrapper-col="{ span: 14, offset: 4 }">
        <a-button style="margin-left: 10px"
                  @click="checkUserStatusMeth(1)"
                  type="primary">允许通过</a-button>
        <a-button style="margin-left: 10px"
                  danger
                  @click="checkUserStatusMeth(1)"
                  type="primary">拒绝通过</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, UnwrapRef, reactive, ref, render } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { isInput, validateCardId, interceptFrom } from '@/hooks/UseFromRules'
import {
  uploadImage,
  submitAuthUserInfo,
  puruloidImage
} from '@/api/login/login'

import { AuthUserInfo, UserData } from '@/api/login/loginTypes'
import VueEvent from '@/utils/event'
import { getUserCase } from '@/api/addCase/addCase'
import { getStorageData } from '@/hooks/common'
import { checkUserStatus } from '@/api/userData/user'

interface FormState {
  personType: string
  paperworkClass: string
  personName: string
  paperworkNum: string
  companyName: string
  organCode: string
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
  fileClassId: number
  fileClassName: string
  fileName: string
  isRedundant: boolean
  path: string
  sort: number
  uid: string
  userInfoUid: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}
export default defineComponent({
  name: '',
  components: { ArrowUpOutlined, DeleteOutlined },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const Information = ref()
    const previewVisible = ref<boolean>(false)
    const previewImage = ref<string | undefined>('')
    const fileList = ref<FileItem[]>([])
    const carPositive = ref<FileItem[]>([])
    const carBack = ref<FileItem[]>([])
    const businessList = ref<FileItem[]>([]) // 英特执照
    const imgeUrl = ref<string>('http://192.168.1.41/epan-cloud/dfs/')
    const fileList2 = ref<FileItem[]>([])
    const UrlPath = ref<string>('')

    const rules = {
      personName: isInput('用戶名'),
      personType: isInput('主题类型'),
      paperworkClass: isInput('证件类型'),
      organCode: isInput('社会统一代码'),
      companyName: isInput('公司名称'),
      paperworkNum: [
        {
          required: true,
          validator: validateCardId(),
          trigger: 'change'
        }
      ]
    }
    const formState: UnwrapRef<AuthUserInfo> = reactive({
      personType: '自然人',
      paperworkClass: '',
      personName: '',
      paperworkNum: '',
      companyName: '',
      organCode: '',
      uid: '',
      sex: 0,
      telephone: '',
      authUserFileList1: [],
      authUserFileList2: []
    })
    const handleCancel = () => {
      previewVisible.value = false
    }
    const url = window.location.href.split('/')[2]
    if (url === 'zlpg.yipan.com') {
      imgeUrl.value = 'http://zlpg.yipan.com/epan-cloud/dfs/'
    }

    const mobileDatasS = sessionStorage.getItem('mobile')
    console.log(route.path)
    UrlPath.value = route.path
    if (UrlPath.value === '/admin/examine') {
      const userUid = route.query.uid
      getUserCase(userUid as string).then((res) => {
        const carPositiveImag = res.data.authUserFileList1[0]
          ? [res.data.authUserFileList1[0]]
          : []
        carPositive.value = carPositiveImag
        const carBackImage = res.data.authUserFileList1[1]
          ? [res.data.authUserFileList1[1]]
          : []
        carBack.value = carBackImage
        const businessListImage = res.data.authUserFileList2
          ? res.data.authUserFileList2
          : []
        businessList.value = res.data.authUserFileList2
        fileList2.value = res.data.authUserFileList2
          ? res.data.authUserFileList2
          : []
        formState.authUserFileList1 = res.data.authUserFileList1
        formState.authUserFileList2 = res.data.authUserFileList2

        formState.personType = res.data.personType || '自然人'
        formState.paperworkClass = res.data.paperworkClass
        formState.personName = res.data.personName
        formState.paperworkNum = res.data.paperworkNum
        formState.companyName = res.data.companyName
        formState.organCode = res.data.organCode
        formState.sex = res.data.sex
      })
    }
    if (UrlPath.value === '/admin/userData') {
      const authUserDepartment = getStorageData<UserData>('userData')
      if (authUserDepartment) {
        getUserCase(authUserDepartment.userUid).then((res) => {
          const carPositiveImag = res.data.authUserFileList1[0]
            ? [res.data.authUserFileList1[0]]
            : []
          carPositive.value = carPositiveImag
          const carBackImage = res.data.authUserFileList1[1]
            ? [res.data.authUserFileList1[1]]
            : []
          carBack.value = carBackImage
          const businessListImage = res.data.authUserFileList2
            ? res.data.authUserFileList2
            : []
          businessList.value = res.data.authUserFileList2
          fileList2.value = res.data.authUserFileList2
            ? res.data.authUserFileList2
            : []
          formState.authUserFileList1 = res.data.authUserFileList1
          formState.authUserFileList2 = res.data.authUserFileList2

          formState.personType = res.data.personType || '自然人'
          formState.paperworkClass = res.data.paperworkClass
          formState.personName = res.data.personName
          formState.paperworkNum = res.data.paperworkNum
          formState.companyName = res.data.companyName
          formState.organCode = res.data.organCode
          formState.sex = res.data.sex
        })
      }
    }
    if (mobileDatasS) {
      const mobile = JSON.parse(mobileDatasS)
      if (mobile.userUid) {
        getUserCase(mobile.userUid).then((res) => {
          const carPositiveImag = res.data.authUserFileList1[0]
            ? [res.data.authUserFileList1[0]]
            : []
          carPositive.value = carPositiveImag
          const carBackImage = res.data.authUserFileList1[1]
            ? [res.data.authUserFileList1[1]]
            : []
          carBack.value = carBackImage
          const businessListImage = res.data.authUserFileList2
            ? res.data.authUserFileList2
            : []
          businessList.value = res.data.authUserFileList2
          fileList2.value = res.data.authUserFileList2
            ? res.data.authUserFileList2
            : []
          formState.authUserFileList1 = res.data.authUserFileList1
          formState.authUserFileList2 = res.data.authUserFileList2

          formState.personType = res.data.personType || '自然人'
          formState.paperworkClass = res.data.paperworkClass
          formState.personName = res.data.personName
          formState.paperworkNum = res.data.paperworkNum
          formState.companyName = res.data.companyName
          formState.organCode = res.data.organCode
          formState.sex = res.data.sex
        })
      }
    }

    const checkUserStatusMeth = async (flag: number) => {
      const userUid = route.query.uid as string
      const { status, msg } = await checkUserStatus(flag, userUid)
      if (status === 0) {
        message.success(msg)
        router.push({
          name: 'userList'
        })
      }
    }

    // VueEvent.on('changeRister', (data: any) => {
    //   formState.uid = data.uid

    //   getUserCase(formState.uid)
    // })

    const handlePreview = async (file: FileItem) => {
      console.log('1')
      // if (!file.url && !file.preview) {
      //   file.preview = (await getBase64(file.originFileObj)) as string
      // }
      // previewImage.value = file.url || file.preview
      // previewVisible.value = true
    }
    const sumeitInfomation = async () => {
      const resultCheck = await interceptFrom(Information)

      if (!resultCheck) return
      const mobileDatasS = sessionStorage.getItem('mobile')
      if (mobileDatasS) {
        const mobile = JSON.parse(mobileDatasS)
        formState.uid = mobile.uid || mobile.userUid
        if (mobile.uid) {
          const resultData = await submitAuthUserInfo(formState)
          if (resultData.status === 0) {
            VueEvent.emit('nextway')
          }
        } else if (mobile.userUid) {
          const resultData = await puruloidImage(formState)
          if (resultData.status === 0) {
            VueEvent.emit('nextway')
          }
        }
      }
    }

    const deletBusinessList = (fileName: string, type: number) => {
      const index = formState.authUserFileList2.findIndex((item) => {
        console.log(item.fileName, fileName)
        return item.fileName === fileName
      })
      debugger
      if (type === 1 && index !== -1) {
        businessList.value.splice(index, 1)
        // formState.authUserFileList2.splice(index, 1)
      }
      if (type === 0) {
        fileList2.value = []
        formState.authUserFileList2 = []
      }
    }

    const deletCarPositive = (fileName: string, type: number) => {
      const index = formState.authUserFileList1.findIndex(
        (item) => item.fileName === fileName
      )
      formState.authUserFileList1.splice(index, 1)
      if (type === 1) {
        carPositive.value = []
      }
      if (type === 0) {
        carBack.value = []
      }
    }

    const handleChange = ({ fileList: newFileList }: FileInfo) => {
      carBack.value = newFileList
      carPositive.value = newFileList
    }

    const handleChange2 = ({ fileList: newFileList }: FileInfo) => {
      fileList2.value = newFileList
    }

    async function customRequest(data: any) {
      const formData = new FormData()
      formData.append('fileClassName', '身份证')
      formData.append('sort', '0') // 随便写一个token示例
      formData.append('sourceFile', data.file) // 随便写一个token示例
      const imageData = await uploadImage(formData)
      carPositive.value.push(imageData.data)
      formState.authUserFileList1.push(imageData.data)
    }
    // 身份证背面
    async function carBackground(datas: any) {
      const formData = new FormData()
      formData.append('fileClassName', '身份证')
      formData.append('sourceFile', datas.file)
      const imageData = await uploadImage(formData)
      carBack.value.push(imageData.data)
      formState.authUserFileList1.push(imageData.data)
    }
    // busine 营业执照
    async function busine(datas: any) {
      const formData = new FormData()
      formData.append('fileClassName', '营业执照')
      formData.append('sourceFile', datas.file)
      const imageData = await uploadImage(formData)
      businessList.value.push(imageData.data)
      formState.authUserFileList2.push(imageData.data)
    }
    // fileListCard  手持身份证

    async function fileListCard(datas: any) {
      const formData = new FormData()
      formData.append('fileClassName', '手持身份证证')
      formData.append('sourceFile', datas.file)
      const imageData = await uploadImage(formData)

      fileList2.value.push(imageData.data)
      formState.authUserFileList2.push(imageData.data)
    }

    return {
      formState,
      imgeUrl,
      previewVisible,
      previewImage,
      fileList,
      fileList2,
      carPositive,
      businessList,
      Information,
      carBack,
      rules,
      UrlPath,
      checkUserStatusMeth,
      handleChange2,
      handleCancel,
      handlePreview,
      handleChange,
      sumeitInfomation,
      customRequest,
      carBackground,
      busine,
      fileListCard,
      deletBusinessList,
      deletCarPositive,
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
.imgae-row {
  display: flex;
  .item-list-image {
    background-size: 90% 90%;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    width: 141px;
    height: 103px;
    margin: 0 5px;
    border: 1px solid #e2e2e2;
    cursor: pointer;
  }
  .item-list-images {
    background-size: 90% 90%;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    width: 180px;
    height: 117px;
    margin: 0 5px;
    border: 1px solid #e2e2e2;
    cursor: pointer;
  }
}
.ant-upload-picture-card-wrapper {
  display: flex;
  width: 180px;
}
.delet-row {
  display: flex;
  justify-content: space-between;
  p:nth-child(2) {
    height: 20px;
    width: 22px;
    background: #fff;
    color: red;
  }
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
