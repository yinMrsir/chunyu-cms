import request from '@/utils/request'

// 查询网站用户
export function getWebUserList(query) {
  return request({
    url: '/web/user/list',
    method: 'get',
    params: query
  })
}
