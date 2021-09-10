/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:33:37
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 16:43:13
 * @Description:登入
 */
// 返回的验证码
interface VerifyCode {
  codeImage: string;
  uid: string,
  msg: string,
}

// 返回的登入信息
interface UserDataToken {
  token: string //令牌
  firstLogin: boolean
}
{
  "address": "string",
    "area": "string",
      "birthday": "string",
        "briefIntroduction": "string",
          "city": "string",
            "companyUid": "string",
              "contact": "string",
                "createTime": "2021-09-10T08:33:37.993Z",
                  "createUserName": "string",
                    "createUserUid": "string",
                      "departmentName": "string",
                        "departmentUid": "string",
                          "editTime": "2021-09-10T08:33:37.993Z",
                            "editUserName": "string",
                              "editUserUid": "string",
                                "educationBackground": "string",
                                  "eleSignature": "string",
                                    "email": "string",
                                      "employeeNo": "string",
                                        "errorCount": 0,
                                          "firstLogin": true,
                                            "identityCard": "string",
                                              "jobsName": "string",
                                                "jobsUid": "string",
                                                  "lockLogin": true,
                                                    "mobile": "string",
                                                      "nick": "string",
                                                        "obtainEmploymentTime": "2021-09-10T08:33:37.993Z",
                                                          "occupation": "string",
                                                            "openUid": "string",
                                                              "partnerId": 0,
                                                                "password": "string",
                                                                  "profilePicture": "string",
                                                                    "province": "string",
                                                                      "roleName": "string",
                                                                        "roleUid": "string",
                                                                          "salt": "string",
                                                                            "sex": true,
                                                                              "uid": "string",
                                                                                "userDepartmentUid": "string",
                                                                                  "userName": "string",
                                                                                    "userStatus": 0,
                                                                                      "userStatusStr": "string",
                                                                                        "wxMiniOpenId": "string",
                                                                                          "wxUnionId": "string"
}
// 获取用户信息
interface AuthUserDepartment {

}
export { VerifyCode, UserDataToken, AuthUserDepartment }