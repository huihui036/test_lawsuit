<!--
 * @Author: qinghui
 * @Date: 2021-09-15 11:39:49
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 19:49:48
 * @Description:修改用户信息
-->
<template>
  <div>
    <a-form :model="formStateUser"
            :label-col="labelCol"
            :rules="rules"
            ref="formStateUserRef"
            :wrapper-col="wrapperCol">
      <a-form-item name="password"
                   label="密码">
        <a-input-password v-model:value="formStateUser.password" />
      </a-form-item>
      <a-form-item name="password2"
                   label="再次输入">
        <a-input-password v-model:value="formStateUser.password2" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary"
                  @click="sumitUser">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
import { getAuthUser, putAuthUser } from '@/api/userData/user'
import { UserData } from '@/api/login/loginTypes'
import { message } from 'ant-design-vue'
import { getStorageData } from '@/hooks/common'
import { defineComponent, reactive, ref, UnwrapRef } from 'vue'
import { interceptFrom, isInput, passwordCheck } from '@/hooks/UseFromRules'
interface FormStateUser {
  password: string
  password2: string
}

export default defineComponent({
  name: '',
  setup() {
    const formStateUserRef = ref()
    let UserData: any = reactive({})
    const formStateUser: UnwrapRef<FormStateUser> = reactive({
      password: '',
      password2: ''
    })
    const rules = {
      password: isInput('密码', 'change', 8, 18),
      password2: [
        {
          required: true,
          validator: passwordCheck(formStateUser),
          trigger: 'change'
        }
      ]
    }

    const sumitUser = async () => {
      const resultCheck = await interceptFrom(formStateUserRef)
      if (!resultCheck) return
      const authUserDepartment = getStorageData<UserData>('userData')
      if (authUserDepartment) {
        const { data } = await getAuthUser(authUserDepartment.userUid)
        UserData = data
        UserData.password = formStateUser.password
        const resultChange = await putAuthUser(UserData)
        if (resultChange.status === 0) {
          message.success(resultChange.msg)
          formStateUser.password = ''
          formStateUser.password2 = ''
        }
      }
    }

    return {
      formStateUser,
      sumitUser,
      formStateUserRef,
      rules,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  }
})
</script>
<style lang='less' scoped>
</style>
