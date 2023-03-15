<template>
  <div class="app-container">
    <table-pro
        dialog-title="角色"
        :columns="columns"
        :table-request-fn="getMovieRoleList"
        :create-fn="(params) => createMovieRole({
          ...params,
          akas: params.akas?.join(','),
          tags: params.tags?.join(',')
        })"
        :update-fn="(params) => updateMovieRole({
          ...params,
          akas: params.akas?.join(','),
          tags: params.tags?.join(',')
        })"
        :delete-fn="deleteMovieRole"
    />
  </div>
</template>

<script setup name="RoleList">
import { getMovieRoleList, createMovieRole, updateMovieRole, deleteMovieRole } from './services'
const { proxy } = getCurrentInstance()
const { movie_role_type, sex_type } = proxy.useDict('movie_role_type', 'sex_type')

const columns = ref([
  { title: '封面', field: 'avatar', type: 'img', add: true },
  { title: '角色名', field: 'name', add: [{ required: true, message: '请输入角色名' }], search: true },
  { title: '别名', field: 'akas', type: 'tag', add: true },
  { title: '类型', field: 'type', type: 'select', options: movie_role_type, add: [{ required: true, message: '请选择角色类型' }]  },
  { title: '外文名', field: 'nameEn', add: true  },
  { title: '性别', field: 'sex', add: true, type: 'radio', options: sex_type },
  { title: '年龄', field: 'age', add: true, hidden: true },
  { title: '血型', field: 'blood', add: true, hidden: true },
  { title: '身高', field: 'height', add: true, hidden: true  },
  { title: '体重', field: 'weight', add: true, hidden: true },
  { title: '标签', field: 'tags', add: true, type: 'tag', hidden: true },
  { title: '简介', field: 'brief', add: true, type: 'desc', formProps: { type: 'textarea' } },
  {
    actions: [
      {
        type: 'edit',
        beforeCallback: (item) => {
          return {
            ...item,
            akas: item.akas ? item.akas.split(',') : [],
            tags: item.tags ? item.tags.split(',') : []
          }
        }
      },
      { type: 'delete' }
    ]
  }
])
</script>
