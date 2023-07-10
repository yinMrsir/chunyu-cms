<template>
  <table-pro
    ref="table"
    dialog-title="家长引导"
    :columns="columns"
    :tableParams="formParams"
    :table-request-fn="getMovieLevelList"
    :create-fn="createFn"
    :update-fn="updateFn"
    :delete-fn="deleteMovieLevel"
    :is-auto-fetch="false"
  />
</template>

<script setup name="Level">
import { getMovieLevelList, getCountryLevelAll, createMovieLevel, updateMovieLevel, deleteMovieLevel } from '../services'

const { proxy } = getCurrentInstance()
const formParams = { movieId: +proxy.$route.query.id }

function replaceField(arr) {
  arr.forEach(value => {
    if (value.children && value.children.length > 0) {
      replaceField(value.children)
    }
    value.value = value.id
    value.label = value.level || value.name
  })
  return arr;
}

const columns = ref([
  { title: '所属国家', field: 'countryName' },
  {
    title: '引导等级',
    field: 'level',
    type: 'cascader',
    options: [],
    add: [ { required: true, message: '请选择引导等级' } ]
  },
  { title: '引导等级中文', field: 'levelZh' },
  { title: '引导详情', field: 'descript', props: { width: '600' } },
  {
    actions: [
      {
        type: 'edit',
        beforeCallback: (item) => {
          return {
            id: item.id,
            level: [item.countryId, item.levelId]
          }
        }
      },
      { type: 'delete' }
    ]
  }
])

onMounted(async () => {
  const { data } = await getCountryLevelAll()
  columns.value.find(value => value.field === 'level').options = replaceField(data)
})

function createFn(params) {
  return createMovieLevel({
    movieId: +proxy.$route.query.id,
    levelId: +params.level[params.level.length - 1]
  })
}

function updateFn(params) {
  return updateMovieLevel({
    id: params.id,
    movieId: +proxy.$route.query.id,
    levelId: +params.level[params.level.length - 1]
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
