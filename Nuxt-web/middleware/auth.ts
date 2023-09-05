export default defineNuxtRouteMiddleware(() => {
  const token = useCookie<string|undefined>('token')
  if (!token?.value) {
    return  navigateTo('/')
  }
})
