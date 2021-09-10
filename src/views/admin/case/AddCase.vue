<!--
 * @Author: qinghui
 * @Date: 2021-09-10 09:17:07
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 11:10:26
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

      <div v-if="steps[current].sort == 0">
        <DisputeType></DisputeType>
      </div>
      <div v-if="steps[current].sort == 1">
        <PlaintiffForm></PlaintiffForm>
      </div>
      <div v-if="steps[current].sort == 2">
        2
      </div>
      <div v-if="steps[current].sort == 3">
        3
      </div>

    </div>
    <div class="steps-action">
      <a-button v-if="current == 0"
                style="margin-right: 8px"
                @click="prev">返回</a-button>
      <a-button v-if="current > 0"
                style="margin-right: 8px"
                @click="prev">上一步</a-button>
      <a-button v-if="current < steps.length - 1"
                type="primary"
                @click="next">下一步</a-button>
      <a-button v-if="current == steps.length - 1"
                type="primary"
                @click="$message.success('成功')">
        完成
      </a-button>
    </div>
  </div>

</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Header from '@/components/Header.vue'
import DisputeType from './addCase/DisputeType.vue'
import PlaintiffForm from './addCase/PlaintiffForm.vue'

export default defineComponent({
  name: '',
  components: { Header, DisputeType, PlaintiffForm },
  setup() {
    const current = ref<number>(1)
    const next = () => {
      current.value++
    }
    const prev = () => {
      current.value--
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
</style>
