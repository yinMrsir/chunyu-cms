import request from '@/utils/request'

export function getCountryList(query) {
  return request({
    url: '/basic/country/list',
    method: 'get',
    params: query
  })
}

// 获取语言列表
export const getLanguageList = (query) => {
  return request({
    url: '/basic/language/list',
    method: 'get',
    params: query
  })
}

// 获取影人列表
export const getActorList = (query) => {
  return request({
    url: '/actor/all',
    method: 'get',
    params: query
  })
}

// 获取影视角色列表
export const getRoleList = (query) => {
  return request({
    url: '/movie/role/all',
    method: 'get',
    params: query
  })
}

