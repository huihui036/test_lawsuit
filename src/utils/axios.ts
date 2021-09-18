/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:29:47
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 17:42:46
 * @Description:
 */
import axios from 'axios'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { requestData, getStorageData } from '@/hooks/common'
import { UserData } from '@/api/login/loginTypes'
axios.defaults.baseURL = '/epan-cloud'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// 发送请求前
axios.interceptors.request.use(config => {
  // 请求前设置 token
  const authUserDepartment = getStorageData<UserData>('userData')
  if (authUserDepartment) {
    config.headers.token = authUserDepartment.token
  }

  return config
})

// 请求结束
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    message.warning('服务器出现了异常')
    return Promise.reject(res)
  }

  if (res.status === 7) {
    const router = useRouter()
    router.push({ name: 'login' })
  }
  if (res.status !== 200) {
    return Promise.reject(res.data)
  } else {
    if (res.data.status !== requestData.requestSuccess) {
      const messageMsg = res.data.msg || '请求已发送，但服务器返回没有提示的错误'
      message.warning(messageMsg)
    }
  }
  return res.data
}, function (error) {
  switch (error.response.status) {
    case requestData.httpRequestContent:
      message.warning('没有内容')
      return Promise.reject(error.response.data)
      break
    case requestData.httpRequestRequest:
      message.warning('服务器无法解析')
      return Promise.reject(error.response.data)
      break
    case requestData.httpRequestForbidden:
      message.warning('服务器拒绝执行此请求')
      return Promise.reject(error.response.data)
      break
    case requestData.httpRequestNotFound:
      message.warning('服务器无法根据客户端的请求找到资源')
      return Promise.reject(error.response.data)
      break
    case requestData.httpRequestServerError:
      message.warning('服务器内部错误，无法完成请求')
      return Promise.reject(error.response.data)
      break
    default:
      message.warning(`请求错误${error.response.data.msg}`)
      return Promise.reject(error.response.data)
      break
  }
  // const errMsg = error.response.data.msg || '未知错误'
  // return message.error(errMsg)
})

export default axios
