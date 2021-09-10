/*
 * @Author: qinghui
 * @Date: 2021-09-08 20:40:43
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 11:47:36
 * @Description:表单验证规则 封装
 */
import { RuleObject } from 'ant-design-vue/es/form/interface'
import { Ref } from 'vue'
import { checkEmail, checkMobile, checkCardId } from './UseCheckData'

// 普通字段验证
function isInput(name: string, trigger: 'blur' | 'change' = 'blur', min = 0, max = 64): any[] {
  const lengthMessage = min === max ? `长度必须为${max}` : `长度必须在${min}-${max}`
  console.log('change', trigger)
  const LengthRule = [
    {
      required: true,
      message: `请输入${name}`,
      trigger: trigger
    },
    { min: min, max: max, message: lengthMessage, trigger: trigger }
  ]
  return LengthRule
}

function validateMobile() {
  const validateMobile = async (rule: RuleObject, value: string) => {
    if (value === '') {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('请输入手机号')
    } else {
      if (!checkMobile(value)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('请输入正确手机号')
      }
      return Promise.resolve()
    }
  }
  return validateMobile
}

function validateCardId() {
  const validateCardId = async (rule: RuleObject, value: string) => {
    if (value === '') {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('请输入身份证')
    } else {
      if (!checkCardId(value)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('请输入正确身份证')
      }
      return Promise.resolve()
    }
  }
  return validateCardId
}

// email 邮箱验证
function Emails(formState: any, formRef: Ref<any>) {
  const email = async (rule: RuleObject, value: string) => {
    if (value === '') {
      // eslint-disable-next-line
      return Promise.reject('请输入邮箱')
    } else if (!checkEmail(value)) {
      // eslint-disable-next-line
      return Promise.reject('请输入正确邮箱')
    } else {
      return Promise.resolve()
    }
  }
  return email
}

// 验证两次输入是否一致
function passwordCheck(formState: any) {
  const validatePass2 = async (rule: RuleObject, value: string) => {
    if (value === '') {
      // eslint-disable-next-line
      return Promise.reject('请输入')
    } else if (value !== formState.password) {
      // eslint-disable-next-line
      return Promise.reject('两次输入内容不一致')
    } else {
      return Promise.resolve()
    }
  }
  return validatePass2
}

// 提交拦截表单
async function interceptFrom(formRef: Ref<any>) {
  let checkForm = false
  try {
    await formRef.value.validate()
    checkForm = true
  } catch (error) {
    checkForm = false
  }
  return checkForm
}

export { isInput, Emails, passwordCheck, validateMobile, validateCardId, interceptFrom }
