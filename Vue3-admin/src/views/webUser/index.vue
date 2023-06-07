<template>
  <div class="app-container">
    <table-pro
        :columns="columns"
        :table-request-fn="getWebUserList"
        :is-show-id-column="false"
        :is-show-button-list="false"
    >
      <template #status="scope">
        <el-switch
            v-if="scope.row.status !== undefined"
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
        ></el-switch>
      </template>
    </table-pro>
  </div>
</template>

<script setup>
import { getWebUserList, changeStatus } from './services'
const { proxy } = getCurrentInstance()
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const columns = ref([
  { title: '用户ID', field: 'userId' },
  { title: '账号', field: 'email' },
  { title: '状态', field: 'status', type: 'select', options: sys_normal_disable, add: true, slot: 'status' },
  { title: '收藏影视', field: 'userCollectCount' },
  { title: '金币数量', field: 'walletGold' },
  { title: '注册时间', field: 'createTime', type: 'dateTime' },
  { title: '最后登录IP', field: 'loginIp' },
  { title: '最后登录时间', field: 'loginDate', type: 'dateTime' },
])

/** 用户状态修改  */
function handleStatusChange(row) {
  let text = +row.status === 0 ? "启用" : "停用";
  proxy.$modal.confirm('确认要"' + text + '""' + row.email + '"用户吗?').then(function () {
    return changeStatus({ userId: row.userId, status: row.status });
  }).then(() => {
    proxy.$modal.msgSuccess(text + "成功");
  }).catch(function () {
    row.status = row.status === "0" ? "1" : "0";
  });
};
</script>