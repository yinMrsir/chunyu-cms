<template>
  <table-pro
      dialog-title="上映时间"
      :columns="columns"
      :formParams="formParams"
      :tableParams="formParams"
      :table-request-fn="getMoviePubDateList"
      :create-fn="createMoviePubDate"
      :update-fn="updateMoviePubDate"
      :delete-fn="deleteMoviePubDate"
  />
</template>

<script setup name="PubDate">
import { getMoviePubDateList, createMoviePubDate, updateMoviePubDate, deleteMoviePubDate } from '../services'
const { proxy } = getCurrentInstance()
const formParams = { movieId: +proxy.$route.query.id }

const columns = ref([
  {
    title: '上映日期',
    field: 'pubDate',
    add: [{ required: true, message: '请选择上映日期' }],
    type: 'date'
  },
  {
    title: '上映国家',
    field: 'countryId',
    add: [{ required: true, message: '请选择上映国家' }],
    type: 'country',
    options: [{
      name: '中国',
      id: 1
    }],
    render: (row) => {
      return row.country.name
    }
  },
  {
    title: '首映',
    field: 'premiere',
    add: true,
    type: 'radio',
    options: [
      { label: '是', value: '0' },
      { label: '否', value: '1' }
    ]
  },
  {
    title: '备注',
    field: 'remark',
    add: true
  },
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
