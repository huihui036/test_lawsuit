<!--
 * @Author: qinghui
 * @Date: 2021-09-17 20:12:49
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-18 11:19:16
 * @Description: 用户列表
-->
<template>
  <pageOut>
    <template v-slot:header>

    </template>

    <template v-slot:center>
      <div class="table-row">
        <a-table :columns="columns"
                 row-key="uid"
                 :pagination='false'
                 :data-source="dataSource"
                 :scroll="{ y: 600 }"
                 bordered>
          <template v-for="col in ['name', 'age', 'address']"
                    #[col]="{ text, record }"
                    :key="col">
            <div>
              <a-input v-if="editableData[record.key]"
                       v-model:value="editableData[record.key][col]"
                       style="margin: -5px 0" />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template #operation="{ record }">
            <div class="editable-row-operations">
              <span>
                <a @click="edit(record.uid)">查看</a>
              </span>
            </div>
          </template>
        </a-table>
      </div>

    </template>

    <template v-slot:footer>
      <a-pagination show-size-changer
                    v-model:current="pageData.current"
                    v-model:pageSize="pageData.size"
                    :total="total"
                    @showSizeChange="onShowSizeChange" />
    </template>
  </pageOut>

</template>

<script lang='ts'>
import { useRouter } from 'vue-router'
import pageOut from '@/components/PageOut.vue'
import { defineComponent, reactive, ref, UnwrapRef, watch } from 'vue'
import { getUserAllList } from '@/api/userData/user'
import { PageData } from '@/api/addCase/addCaceType'
const columns = [
  {
    title: '用户名',
    dataIndex: 'nick',
    width: '25%',
    slots: { customRender: 'nick' }
  },
  {
    title: '用户角色',
    dataIndex: 'roleName',
    width: '25%',
    slots: { customRender: 'roleName' }
  },
  {
    title: '状态',
    dataIndex: 'userStatusStr',
    width: '15%',
    slots: { customRender: 'userStatusStr' }
  },
  {
    title: '证件号',
    dataIndex: 'mobile',
    width: '15%',
    slots: { customRender: 'mobile' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]
interface DataItem {
  key: string
  name: string
  age: number
  address: string
}
const data: any[] = []
// for (let i = 0; i < 10; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`
//   })
// }
export default defineComponent({
  components: { pageOut },
  setup() {
    const total = ref(1)

    const router = useRouter()

    const dataSource = ref(data)
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})
    const pageData: PageData = reactive({
      current: 1,
      size: 20
    })
    const edit = (uid: string) => {
      router.push({
        name: 'userExamine',
        query: { uid }
      })
    }

    const onShowSizeChange = (current: number, pageSize: number) => {
      pageData.current = current
      pageData.size = pageSize
      getUserAllList(pageData, { partnerId: 2 }).then((res) => {
        data.values = res.data.records
        dataSource.value = res.data.records
      })
    }
    getUserAllList(pageData, { partnerId: 2 }).then((res) => {
      data.values = res.data.records
      dataSource.value = res.data.records
    })
    const save = (key: string) => {
      Object.assign(
        dataSource.value.filter((item) => key === item.key)[0],
        editableData[key]
      )
      delete editableData[key]
    }
    const cancel = (key: string) => {
      delete editableData[key]
    }
    return {
      dataSource,
      columns,
      editingKey: '',
      editableData,
      pageData,
      onShowSizeChange,
      total,

      edit,
      save,
      cancel
    }
  }
})
</script>
<style lang='less' scoped>
.table-row {
  height: 680px;
}
</style>
