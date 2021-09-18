/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:38:18
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 17:03:12
 * @Description:
 */
import axios from '@/utils/axios'
import { Register, AuthUserInfo, AuthUserDepartment, UploadImage, UserData, Login } from './loginTypes'
import { Service } from '../serverType'

// 获取验证码
export function getVerifyCode(mobile: string): Promise<Service<string>> {
  return axios.get(`/auth/authLawsuit/sendVerifyCode?mobile=${mobile}`)
}

// 提交
export function register(data: Register): Promise<Service<AuthUserDepartment>> {
  return axios.post('/auth/authLawsuit/submit', data)
}
// 提交材料 /authLawsuit/submitAuthUserInfo
export function submitAuthUserInfo(data: AuthUserInfo): Promise<Service<AuthUserDepartment>> {
  return axios.post('/auth/authLawsuit/submitAuthUserInfo', data)
}

// 注册文件
export function uploadImage(data: any): Promise<Service<UploadImage>> {
  return axios.post('/auth/authLawsuit/uploadImage', data)
}

//  登入/authLawsuit/login登
export function login(data: Login): Promise<Service<UserData>> {
  return axios.post('/auth/authLawsuit/login', data)
}

//  /authUserInfo 修改

export function puruloidImage(data: AuthUserInfo): Promise<Service<UserData>> {
  return axios.put('/auth/authLawsuit/authUserInfo', data)
}

// /authLawsuit/logout logout

export function logout(data: any): Promise<Service<string>> {
  return axios.post('/auth/authLawsuit/logout ', data)
}
