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
.user-table {
  table {
    width: 70%;
  }
  tbody {
    width: 100%;
    tr {
      border: 1px solid rgb(214, 214, 214);
      td {
        border: 1px solid rgb(214, 214, 214);
        padding: 5px 20px;
      }
      td:nth-child(1) {
        background-color: #f1f1f1;
        width: 15%;
      }
      td:nth-child(3) {
        background-color: #f1f1f1;
        width: 15%;
      }
      td:nth-child(2) {
        width: 30%;
      }
      td:nth-child(4) {
        width: 40%;
      }
    }
  }
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
