<template>
  <div class="app-container">
    <table-pro
        :columns="columns"
        dialog-title="友情链接"
        :table-request-fn="getLinkList"
        :create-fn="createLink"
        :update-fn="updateLink"
        :delete-fn="deleteLink"
    >
    </table-pro>
  </div>
</template>

<script setup>
import { getLinkList, createLink, updateLink, deleteLink } from "./services";

const columns = ref([
  { title: '文字', field: 'text', add: [{ required: true, message: '请输入文字' }] },
  { title: '链接', field: 'url', add:  [{ required: true, message: '请输入链接' }] },
  {
    actions: [
      {
        type: 'edit'
      },
      {
        type: 'delete'
      }
    ]
  }
])
</script>
