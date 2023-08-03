<template>
  <div class="app-container">
    <table-pro dialog-title="影人" :columns="columns" :table-request-fn="getActorList" :create-fn="createActorMethod" :update-fn="updateActorMethod" :delete-fn="deleteActor"/>
  </div>
</template>

<script setup name="Actor-list">
import { createActor, getActorList, updateActor, deleteActor } from './services'
const { proxy } = getCurrentInstance()
const { sex_type } = proxy.useDict('sex_type')

const columns = ref([
  { title: '封面', field: 'avatar', add: true, type: 'img' },
  { title: '中文名', field: 'name', add: [{ required: true, message: '请输入中文名' }], search: true },
  { title: '英文名', field: 'nameEn', add: true},
  { title: '中文别名', field: 'nameMore', add: true, type: 'tag' },
  { title: '英文别名', field: 'nameEnMore', add: true, type: 'tag' },
  { title: '性别', field: 'gender', add: true, type: 'radio', options: sex_type, },
  { title: '出生日期', field: 'birthday', add: true, type: 'date' },
  { title: '逝世日期', field: 'deathDay', add: true, type: 'date', hidden: true },
  { title: '国家/地区', field: 'countryId', add: true, type: 'country', render: (row) => row.country?.name },
  { title: '出生地址', field: 'bornPlace', add: true, hidden: true },
  { title: '简介', field: 'brief', add: true, hidden: true, formProps: { type: 'textarea' } },
  {
    actions: [
      {
        type: 'edit',
        beforeCallback: (row) => {
          return {
            ...row,
            nameMore: row.nameMore ? row.nameMore.split(',') : [],
            nameEnMore: row.nameEnMore ? row.nameEnMore.split(',') : []
          }
        }
      },
      { type: 'delete' }
    ]
  }
])

function createActorMethod(params) {
  return createActor({
    ...params,
    nameMore: params.nameMore?.join(','),
    nameEnMore: params.nameEnMore?.join(',')
  })
}

function updateActorMethod(params) {
  return updateActor({
    ...params,
    nameMore: params.nameMore?.join(','),
    nameEnMore: params.nameEnMore?.join(',')
  })
}
</script>
