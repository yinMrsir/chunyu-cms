import request from '@/utils/request'

// 新增影视
export function createMovie(data) {
  return request({
    url: '/movie',
    method: 'post',
    data
  })
}

// 查询影视列表
export function getMovieList(query) {
  return request({
    url: '/movie/list',
    method: 'get',
    params: query
  })
}

// 查询单个影视基本信息
export function getMovie(id) {
  return request({
    url: '/movie/' + id,
    method: 'get'
  })
}

// 修改影视
export function updateMovie(data) {
  return request({
    url: '/movie',
    method: 'put',
    data
  })
}

// 删除影视
export function deleteMovie(id) {
  return request({
    url: '/movie/' + id,
    method: 'delete'
  })
}

// 新增相册
export function createPhotosMovie(data) {
  return request({
    url: '/photos/movie',
    method: 'post',
    data
  })
}

// 查询相册
export function photosMovieList(params) {
  return request({
    url: '/photos/movie/list',
    method: 'get',
    params
  })
}

// 删除相册
export function deletePhotosMovie({ id, remark }) {
  return request({
    url: '/photos/movie/' + id,
    method: 'delete',
    data: {
      remark
    }
  })
}

// 新增相关视频
export function createMovieVideos(data) {
  return request({
    url: '/movie/videos',
    method: 'post',
    data
  })
}

// 查询相关视频
export function getMovieVideosList(query) {
  return request({
    url: '/movie/videos/list',
    method: 'get',
    params: query
  })
}

// 修改相关视频
export function updateMovieVideos(data) {
  return request({
    url: '/movie/videos',
    method: 'put',
    data
  })
}

// 删除相关视频
export function deleteMovieVideos(id) {
  return request({
    url: '/movie/videos/' + id,
    method: 'delete'
  })
}

// 新增上映时间
export function createMoviePubDate(data) {
  return request({
    url: '/movie/pubDate',
    method: 'post',
    data
  })
}

// 查询上映时间
export function getMoviePubDateList(query) {
  return request({
    url: '/movie/pubDate/list',
    method: 'get',
    params: query
  })
}

// 修改上映时间
export function updateMoviePubDate(data) {
  return request({
    url: '/movie/pubDate',
    method: 'put',
    data
  })
}

// 删除上映时间
export function deleteMoviePubDate(ids) {
  return request({
    url: '/movie/pubDate/' + ids,
    method: 'delete'
  })
}

// 查询所有国家家长引导级别
export function getCountryLevelAll() {
  return request({
    url: 'basic/country/levels',
    method: 'get'
  })
}

// 新增关联家长引导
export function createMovieLevel(data) {
  return request({
    url: '/movie/level',
    method: 'post',
    data
  })
}

// 查询关联家长引导
export function getMovieLevelList(query) {
  return request({
    url: '/movie/level/list',
    method: 'get',
    params: query
  })
}

// 修改关联家长引导
export function updateMovieLevel(data) {
  return request({
    url: '/movie/level',
    method: 'put',
    data
  })
}

// 删除关联家长引导
export function deleteMovieLevel(ids) {
  return request({
    url: '/movie/level/' + ids,
    method: 'delete'
  })
}

// 新增关联影人
export function createMovieCast(data) {
  return request({
    url: '/movie/cast',
    method: 'post',
    data
  })
}

// 查询关联影人
export function getMovieCastList(query) {
  return request({
    url: '/movie/cast/list',
    method: 'get',
    params: query
  })
}

// 修改关联影人
export function updateMovieCast(data) {
  return request({
    url: '/movie/cast',
    method: 'put',
    data
  })
}

// 删除关联影人
export function deleteMovieCast(ids) {
  return request({
    url: '/movie/cast/' + ids,
    method: 'delete'
  })
}


// 新增关联角色
export function createMovieRoleActor(data) {
  return request({
    url: '/movie/role-actor',
    method: 'post',
    data
  })
}

// 查询关联角色
export function getMovieRoleActor(query) {
  return request({
    url: '/movie/role-actor/list',
    method: 'get',
    params: query
  })
}

// 修改关联角色
export function updateMovieRoleActor(data) {
  return request({
    url: '/movie/role-actor',
    method: 'put',
    data
  })
}

// 删除关联角色
export function deleteMovieRoleActor(ids) {
  return request({
    url: '/movie/role-actor/' + ids,
    method: 'delete'
  })
}
