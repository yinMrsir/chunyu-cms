<template>
  <div class="app-container">
    <table-pro
        dialog-title="横幅"
        :columns="columns"
        :table-request-fn="getBannerList"
        :create-fn="createBanner"
        :update-fn="updateBanner"
        :delete-fn="deleteBanner"
    ></table-pro>
  </div>
</template>

<script setup>
import { getBannerList, createBanner, updateBanner, deleteBanner } from './services'

const columns = ref([
  { title: '横幅图', field: 'img', type: 'img', add: [{ required: true, message: '请选择图片' }] },
  { title: '标题', field: 'title', add: [{ required: true, message: '请输入标题' }], },
  { title: '链接类型', field: 'urlType', add: true, type: 'radio', options: [{ value: '0', label: '站内' }, { value: '1', label: '站外' }] },
  { title: '链接', field: 'url', add: true, hidden: true },
  { title: '备注', field: 'remark', add: true, formProps: { type: 'textarea' } },
  { title: '创建时间', field: 'createTime', type: 'date' },
  {
    actions:[
      { type: 'edit' },
      { type: 'delete' }
    ]
  }
])
</script>
