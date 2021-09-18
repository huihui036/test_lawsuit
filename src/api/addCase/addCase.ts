/*
 * @Author: qinghui
 * @Date: 2021-09-13 10:53:46
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 14:45:22
 * @Description:案件接口
 */

import axios from '@/utils/axios'
import { AddCase, UploadFile, CaseAllData, ProxyList, FileData, GetProxy, BaseUser, PassBatchType, CaseList, PageData, withdrawType, CaseListData, LegalCase, SelectAllByMeDiate, LegalCaseItem } from './addCaceType'
import { AuthUserInfo } from '@/api/login/loginTypes'
import { Service } from '../serverType'

// 新建案件
export function addCase(data: AddCase): Promise<Service<string>> {
  return axios.post('/lawsuit/lawsuitCase/all', data)
}

// 文件上传
export function uploadFile(data: any): Promise<Service<FileData>> {
  return axios.post('/lawsuit/lawsuitFile/singleFileUpload', data)
}

export function getCaseList(pageData: PageData, data: any): Promise<Service<CaseList>> {
  return axios.post(`/lawsuit/lawsuitCase/page?size=${pageData.size}&current=${pageData.current}`, data)
}

// 获取案件列表
export function getCaseData(uid: string): Promise<Service<CaseListData>> {
  return axios.get(`/lawsuit/lawsuitCase/${uid}`)
}

// 获取案由大类
export function getLegalCase(): Promise<Service<LegalCase[]>> {
  return axios.get('/lawsuit/baseCause/class')
}
// 子类
export function getLegalCaseItemList(legalCaseItemData: LegalCaseItem): Promise<Service<LegalCase[]>> {
  return axios.post('/lawsuit/baseCause/selectCause', legalCaseItemData)
}
// 获取法院

export function getSelectAllByMeDiateList(flag: 0 | 1): Promise<Service<SelectAllByMeDiate[]>> {
  return axios.get(`/auth/authCompany/selectAllByMediate/${flag}`)
}

// 删除案件
export function deletCase(data: any): Promise<Service<string>> {
  return axios.post('/lawsuit/lawsuitCase/delete/batch', data.uidList)
}

//  /authUserInfo/{uid}  /authLawsuit/authUserInfo/{uid}根据key获取用户信息
export function getUserCase(uid: string): Promise<Service<AuthUserInfo>> {
  return axios.get(`/auth/authLawsuit/authUserInfo/${uid}`)
}
// 通过
export function passBatch(data: PassBatchType): Promise<Service<string>> {
  return axios.put('/lawsuit/lawsuitCase/passBatch', data)
}
// 不ton过

export function unpassBatch(data: PassBatchType): Promise<Service<string>> {
  return axios.put('/lawsuit/lawsuitCase/unpassBatch', data)
}

// 撤回 /lawsuitCase/withdraw

export function withdraw(data: withdrawType): Promise<Service<string>> {
  return axios.put('/lawsuit/lawsuitCase/withdraw', data)
}

// 转诉讼
export function toLitigation(data: PassBatchType): Promise<Service<string>> {
  return axios.put('/lawsuit/lawsuitCase/toLitigation', data)
}

// 转调解
export function toMediate(data: PassBatchType): Promise<Service<string>> {
  return axios.put('/lawsuit/lawsuitCase/toMediate', data)
}

// 获取案件详情所有信息

export function getCaseAllData(uid: string): Promise<Service<CaseAllData>> {
  return axios.get(`/lawsuit/lawsuitCase/getAll/${uid}`)
}

export function getPerson(caseUid: string): Promise<Service<BaseUser>> {
  return axios.get(`/lawsuit/basePerson/getPersonByCaseUid/${caseUid}`)
}

// 修改地址 /basePerson/updateDeliveryAdress
export function updateDeliveryAdress(data: GetProxy): Promise<Service<string>> {
  return axios.put('/lawsuit/basePerson/updateDeliveryAdress', data)
}

// /basePerson/getProxy/{caseUid}

export function getProxy(caseUid: string): Promise<Service<any>> {
  return axios.get(`/lawsuit/basePerson/getProxy/${caseUid}`)
}

export function putBasePerson(data: any): Promise<Service<string>> {
  return axios.post('/lawsuit/basePerson/modifyProxy', data)
}
