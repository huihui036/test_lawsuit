/*
 * @Author: qingHui
 * @Date: 2021-08-03 09:48:08
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-15 09:12:38
 * @Description:接口类== 菜单 按钮  权限
 */
// 左侧菜单
interface LeftNavTreeList {
  childList: LeftNavTreeList[]
  filterFlag: number
  iconStyle: string
  menuUrl: string
  permissionName: string
  permissionType: number
  requestMethod: string
  roleUid: string
  sort: number
  uid: string
}

export { LeftNavTreeList }
