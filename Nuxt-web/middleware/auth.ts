// 需要登录才能访问的路由
const routePaths = ['/user']

export default defineNuxtRouteMiddleware((to) => {
  const userInfo = useCookie('userInfo')
  if (routePaths.includes(to.fullPath) && !userInfo.value) {
    return  navigateTo('/')
  }
})
