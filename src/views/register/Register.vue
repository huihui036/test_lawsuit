<!--
 * @Author: qinghui
 * @Date: 2021-09-06 20:38:11
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 13:52:56
 * @Description:注冊
-->
<template>
  <Header></Header>
  <div class="register">

    <a-steps :current="current">
      <a-step v-for="item in steps"
              :key="item.title"
              :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <div v-if="steps[current].sort == 0">
        <registerStart></registerStart>
      </div>
      <div v-if="steps[current].sort == 1">
        <registerInformation></registerInformation>
      </div>
      <div v-if="steps[current].sort == 2">
        <RegisterDone></RegisterDone>
      </div>

    </div>
    <!-- <div class="steps-action">
      <a-button v-if="current > 0"
                style="margin-right: 8px"
                @click="prev">上一步</a-button>
      <a-button v-if="current < steps.length - 1"
                type="primary"
                @click="next">下一步</a-button>
      <a-button v-if="current == steps.length - 1"
                type="primary"
                @click="$message.success('Processing complete!')">
        完成
      </a-button>
    </div> -->
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import registerStart from './RegisterStart.vue'
import registerInformation from './RegisterInformation.vue'
import RegisterDone from './RegisterDone.vue'
import VueEvent from '@/utils/event'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Header,
    registerStart,
    registerInformation,
    RegisterDone
  },
  setup() {
    const current = ref<number>(0)

    const next = () => {
      current.value++
    }
    const prev = () => {
      current.value--
    }
    VueEvent.on('nextway', () => {
      next()
    })
    return {
      current,
      steps: [
        {
          title: '注冊',
          sort: 0,
          content: 'First-content'
        },
        {
          sort: 1,
          title: '注册信息填写',
          content: 'Second-content'
        },
        {
          sort: 2,
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
.register {
  width: 70vw;
  margin: auto;
}
</style>
