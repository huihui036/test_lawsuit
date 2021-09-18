import { createStore } from 'vuex'
import { AddCase, BasePersonList, BaseLitigation, CaseAllData } from '@/api/addCase/addCaceType'
import { LeftNavTreeList } from '@/api/navCase/types/navTypes'
interface FormState {
  cognizanceGroupUid: string
  createUserLeaglePosition: string // 身份
  caseType: string
  legalCaseClass: string // 案由大类
  legalCase: string // 案由
  createUserName: string
  createUserPaperworkNum: string
  createUserPaperworkClass: string
  createUserTelephone: string
}
export interface RouterType {
  name?: string
  path?: string
  title: string
  childTitle?: string
}
export interface StoreProps {
  navLeftList: LeftNavTreeList[]
  addCaseFrom: any
  caseData: CaseAllData
}
export default createStore<StoreProps>({
  state: {
    navLeftList: [],
    addCaseFrom: {
      baseLitigation: {
        claimType: '', // 请求类型
        claims: '', // 诉讼请求
        factsAndReasons: '', // 事实与理由
        subjectMatter: '', //  金额
        fileUidList: []

      },
      defendantPersonList: [],
      plaintiffPersonList: [],
      cognizanceGroupUid: '',
      evidenceFileUidList: [],
      legalCase: '',
      createUserLeaglePosition: '',
      caseType: ''
    },
    caseData: {
      auditStatus: '', // 审核状态
      caseType: '', // 类型
      baseLitigation: {
        claimType: '', // 请求类型
        claims: '', // 诉讼请求
        factsAndReasons: '', // 事实与理由
        subjectMatter: '', //  金额
        fileUidList: []
      },
      caseUid: '',
      certificationStatus: '', // 用户认证状态
      cognizanceGroupName: '', // 法院
      createUserLeaglePosition: '', // 创建者身份
      createUserName: '', // 创建人名称
      createUserPaperworkClass: '', // 创建者证件类型
      createUserPaperworkNum: '', // 创建者证件号码
      createUserTelephone: '', // 创建者联系电话
      defendantPersonList: [],
      plaintiffPersonList: [],
      fileMap: {}, // 文件类型
      legalCase: '',
      subjectMatter: ''
    }
  },
  mutations: {
    setLeftNavTreeList(state, navLeftList: LeftNavTreeList[]) {
      state.navLeftList = navLeftList
    },
    // 添加被告
    addCaseFromDefendant(state, basePersonList: BasePersonList[]) {
      state.addCaseFrom.defendantPersonList = []
      basePersonList.forEach(item => {
        state.addCaseFrom.defendantPersonList.push(item)
      })
    },
    // 添加原告
    addCaseFromPlaintiff(state, basePersonList: BasePersonList[]) {
      state.addCaseFrom.plaintiffPersonList = []
      basePersonList.forEach(item => {
        state.addCaseFrom.plaintiffPersonList.push(item)
      })
    },

    // 添加证据清单
    addEvidenceFileUidList(state, evidenceFileUidList: string[]) {
      state.addCaseFrom.evidenceFileUidList = []
      evidenceFileUidList.forEach(item => {
        state.addCaseFrom.evidenceFileUidList.push(item)
      })
    },
    // 诉讼信息表实体类
    addCaseFromBaseLitigation(state, baseLitigation: BaseLitigation) {
      state.addCaseFrom.baseLitigation = baseLitigation
    },

    saveCaseData(state, caseData: CaseAllData) {
      state.caseData = caseData
    },

    claraAddCase(state) {
      debugger
      state.addCaseFrom = {
        baseLitigation: {
          claimType: '', // 请求类型
          claims: '', // 诉讼请求
          factsAndReasons: '', // 事实与理由
          subjectMatter: '', //  金额
          fileUidList: []

        },
        defendantPersonList: [],
        plaintiffPersonList: [],
        cognizanceGroupUid: '',
        evidenceFileUidList: [],
        legalCase: '',
        createUserLeaglePosition: 0,
        caseType: ''
      }
    },

    // 诉讼信息表实体类  诉讼状
    addBaseLitigationFileUidList(state, fileUidList: string[]) {
      state.addCaseFrom.baseLitigation.fileUidList = []

      fileUidList.forEach(item => {
        state.addCaseFrom.baseLitigation.fileUidList.push(item)
      })
    },
    addCaseBaseData(state, formState: FormState) {
      state.addCaseFrom.legalCase = formState.legalCase
      state.addCaseFrom.cognizanceGroupUid = formState.cognizanceGroupUid
      state.addCaseFrom.createUserLeaglePosition = formState.createUserLeaglePosition
      state.addCaseFrom.createUserName = formState.createUserName
      state.addCaseFrom.createUserPaperworkClass = formState.createUserPaperworkClass
      state.addCaseFrom.createUserPaperworkNum = formState.createUserPaperworkNum
      state.addCaseFrom.createUserTelephone = formState.createUserTelephone
      state.addCaseFrom.caseType = formState.caseType
    }
  },
  actions: {
    setLeftNavList({ commit }, navLeftList: LeftNavTreeList[]) {
      commit('setLeftNavTreeList', navLeftList)
    },
    saveCaseData({ commit }, caseData: CaseAllData) {
      commit('saveCaseData', caseData)
    }
  },
  modules: {
  }
})
