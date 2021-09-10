<template>
  <pageOut>
    <template v-slot:header>
      <SerachHeader></SerachHeader>
    </template>

    <template v-slot:center>
      <CaseTable></CaseTable>
    </template>

    <template v-slot:footer>
      <PageSet></PageSet>
    </template>
  </pageOut>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

import pageOut from '@/components/PageOut.vue'
import SerachHeader from './indexList/SerachHeader.vue'
import PageSet from './indexList/PageSet.vue'
import CaseTable from './indexList/CaseTable.vue'

export default defineComponent({
  name: '',
  components: { pageOut, SerachHeader, PageSet, CaseTable },
  setup() {
    return {}
  }
})
</script>
<style lang='less' scoped>
</style>
