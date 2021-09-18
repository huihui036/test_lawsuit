/*
 * @Author: qinghui
 * @Date: 2021-09-08 20:44:05
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-16 09:28:30
 * @Description:正则验证
 */
// 验证是否为邮箱
function checkEmail(email: string): boolean {
  const isEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (!isEmail.test(email)) {
    return false
  } else {
    return true
  }
}

// 手机号验证
function checkMobile(mobile: string): boolean {
  const isMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (!isMobile.test(mobile)) {
    return false
  } else {
    return true
  }
}

// 身份证号码
function checkCardId(cardId: string): boolean {
  const isCardId = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  if (!isCardId.test(cardId)) {
    return false
  } else {
    return true
  }
}
// 社会统一代码
function checkCode(code: string): boolean {
  const isCardId = /^([159Y]{1})([1239]{1})([0-9ABCDEFGHJKLMNPQRTUWXY]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-90-9ABCDEFGHJKLMNPQRTUWXY])$/
  if (!isCardId.test(code)) {
    return false
  } else {
    return true
  }
}
export { checkEmail, checkMobile, checkCardId, checkCode }
