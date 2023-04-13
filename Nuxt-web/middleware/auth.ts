export default defineNuxtRouteMiddleware((to) => {
  const userInfo = useCookie('userInfo')
  if (!userInfo.value) {
    return  navigateTo('/')
  }
})
