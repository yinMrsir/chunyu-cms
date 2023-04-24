<template>
  <div class="app-container">
    <table-pro
        :columns="columns"
        :table-request-fn="getWebUserList"
        :is-show-id-column="false"
        :is-show-button-list="false"
    ></table-pro>
  </div>
</template>

<script setup>
import { getWebUserList } from './services'
const { proxy } = getCurrentInstance()
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const columns = ref([
  { title: '用户ID', field: 'userId' },
  { title: '账号', field: 'email' },
  { title: '状态', field: 'status', type: 'select', options: sys_normal_disable, add: true },
  { title: '收藏影视', field: 'userCollectCount' },
  { title: '注册时间', field: 'createTime', type: 'dateTime' },
  { title: '最后登录IP', field: 'loginIp' },
  { title: '最后登录时间', field: 'loginDate', type: 'dateTime' },
])
</script>