import request from '@/utils/request'

// 获取友情链接列表
export const getLinkList = (query) => {
  return request({
    url: '/basic/link/list',
    method: 'get',
    params: query
  })
}

// 新增友情链接
export function createLink(data) {
  return request({
    url: '/basic/link',
    method: 'post',
    data
  })
}

// 修改友情链接
export function updateLink(data) {
  return request({
    url: '/basic/link',
    method: 'put',
    data
  })
}

// 删除友情链接
export function deleteLink(id) {
  return request({
    url: '/basic/link/' + id,
    method: 'delete'
  })
}
