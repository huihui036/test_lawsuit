/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:38:18
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 16:34:53
 * @Description:
 */
import axios from '@/utils/axios'
import { VerifyCode } from './loginTypes'
import { Service } from '../serverType'

// 获取验证码
export function getVerifyCode(mobile: string): Promise<Service<string>> {
  return axios.get(`/auth/authLawsuit/sendVerifyCode?mobile=${mobile}`)
}
