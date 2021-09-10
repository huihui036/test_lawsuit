<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>

</template>
<script>
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default defineComponent({
  setup() {
    return { locale: zhCN }
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
