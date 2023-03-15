import request from '@/utils/request'

// 新增影视角色
export function createMovieRole(data) {
  return request({
    url: '/movie/role',
    method: 'post',
    data
  })
}

// 查询影视角色
export function getMovieRoleList(query) {
  return request({
    url: '/movie/role/list',
    method: 'get',
    params: query
  })
}

// 修改影视角色
export function updateMovieRole(data) {
  return request({
    url: '/movie/role',
    method: 'put',
    data
  })
}

// 删除影视角色
export function deleteMovieRole(id) {
  return request({
    url: '/movie/role/' + id,
    method: 'delete'
  })
}
