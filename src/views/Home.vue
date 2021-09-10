<template>
  <div class="home">
    <Header>
      <h3> 福州鼓楼法院</h3>
    </Header>
    <div class="home">
      首页
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Header from '@/components/Header.vue'

export default defineComponent({
  components: { Header },
  setup() {
    return {
      activeKey: ref('1')
    }
  }
})
</script>
<style lang="less" scoped>
.home {
  background-color: #f0f0f0;
  height: 100vh;
  overflow: hidden;
}
.login-box {
  width: 600px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
