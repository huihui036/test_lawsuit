<!--
 * @Author: qinghui
 * @Date: 2021-09-08 14:26:21
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-17 17:50:55
 * @Description:左侧菜单
-->
<template>

  <div class="logo" />
  <a-menu theme="dark"
          v-model:selectedKeys="selectedKeys"
          :style="{ height: '90vh', borderRight: 0 }"
          mode="inline">
    <li v-for="item in listData"
        :key="item.uid">
      <a-menu-item v-if="item.childList.length <= 0"
                   :key="item.uid"
                   @click.prevent="changTab(item)">
        <span>{{ item.permissionName }}</span>
      </a-menu-item>
      <a-sub-menu v-else
                  :style="{
          background: '#172850',
        }"
                  :key="item.uid">
        <template #icon>

        </template>
        <template #title>{{ item.permissionName }}</template>
        <a-menu-item v-for="childItem in item.childList"
                     @click.prevent="changTab(childItem)"
                     :key="childItem.uid">
          <span>{{ childItem.permissionName }}</span>
        </a-menu-item>
      </a-sub-menu>
    </li>
  </a-menu>

</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, RouteRecordRaw } from 'vue-router'

import { getLeftNavTree } from '@/api/navCase/navCase'
import { getStorageData } from '@/hooks/common'
import { LeftNavTreeList } from '@/api/navCase/types/navTypes'
import { StoreProps, RouterType } from '@/store/index'

export default defineComponent({
  name: '',
  components: {},
  setup() {
    const router = useRouter()
    const store = useStore<StoreProps>()
    const listData = ref<LeftNavTreeList[]>()
    const authUserDepartment = getStorageData<LeftNavTreeList>('userData')
    // 获取左侧菜单
    if (authUserDepartment) {
      getLeftNavTree().then((resData) => {
        if (resData.status === 7) {
          router.push({ name: 'login' })
        }
        store.dispatch('setLeftNavList', resData.data)
        listData.value = store.state.navLeftList
      })
    }
    // 点击左侧菜单
    const changTab = (data: LeftNavTreeList) => {
      // const findLeftNav = router.options.routes.find(
      //   (Item) => Item.name === 'admin'
      // )

      router.push({ name: data.menuUrl })

      // var findItem: RouteRecordRaw

      // if (!findLeftNav) return

      // if (findLeftNav.meta) {
      //   if (findLeftNav.meta.parent === data.permissionName) {
      //     router.push({ name: findLeftNav.name })
      //   }
      // }

      // findItem = findLeftNav.children.find((item) => {
      //   debugger
      //   if (item.meta) {
      //     if (item.meta.parent === data.permissionName) {
      //       //  router.push({ name: item.name })
      //       return item
      //     }
      //   }
      // }) as RouteRecordRaw

      // if (findItem && findItem.meta) {
      //   const parent = findItem.meta.parent as string
      //   const upData: RouterType = {
      //     name: findItem.name as string,
      //     path: findItem.path,
      //     title: parent
      //   }

      //   store.commit('setRouteData', upData)
      // }
    }
    return {
      listData,
      selectedKeys: ref<string[]>(['1']),
      changTab
    }
  }
})
</script>
<style lang='less' scoped>
// #components-layout-demo-side .logo {
//   height: 32px;
//   margin: 16px;
//   background: rgba(255, 255, 255, 0.3);
// }

// .site-layout .site-layout-background {
//   background: #fff;
// }
// [data-theme='dark'] .site-layout .site-layout-background {
// }
</style>
