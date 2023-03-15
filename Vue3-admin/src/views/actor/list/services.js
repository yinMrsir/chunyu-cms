import request from '@/utils/request'

// 新增影人
export function createActor(data) {
  return request({
    url: '/actor',
    method: 'post',
    data
  })
}

// 查询影人影人
export function getActorList(query) {
  return request({
    url: '/actor/list',
    method: 'get',
    params: query
  })
}

// 修改影人
export function updateActor(data) {
  return request({
    url: '/actor',
    method: 'put',
    data
  })
}

// 删除影人
export function deleteActor(id) {
  return request({
    url: '/actor/' + id,
    method: 'delete'
  })
}
