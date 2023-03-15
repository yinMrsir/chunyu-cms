import request from '@/utils/request'

// 获取家长引导列表
export const getLevelList = (query) => {
  return request({
    url: '/basic/level/list',
    method: 'get',
    params: query
  })
}

// 获取家长引导列表不分页
export const getLevelAll = (query) => {
  return request({
    url: '/basic/level/all',
    method: 'get',
    params: query
  })
}

// 新增家长引导
export function createLevel(data) {
  return request({
    url: '/basic/level',
    method: 'post',
    data
  })
}

// 修改家长引导
export function updateLevel(data) {
  return request({
    url: '/basic/level',
    method: 'put',
    data
  })
}

// 删除家长引导
export function deleteLevel(id) {
  return request({
    url: '/basic/level/' + id,
    method: 'delete'
  })
}
