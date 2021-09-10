<!--
 * @Author: qinghui
 * @Date: 2021-09-06 21:08:44
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-08 14:19:58
 * @Description:注册完成
-->
<template>
  <div class="pending-review">
    <p>
      <InfoCircleOutlined style="color: #1890ff;
    font-size: 44px;" />
    </p>
    <p>实名认证尚未审核</p>
    <p>请耐心等待审核结果</p>
    <p @click="gotoHome">返回首页</p>

  </div>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  components: { InfoCircleOutlined },
  setup() {
    const router = useRouter()
    const gotoHome = () => {
      router.push({ name: 'login' })
    }
    return { gotoHome }
  }
})
</script>
<style lang='less' scoped>
.pending-review {
  display: flex;
  width: 500px;
  padding: 30px 0 0 0;
  background-size: 100%;
  flex-direction: column;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  p:nth-child(2) {
    font-size: 20px;
    font-weight: 600;
  }
  p:nth-child(3) {
    font-size: 16px;
    color: rgb(116, 116, 116);
  }
  p:nth-child(4) {
    margin: 50px 0 0 0;
    cursor: pointer;
    color: #1890ff;
  }
}
</style>
