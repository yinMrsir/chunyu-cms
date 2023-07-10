<template>
  <table-pro
      ref="table"
    :columns="columns"
    :formParams="params"
    :tableParams="params"
    :table-request-fn="getMovieRoleActor"
    :create-fn="createMovieRoleActor"
    :update-fn="updateMovieRoleActor"
    :delete-fn="deleteMovieRoleActor"
      :is-auto-fetch="false"
  />
</template>

<script setup name="movieListRole">
import { createMovieRoleActor, getMovieRoleActor, deleteMovieRoleActor, updateMovieRoleActor } from '../services'
const { proxy } = getCurrentInstance()
const params = ref({
  movieId: +proxy.$route.query.id
})

const columns = ref([
  { title: '角色封面', field: 'avatar', add: true, type: 'img', render: (row) => row.avatar || row.role.avatar },
  { title: '角色名称', field: 'roleId', add: [{ required: true, message: '请选择角色' }], type: 'role', render: ({role}) => role.name },
  { title: '饰演者', field: 'actorId', add: true, type: 'actor', render: ({ actor }) => actor?.name },
  { title: '简介', field: 'brief', add: true, formProps: { type: 'textarea' }},
  {
    actions: [
      { type: 'edit' },
      { type: 'delete' },
    ]
  }
])


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
