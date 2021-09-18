<!--
 * @Author: qinghui
 * @Date: 2021-09-10 09:17:07
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 15:45:56
 * @Description:新建案件
-->
<template>

  <Header></Header>

  <div class="add-case">
    <a-steps :current="current">
      <a-step v-for="item in steps"
              :key="item.title"
              :title="item.title" />
    </a-steps>
    <div class="steps-content">

      <div v-show="steps[current].sort == 0">
        <DisputeType></DisputeType>
      </div>
      <div v-show="steps[current].sort == 1">
        <PlaintiffForm></PlaintiffForm>
      </div>
      <div v-show="steps[current].sort == 2">
        <Defendant></Defendant>

      </div>
      <div v-show="steps[current].sort == 3">
        <a-result title="起诉状提交成功">
          <template #extra>

            <a-button @click="gotToCaesList"
                      key="console"
                      type="primary">进入案件中心</a-button>
          </template>
        </a-result>
      </div>

    </div>
    <p style="margin: 30px 10px;"
       v-show="steps[current].sort == 2">
      <a-checkbox v-model:checked="checked"> 以上信息确认无误，用于验证我的合法身份。授权当前我的身份信息提供给人民法院</a-checkbox>
    </p>

    <div class="steps-action">
      <a-button v-if="current == 0"
                style="margin-right: 8px"
                @click="gotToCaesList">返回</a-button>
      <a-button v-if="current > 0"
                style="margin-right: 8px"
                @click="prev">上一步</a-button>
      <a-button v-if="current < steps.length - 2"
                type="primary"
                @click="next">下一步</a-button>
      <a-tooltip v-if="current ==2 && !checked"
                 placement="topLeft"
                 title="请勾选确认授权">
        <a-button :disabled='!checked'
                  type="primary">立即提交</a-button>
      </a-tooltip>

      <a-button v-if="current ==2 && checked"
                :disabled='!checked'
                type="primary"
                @click="next">立即提交</a-button>

      <a-button v-if="current == steps.length - 1"
                type="primary"
                @click="done">
        完成
      </a-button>
    </div>
  </div>

</template>

<script lang='ts'>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { StoreProps } from '@/store/index'
import { defineComponent, ref } from 'vue'
import Header from '@/components/Header.vue'
import DisputeType from './addCase/DisputeType.vue'
import PlaintiffForm from './addCase/PlaintiffForm.vue'
import Defendant from './addCase/Defendant.vue'
import VueEvent from '@/utils/event'
import { addCase } from '@/api/addCase/addCase'
export default defineComponent({
  name: '',
  components: { Header, DisputeType, PlaintiffForm, Defendant },
  setup() {
    const current = ref<number>(0)
    const router = useRouter()
    const store = useStore<StoreProps>()
    const next = async () => {
      if (current.value === 0) {
        VueEvent.emit('dispute')
        VueEvent.emit('dispute2')

        //  current.value++
      }
      if (current.value === 1) {
        VueEvent.emit('plaintiffForm')

        // current.value++
      } else if (current.value === 2) {
        VueEvent.emit('defendant')
        const { status } = await addCase(store.state.addCaseFrom)

        if (status === 0) {
          // claraAddCase
          debugger
          store.commit('claraAddCase')
          current.value++
          return
        }
      }
      current.value++
    }
    const gotToCaesList = () => {
      router.push({ name: 'caseList' })
    }

    const prev = () => {
      current.value--
    }
    const done = async () => {
      console.log('完成')
    }
    return {
      current,
      steps: [
        {
          title: '纠纷类型选择',
          sort: 0,
          content: 'First-content'
        },
        {
          sort: 1,
          title: '填写原告',
          content: 'Second-content'
        },
        {
          sort: 2,
          title: '填写被告和诉讼请求与事实',
          content: 'Last-content'
        },
        {
          sort: 3,
          title: '完成',
          content: 'Last-content'
        }
      ],
      checked: ref(false),
      gotToCaesList,
      done,
      next,
      prev
    }
  }
})
</script>
<style lang='less' scoped>
.steps-content {
  margin: 30px 0 20px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #a0a0a080;
}
.add-case {
  width: 60%;
  margin: 20px auto;
}
.steps-action {
  width: 50%;
  position: relative;
  left: 50%;
  bottom: 10px;
  overflow: hidden;
  transform: translate(-50%, 20%);
}
</style>
