import request from '@/utils/request'

// 获取类型列表
export const getGenreList = (query) => {
  return request({
    url: '/basic/genre/list',
    method: 'get',
    params: query
  })
}


// 获取类型列表（不分页）
export const getGenreAll = (query) => {
  return request({
    url: '/basic/genre/all',
    method: 'get',
    params: query
  })
}

// 新增类型
export function createGenre(data) {
  return request({
    url: '/basic/genre',
    method: 'post',
    data
  })
}

// 修改类型
export function updateGenre(data) {
  return request({
    url: '/basic/genre',
    method: 'put',
    data
  })
}

// 删除类型
export function deleteGenre(id) {
  return request({
    url: '/basic/genre/' + id,
    method: 'delete'
  })
}
