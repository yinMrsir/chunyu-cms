export default defineEventHandler((event) => {
  let userInfo = getCookie(event, 'userInfo') || undefined
  if (userInfo) {
    event.context.Authorization = 'Bearer ' + JSON.parse(userInfo).token
  }
})
