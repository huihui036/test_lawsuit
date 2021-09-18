/*
 * @Author: qingHui
 * @Date: 2021-08-03 09:46:07
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-15 09:12:19
 * @Description:按钮 菜单 接口
 */
import axios from '@/utils/axios'
import { LeftNavTreeList } from './types/navTypes'
import { Service } from '../serverType'

// 获取左侧菜单
export function getLeftNavTree(): Promise<Service<LeftNavTreeList[]>> {
  return axios.get('/auth/authPermission/tree/getMenu')
}
