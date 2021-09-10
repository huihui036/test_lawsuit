<!--
 * @Author: qinghui
 * @Date: 2021-09-10 10:38:31
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-10 15:04:37
 * @Description:原告
-->
<template>
  <div>
    <PersionFrom></PersionFrom>
    <div class="add-row">
      <a-button style="position: relative;
    left: 50%;
    transform: translate(-50%, 0);"
                type="link">新增代理人</a-button>

    </div>
    <AgentFrom></AgentFrom>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
// 原告
import PersionFrom from './PersionFrom.vue'
import AgentFrom from './AgentFrom.vue'
export default defineComponent({
  name: '',
  components: { PersionFrom, AgentFrom },
  setup() {
    return {}
  }
})
</script>
<style lang='less' scoped>
.add-row {
  width: 100%;
  border-radius: 4px;
  padding: 5px 0;
  border: 1px dashed #adadad;
}
</style>
