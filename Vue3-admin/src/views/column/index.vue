<template>
  <div class="app-container">
    <table-pro
        :columns="columns"
        dialog-title="栏目"
        :table-request-fn="getColumnList"
        :create-fn="createColumn"
        :update-fn="updateColumn"
        :delete-fn="deleteColumn"
    />
  </div>
</template>

<script setup>
import { getColumnList, createColumn, updateColumn, deleteColumn } from './services'
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const columns = ref([
  { title: '栏目名称', field: 'name', add: [{required: true, message: '请输入栏目名称'}] },
  { title: '目录名', field: 'value', add: [{required: true, message: '请输入目录名'}] },
  { title: '排序', field: 'order', type: 'number', add: true },
  { title: '状态', field: 'status', add: true, type: 'radio', options: sys_normal_disable },
  { title: '备注', field: 'remark', add: true, formProps: { type: 'textarea' } },
  {
    actions: [
      { type: 'edit' },
      { type: 'delete' }
    ]
  }
])

</script>