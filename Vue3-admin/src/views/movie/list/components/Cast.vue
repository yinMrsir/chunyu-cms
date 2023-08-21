<template>
  <table-pro
      ref="table"
      dialog-title="演员"
      :formParams="params"
      :tableParams="params"
      :columns="columns"
      :table-request-fn="getMovieCastList"
      :create-fn="createMovieCastProfessionMethod"
      :update-fn="updateMovieCastProfessionMethod"
      :delete-fn="deleteMovieCast"
      :is-auto-fetch="false"
  />
</template>

<script setup name="Cast">
import { createMovieCast, getMovieCastList, updateMovieCast, deleteMovieCast } from '../services'
import { getProfessionAll } from "@/views/basic/profession/services";

const { proxy } = getCurrentInstance()
const { sex_type } = proxy.useDict('sex_type')
const params = ref({
  movieId: +proxy.$route.query.id
})

const columns = ref([
  { title: '头像', field: 'actorAvatar', type: 'img' },
  { title: '中文名', field: 'actorName' },
  { title: '职务', field: 'professionName' },
  { title: '性别', field: 'actorGender', type: 'radio', options: sex_type },
  { title: '国家/地区', field: 'countryId', render: (row) => row.countryName },
  { title: '出生日期', field: 'actorBirthday', type: 'date' },
  { title: '影人名称', field: 'actorId', type: 'actor', add: true, hidden: true },
  { title: '影人职务', field: 'professionId', type: 'cascader', options: [], formProps: { props: { label: 'name', value: 'id' } }, add: true, hidden: true },
  { title: '饰演', field: 'role', add: true },
  {
    actions: [
      {
        type: 'edit',
        beforeCallback: (row) => {
          return {
            ...row,
            professionId: row.professionMpath.split('.').filter(Boolean),
            actor: {
              id: row.actorId,
              name: row.actorName,
              avatar: row.actorAvatar
            }
          }
        }
      },
      { type: 'delete' }
    ]
  }
])

onMounted(async () => {
  const { data } = await getProfessionAll()
  columns.value.find(value => value.field === 'professionId').options = proxy.handleTree(data, "id")
})

function createMovieCastProfessionMethod(params) {
  return createMovieCast({
    ...params,
    professionId: +params.professionId[params.professionId.length - 1],
    movieId: +proxy.$route.query.id
  })
}

function updateMovieCastProfessionMethod(params) {
  return updateMovieCast({
    ...params,
    professionId: +params.professionId[params.professionId.length - 1],
    movieId: +proxy.$route.query.id
  })
}


const isMounted = ref(false)

onMounted(async () => {
  isMounted.value = true
  await proxy.$refs.table.getList()
  isMounted.value = false
})

onActivated(() => {
  if (isMounted.value) {
    return
  }
  if (proxy.$route.query.id) {
    proxy.$nextTick(() => {
      proxy.$refs.table.getList({ movieId: proxy.$route.query.id })
    })
  }
})

</script>
