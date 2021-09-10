<template>
  <Header>
  </Header>
  <div class="login-box">
    <div class="center-box">
      <div class="login-logo">
        <!-- <svg-icon icon-class="logo" /> -->
        <!--      <img src="~@/assets/images/logo.png" alt="">-->
      </div>
      <div class="toggle-title">
        <ul>
          <li v-for="(item,index) in loginSelect"
              :class="{'select-item':item.select}"
              @click="toggleLogin(index)"
              :key="item.id">{{item.loginName}}</li>
        </ul>
      </div>
      <LoginFrom :num="count"></LoginFrom>
    </div>

  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import LoginFrom from '@/components/login/LoginFrom.vue'

import { defineComponent, ref } from 'vue'
interface LoginSelect {
  id: number
  loginName: string
  select: boolean
}

// import md5 from 'blueimp-md5'
// ~@/assets/logo.png

export default defineComponent({
  name: 'Login',
  components: { LoginFrom, Header },
  setup() {
    const loginSelectData = [
      {
        id: 0,
        loginName: '证件号登入',
        select: true
      },
      {
        id: 1,
        loginName: '手机号登入',
        select: false
      }
    ]
    const count = ref<number>(0)
    const loginSelect = ref<LoginSelect[]>(loginSelectData)

    const toggleLogin = (index: number) => {
      count.value = index
      loginSelect.value.forEach((e) => {
        e.select = false
      })
      loginSelect.value[index].select = true
    }
    return { loginSelect, toggleLogin, count }
  }
})
</script>

<style lang="less" scoped>
.login-box {
  display: flex;
  width: 100vw;
  height: 92vh;
  padding-top: 240px;
  // background: url('~@/assets/login.svg');
  background-size: 100%;
  flex-direction: column;
  align-items: center;
  background-color: rgba(231, 231, 231, 0.239);
  .center-box {
    border: 1px solid #dcdcdcad;
    border-radius: 5px;
    padding: 20px;
    background-color: #fff;
  }
  .login-logo {
    display: flex;
    margin-bottom: 30px;

    align-items: center;
    .svg-icon {
      font-size: 48px;
    }
    img {
      height: 48px;
    }
    h1 {
      margin-bottom: 0;
      margin-left: 10px;
    }
  }
  .toggle-title {
    width: 400px;

    ul {
      display: flex;
      align-items: baseline;
      padding-bottom: 20px;
      font-size: 20px;
      color: #969799;
      li {
        cursor: pointer;
      }
      .select-item {
        font-weight: 500;
        font-size: 22px;
        color: #323233;
        cursor: default;
        margin: 0 24px;
      }
    }
  }
  :deep(.ant-form) {
    width: 400px;
    .ant-col {
      width: 100%;
    }
    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
