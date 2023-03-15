import request from '@/utils/request'

// 获取国家列表
export const getCountryList = (query) => {
  return request({
    url: '/basic/country/list',
    method: 'get',
    params: query
  })
}

// 获取所有国家列表
export const getCountryAll = (query) => {
  return request({
    url: '/basic/country/all',
    method: 'get',
    params: query
  })
}

// 新增国家
export function createCountry(data) {
  return request({
    url: '/basic/country',
    method: 'post',
    data
  })
}

// 修改国家
export function updateCountry(data) {
  return request({
    url: '/basic/country',
    method: 'put',
    data
  })
}

// 删除国家
export function deleteCountry(id) {
  return request({
    url: '/basic/country/' + id,
    method: 'delete'
  })
}
