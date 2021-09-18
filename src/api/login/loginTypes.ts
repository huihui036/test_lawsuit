/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:33:37
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 21:24:34
 * @Description:
 */
// 返回的验证码
interface Register {
  mobile: string,
  password: string
  verifyCode: string
}

// 返回的登入信息
interface UserDataToken {
  token: string // 令牌
  firstLogin: boolean
}
interface AuthUserFileList {
  fileClassId: string
  fileClassName: string
  path: string
}
//  登入
interface Login {
  loginWay: number
  mobile?: string
  paperworkNum?: string
  password: string
}
// 登入返回
interface UserData {
  companyName: string
  companyUid: string
  departmentCode: string
  departmentUid: string
  lastLoginTime: string
  loginWay: number
  mobile: string
  paperworkNum: string
  roleName: string
  roleUid: string
  token: string
  userName: string
  userUid: string
}
// 注册信息填写
interface AuthUserInfo {
  // fileClassId: number
  personType: string
  paperworkClass: string
  personName: string
  paperworkNum: string
  companyName: string
  organCode: string
  telephone: string
  uid: string
  sex?: 0 | 1,
  authUserFileList1: any[]
  authUserFileList2: any[]
}
// 获取用户信息
interface AuthUserDepartment {
  address: string
  area: string
  birthday: string
  briefIntroduction: string
  city: string
  companyUid: string
  contact: string
  createTime: string
  createUserName: string
  createUserUid: string
  departmentName: string
  departmentUid: string
  editTime: string
  editUserName: string
  editUserUid: string
  educationBackground: string
  eleSignature: string
  email: string
  employeeNo: string
  errorCount: number
  firstLogin: boolean
  identityCard: string
  jobsName: string
  jobsUid: string
  lockLogin: boolean
  mobile: string
  nick: string
  obtainEmploymentTime: string
  occupation: string
  openUid: string
  partnerId: number
  password: string
  profilePicture: string
  province: string
  roleName: string
  roleUid: string
  salt: string
  sex: boolean
  uid: string
  userDepartmentUid: string
  userName: string
  userStatus: number
  userStatusStr: string
  wxMiniOpenId: string
  wxUnionId: string

}

// 注冊图片上传

interface UploadImage {

  fileClassId: number,
  fileClassName: string,
  fileName: string,
  isRedundant: boolean,
  path: string,
  sort: number,
  uid: string,
  userInfoUid: string
}

export { Register, UserDataToken, UploadImage, AuthUserInfo, AuthUserDepartment, UserData, Login }
