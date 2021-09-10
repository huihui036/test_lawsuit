<!--
 * @Author: qinghui
 * @Date: 2021-09-09 15:28:07
 * @LastEditors: qinghui
 * @LastEditTime: 2021-09-09 15:47:21
 * @Description:案件列表
-->
<template>
  <div class="table-box">
    <a-table :columns="columns"
             :data-source="dataSource"
             :pagination='false'
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
          <span v-if="editableData[record.key]">
            <a @click="save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?"
                          @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <p> <a @click="edit(record.key)">代理人管理</a></p>
            <p><a @click="edit(record.key)">撤销申请</a></p>
            <p><a @click="edit(record.key)">送达地址修改</a></p>
          </span>
        </div>
      </template>
    </a-table>

  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, UnwrapRef, watch } from 'vue'
const columns = [
  {
    title: '案件编号',
    dataIndex: 'name',
    width: '10%',
    slots: { customRender: 'name' }
  },
  {
    title: '按名称',
    dataIndex: 'age',
    width: '15%',
    slots: { customRender: 'age' }
  },
  {
    title: '申请法院',
    dataIndex: 'address',
    width: '20%',
    slots: { customRender: 'address' }
  },
  {
    title: '原告',
    dataIndex: 'address',
    slots: { customRender: 'address' }
  },
  {
    title: '标的金额',
    dataIndex: 'address',
    slots: { customRender: 'address' }
  },
  {
    title: '申请时间',
    dataIndex: 'address',
    slots: { customRender: 'address' }
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
const data: DataItem[] = []
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}
export default defineComponent({
  name: '',
  setup() {
    const dataSource = ref(data)
    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})
    const save = (key: string) => {
      Object.assign(
        dataSource.value.filter((item) => key === item.key)[0],
        editableData[key]
      )
      delete editableData[key]
    }
    const edit = (key: string) => {
      console.log(key)
    }
    const cancel = (key: string) => {
      delete editableData[key]
    }

    return {
      dataSource,
      columns,
      editingKey: '',
      editableData,

      edit,
      save,
      cancel
    }
  }
})
</script>
<style lang='less' scoped>
</style>
