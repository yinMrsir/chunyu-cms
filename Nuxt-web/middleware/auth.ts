export default defineNuxtRouteMiddleware(() => {
  const userInfo = useCookie('userInfo')
  if (!userInfo?.value) {
    return  navigateTo('/')
  }
})
