import request from '@/utils/request'

// 查询网站用户
export function getWebUserList(query) {
  return request({
    url: '/web/user/list',
    method: 'get',
    params: query
  })
}

// 修改状态
export function changeStatus(data) {
  return request({
    url: '/web/user/changeStatus',
    method: 'put',
    data: data
  })
}
