/*
 * @Author: qinghui
 * @Date: 2021-09-16 14:47:59
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 10:35:19
 * @Description:
 */

import axios from '@/utils/axios'

import { Service } from '../serverType'
export interface PageDatas {
  current: number,
  size: number,
}
// 获取用户信息
export function getAuthUser(uid: string): Promise<Service<any>> {
  return axios.get(`/auth/authUser/selectKey/${uid}`)
}
// /authUser/updateInfo 修改单个用户信息

export function putAuthUser(data: any): Promise<Service<any>> {
  return axios.put('/auth/authUser/updateInfo ', data)
}

// 获取所有用户信息

export function getUserAllList(pageData: PageDatas, data: any): Promise<Service<any>> {
  return axios.post(`/auth/authUser/page?size=${pageData.size}&current=${pageData.current}`, data)
}

// 用户审核 /authUser/checkUserStatus/{flag}
export function checkUserStatus(flag: number, uid: string): Promise<Service<string>> {
  return axios.get(`/auth//authUser/checkUserStatus/${flag}?uid=${uid}`)
}
