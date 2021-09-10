/*
 * @Author: qinghui
 * @Date: 2021-09-10 15:41:06
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 15:41:06
 * @Description:接口类
 */
class Service<T> {
  msg: string;
  status: number
  data: T;
  constructor(msg: string, status: number, data: T) {
    this.msg = msg
    this.status = status
    this.data = data
  }
}
export { Service }