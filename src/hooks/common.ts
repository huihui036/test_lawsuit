/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:31:51
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 15:52:57
 * @Description:全局变量
 */
// 接口成功请求
interface RequestData {
  requestSuccess: number
  httpRequestSuccess: number
  httpRequestContent: number
  httpRequestRequest: number
  httpRequestForbidden: number
  httpRequestNotFound: number
  httpRequestServerError: number
}
const requestData: RequestData = {
  requestSuccess: 0,
  httpRequestSuccess: 200,
  httpRequestContent: 204, // 没有内容
  httpRequestRequest: 400, // 客户端请求的语法错误，服务器无法解析
  httpRequestForbidden: 403, // 服务器拒绝执行此请求
  httpRequestNotFound: 404, // 服务器无法根据客户端的请求找到资源
  httpRequestServerError: 500 // 服务器内部错误，无法完成请求
}

// 获取保存的用户信息
export function getStorageData<T>(storageName: string): T | null {
  let userData: T | null = null
  const getUserData = sessionStorage.getItem(`${storageName}`)
  if (getUserData) {
    userData = JSON.parse(getUserData) as T
  }
  return userData
}
export { requestData }
