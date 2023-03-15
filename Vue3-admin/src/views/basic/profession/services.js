import request from '@/utils/request'

// 获取影人列表
export const getProfessionAll = (query) => {
  return request({
    url: '/basic/profession/all',
    method: 'get',
    params: query
  })
}

// 新增影人
export function createProfession(data) {
  return request({
    url: '/basic/profession',
    method: 'post',
    data
  })
}

// 修改影人
export function updateProfession(data) {
  return request({
    url: '/basic/profession',
    method: 'put',
    data
  })
}

// 删除影人
export function deleteProfession(id) {
  return request({
    url: '/basic/profession/' + id,
    method: 'delete'
  })
}
