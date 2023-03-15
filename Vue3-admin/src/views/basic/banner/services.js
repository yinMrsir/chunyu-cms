import request from '@/utils/request'

// 获取横幅列表
export const getBannerList = (query) => {
  return request({
    url: '/basic/banner/list',
    method: 'get',
    params: query
  })
}

// 新增横幅
export function createBanner(data) {
  return request({
    url: '/basic/banner',
    method: 'post',
    data
  })
}

// 修改横幅
export function updateBanner(data) {
  return request({
    url: '/basic/banner',
    method: 'put',
    data
  })
}

// 删除横幅
export function deleteBanner(id) {
  return request({
    url: '/basic/banner/' + id,
    method: 'delete'
  })
}
