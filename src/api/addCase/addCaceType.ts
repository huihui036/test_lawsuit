
export interface BaseUser {
  legalPositionNum: number
  paperworkClass: string
  personType: string
  fileMaps: any[]
  personName: string
  paperworkNum: string // 证件号码
  sex: 0 | 1 // 性别
  birthday: string // 出生日期
  nation: string // 名族
  telephone: string // 联系方式
  residenceAddress: string // 居住地址
  address: string // 户籍方式
}

export interface ProxyList extends BaseUser {
  representType: string // 身份
  relate: string // 关系
  appearWay: string // 到庭方式
}

// export interface BaseLitigation

export interface BasePersonList extends BaseUser {
  proxyList?: ProxyList[]
}
export interface BaseLitigation {
  claimType: string, // 请求类型
  claims: string, // 诉讼请求
  factsAndReasons: string // 事实与理由
  subjectMatter: string //  金额
  fileUidList: string[]
}
export interface UploadFile {
  casue?: string // 案件id
  fileClassName: string
  sort: number
}
export interface FileData {
  caseUid?: string
  fileClassName: string
  fileName: string
  status: string
  uid: string
  path: string
}
export interface AddCase {
  baseLitigation: BaseLitigation
  // defendantPersonList basePersonList: BasePersonList[] // 当事人信息
  defendantPersonList: BasePersonList[]
  plaintiffPersonList: BasePersonList[]
  thirdPersonList?: BasePersonList[] // 地三人
  cognizanceGroupUid: string, // 法院id
  evidenceFileUidList: string[] // 证据清单
  legalCase: string // 案由
  caseType: string // 案件类型
  createUserLeaglePosition: string // 创建人身份
  createUserName: string // /创建者姓名
  createUserPaperworkClass: string // 申请人证件类型
  createUserPaperworkNum: string // 申请人证件号码
  createUserTelephone: string // "申请人电话"
}
export interface PageData {
  current: number,
  size: number,
}

export interface CaseListData {
  appearTime: string
  auditOpinion: string
  auditStatus: number
  auditStatusName: string
  beyondDeadline: number
  briefFee: number
  caseName: string
  caseStatus: string
  caseType: string
  closeCaseTime: string
  closedFormTime: string
  cognizanceGroupName: string
  cognizanceGroupUid: string
  companyUid: string
  createTime: string
  createTimeEnd: string
  createTimeStart: string
  createUser: string
  createUserUid: string
  deadline: string
  defendant: string
  departmentCode: string
  departmentUid: string
  disclosure: boolean
  editTime: string
  editUserUid: string
  endTime: string
  isDeleted: boolean
  isSkip: boolean
  judgeAssistant: string
  judgeAssistantUid: string
  judgePerson: string
  judgePersonUid: string
  legalCase: string
  legalCaseClass: string
  legalDeadline: number
  markTime: string
  mediateSign: string
  noticeService: string
  noticeServiceTime: string
  plaintiff: string
  receivedTime: string
  registerPerson: string
  registerTime: string
  remarks: string
  serialNumber: string
  serviceReason: string
  skipOverTime: string
  smsStatus: number
  statusType: number
  subjectMatter: number
  treatmentGroupUid: string
  uid: string
  uidList: string[]
  withdrawExplain: string
  withdrawType: number
}
// 案件列表
export interface CaseList {
  records: CaseListData[],
  total: number,
  size: number,
  current: number,
  searchCount: boolean,
  pages: number
}

//  案由
export interface LegalCase {
  caseUid: string
  id: number
  legalCase: string, // 名称
  isCheck: boolean,
  parentUid: string
}
// 查询案由数据
export interface LegalCaseItem {
  parentUid: string,
  legalCase?: string // 名称
}

export interface SelectAllByMeDiate {
  uid: string
  companyName: string // 法院名称
  shortName: string // 法院简称
  companyCode: string
  address: string // string
  phone: string, // 手机

}

export interface PassBatchType {
  uidList: string[] // 通過
  uid: string
  auditOpinion: string // 审核意见
}
export interface MediateType {
  uidList: string[] // 通過
  uid: string // 审核意见
}

export interface withdrawType {
  uid: string // uid
  withdrawExplain: string
  withdrawType: string
}

export interface FileMapItem {
  uid: string,
  caseUid: string,
  isFolder: boolean,
  fileClassId: number,
  fileName: string,
  path: string,
  createUserUid: string,

}
export interface FileMap {
  pleadings: FileMapItem[],
  evidence: FileMapItem[],
  certification: FileMapItem[],

}

export interface CaseAllData {
  auditStatus: string, // 审核状态
  caseType: string // 类型
  baseLitigation: BaseLitigation
  caseUid: string
  certificationStatus: string // 用户认证状态
  cognizanceGroupName: string // 法院
  createUserLeaglePosition: string // 创建者身份
  createUserName: string // 创建人名称
  createUserPaperworkClass: string // 创建者证件类型
  createUserPaperworkNum: string // 创建者证件号码
  createUserTelephone: string // 创建者联系电话
  defendantPersonList: BasePersonList[]
  plaintiffPersonList: BasePersonList[]
  fileMap: any // 文件类型
  legalCase: string
  subjectMatter: string
}

export interface GetProxy {
  deliveryAddress: string
  uid: string
}
