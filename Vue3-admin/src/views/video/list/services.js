import request from '@/utils/request'

// 新增视频
export function createVideo(data) {
  return request({
    url: '/video',
    method: 'post',
    data
  })
}

// 查询视频
export function getVideoList(query) {
  return request({
    url: '/video/list',
    method: 'get',
    params: query
  })
}

// 修改视频
export function updateVideo(data) {
  return request({
    url: '/video',
    method: 'put',
    data
  })
}

// 删除视频
export function deleteVideo(id) {
  return request({
    url: '/video/' + id,
    method: 'delete'
  })
}
