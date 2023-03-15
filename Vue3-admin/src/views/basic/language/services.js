import request from '@/utils/request'

// 获取语言列表
export const getLanguageList = (query) => {
  return request({
    url: '/basic/language/list',
    method: 'get',
    params: query
  })
}

// 获取所有语言
export const getLanguageAll = (query) => {
  return request({
    url: '/basic/language/all',
    method: 'get',
    params: query
  })
}

// 新增语言
export function createLanguage(data) {
  return request({
    url: '/basic/language',
    method: 'post',
    data
  })
}

// 修改语言
export function updateLanguage(data) {
  return request({
    url: '/basic/language',
    method: 'put',
    data
  })
}

// 删除语言
export function deleteLanguage(id) {
  return request({
    url: '/basic/language/' + id,
    method: 'delete'
  })
}
