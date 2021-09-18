<!--
 * @Author: qingHui
 * @Date: 2021-09-06 16:00:07
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 17:20:26
 * @Description: 未登入头部
-->
<template>
  <div class="header">
    <ul class="logo-title">
      <li>
        <div class="logo"></div>
      </li>
      <li class="court-name">
        <slot>
          <h3>福州鼓楼法院</h3>
        </slot>
      </li>
      <li class="line-title">
        <h4>|</h4>
      </li>
      <li class="name-title">
        <h5>诉源治理多元化调解平台</h5>
      </li>
    </ul>
    <ul>
      <li class="out-login"
          @click="logoutMeth">退出
        <LogoutOutlined />
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { logout } from '@/api/login/login'
import { UserData } from '@/api/login/loginTypes'
import { getStorageData } from '@/hooks/common'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { LogoutOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: '',
  components: { LogoutOutlined },
  setup() {
    const router = useRouter()
    const logoutMeth = () => {
      const authUserDepartment = getStorageData<UserData>('userData')
      if (authUserDepartment) {
        logout(authUserDepartment)
        sessionStorage.removeItem('userData')
        router.push({ name: 'login' })
      }
    }
    return {
      logoutMeth
    }
  }
})
</script>
<style lang='less' scoped>
h3,
h4,
h5 {
  color: #fff;
}
.out-login {
  cursor: pointer;
}
.header {
  // height: 98px;
  display: flex;
  align-content: space-around;
  justify-content: space-between;
  padding: 10px 0;
  background-color: #fff;
  color: #fff;
}
.logo-title {
  line-height: 48px;

  display: flex;
  color: #fff;
  .logo {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    text-align: center;
    line-height: 48px;
    color: #fff;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../assets/images/logo.png');
  }
  .court-name {
    color: #fff;
    margin: 0 10px 0 20px;
  }
  .line-title,
  .name-title {
    margin: 0 5px 0 0;
  }
}
</style>
